import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'example-entity-level',
  styleUrl: 'entity-level.scss',
  shadow: true,
})
export class EntityLevel implements ComponentInterface {
  private spriteSrc = 'data:image/png;base64,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';
  private spriteWidth = 16;
  private spriteHeight = 16;
  private spriteHFrames = 10;
  private spriteVFrames = 10;
  private spriteScale = 5;
  private spriteMap = [];

  componentWillLoad(): Promise<void> | void {
    this.createSpriteMap();
  }

  createSpriteMap() {
    const tiles = [
      {frames: [43]},
      {frames: [42]},
      {frames: [43]},
      {frames: [40]},
      {frames: [39]},
    ]
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.spriteMap.push(Object.assign({ x: i, y: j }, tiles[j % 2]));
      }
    }
  }
  render() {
    return (
      <Host><tg-sprite-map
          src={this.spriteSrc}
          tileWidth={this.spriteWidth}
          tileHeight={this.spriteHeight}
          width={10}
          height={10}
          hFrames={this.spriteHFrames}
          vFrames={this.spriteVFrames}
          scale={this.spriteScale}
          tiles={this.spriteMap}
        /></Host>
    );
  }

}
