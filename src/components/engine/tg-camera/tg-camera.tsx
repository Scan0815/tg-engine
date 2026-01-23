import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'tg-camera',
  styleUrl: 'tg-camera.scss',
  shadow: true,
})
export class TgCamera implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() target: HTMLElement | null = null;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() followSpeed: number = 0.1;

  @State() offsetX: number = 0;
  @State() offsetY: number = 0;

  private cameraContent: HTMLElement;

  private lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  private updateCameraPosition() {
    if (this.target && this.cameraContent) {
      const hostRect = this.el.getBoundingClientRect();
      const targetRect = this.target.getBoundingClientRect();
      const contentRect = this.cameraContent.getBoundingClientRect();

      // Use actual host dimensions instead of props (supports percentage-based sizing)
      const viewportWidth = this.width ?? hostRect.width;
      const viewportHeight = this.height ?? hostRect.height;

      // Calculate target position relative to camera
      let targetX = viewportWidth / 2 - (targetRect.left + targetRect.width / 2 - contentRect.left);
      let targetY = viewportHeight / 2 - (targetRect.top + targetRect.height / 2 - contentRect.top);

      // Calculate bounds
      const minX = Math.min(0, viewportWidth - contentRect.width);
      const maxX = 0;
      const minY = Math.min(0, viewportHeight - contentRect.height);
      const maxY = 0;

      // Clamp target position to bounds
      targetX = Math.max(minX, Math.min(targetX, maxX));
      targetY = Math.max(minY, Math.min(targetY, maxY));

      // Update camera offset with smooth movement
      this.offsetX = this.lerp(this.offsetX, targetX, this.followSpeed);
      this.offsetY = this.lerp(this.offsetY, targetY, this.followSpeed);
    }
    requestAnimationFrame(() => this.updateCameraPosition());
  }

  componentDidLoad() {
    this.updateCameraPosition();
  }

  render() {
    const style = {
      transform: `translate(${this.offsetX}px, ${this.offsetY}px)`,
    };

    const hostStyle = {};
    if (this.width !== undefined) {
      hostStyle['width'] = `${this.width}px`;
    }
    if (this.height !== undefined) {
      hostStyle['height'] = `${this.height}px`;
    }

    return (
      <Host class="camera" style={hostStyle}>
        <div class="camera-content" ref={ref => this.cameraContent = ref} style={style}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
