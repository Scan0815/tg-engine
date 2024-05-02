import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'example-sprite',
  styleUrl: 'example-sprite.scss',
  shadow: true,
})
export class ExampleSprite {

  render() {
    return (
      <Host>
          <tg-sprite
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAAAd9JREFUaIHtWEFygzAMXHUKD27eAZf0teGgHhoxjpFlyUDJdLyXTABJK2HLYoGLQfmFAWDLYFFsDiMwAPxgMz5GIpNENIH1jyd4jURLAp/aQ0R6gmw49ybwYMZIxEJiQ6AUXO5ZJGo+NNsPz0Oee7XgpXvqK/AEKoGZQxVQCexFJIH1FSwAjUb5BLVtGEVoK3l6QHQbntKIIgmsa0AMRyLM06Q6+LrdNvs4AwPA9zxbOTCsCgC/zaKUAaCfB2kClr08ozaiBSAhkS9IcVoq/3MRr5FL9uYakExSp6VrJey1/3P0eeDyeWBzGrYiMg+kVQoRICLzuG2Bm8ARgbUE3AT2zAgSXEPoFTBzM5GSnTkPaPPBnnlAS+ClAjkJOTg8wY9OgO/TxMPz9z5NjEqDSW3FnplXH3Ld5WEAOEetw2n2qZ+SfakUDKgTrvfdu+0thynjlkXnsre24d7O817nfgl9HujzwGEEWtEJvA+Brg+0OoiQOF0fkP1t6QMDwGYFgK4PdH2gzwN1/N954Izv/xrUCrSSaElAJXCWFqDhpRPuDdzipzoPaJ/cpW3YImCY+kB+sET1AbHJ/7v1gVQjQIM+IJ/nl+kDqUbQpA8Am2/8kD7gsa85PF0j8Lbi07SCH6mv2MWjyFu5AAAAAElFTkSuQmCC"
            width={16}
            height={16}
            hFrames={2}
            vFrames={4}
            frame={5}
            hFlip={false}
            vFlip={false}
            scale={5}></tg-sprite>
      </Host>
    );
  }

}
