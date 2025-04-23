import { Component, Event, EventEmitter, h, Host, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'tg-key-controller',
  styleUrl: 'tg-key-controller.scss',
  shadow: true,
})
export class TgKeyController {
  /**
   * Array of keys to be monitored.
   * e.g. ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
   */
  @Prop() keys: string[] = [];

  /**
   * Event emitted when a monitored key is pressed
   */
  @Event() pressKeyDown: EventEmitter<string>;

  /**
   * Event emitted when a monitored key is released
   */
  @Event() pressKeyUp: EventEmitter<string>;

  /**
   * Monitors keydown events
   */
  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (this.keys.includes(event.code)) {
      event.preventDefault();
      this.pressKeyDown.emit(event.code);
    }
  }

  /**
   * Monitors keyup events
   */
  @Listen('keyup', { target: 'window' })
  handleKeyUp(event: KeyboardEvent) {
    if (this.keys.includes(event.code)) {
      event.preventDefault();
      this.pressKeyUp.emit(event.code);
    }
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
} 