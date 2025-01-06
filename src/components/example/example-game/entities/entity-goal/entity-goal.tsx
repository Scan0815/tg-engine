import { Prop, Component, Host, h } from '@stencil/core';
import { IVector2, Vector2 } from '../../../../interfaces/IVector2';

@Component({
  tag: 'entity-goal',
  styleUrl: 'entity-goal.scss',
  shadow: true,
})
export class EntityGoal {

  @Prop() vector: IVector2 = new Vector2(0, 0);
  render() {
    return (
      <Host style={{
        position: 'absolute',
        top: `${this.vector.y}px`,
        left: `${this.vector.x}px`,
      }}>
        <tg-collider
          name="goal"
          offsetX={5}
          offsetY={5}
          width={70}
          height={70}
          debug={true}
          debugColor="rgba(255,255,255,0.5)"
          x={this.vector.x}
          y={this.vector.y} />
      </Host>
    );
  }

}
