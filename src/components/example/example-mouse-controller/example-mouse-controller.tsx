import { Component, h, Element, State } from '@stencil/core';

@Component({
  tag: 'example-mouse-controller',
  styleUrl: 'example-mouse-controller.scss',
})
export class ExampleMouseController {
  @Element() el!: HTMLElement;
  @State() button1Pressed: boolean = false;
  @State() button2Pressed: boolean = false;
  
  private rotationX: number = 0;
  private rotationY: number = 0;

  private handleRotation = (event: CustomEvent<{ deltaX: number; deltaY: number }>) => {
    this.rotationX += event.detail.deltaX;
    this.rotationY += event.detail.deltaY;
    
    const box = this.el.querySelector('.rotating-box') as HTMLElement;
    if (box) {
      box.style.transform = `rotateX(${this.rotationY}deg) rotateY(${this.rotationX}deg)`;
    }
  };

  private handleMouseButton1Down = () => {
    this.button1Pressed = true;
  };

  private handleMouseButton1Up = () => {
    this.button1Pressed = false;
  };

  private handleMouseButton2Down = () => {
    this.button2Pressed = true;
  };

  private handleMouseButton2Up = () => {
    this.button2Pressed = false;
  };

  render() {
    return (
      <div class="example-container">
        <h2>Mouse Controller Example</h2>
        <p>Click and drag with left or right mouse button to rotate the cube.</p>
        
        <div class="mouse-indicators">
          <div class={`mouse-button ${this.button1Pressed ? 'pressed' : ''}`}>
            Left Mouse Button
          </div>
          <div class={`mouse-button ${this.button2Pressed ? 'pressed' : ''}`}>
            Right Mouse Button
          </div>
        </div>

        <tg-mouse-controller
          onMouseRotation={this.handleRotation}
          onMouseButton1Down={this.handleMouseButton1Down}
          onMouseButton1Up={this.handleMouseButton1Up}
          onMouseButton2Down={this.handleMouseButton2Down}
          onMouseButton2Up={this.handleMouseButton2Up}
        >
          <div class="rotating-box">
            <div class="face front">Front</div>
            <div class="face back">Back</div>
            <div class="face right">Right</div>
            <div class="face left">Left</div>
            <div class="face top">Top</div>
            <div class="face bottom">Bottom</div>
          </div>
        </tg-mouse-controller>
      </div>
    );
  }
} 