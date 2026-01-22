import { Component, Element, h, Method,Event,  EventEmitter, Host, Prop, ComponentInterface} from '@stencil/core';
import { ColliderManager } from '../../../manager/collider.manager';
import { ICollider } from '../../../interfaces';
import { checkAABBCollision } from '../../../utils/utils';

@Component({
  tag: 'tg-collider',
  shadow: true
})
export class TgCollider implements ComponentInterface {
  @Prop() name:string = "default";
  @Prop() type:string = "default";
  @Prop() group:string = "default";
  @Prop() width:number = 0;
  @Prop() height:number = 0;
  @Prop() offsetX:number = 0;
  @Prop() offsetY:number = 0;
  @Prop() debug:boolean = false;
  @Prop() debugColor:string = 'rgba(255,0,0,0.5)';
  @Prop() x:number = 0;
  @Prop() y:number = 0;
  @Prop() scale:number = 1;

  @Element() el: HTMLTgColliderElement;
  private manager = ColliderManager.getInstance();
  @Event() collision: EventEmitter<ICollider>;

  componentDidLoad() {
    this.manager.addCollider(this.el);
  }

  disconnectedCallback() {
    this.manager.removeCollider(this.el);
  }

  async checkCollisionOnName(name: string): Promise<HTMLTgColliderElement | null> {
    const a = this.el;
    const colliders = this.manager.getColliders().filter(collider => collider.name === name);

    for (let i = 0; i < colliders.length; i++) {
      const b = colliders[i];
      if (checkAABBCollision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)) {
        return b;
      }
    }
    return null;
  }

  @Method()
  async checkCollisionOnPosition(x: number, y: number, width: number, height: number): Promise<HTMLTgColliderElement | null> {
    const a = this.el;
    if (checkAABBCollision(a.x, a.y, a.width, a.height, x, y, width, height)) {
      return this.el;
    }
    return null;
  }

  render() {
    return (<Host style={{
      position: 'absolute',
      top: `${this.offsetY}px`,
      left: `${this.offsetX}px`,
      width: `${this.width * this.scale}px`,
      height: `${this.height * this.scale}px`,
      backgroundColor: this.debug && this.debugColor
    }}>
    </Host>);
  }
}
