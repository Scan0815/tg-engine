import { newSpecPage } from '@stencil/core/testing';
import { TgEngine } from '../tg-engine';

describe('tg-engine', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgEngine],
      html: `<tg-engine></tg-engine>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-engine>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-engine>
    `);
  });
});
