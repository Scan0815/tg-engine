import { Component, Host, h, Prop, State, Element, Watch, Method } from '@stencil/core';
import { ITile } from '../../../interfaces';
import { ColliderManager } from '../../../manager/collider.manager';

@Component({
  tag: 'tg-sprite-map',
  styleUrl: 'tg-sprite-map.scss',
  shadow: true,
})
export class TgSpriteMap {
  @Element() el: HTMLElement;

  @Prop() src: string = '';
  @Prop() vFrames: number = 1;
  @Prop() hFrames: number = 1;
  @Prop() width: number = 5;
  @Prop() height: number = 5;
  @Prop() tileWidth: number = 16;
  @Prop() tileHeight: number = 16;
  @Prop() scale: number = 1;
  @Prop() tiles: ITile[] = [];
  @Prop() renderMode: 'dom' | 'canvas' = 'canvas';
  @Prop() registerColliders: boolean = false;
  @Prop() colliderMapId: string = '';
  @Prop() debugColliders: boolean = false;

  @State() imageLoaded: boolean = false;

  private image: HTMLImageElement;
  private staticCanvas: HTMLCanvasElement;
  private animatedCanvas: HTMLCanvasElement;
  private animationFrameId: number;
  private animatedTiles: { tile: ITile; currentFrameIndex: number; lastFrameTime: number }[] = [];

  componentWillLoad() {
    if (this.renderMode === 'canvas') {
      this.loadImage();
    }
  }

  componentDidLoad() {
    if (this.renderMode === 'canvas' && this.imageLoaded) {
      this.initCanvasRendering();
    }
    if (this.registerColliders) {
      this.registerTileColliders();
    }
  }

  disconnectedCallback() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.registerColliders && this.colliderMapId) {
      ColliderManager.getInstance().unregisterTileColliders(this.colliderMapId);
    }
  }

  @Watch('tiles')
  tilesChanged() {
    if (this.renderMode === 'canvas' && this.imageLoaded) {
      this.initCanvasRendering();
    }
    if (this.registerColliders) {
      this.registerTileColliders();
    }
  }

  @Watch('registerColliders')
  registerCollidersChanged(newValue: boolean) {
    if (newValue) {
      this.registerTileColliders();
    } else if (this.colliderMapId) {
      ColliderManager.getInstance().unregisterTileColliders(this.colliderMapId);
    }
  }

  /**
   * Force re-render of all tiles. Call this method when tile content
   * has been modified without changing the array reference.
   */
  @Method()
  async refresh(): Promise<void> {
    if (this.renderMode === 'canvas' && this.imageLoaded) {
      this.initCanvasRendering();
    }
    if (this.registerColliders) {
      this.registerTileColliders();
    }
  }

  private loadImage(): void {
    if (typeof Image === 'undefined') {
      return;
    }
    this.image = new Image();
    this.image.onload = () => {
      this.imageLoaded = true;
      this.initCanvasRendering();
    };
    this.image.src = this.src;
  }

  private initCanvasRendering(): void {
    if (!this.image || !this.imageLoaded) return;

    this.staticCanvas = this.el.shadowRoot.querySelector('.static-layer') as HTMLCanvasElement;
    this.animatedCanvas = this.el.shadowRoot.querySelector('.animated-layer') as HTMLCanvasElement;

    if (!this.staticCanvas || !this.animatedCanvas) return;

    const { staticTiles, animatedTiles } = this.categorizeTiles();

    this.renderStaticTiles(staticTiles);
    this.setupAnimatedTiles(animatedTiles);
  }

  private categorizeTiles(): { staticTiles: ITile[]; animatedTiles: ITile[] } {
    const staticTiles: ITile[] = [];
    const animatedTiles: ITile[] = [];

    for (const tile of this.tiles) {
      if (tile.frames?.length > 1) {
        animatedTiles.push(tile);
      } else {
        staticTiles.push(tile);
      }
    }

    return { staticTiles, animatedTiles };
  }

  private getFrameSourceCoords(frame: number): { sx: number; sy: number } {
    const effectiveHFrames = Math.max(1, this.hFrames);
    const col = frame % effectiveHFrames;
    const row = Math.floor(frame / effectiveHFrames);
    return {
      sx: col * this.tileWidth,
      sy: row * this.tileHeight,
    };
  }

  private renderStaticTiles(tiles: ITile[]): void {
    const ctx = this.staticCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, this.staticCanvas.width, this.staticCanvas.height);

    for (const tile of tiles) {
      const frame = tile.frames?.[0] ?? 0;
      const { sx, sy } = this.getFrameSourceCoords(frame);
      const dx = tile.x * this.tileWidth * this.scale;
      const dy = tile.y * this.tileHeight * this.scale;
      const dw = this.tileWidth * this.scale;
      const dh = this.tileHeight * this.scale;

      ctx.drawImage(
        this.image,
        sx, sy, this.tileWidth, this.tileHeight,
        dx, dy, dw, dh
      );
    }
  }

  private setupAnimatedTiles(tiles: ITile[]): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animatedTiles = tiles.map(tile => ({
      tile,
      currentFrameIndex: 0,
      lastFrameTime: performance.now(),
    }));

    if (this.animatedTiles.length > 0) {
      this.animateLoop();
    }
  }

  private animateLoop = (): void => {
    const ctx = this.animatedCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, this.animatedCanvas.width, this.animatedCanvas.height);

    const now = performance.now();

    for (const animData of this.animatedTiles) {
      const { tile } = animData;
      const duration = tile.duration ?? 100;
      const elapsed = now - animData.lastFrameTime;

      if (elapsed >= duration) {
        animData.currentFrameIndex = (animData.currentFrameIndex + 1) % tile.frames.length;
        animData.lastFrameTime = now;
      }

      const frame = tile.frames[animData.currentFrameIndex];
      const { sx, sy } = this.getFrameSourceCoords(frame);
      const dx = tile.x * this.tileWidth * this.scale;
      const dy = tile.y * this.tileHeight * this.scale;
      const dw = this.tileWidth * this.scale;
      const dh = this.tileHeight * this.scale;

      ctx.drawImage(
        this.image,
        sx, sy, this.tileWidth, this.tileHeight,
        dx, dy, dw, dh
      );
    }

    this.animationFrameId = requestAnimationFrame(this.animateLoop);
  };

  private registerTileColliders(): void {
    if (!this.colliderMapId) return;

    const colliderManager = ColliderManager.getInstance();
    colliderManager.unregisterTileColliders(this.colliderMapId);

    const collidableTiles = this.tiles.filter(tile => tile.collidable);
    if (collidableTiles.length === 0) return;

    const colliders = collidableTiles.map(tile => ({
      x: tile.x * this.tileWidth * this.scale,
      y: tile.y * this.tileHeight * this.scale,
      width: this.tileWidth * this.scale,
      height: this.tileHeight * this.scale,
      type: tile.colliderType ?? 'tile',
      name: tile.colliderName ?? `tile-${tile.x}-${tile.y}`,
    }));

    colliderManager.registerTileColliders(this.colliderMapId, colliders);
  }

  private getTileStyle(tile: ITile) {
    return {
      position: 'absolute',
      top: `${tile.y * this.tileHeight * this.scale}px`,
      left: `${tile.x * this.tileWidth * this.scale}px`,
    };
  }

  private renderAnimatedTileDom(tile: ITile, style: { [key: string]: string }) {
    return (
      <tg-sprite-animator
        animations={{
          default: {
            frames: tile.frames,
            duration: tile.duration,
          },
        }}
        play="default"
        style={style}
      >
        {this.renderTileDom(tile, undefined)}
      </tg-sprite-animator>
    );
  }

  private renderTileDom(tile: ITile, style?: { [key: string]: string }) {
    return (
      <tg-sprite
        src={this.src}
        width={this.tileWidth}
        height={this.tileHeight}
        hFrames={this.hFrames}
        vFrames={this.vFrames}
        scale={this.scale}
        frame={tile.frames[0]}
        style={style}
      />
    );
  }

  private renderDebugColliders() {
    if (!this.debugColliders) return null;

    const collidableTiles = this.tiles.filter(tile => tile.collidable);
    return collidableTiles.map(tile => (
      <div
        class="debug-collider"
        style={{
          position: 'absolute',
          left: `${tile.x * this.tileWidth * this.scale}px`,
          top: `${tile.y * this.tileHeight * this.scale}px`,
          width: `${this.tileWidth * this.scale}px`,
          height: `${this.tileHeight * this.scale}px`,
        }}
      />
    ));
  }

  render() {
    const mapWidth = this.tileWidth * this.scale * this.width;
    const mapHeight = this.tileHeight * this.scale * this.height;

    if (this.renderMode === 'canvas') {
      return (
        <Host style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
          <canvas
            class="static-layer"
            width={mapWidth}
            height={mapHeight}
          />
          <canvas
            class="animated-layer"
            width={mapWidth}
            height={mapHeight}
          />
          {this.renderDebugColliders()}
        </Host>
      );
    }

    return (
      <Host style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
        {this.tiles.map(tile =>
          tile.frames?.length > 1
            ? this.renderAnimatedTileDom(tile, this.getTileStyle(tile))
            : this.renderTileDom(tile, this.getTileStyle(tile))
        )}
        {this.renderDebugColliders()}
      </Host>
    );
  }
}
