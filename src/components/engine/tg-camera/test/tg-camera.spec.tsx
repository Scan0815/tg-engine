import { newSpecPage } from '@stencil/core/testing';
import { TgCamera } from '../tg-camera';

describe('tg-camera', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      html: `<tg-camera></tg-camera>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-camera>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-camera>
    `);
  });
});
