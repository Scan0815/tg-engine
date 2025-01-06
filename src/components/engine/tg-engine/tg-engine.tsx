import {ComponentInterface, Prop , Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tg-engine',
  styleUrl: 'tg-engine.scss',
  shadow: true,
})
export class TgEngine implements ComponentInterface {

  @Prop() systems: any[] = [];
  private entities: HTMLElement[] = [];

  componentDidLoad() {
    this.updateSystems();
  }

  private updateSystems() {
    this.systems.forEach(system => {
      console.log('system', system);
      system.update(this.entities);
    });
  }

  /** Check if the slot has changed*/
  private checkSlotChanged(ev: Event) {
    const slot = ev.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();
    if (assignedElements.length > 0) {
      this.entities = assignedElements as HTMLElement[];
    }
  }

  render() {
    return (
      <Host>
        <slot onSlotchange={ev => this.checkSlotChanged(ev)}></slot>
      </Host>
    );
  }

}
