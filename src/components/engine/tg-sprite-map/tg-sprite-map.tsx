import { Component, Host, h, Prop } from '@stencil/core';
import { ITile } from '../../interfaces/ITile';

@Component({
  tag: 'tg-sprite-map',
  styleUrl: 'tg-sprite-map.scss',
  shadow: true,
})
export class TgSpriteMap {
  @Prop() src: string = '';
  @Prop() vFrames: number = 1;
  @Prop() hFrames: number = 1;
  @Prop() width: number = 16;
  @Prop() height: number = 16;
  @Prop() scale: number = 1;
  @Prop() tiles: ITile[] = [];

  /**
   * Get the style for the tile
   * @param tile
   */
  getTileStyle(tile: ITile) {
    return {
      position: 'absolute',
      top: `${tile.y * this.height * this.scale}px`,
      left: `${tile.x * this.width * this.scale}px`
    };
  }

  /**
   * Render an animated tile
   * @param tile
   * @param style
   */
  renderAnimatedTile(tile: ITile, style: { [key: string]: string }) {
    return <tg-sprite-animator animations={{
      'default': {
        frames: tile.frames,
        duration: tile.duration,
      },
    }} play="default" style={style}>
      {this.renderTile(tile, null)}
    </tg-sprite-animator>
  }

  /**
   * Render a tile
   * @param tile
   * @param style
   */
  renderTile(tile: ITile, style?: { [key: string]: string }) {
    return <tg-sprite
      src={this.src}
      width={this.width}
      height={this.height}
      hFrames={this.hFrames}
      vFrames={this.vFrames}
      scale={this.scale}
      frame={tile.frames[0]}
      style={style} />
  }

  render() {
    return (
      <Host>
        {this.tiles.map(tile =>
          tile.frames?.length > 1 ? this.renderAnimatedTile(tile, this.getTileStyle(tile)) : this.renderTile(tile, this.getTileStyle(tile)),
        )}
      </Host>
    );
  }

}
