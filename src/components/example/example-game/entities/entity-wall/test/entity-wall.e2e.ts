import { newE2EPage } from '@stencil/core/testing';

describe('entity-wall', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<entity-wall></entity-wall>');

    const element = await page.find('entity-wall');
    expect(element).toHaveClass('hydrated');
  });
});
