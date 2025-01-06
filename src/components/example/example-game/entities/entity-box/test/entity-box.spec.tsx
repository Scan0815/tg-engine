import { newSpecPage } from '@stencil/core/testing';
import { EntityBox } from '../entity-box';

describe('entity-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EntityBox],
      html: `<entity-box></entity-box>`,
    });
    expect(page.root).toEqualHtml(`
      <entity-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </entity-box>
    `);
  });
});
