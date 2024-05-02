import { newE2EPage } from '@stencil/core/testing';

describe('tg-sprite-animator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-sprite-animator></tg-sprite-animator>');

    const element = await page.find('tg-sprite-animator');
    expect(element).toHaveClass('hydrated');
  });
});
