import { newE2EPage } from '@stencil/core/testing';

describe('tg-sprite', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-sprite></tg-sprite>');

    const element = await page.find('tg-sprite');
    expect(element).toHaveClass('hydrated');
  });
});
