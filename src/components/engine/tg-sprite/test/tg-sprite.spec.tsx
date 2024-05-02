import { newSpecPage } from '@stencil/core/testing';
import { TgSprite } from '../tg-sprite';
import { h } from '@stencil/core';

describe('tg-sprite', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      html: `<tg-sprite></tg-sprite>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 16px; height: 16px; transform: scale(1, 1); background-image: url(); background-repeat: no-repeat; background-size: 16px 16px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });
  it('add props', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite src="https://example.com/image.png" width={32} height={32} scale={2} hFrames={2} vFrames={4}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 64px; height: 64px; transform: scale(1, 1); background-image: url(https://example.com/image.png); background-repeat: no-repeat; background-size: 128px 256px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });
});
