import { Component, Element, h, Method,Event,  EventEmitter, Host, Prop, ComponentInterface} from '@stencil/core';
import { ColliderManager } from '../../manager/collider.manager';
import { ICollider } from '../../interfaces/ICollider';

@Component({
  tag: 'tg-collider',
  shadow: true
})
export class TgCollider implements ComponentInterface {
  @Prop() name:string = "default";
  @Prop() width:number = 0;
  @Prop() height:number = 0;
  @Prop() offsetX:number = 0;
  @Prop() offsetY:number = 0;
  @Prop() scale:number = 1;

  @Element() el: HTMLElement;
  private data: ICollider = {x:0,y:0,width:0,height:0,name:"default"};
  private manager = ColliderManager.getInstance();

  @Event() collision: EventEmitter<ICollider>;

  componentWillLoad() {
    this.data.name = this.name;
    this.data.width = this.width * this.scale;
    this.data.height = this.height * this.scale;
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
    this.data.x =  rect.left + this.offsetX;
    this.data.y =  rect.top + this.offsetY;
  }

  @Method()
  async checkCollisionOnPosition(x:number,y:number,width:number,height:number) {
    const a = this.data;
    if(a.x < x + width && a.x + a.width > x &&
      a.y < y + height && a.y + a.height > y){
      return this.data;
    }
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
    return (<Host style={{
      position: 'absolute',
      top: `${this.offsetY}px`,
      left: `${this.offsetX}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      backgroundColor: 'rgba(255,0,0,0.5)'
    }}>
    </Host>);
  }
}
