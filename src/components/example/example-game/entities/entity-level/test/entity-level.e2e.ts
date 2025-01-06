import { newE2EPage } from '@stencil/core/testing';

describe('entity-level', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<entity-level></entity-level>');

    const element = await page.find('entity-level');
    expect(element).toHaveClass('hydrated');
  });
});
