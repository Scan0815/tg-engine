import { newSpecPage } from '@stencil/core/testing';
import { TgSpriteMap } from '../tg-sprite-map';

describe('tg-sprite-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgSpriteMap],
      html: `<tg-sprite-map></tg-sprite-map>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-map style="width: 80px; height: 80px;">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-sprite-map>
    `);
  });
});
