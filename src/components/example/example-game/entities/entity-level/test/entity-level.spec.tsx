import { newSpecPage } from '@stencil/core/testing';
import { EntityLevel } from '../entity-level';

describe('entity-level', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EntityLevel],
      html: `<entity-level></entity-level>`,
    });
    expect(page.root).toEqualHtml(`
      <entity-level>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </entity-level>
    `);
  });
});
