import { Component, EventEmitter,Host, h,Event,Element,ComponentInterface } from '@stencil/core';

@Component({
  tag: 'tg-touch-controller',
  styleUrl: 'tg-touch-controller.scss',
  shadow: true,
})
export class TgTouchController implements ComponentInterface {
  private startX: number = 0;
  private startY: number = 0;
  private threshold: number = 50; // Mindestdistanz, um eine Geste als valide zu betrachten

  @Element() el!: HTMLTgTouchControllerElement;

  @Event() swipeUp: EventEmitter<void>;
  @Event() swipeDown: EventEmitter<void>;
  @Event() swipeLeft: EventEmitter<void>;
  @Event() swipeRight: EventEmitter<void>;

  connectedCallback() {
    this.el?.addEventListener('touchstart', this.handleTouchStart.bind(this), {
      passive: true,
    });
    this.el?.addEventListener('touchend', this.handleTouchEnd.bind(this), {
      passive: true,
    });
  }

  disconnectedCallback() {
    this.el?.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.el?.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  private handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }

  private handleTouchEnd(event: TouchEvent) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this.startX;
    const deltaY = touch.clientY - this.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontaler Swipe
      if (deltaX > this.threshold) {
        this.swipeRight.emit();
      } else if (deltaX < -this.threshold) {
        this.swipeLeft.emit();
      }
    } else {
      // Vertikaler Swipe
      if (deltaY > this.threshold) {
        this.swipeDown.emit();
      } else if (deltaY < -this.threshold) {
        this.swipeUp.emit();
      }
    }
  }

  render() {
    return (
      <Host
        class="touch-area">
        <slot />
      </Host>
    );
  }

}
