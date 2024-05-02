import { newE2EPage } from '@stencil/core/testing';

describe('tg-collider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-collider></tg-collider>');

    const element = await page.find('tg-collider');
    expect(element).toHaveClass('hydrated');
  });
});
