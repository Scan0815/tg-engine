import { newSpecPage } from '@stencil/core/testing';
import { EntityPlayer } from '../entity-player';

describe('entity-player', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EntityPlayer],
      html: `<entity-player></entity-player>`,
    });
    expect(page.root).toEqualHtml(`
      <entity-player>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </entity-player>
    `);
  });
});
