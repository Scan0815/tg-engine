import { newE2EPage } from '@stencil/core/testing';

describe('tg-touch-controller', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-touch-controller></tg-touch-controller>');

    const element = await page.find('tg-touch-controller');
    expect(element).toHaveClass('hydrated');
  });
});
