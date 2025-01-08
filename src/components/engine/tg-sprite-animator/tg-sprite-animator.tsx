import { Component, Host, h, Prop, Element, ComponentInterface, State, Watch, Method } from '@stencil/core';
import { CalculateOffset } from '../../../utils/utils';
import { IAnimation } from '../../interfaces/IAnimation';

/**
 * Component to animate a tg-sprite component using a animation object
 * It takes in the following properties:
 */
@Component({
  tag: 'tg-sprite-animator',
  styleUrl: 'tg-sprite-animator.scss',
  shadow: true,
})
export class TgSpriteAnimator implements ComponentInterface {
  /** the animations to be played*/
  @Prop() animations: { [key: string]: IAnimation } = null;
  /** the animation to play*/
  @Prop() play: string = null;
  /** the state of the animation*/
  @Prop() state: 'running' | 'paused' = 'running';
  /** the number of times the animation should be played*/
  @Prop() iterationCount: 'infinite' | number = 'infinite';
  /** the class to be added to the sprite element*/
  @State() animationClass: string;
  /** the style of the host element*/
  @State() style: string;
  @State() width: number = 0;
  @State() height: number = 0;
  /** the host element*/
  @Element() el!: HTMLElement;
  /** the sprite element*/
  private spriteElement: HTMLTgSpriteElement;
  /** the current animation*/
  private currentAnimation: string;

  /** Watch for changes in the play prop*/
  @Watch('play')
  watchHandler() {
      this.updateAnimationClass(this.play);
  }

  /** watch for changed state prop*/
  @Watch('state')
  watchStateHandler() {
      this.updateAnimationClass(this.play);
  }

  /** trigger if the sprite component hast changed props
   that used for animation like scale*/
  @Method()
  async refresh() {
    this.updateAnimationClass(this.play);
    return Promise.resolve(this.style);
  }


  private buildKeyFrame(spriteElement: HTMLTgSpriteElement, name: string, frames: number[]){
    let keyFrames = `@keyframes animation_${name} {${frames.map((frame, index) => {
      const {
        offsetX,
        offsetY,
      } = CalculateOffset(spriteElement.width, spriteElement.height, spriteElement.scale, frame, spriteElement.hFrames);
      const percent = (index / (frames.length - 1)) * 100;
      if (percent === 100 || percent === 0) {
        return `${percent}% { background-position: ${offsetX}px ${offsetY}px; }`;
      }
    }).join(' ')}};`;
    const style = spriteElement.querySelector('style#animation') || document.createElement('style');
    style.id="animation";
    style.innerHTML = keyFrames;
    if (spriteElement && !spriteElement.querySelector('style#animation')) {
      spriteElement.appendChild(style);
    }
  }


  /** Function to add animation dynamically
   Create a keyframe animation and add it to the sprite element over the slot
   return the css style for the animation*/
  private addAnimation(spriteElement: HTMLTgSpriteElement, name: string, frames: number[], duration: number, iterationCount: 'infinite' | number = 'infinite') {
    // Add the animation to the sprite element fix for safari
    this.buildKeyFrame(spriteElement, name, frames);
    this.spriteElement.style.animation = "none";
    void this.el.offsetWidth; // Force Reflow
    this.spriteElement.style.animation = `animation_${name} ${duration * frames.length}ms steps(${frames.length}, jump-none) ${iterationCount} forwards normal ${this.state} 0s`;
  }

  /** Update the class on the slotted sprite component to change the animation */
  private updateAnimationClass(animationName: string) {
    if (this.spriteElement && this.animations[animationName]) {
      this.addAnimation(this.spriteElement, animationName, this.animations[animationName].frames, this.animations[animationName]?.duration || 200, this.iterationCount);
      if (this.currentAnimation) this.spriteElement.classList.remove(this.currentAnimation);
      this.spriteElement.classList.add(animationName);
      this.currentAnimation = animationName;
    }
  }

  /** Check if the slot has changed*/
  private checkSlotChanged(ev: Event) {
    const slot = ev.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();
    if (assignedElements.length > 0) {
      this.spriteElement = assignedElements[0] as HTMLTgSpriteElement;
      this.updateAnimationClass(this.play);
    }
  }

  render() {
    return (
      <Host>
        <slot onSlotchange={ev => this.checkSlotChanged(ev)}></slot>
      </Host>
    );
  }

}
