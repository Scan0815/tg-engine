import { newSpecPage } from '@stencil/core/testing';
import { EntityWall } from '../entity-wall';

describe('entity-wall', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EntityWall],
      html: `<entity-wall></entity-wall>`,
    });
    expect(page.root).toEqualHtml(`
      <entity-wall>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </entity-wall>
    `);
  });
});
