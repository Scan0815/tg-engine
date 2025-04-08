import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'example-page',
  styleUrl: 'example-page.scss',
  shadow: true,
})
export class ExamplePage {
  @State() selectedComponent: string = 'sprite';
  @State() currentFrame: number = 0;
  @State() isPlaying: boolean = true;
  @State() cameraTarget: HTMLElement = null;
  @State() animatorType: 'idle' | 'walk' = 'walk';
  @State() spriteScale: number = 5;
  @State() vFlip: boolean = false;
  @State() hFlip: boolean = false;
  @State() currentDirection: string = 'down';
  @State() currentAnimation: string = 'walk-down';

  private exampleAnimations = {
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
        'right': { frames: [4,5,6,7], duration: 100 },
        'up': { frames: [8,9,10,11], duration: 100 },
        'left': { frames: [12,13,14,15], duration: 100 },
      },
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAtdJREFUeJztWkuWozAMlOYNnKUP0ds+zmwm5yCbzGmbhWbRiGeMkOUP9oO4Nt2ElMpSjI0lAbw50P9gACCNMAuckqitvzE2ANA3qfowIqqDyHGghf56YREPDSLHgVb6v6UvIcoBJsW41YFvIhgRSfsVa+rvAnAkzve0QYRs5HDP0v9l+ZLlXkg8dK+VvvgIWISOQERZM6C2vhiAXOQ4UFt/fQRmABwNUzS0DaWilX7UVmLZg0vs4zX1T3kRulIA1zWAiSMiPKdJNPD38Qjt4wQA8O/51HwgUGZebf3dDAD4eVmQwM+o9hY2Iqp8/s6Rjdr6m11gBkAehL8gsdGj6bcsYquyz59/BqlO4VL6iAiDd5/56hoAsD1MpKy2ufwzbJ4xptug5wN88Z4PMOBO+YDdaTAVMefx0K9UUz8qAIhoOtKehTP0zQEoIZzjwFn65gDkHnFzHThLP+oRIKLkgZTIEZyhr+YDpPN5znlcc6CV/mYG+IPgg4NFvIQDrfVd0GuaaFj+vqaJwL51EfOJaLXBn1ttNNUfAMhHzN7NfNdOCr+G/tFUIAAxw2p99q7L//r4pK+PT3fKpC7fK3+xF81L4G7seH6kGckhO8G8JP8t0PMBvnjPBxjQ8wEC3iIfcEf0ALQeQGv0APA/vT9gwdXK27n6vT/AJ+bU53l/5SPoS7AzABxyS+n7/QF/Hg++v9MX+wPm5drPn1nr8xo/pT+AA8ol79j+AJfv64uGuJbvQhu474DGP3JAcsQF27Toa3xf37Sa1qzP916Ayuj5AF+85wMM6PkAAbfIB9yx/h+COANyavil6vi19MUA3LUXQMKmU7RUn3/LHoJYO8F8gFRyPtqGchoYWumr/QH+wSK2Ps8c/9pqo7a+i7Uu79XXLVjr81yeTu0PaKZfqj7v1uhb9AdY9NX+AIBdjT2qPn9h/sbQWqePKTWX6DEQbET3GTg2knD7/oD/ksvcybtF0+IAAAAASUVORK5CYII=',
    },
  };

  private playedAnimation: any = this.exampleAnimations[this.animatorType];

  private animator: HTMLTgSpriteAnimatorElement;
  private sprite: HTMLTgSpriteElement;

  private handleDirectionChange(direction: string) {
    this.currentDirection = direction;
    this.animator.play = direction;
  }

  async handleAnimationTypeChange(type: 'idle' | 'walk') {
    this.playedAnimation = this.exampleAnimations[type];
    this.sprite.hFrames = this.playedAnimation.hFrames;
    this.sprite.vFrames = this.playedAnimation.vFrames;
    this.sprite.src = this.playedAnimation.src;
    this.animator.animations = this.playedAnimation.keyframes;
    this.animator.play = this.currentDirection;
    await this.animator.refresh();
  }

  private async handleScaleChange(scale: number) {
    this.spriteScale = scale;
    this.sprite.scale = scale;
    await this.animator.refresh();
  }

  private async handleFlipChange(type: 'v' | 'h') {
    if (type === 'v') {
      this.vFlip = !this.vFlip;
      this.sprite.vFlip = this.vFlip;
    } else {
      this.hFlip = !this.hFlip;
      this.sprite.hFlip = this.hFlip;
    }
    await this.animator.refresh();
  }

  private handlePlaybackChange() {
    this.isPlaying = !this.isPlaying;
    this.animator.state = this.isPlaying ? 'running' : 'paused';
  }

  render() {
    const animation = this.exampleAnimations[this.animatorType];
    return (
      <Host>
        <div class="example-page">
          <nav class="sidebar">
            <h3>Components</h3>
            <ul>
              <li class={this.selectedComponent === 'sprite' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'sprite'; }}>Sprite</a>
              </li>
              <li class={this.selectedComponent === 'animator' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'animator'; }}>Sprite Animator</a>
              </li>
              <li class={this.selectedComponent === 'sprite-map' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'sprite-map'; }}>Sprite Map</a>
              </li>
              <li class={this.selectedComponent === 'camera' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'camera'; }}>Camera</a>
              </li>
              <li class={this.selectedComponent === 'collider' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'collider'; }}>Collider</a>
              </li>
              <li class={this.selectedComponent === 'touch-controller' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'touch-controller'; }}>Touch Controller</a>
              </li>
              <li class={this.selectedComponent === 'game' ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); this.selectedComponent = 'game'; }}>Game</a>
              </li>
            </ul>
          </nav>

          <main class="content">
            {this.selectedComponent === 'sprite' && (
              <div class="component-demo">
                <h2>Sprite Component</h2>
                <p>Display a single frame from a sprite sheet.</p>
                <div class="demo-container">
                  <div class="controls">
                    <label>Frame: <input type="number" min="0" max="3" value={this.currentFrame} onInput={(e) => this.currentFrame = parseInt((e.target as HTMLInputElement).value)} /></label>
                  </div>
                  <div class="demo-box">
                    <tg-sprite
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAAAd9JREFUaIHtWEFygzAMXHUKD27eAZf0teGgHhoxjpFlyUDJdLyXTABJK2HLYoGLQfmFAWDLYFFsDiMwAPxgMz5GIpNENIH1jyd4jURLAp/aQ0R6gmw49ybwYMZIxEJiQ6AUXO5ZJGo+NNsPz0Oee7XgpXvqK/AEKoGZQxVQCexFJIH1FSwAjUb5BLVtGEVoK3l6QHQbntKIIgmsa0AMRyLM06Q6+LrdNvs4AwPA9zxbOTCsCgC/zaKUAaCfB2kClr08ozaiBSAhkS9IcVoq/3MRr5FL9uYakExSp6VrJey1/3P0eeDyeWBzGrYiMg+kVQoRICLzuG2Bm8ARgbUE3AT2zAgSXEPoFTBzM5GSnTkPaPPBnnlAS+ClAjkJOTg8wY9OgO/TxMPz9z5NjEqDSW3FnplXH3Ld5WEAOEetw2n2qZ+SfakUDKgTrvfdu+0thynjlkXnsre24d7O817nfgl9HujzwGEEWtEJvA+Brg+0OoiQOF0fkP1t6QMDwGYFgK4PdH2gzwN1/N954Izv/xrUCrSSaElAJXCWFqDhpRPuDdzipzoPaJ/cpW3YImCY+kB+sET1AbHJ/7v1gVQjQIM+IJ/nl+kDqUbQpA8Am2/8kD7gsa85PF0j8Lbi07SCH6mv2MWjyFu5AAAAAElFTkSuQmCC"
                      frame={this.currentFrame}
                      hFrames={2}
                      vFrames={4}
                      width={16}
                      height={16}
                      scale={5}
                    />
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'animator' && (
              <div class="component-demo">
                <h2>Sprite Animator Component</h2>
                <p>Animate sprites with predefined animations.</p>
                <div class="demo-container">
                  <div class="controls">
                    <div class="animation-controls">
                      <h4>Animation Type</h4>
                      <button onClick={() => this.handleAnimationTypeChange('walk')}>Walk</button>
                      <button onClick={() => this.handleAnimationTypeChange('idle')}>Idle</button>
                    </div>
                    <div class="animation-controls">
                      <h4>Direction</h4>
                      {Object.keys(animation.keyframes).map((key) => (
                        <button onClick={() => this.handleDirectionChange(key)}>{key}</button>
                      ))}
                    </div>
                    <div class="animation-controls">
                      <h4>Scale</h4>
                      <button onClick={() => this.handleScaleChange(3)}>Scale 3</button>
                      <button onClick={() => this.handleScaleChange(5)}>Scale 5</button>
                      <button onClick={() => this.handleScaleChange(8)}>Scale 8</button>
                    </div>
                    <div class="animation-controls">
                      <h4>Flip</h4>
                      <button onClick={() => this.handleFlipChange('v')}>Vertical Flip</button>
                      <button onClick={() => this.handleFlipChange('h')}>Horizontal Flip</button>
                    </div>
                    <div class="animation-controls">
                      <h4>Playback</h4>
                      <button onClick={() => this.handlePlaybackChange()}>
                        {this.isPlaying ? 'Pause' : 'Play'}
                      </button>
                    </div>
                  </div>
                  <div class="demo-box">
                    <tg-sprite-animator
                      ref={ref => this.animator = ref}
                      animations={animation.keyframes}
                      play={this.currentDirection}
                      state={this.isPlaying ? 'running' : 'paused'}
                    >
                      <tg-sprite
                        ref={ref => this.sprite = ref}
                        src={animation.src}
                        width={16}
                        height={16}
                        hFrames={animation.hFrames}
                        vFrames={animation.vFrames}
                        frame={1}
                        hFlip={this.hFlip}
                        vFlip={this.vFlip}
                        scale={this.spriteScale}
                      />
                    </tg-sprite-animator>
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'sprite-map' && (
              <div class="component-demo">
                <h2>Sprite Map Component</h2>
                <p>Render a tile-based map using a sprite sheet.</p>
                <div class="demo-container">
                  <div class="demo-box">
                    <tg-sprite-map
                      src='data:image/png;base64,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'
                      hFrames={10}
                      vFrames={10}
                      width={8}
                      height={8}
                      tileWidth={16}
                      tileHeight={16}
                      scale={5}
                      tiles={[
                        { x: 0, y: 0, frames: [90, 91, 92], duration: 500 },
                        { x: 1, y: 0, frames: [42] },
                        { x: 2, y: 0, frames: [43] },
                        { x: 3, y: 0, frames: [90, 91, 92], duration: 500 },
                        { x: 4, y: 0, frames: [42] },
                        { x: 5, y: 0, frames: [43] },
                        { x: 6, y: 0, frames: [90, 91, 92], duration: 500 },
                        { x: 7, y: 0, frames: [42] },
                        { x: 0, y: 1, frames: [43] },
                        { x: 1, y: 1, frames: [90, 91, 92], duration: 500 },
                        { x: 2, y: 1, frames: [42] },
                        { x: 3, y: 1, frames: [43] },
                        { x: 4, y: 1, frames: [90, 91, 92], duration: 500 },
                        { x: 5, y: 1, frames: [42] },
                        { x: 6, y: 1, frames: [43] },
                        { x: 7, y: 1, frames: [90, 91, 92], duration: 500 },
                        { x: 0, y: 2, frames: [42] },
                        { x: 1, y: 2, frames: [43] },
                        { x: 2, y: 2, frames: [90, 91, 92], duration: 500 },
                        { x: 3, y: 2, frames: [42] },
                        { x: 4, y: 2, frames: [43] },
                        { x: 5, y: 2, frames: [90, 91, 92], duration: 500 },
                        { x: 6, y: 2, frames: [42] },
                        { x: 7, y: 2, frames: [43] },
                        { x: 0, y: 3, frames: [90, 91, 92], duration: 500 },
                        { x: 1, y: 3, frames: [42] },
                        { x: 2, y: 3, frames: [43] },
                        { x: 3, y: 3, frames: [90, 91, 92], duration: 500 },
                        { x: 4, y: 3, frames: [42] },
                        { x: 5, y: 3, frames: [43] },
                        { x: 6, y: 3, frames: [90, 91, 92], duration: 500 },
                        { x: 7, y: 3, frames: [42] },
                        { x: 0, y: 4, frames: [43] },
                        { x: 1, y: 4, frames: [90, 91, 92], duration: 500 },
                        { x: 2, y: 4, frames: [42] },
                        { x: 3, y: 4, frames: [43] },
                        { x: 4, y: 4, frames: [90, 91, 92], duration: 500 },
                        { x: 5, y: 4, frames: [42] },
                        { x: 6, y: 4, frames: [43] },
                        { x: 7, y: 4, frames: [90, 91, 92], duration: 500 },
                        { x: 0, y: 5, frames: [42] },
                        { x: 1, y: 5, frames: [43] },
                        { x: 2, y: 5, frames: [90, 91, 92], duration: 500 },
                        { x: 3, y: 5, frames: [42] },
                        { x: 4, y: 5, frames: [43] },
                        { x: 5, y: 5, frames: [90, 91, 92], duration: 500 },
                        { x: 6, y: 5, frames: [42] },
                        { x: 7, y: 5, frames: [43] },
                        { x: 0, y: 6, frames: [90, 91, 92], duration: 500 },
                        { x: 1, y: 6, frames: [42] },
                        { x: 2, y: 6, frames: [43] },
                        { x: 3, y: 6, frames: [90, 91, 92], duration: 500 },
                        { x: 4, y: 6, frames: [42] },
                        { x: 5, y: 6, frames: [43] },
                        { x: 6, y: 6, frames: [90, 91, 92], duration: 500 },
                        { x: 7, y: 6, frames: [42] },
                        { x: 0, y: 7, frames: [43] },
                        { x: 1, y: 7, frames: [90, 91, 92], duration: 500 },
                        { x: 2, y: 7, frames: [42] },
                        { x: 3, y: 7, frames: [43] },
                        { x: 4, y: 7, frames: [90, 91, 92], duration: 500 },
                        { x: 5, y: 7, frames: [42] },
                        { x: 6, y: 7, frames: [43] },
                        { x: 7, y: 7, frames: [90, 91, 92], duration: 500 }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'camera' && (
              <div class="component-demo">
                <h2>Camera Component</h2>
                <p>Follow a target element with smooth interpolation.</p>
                <div class="demo-container">
                  <div class="controls">
                    <button onClick={() => this.cameraTarget = document.querySelector('.target')}>
                      Set Target
                    </button>
                  </div>
                  <div class="demo-box">
                    <tg-camera width={400} height={400} target={this.cameraTarget}>
                      <div class="target" style={{ position: 'absolute', left: '200px', top: '200px', width: '50px', height: '50px', background: 'red' }} />
                    </tg-camera>
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'collider' && (
              <div class="component-demo">
                <h2>Collider Component</h2>
                <p>Detect collisions between elements.</p>
                <div class="demo-container">
                  <div class="demo-box">
                    <div class="collider-demo">
                      <div class="collider-box" style={{ position: 'absolute', left: '50px', top: '50px', width: '50px', height: '50px', background: 'blue' }}>
                        <tg-collider name="box1" width={50} height={50} />
                      </div>
                      <div class="collider-box" style={{ position: 'absolute', left: '150px', top: '150px', width: '50px', height: '50px', background: 'red' }}>
                        <tg-collider name="box2" width={50} height={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'touch-controller' && (
              <div class="component-demo">
                <h2>Touch Controller Component</h2>
                <p>Handle touch input with swipe detection.</p>
                <div class="demo-container">
                  <div class="demo-box">
                    <tg-touch-controller
                      onSwipeUp={() => alert('Swiped up!')}
                      onSwipeDown={() => alert('Swiped down!')}
                      onSwipeLeft={() => alert('Swiped left!')}
                      onSwipeRight={() => alert('Swiped right!')}>
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Swipe here
                      </div>
                    </tg-touch-controller>
                  </div>
                </div>
              </div>
            )}

            {this.selectedComponent === 'game' && (
              <div class="component-demo">
                <h2>Game Component</h2>
                <p>Example of a simple game using the engine components.</p>
                <div class="demo-container">
                  <div class="controls">
                    <p>Use arrow keys to move the character</p>
                  </div>
                  <div class="demo-box">
                    <example-game />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </Host>
    );
  }
} 