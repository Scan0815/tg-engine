import { Component, Host, h, Prop, ComponentInterface, Element, State } from '@stencil/core';
import { CalculateOffset } from '../../../utils/utils';

/**
 * a component that can be used to display a sprite sheet image in a game or animation scene
 * It takes in the following properties:
 */
@Component({
  tag: 'tg-sprite',
  styleUrl: 'tg-sprite.scss',
  shadow: true,
})
export class TgSprite implements ComponentInterface {
  @Element() el: HTMLElement;

  /** the source of the sprite image*/
  @Prop() src: string = '';
  /** the width of the sprite image*/
  @Prop() width: number = 16;
  /**  the height of the sprite image*/
  @Prop() height: number = 16;
  /**   the scale of the sprite image*/
  @Prop() scale: number = 1;
  /**  the frame of the sprite image*/
  @Prop() frame: number = 0;
  /**  the number of horizontal frames*/
  @Prop() hFrames: number = 1;
  /**  the number of vertical frames*/
  @Prop() vFrames: number = 1;
  /** whether to flip the sprite image vertically*/
  @Prop() vFlip: boolean = false;
  /** whether to flip the sprite image horizontally*/
  @Prop() hFlip: boolean = false;
  /** the current frame of the sprite image*/
  @State() currentFrame: number = this.frame;

  /**
   * Function to set the style of the host element
   */
  getStyle() {
    const scaleX = this.hFlip ? -1 : 1;
    const scaleY = this.vFlip ? -1 : 1;
    const { offsetX, offsetY } = CalculateOffset(this.width, this.height, this.scale, this.currentFrame, this.hFrames);
    return {
      width: `${this.width * this.scale}${this.width > 0 ? "px" : ""}`,
      height: `${this.height * this.scale}${this.height > 0 ? "px" : ""}`,
      transform: `scale(${scaleX}, ${scaleY})`,
      backgroundImage: `url(${this.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${(this.height * this.hFrames) * this.scale}px ${(this.width * this.vFrames) * this.scale}px`,
      backgroundPosition: `${offsetX}${offsetX != 0 ? "px" : ""} ${offsetY}${offsetY != 0 ? "px" : ""}`,
    };
  }

  render() {
    return (
      <Host style={this.getStyle()}>
        <slot></slot>
      </Host>
    );
  }

}
