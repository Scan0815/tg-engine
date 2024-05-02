import { newE2EPage } from '@stencil/core/testing';

describe('tg-sprite-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-sprite-map></tg-sprite-map>');

    const element = await page.find('tg-sprite-map');
    expect(element).toHaveClass('hydrated');
  });
});
