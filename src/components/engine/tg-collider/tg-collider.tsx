import { Component, Element, h, Method,Event, ComponentInterface} from '@stencil/core';
import { ColliderManager } from '../../manager/collider.manager';
import { EventEmitter, Prop } from '../../../../dist/types/stencil-public-runtime';
import { ICollider } from '../../interfaces/ICollider';

@Component({
  tag: 'tg-collider',
  shadow: true
})
export class TgCollider implements ComponentInterface {
  @Prop() name:string = "default";
  @Element() el: HTMLElement;
  private data: ICollider = {x:0,y:0,width:0,height:0,name:"default"};
  private manager = ColliderManager.getInstance();

  @Event() collision: EventEmitter<ICollider>;

  componentWillLoad() {
    this.data.name = this.name;
  }

  componentDidLoad() {
    this.manager.addCollider(this);
  }

  disconnectedCallback() {
    this.manager.removeCollider(this);
  }

  @Method()
  async updatePosition() {
    const rect = this.el.getBoundingClientRect();
    this.data.x =  rect.left;
    this.data.y =  rect.top;
  }

  @Method()
  async checkCollision(other: TgCollider) {
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
