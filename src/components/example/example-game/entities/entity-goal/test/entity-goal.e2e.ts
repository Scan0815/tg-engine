import { newE2EPage } from '@stencil/core/testing';

describe('entity-goal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<entity-goal></entity-goal>');

    const element = await page.find('entity-goal');
    expect(element).toHaveClass('hydrated');
  });
});
