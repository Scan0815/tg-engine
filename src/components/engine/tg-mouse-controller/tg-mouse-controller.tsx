import { Component, EventEmitter, Host, h, Event, Element, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'tg-mouse-controller',
  styleUrl: 'tg-mouse-controller.scss',
  shadow: true,
})
export class TgMouseController implements ComponentInterface {
  private isDragging: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  @Element() el!: HTMLTgMouseControllerElement;

  @Event() mouseRotation: EventEmitter<{ deltaX: number; deltaY: number }>;
  @Event() mouseButton1Down: EventEmitter<void>;
  @Event() mouseButton1Up: EventEmitter<void>;
  @Event() mouseButton2Down: EventEmitter<void>;
  @Event() mouseButton2Up: EventEmitter<void>;

  connectedCallback() {
    this.el?.addEventListener('mousedown', this.handleMouseDown);
    this.el?.addEventListener('mousemove', this.handleMouseMove);
    this.el?.addEventListener('mouseup', this.handleMouseUp);
    this.el?.addEventListener('mouseleave', this.handleMouseLeave);
  }

  disconnectedCallback() {
    this.el?.removeEventListener('mousedown', this.handleMouseDown);
    this.el?.removeEventListener('mousemove', this.handleMouseMove);
    this.el?.removeEventListener('mouseup', this.handleMouseUp);
    this.el?.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;

    if (event.button === 0) {
      this.mouseButton1Down.emit();
    } else if (event.button === 2) {
      this.mouseButton2Down.emit();
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;

    this.mouseRotation.emit({ deltaX, deltaY });

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  };

  private handleMouseUp = (event: MouseEvent) => {
    this.isDragging = false;

    if (event.button === 0) {
      this.mouseButton1Up.emit();
    } else if (event.button === 2) {
      this.mouseButton2Up.emit();
    }
  };

  private handleMouseLeave = () => {
    this.isDragging = false;
    this.mouseButton1Up.emit();
    this.mouseButton2Up.emit();
  };

  render() {
    return (
      <Host class="mouse-area">
        <slot />
      </Host>
    );
  }
} 