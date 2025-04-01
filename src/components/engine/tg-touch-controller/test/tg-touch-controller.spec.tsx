import { newSpecPage } from '@stencil/core/testing';
import { TgTouchController } from '../tg-touch-controller';

describe('tg-touch-controller', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgTouchController],
      html: `<tg-touch-controller></tg-touch-controller>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-touch-controller class="touch-area">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-touch-controller>
    `);
  });
});
