import { newE2EPage } from '@stencil/core/testing';

describe('tg-engine', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-engine></tg-engine>');

    const element = await page.find('tg-engine');
    expect(element).toHaveClass('hydrated');
  });
});
