import { newSpecPage } from '@stencil/core/testing';
import { TgCollider } from '../tg-collider';

describe('tg-collider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<tg-collider></tg-collider>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-collider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-collider>
    `);
  });
});
