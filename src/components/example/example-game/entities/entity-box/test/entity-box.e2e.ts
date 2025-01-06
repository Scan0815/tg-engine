import { newE2EPage } from '@stencil/core/testing';

describe('entity-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<entity-box></entity-box>');

    const element = await page.find('entity-box');
    expect(element).toHaveClass('hydrated');
  });
});
