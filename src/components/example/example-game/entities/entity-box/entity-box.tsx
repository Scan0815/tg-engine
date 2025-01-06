import { Prop,Component, Host, h } from '@stencil/core';
import { IVector2, Vector2 } from '../../../../interfaces/IVector2';

@Component({
  tag: 'entity-box',
  styleUrl: 'entity-box.scss',
  shadow: true,
})
export class EntityBox {
  @Prop() vector: IVector2 = new Vector2(0, 0);
  render() {
    return (
      <Host style={{
        position: 'absolute',
        top:'0',
        left:'0',
        transform: `translate(${this.vector.x}px,${this.vector.y}px)`
      }}>
        <tg-collider
          name="box"
          offsetX={5}
          offsetY={5}
          width={70}
          height={70}
          debug={true}
          debugColor="rgba(30,30,30,0.5)"
          x={this.vector.x}
          y={this.vector.y} />
      </Host>
    );
  }

}
