import { Component, ComponentInterface, h, Host, Prop, State, Watch } from '@stencil/core';
import { Vector2 } from '../../../models/vector2';

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
  @Prop() idleThreshold: number = 0.1;

  @State() offsetX: number = 0;
  @State() offsetY: number = 0;

  private cameraContent: HTMLElement;
  private animationFrameId: number | null = null;
  private lastTargetPos: Vector2 = Vector2.ZERO.clone();

  @Watch('target')
  onTargetChange() {
    this.startAnimation();
  }

  private lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  private startAnimation() {
    if (this.animationFrameId === null) {
      this.updateCameraPosition();
    }
  }

  private stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private updateCameraPosition() {
    if (this.target && this.cameraContent) {
      const targetRect = this.target.getBoundingClientRect();
      const contentRect = this.cameraContent.getBoundingClientRect();

      // Calculate target position relative to camera
      let targetX = this.width / 2 - (targetRect.left + targetRect.width / 2 - contentRect.left);
      let targetY = this.height / 2 - (targetRect.top + targetRect.height / 2 - contentRect.top);

      // Calculate bounds
      const minX = Math.min(0, this.width - contentRect.width);
      const maxX = 0;
      const minY = Math.min(0, this.height - contentRect.height);
      const maxY = 0;

      // Clamp target position to bounds
      targetX = Math.max(minX, Math.min(targetX, maxX));
      targetY = Math.max(minY, Math.min(targetY, maxY));

      const targetPos = new Vector2(targetX, targetY);

      // Check if target position changed (target element moved)
      const targetMoved = this.lastTargetPos.distance(targetPos) > this.idleThreshold;
      this.lastTargetPos = targetPos;

      // Calculate new camera offset with smooth movement
      const newOffsetX = this.lerp(this.offsetX, targetX, this.followSpeed);
      const newOffsetY = this.lerp(this.offsetY, targetY, this.followSpeed);
      const newOffset = new Vector2(newOffsetX, newOffsetY);

      // Check if camera has reached target (is idle)
      const cameraAtTarget = newOffset.distance(targetPos) < this.idleThreshold;

      // Update camera offset
      this.offsetX = newOffsetX;
      this.offsetY = newOffsetY;

      // Stop animation if camera is at target and target hasn't moved
      if (cameraAtTarget && !targetMoved) {
        // Snap to exact target position to avoid sub-pixel rendering issues
        this.offsetX = targetX;
        this.offsetY = targetY;
        this.stopAnimation();
        return;
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.updateCameraPosition());
  }

  componentDidLoad() {
    this.startAnimation();
  }

  disconnectedCallback() {
    this.stopAnimation();
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
