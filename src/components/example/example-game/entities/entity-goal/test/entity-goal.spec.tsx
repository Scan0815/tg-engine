import { newSpecPage } from '@stencil/core/testing';
import { EntityGoal } from '../entity-goal';

describe('entity-goal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EntityGoal],
      html: `<entity-goal></entity-goal>`,
    });
    expect(page.root).toEqualHtml(`
      <entity-goal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </entity-goal>
    `);
  });
});
