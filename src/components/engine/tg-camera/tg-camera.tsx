import { Component, ComponentInterface, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'tg-camera',
  styleUrl: 'tg-camera.scss',
  shadow: true,
})
export class TgCamera implements ComponentInterface {
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
      const targetRect = this.target.getBoundingClientRect();
      const contentRect = this.cameraContent.getBoundingClientRect();

      // Zielposition relativ zur Kamera berechnen
      let targetX = this.width / 2 - (targetRect.left + targetRect.width / 2 - contentRect.left);
      let targetY = this.height / 2 - (targetRect.top + targetRect.height / 2 - contentRect.top);

      // Begrenzungen berechnen
      const minX = Math.min(0, this.width - contentRect.width); // Linke Begrenzung
      const maxX = 0; // Rechte Begrenzung
      const minY = Math.min(0, this.height - contentRect.height); // Obere Begrenzung
      const maxY = 0; // Untere Begrenzung

      // Zielposition auf Begrenzungen anpassen
      targetX = Math.max(minX, Math.min(targetX, maxX));
      targetY = Math.max(minY, Math.min(targetY, maxY));

      // Kamera-Offset setzen (smooth movement)
      this.offsetX = this.lerp(this.offsetX, targetX, this.followSpeed);
      this.offsetY = this.lerp(this.offsetY, targetY, this.followSpeed);
    }
    requestAnimationFrame(() => this.updateCameraPosition());
  }

  componentDidLoad() {
    this.updateCameraPosition();
    console.log('camera loaded');
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
