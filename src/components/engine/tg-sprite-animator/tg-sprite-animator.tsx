import { Component, ComponentInterface, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
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
  private animationFrameId: number | null = null;

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


  private animate(spriteElement: HTMLTgSpriteElement, animation: IAnimation) {
    const { frames, duration = 100, loop = true } = animation;
    // Bestehende Animation abbrechen
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    const totalFrames = frames.length;
    let currentFrame = 0;
    let lastFrameTime: number | null = null;

    const step = (timestamp: number) => {
      if (lastFrameTime === null) lastFrameTime = timestamp;
      const elapsed = timestamp - lastFrameTime;

      // Berechnung des Fortschritts
      if (elapsed >= duration) {
        currentFrame++;
        lastFrameTime = timestamp;
        // Falls das Ende der Frames erreicht ist
        if (currentFrame >= totalFrames) {
          if (loop) {
            currentFrame = 0; // Zurück zum ersten Frame
          } else {
            this.animationFrameId = null; // Stoppe die Animation
            return;
          }
        }
      }

      const {
        offsetX,
        offsetY,
      } = CalculateOffset(spriteElement.width, spriteElement.height, spriteElement.scale, animation.frames[currentFrame], spriteElement.hFrames);
      // Setze die Hintergrundposition
      spriteElement.style.backgroundPosition = `${offsetX}px ${offsetY}px`;

      // Wiederhole die Animation, falls `loop` aktiviert ist
      this.animationFrameId = requestAnimationFrame((timestamp) => step(timestamp));
    };

    requestAnimationFrame((timestamp) => step(timestamp));
  }


  /** Update the class on the slotted sprite component to change the animation */
  private updateAnimationClass(animationName: string) {
    if (this.spriteElement && this.animations[animationName]) {
      this.animate(this.spriteElement, this.animations[animationName]);
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
