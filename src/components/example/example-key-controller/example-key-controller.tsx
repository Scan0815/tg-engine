import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'example-key-controller',
  styleUrl: 'example-key-controller.scss',
})
export class ExampleKeyController {
  @State() pressedKeys: Set<string> = new Set();

  private watchedKeys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Space',
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD'
  ];

  private handleKeyDown = (event: CustomEvent<string>) => {
    this.pressedKeys.add(event.detail);
    // Force update
    this.pressedKeys = new Set(this.pressedKeys);
  };

  private handleKeyUp = (event: CustomEvent<string>) => {
    this.pressedKeys.delete(event.detail);
    // Force update
    this.pressedKeys = new Set(this.pressedKeys);
  };

  render() {
    return (
      <div class="example-container">
        <h2>Key Controller Example</h2>
        <p>Press any of the following keys:</p>
        <ul class="key-list">
          {this.watchedKeys.map(key => (
            <li class={this.pressedKeys.has(key) ? 'pressed' : ''}>
              {key}
            </li>
          ))}
        </ul>

        <div class="key-display">
          <p>Currently pressed keys:</p>
          <div class="pressed-keys">
            {Array.from(this.pressedKeys).join(', ') || 'None'}
          </div>
        </div>

        <tg-key-controller
          keys={this.watchedKeys}
          onPressKeyDown={this.handleKeyDown}
          onPressKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
} 