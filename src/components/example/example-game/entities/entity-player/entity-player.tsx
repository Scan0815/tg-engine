import { Event, Component, ComponentInterface, h, Host, Method, Prop, Element, EventEmitter } from '@stencil/core';
import { IVector2, Vector2 } from '../../../../interfaces/IVector2';

@Component({
  tag: 'example-entity-player',
  styleUrl: 'entity-player.scss',
  shadow: true,
})
export class EntityPlayer implements ComponentInterface {
  @Prop() type: 'idle' | 'walk' = 'walk';
  @Prop() direction: 'down' | 'right' | 'up' | 'left' = 'down';
  @Prop() vector: IVector2 = new Vector2(0, 0);
  @Element() el: HTMLElement;
  @Event() transition: EventEmitter<boolean>;
  private animator: HTMLTgSpriteAnimatorElement;
  private sprite: HTMLTgSpriteElement;
  private collider: HTMLTgColliderElement;
  private vFlip: boolean = false;
  private hFlip: boolean = false;
  private animations = {
    idle: {
      hFrames: 2,
      vFrames: 4,
      keyframes: {
        'down': { frames: [0, 1], duration: 400 },
        'right': { frames: [2, 3], duration: 400 },
        'up': { frames: [4, 5], duration: 400 },
        'left': { frames: [6, 7], duration: 400 },
      },
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAAAd9JREFUaIHtWEFygzAMXHUKD27eAZf0teGgHhoxjpFlyUDJdLyXTABJK2HLYoGLQfmFAWDLYFFsDiMwAPxgMz5GIpNENIH1jyd4jURLAp/aQ0R6gmw49ybwYMZIxEJiQ6AUXO5ZJGo+NNsPz0Oee7XgpXvqK/AEKoGZQxVQCexFJIH1FSwAjUb5BLVtGEVoK3l6QHQbntKIIgmsa0AMRyLM06Q6+LrdNvs4AwPA9zxbOTCsCgC/zaKUAaCfB2kClr08ozaiBSAhkS9IcVoq/3MRr5FL9uYakExSp6VrJey1/3P0eeDyeWBzGrYiMg+kVQoRICLzuG2Bm8ARgbUE3AT2zAgSXEPoFTBzM5GSnTkPaPPBnnlAS+ClAjkJOTg8wY9OgO/TxMPz9z5NjEqDSW3FnplXH3Ld5WEAOEetw2n2qZ+SfakUDKgTrvfdu+0thynjlkXnsre24d7O817nfgl9HujzwGEEWtEJvA+Brg+0OoiQOF0fkP1t6QMDwGYFgK4PdH2gzwN1/N954Izv/xrUCrSSaElAJXCWFqDhpRPuDdzipzoPaJ/cpW3YImCY+kB+sET1AbHJ/7v1gVQjQIM+IJ/nl+kDqUbQpA8Am2/8kD7gsa85PF0j8Lbi07SCH6mv2MWjyFu5AAAAAElFTkSuQmCC',
    },
    walk: {
      hFrames: 4,
      vFrames: 4,
      keyframes: {
        'down': { frames: [0, 1, 2, 3], duration: 100 },
        'right': { frames: [4, 5, 6, 7], duration: 100 },
        'up': { frames: [8, 9, 10, 11], duration: 100 },
        'left': { frames: [12, 13, 14, 15], duration: 100 },
      },
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAtdJREFUeJztWkuWozAMlOYNnKUP0ds+zmwm5yCbzGmbhWbRiGeMkOUP9oO4Nt2ElMpSjI0lAbw50P9gACCNMAuckqitvzE2ANA3qfowIqqDyHGghf56YREPDSLHgVb6v6UvIcoBJsW41YFvIhgRSfsVa+rvAnAkzve0QYRs5HDP0v9l+ZLlXkg8dK+VvvgIWISOQERZM6C2vhiAXOQ4UFt/fQRmABwNUzS0DaWilX7UVmLZg0vs4zX1T3kRulIA1zWAiSMiPKdJNPD38Qjt4wQA8O/51HwgUGZebf3dDAD4eVmQwM+o9hY2Iqp8/s6Rjdr6m11gBkAehL8gsdGj6bcsYquyz59/BqlO4VL6iAiDd5/56hoAsD1MpKy2ufwzbJ4xptug5wN88Z4PMOBO+YDdaTAVMefx0K9UUz8qAIhoOtKehTP0zQEoIZzjwFn65gDkHnFzHThLP+oRIKLkgZTIEZyhr+YDpPN5znlcc6CV/mYG+IPgg4NFvIQDrfVd0GuaaFj+vqaJwL51EfOJaLXBn1ttNNUfAMhHzN7NfNdOCr+G/tFUIAAxw2p99q7L//r4pK+PT3fKpC7fK3+xF81L4G7seH6kGckhO8G8JP8t0PMBvnjPBxjQ8wEC3iIfcEf0ALQeQGv0APA/vT9gwdXK27n6vT/AJ+bU53l/5SPoS7AzABxyS+n7/QF/Hg++v9MX+wPm5drPn1nr8xo/pT+AA8ol79j+AJfv64uGuJbvQhu474DGP3JAcsQF27Toa3xf37Sa1qzP916Ayuj5AF+85wMM6PkAAbfIB9yx/h+COANyavil6vi19MUA3LUXQMKmU7RUn3/LHoJYO8F8gFRyPtqGchoYWumr/QH+wSK2Ps8c/9pqo7a+i7Uu79XXLVjr81yeTu0PaKZfqj7v1uhb9AdY9NX+AIBdjT2qPn9h/sbQWqePKTWX6DEQbET3GTg2knD7/oD/ksvcybtF0+IAAAAASUVORK5CYII=',
    },
  };
  private playedAnimation: any = this.animations[this.type];

  @Method()
  async getCollider() {
    return Promise.resolve(this.collider);
  }

  @Method()
  async playAnimation(type: 'idle' | 'walk') {
    this.playedAnimation = this.animations[type];
    this.sprite.hFrames = this.playedAnimation.hFrames;
    this.sprite.vFrames = this.playedAnimation.vFrames;
    this.sprite.src = this.playedAnimation.src;
    this.animator.animations = this.playedAnimation.keyframes;
    this.animator.play = this.direction;
    await this.animator.refresh();
  }

  @Method()
  async flipV() {
    this.vFlip = !this.vFlip;
    this.sprite.vFlip = this.vFlip;
  }

  @Method()
  async flipH() {
    this.hFlip = !this.hFlip;
    this.sprite.hFlip = this.hFlip;
  }

  async transitionStart(){
    this.transition.emit(true);
    await this.playAnimation('walk');
  }
  async transitionEnd(){
    this.transition.emit(false);
    await this.playAnimation('idle');
  }
  connectedCallback() {
    this.el.addEventListener("transitionstart", this.transitionStart.bind(this));
    this.el.addEventListener("transitionend",  this.transitionEnd.bind(this));
  }
  disconnectedCallback() {
    this.el.removeEventListener("transitionstart", this.transitionStart.bind(this));
    this.el.removeEventListener("transitionend",  this.transitionEnd.bind(this));
  }

  render() {
    return (
      <Host style={{
        position: 'absolute',
        top:'0',
        left:'0',
        transform: `translate(${this.vector.x}px,${this.vector.y}px)`
      }}>
        <tg-collider
          ref={ref => this.collider = ref}
          name="player"
          offsetX={5}
          offsetY={5}
          width={70}
          height={70}
          debug={true}
          x={this.vector.x}
          y={this.vector.y} />
        <tg-sprite-animator
          ref={ref => this.animator = ref}
          animations={this.playedAnimation.keyframes}
          play={this.direction}>
          <tg-sprite
            ref={ref => this.sprite = ref}
            src={this.playedAnimation.src}
            width={16}
            height={16}
            hFrames={this.playedAnimation.hFrames}
            vFrames={this.playedAnimation.vFrames}
            frame={1}
            hFlip={false}
            vFlip={false}
            scale={5} />
        </tg-sprite-animator>
      </Host>
    );
  }

}
