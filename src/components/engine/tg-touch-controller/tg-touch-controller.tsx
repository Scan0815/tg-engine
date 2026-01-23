import { Component, EventEmitter, Host, h, Event, Element, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 'tg-touch-controller',
  styleUrl: 'tg-touch-controller.scss',
  shadow: true,
})
export class TgTouchController implements ComponentInterface {
  private startX: number = 0;
  private startY: number = 0;

  /**
   * Minimum distance in pixels required to trigger a swipe gesture.
   * Lower values make the controller more sensitive to small movements.
   */
  @Prop() threshold: number = 20;

  @Element() el!: HTMLTgTouchControllerElement;

  @Event() swipeUp: EventEmitter<void>;
  @Event() swipeDown: EventEmitter<void>;
  @Event() swipeLeft: EventEmitter<void>;
  @Event() swipeRight: EventEmitter<void>;

  connectedCallback() {
    this.el?.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
    this.el?.addEventListener('touchend', this.handleTouchEnd, {
      passive: true,
    });
  }

  disconnectedCallback() {
    this.el?.removeEventListener('touchstart', this.handleTouchStart);
    this.el?.removeEventListener('touchend', this.handleTouchEnd);
  }

  private handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  };

  private handleTouchEnd = (event: TouchEvent) => {
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
  };

  render() {
    return (
      <Host
        class="touch-area">
        <slot />
      </Host>
    );
  }

}
