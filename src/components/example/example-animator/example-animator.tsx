import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'example-animator',
  styleUrl: 'example-animator.scss',
  shadow: true,
})
export class ExampleAnimator {

  private animator: HTMLTgSpriteAnimatorElement;
  private sprite: HTMLTgSpriteElement;
  private vFlip: boolean = false;
  private hFlip: boolean = false;
  @State() type: 'idle' | 'walk' = 'walk';


  exampleAnimations = {
    idle: {
      hFrames: 2,
      vFrames: 4,
      keyframes: {
        'idle_down': { frames: [0, 1], duration: 400 },
        'idle_right': { frames: [2, 3], duration: 400 },
        'idle_up': { frames: [4, 5], duration: 400 },
        'idle_left': { frames: [6, 7], duration: 400 },
      },
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAAAd9JREFUaIHtWEFygzAMXHUKD27eAZf0teGgHhoxjpFlyUDJdLyXTABJK2HLYoGLQfmFAWDLYFFsDiMwAPxgMz5GIpNENIH1jyd4jURLAp/aQ0R6gmw49ybwYMZIxEJiQ6AUXO5ZJGo+NNsPz0Oee7XgpXvqK/AEKoGZQxVQCexFJIH1FSwAjUb5BLVtGEVoK3l6QHQbntKIIgmsa0AMRyLM06Q6+LrdNvs4AwPA9zxbOTCsCgC/zaKUAaCfB2kClr08ozaiBSAhkS9IcVoq/3MRr5FL9uYakExSp6VrJey1/3P0eeDyeWBzGrYiMg+kVQoRICLzuG2Bm8ARgbUE3AT2zAgSXEPoFTBzM5GSnTkPaPPBnnlAS+ClAjkJOTg8wY9OgO/TxMPz9z5NjEqDSW3FnplXH3Ld5WEAOEetw2n2qZ+SfakUDKgTrvfdu+0thynjlkXnsre24d7O817nfgl9HujzwGEEWtEJvA+Brg+0OoiQOF0fkP1t6QMDwGYFgK4PdH2gzwN1/N954Izv/xrUCrSSaElAJXCWFqDhpRPuDdzipzoPaJ/cpW3YImCY+kB+sET1AbHJ/7v1gVQjQIM+IJ/nl+kDqUbQpA8Am2/8kD7gsa85PF0j8Lbi07SCH6mv2MWjyFu5AAAAAElFTkSuQmCC',
    },
    walk: {
      hFrames: 4,
      vFrames: 4,
      keyframes: {
        'walk_down': { frames: [0, 1, 2, 3], duration: 100 },
        'walk_right': { frames: [4,5,6,7], duration: 100 },
        'walk_up': { frames: [8,9,10,11], duration: 100 },
        'walk_left': { frames: [12,13,14,15], duration: 100 },
      },
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAtdJREFUeJztWkuWozAMlOYNnKUP0ds+zmwm5yCbzGmbhWbRiGeMkOUP9oO4Nt2ElMpSjI0lAbw50P9gACCNMAuckqitvzE2ANA3qfowIqqDyHGghf56YREPDSLHgVb6v6UvIcoBJsW41YFvIhgRSfsVa+rvAnAkzve0QYRs5HDP0v9l+ZLlXkg8dK+VvvgIWISOQERZM6C2vhiAXOQ4UFt/fQRmABwNUzS0DaWilX7UVmLZg0vs4zX1T3kRulIA1zWAiSMiPKdJNPD38Qjt4wQA8O/51HwgUGZebf3dDAD4eVmQwM+o9hY2Iqp8/s6Rjdr6m11gBkAehL8gsdGj6bcsYquyz59/BqlO4VL6iAiDd5/56hoAsD1MpKy2ufwzbJ4xptug5wN88Z4PMOBO+YDdaTAVMefx0K9UUz8qAIhoOtKehTP0zQEoIZzjwFn65gDkHnFzHThLP+oRIKLkgZTIEZyhr+YDpPN5znlcc6CV/mYG+IPgg4NFvIQDrfVd0GuaaFj+vqaJwL51EfOJaLXBn1ttNNUfAMhHzN7NfNdOCr+G/tFUIAAxw2p99q7L//r4pK+PT3fKpC7fK3+xF81L4G7seH6kGckhO8G8JP8t0PMBvnjPBxjQ8wEC3iIfcEf0ALQeQGv0APA/vT9gwdXK27n6vT/AJ+bU53l/5SPoS7AzABxyS+n7/QF/Hg++v9MX+wPm5drPn1nr8xo/pT+AA8ol79j+AJfv64uGuJbvQhu474DGP3JAcsQF27Toa3xf37Sa1qzP916Ayuj5AF+85wMM6PkAAbfIB9yx/h+COANyavil6vi19MUA3LUXQMKmU7RUn3/LHoJYO8F8gFRyPtqGchoYWumr/QH+wSK2Ps8c/9pqo7a+i7Uu79XXLVjr81yeTu0PaKZfqj7v1uhb9AdY9NX+AIBdjT2qPn9h/sbQWqePKTWX6DEQbET3GTg2knD7/oD/ksvcybtF0+IAAAAASUVORK5CYII=',
    },
  };

  render() {
    const animation = this.exampleAnimations[this.type];
    return (
      <Host>
        <tg-sprite-animator
          ref={ref => this.animator = ref}
          animations={animation.keyframes}
          play={Object.keys(animation.keyframes)[0]}>
          <tg-sprite
            ref={ref => this.sprite = ref}
            src={animation.src}
            width={16}
            height={16}
            hFrames={animation.hFrames}
            vFrames={animation.vFrames}
            frame={1}
            hFlip={false}
            vFlip={false}
            scale={5} />
        </tg-sprite-animator>
        <div>
          {Object.keys(animation.keyframes).map((key) =>
            <button onClick={() => this.animator.play = key}>{key}</button>,
          )}
          <button onClick={async () => {
            this.sprite.scale = 5;
            await this.animator.refresh();
          }}>scale 5
          </button>
          <button onClick={async () => {
            this.sprite.scale = 8;
            await this.animator.refresh();
          }}>scale 8
          </button>
          <button onClick={async () => {
            this.sprite.scale = 3;
            await this.animator.refresh();
          }}>scale 3
          </button>
          <button onClick={() => {
            this.vFlip = !this.vFlip;
            this.sprite.vFlip = this.vFlip;
          }
          }>vFlip
          </button>
          <button onClick={() => {
            this.hFlip = !this.hFlip;
            this.sprite.hFlip = this.hFlip;
          }}>vFlip
          </button>
          <button onClick={() => {
            this.animator.state = 'paused';
          }}>paused
          </button>
          <button onClick={() => {
            this.animator.state = 'running';
          }}>running
          </button>
          <button onClick={async () => {
            this.type = 'walk';
            this.animator.play = Object.keys(animation.keyframes)[0];
            await this.animator.refresh();
          }}>walk
          </button>
          <button onClick={async () => {
            this.type = 'idle';
            this.animator.play = Object.keys(animation.keyframes)[0];
            await this.animator.refresh();
          }}>idle
          </button>
        </div>
      </Host>
    );
  }

}
