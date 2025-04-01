import { newSpecPage } from '@stencil/core/testing';
import { TgSpriteAnimator } from '../tg-sprite-animator';

describe('tg-sprite-animator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgSpriteAnimator],
      html: `<tg-sprite-animator></tg-sprite-animator>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-animator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite-animator>
    `);
  });
});
