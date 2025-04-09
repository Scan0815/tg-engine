import { Prop, Component, Host, h } from '@stencil/core';
import { IVector2 } from '../../../../../interfaces/IVector2';
import { Vector2 } from '../../../../../models/vector2/vector2';

@Component({
  tag: 'example-entity-wall',
  styleUrl: 'entity-wall.scss',
  shadow: true,
})
export class EntityWall {
  @Prop() vector: IVector2 = new Vector2(0, 0);
  render() {
    return (
      <Host style={{
        position: 'absolute',
        top: `${this.vector.y}px`,
        left: `${this.vector.x}px`,
      }}>
        <tg-collider
          name="wall"
          offsetX={5}
          offsetY={5}
          width={70}
          height={70}
          debug={true}
          debugColor="rgba(0,0,0,0.5)"
          x={this.vector.x}
          y={this.vector.y} />
      </Host>
    );
  }
}
