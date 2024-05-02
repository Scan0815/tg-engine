import { Component, Element, h, Method,Event, ComponentInterface} from '@stencil/core';
import { ColliderManager } from '../../manager/collider.manager';
import { EventEmitter, Prop } from '../../../../dist/types/stencil-public-runtime';
import { ICollider } from '../../interfaces/ICollider';

@Component({
  tag: 'tg-collider',
  shadow: true
})
export class ColliderComponent implements ComponentInterface {
  @Prop() type:string;
  @Element() el: HTMLElement;
  private data: ICollider;
  private manager = ColliderManager.getInstance();

  @Event() collision: EventEmitter<ICollider>;

  componentWillLoad() {
    this.data.type = this.type;
  }

  componentDidLoad() {
    this.manager.addCollider(this);
  }

  componentDidUnload() {
    this.manager.removeCollider(this);
  }

  @Method()
  async updatePosition() {
    const rect = this.el.getBoundingClientRect();
    this.data.x =  rect.left;
    this.data.y =  rect.top;
  }

  @Method()
  async checkCollision(other: ColliderComponent) {
    const a = this.data;
    const b = other.data;
    if(a.x < b.x + b.width && a.x + a.width > b.x &&
      a.y < b.y + b.height && a.y + a.height > b.y){
      this.collision.emit(other.data);
      return other.data;
    }
  }

  render() {
    return (<slot></slot>);
  }
}
