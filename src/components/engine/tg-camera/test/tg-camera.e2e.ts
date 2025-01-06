import { newE2EPage } from '@stencil/core/testing';

describe('tg-camera', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-camera></tg-camera>');

    const element = await page.find('tg-camera');
    expect(element).toHaveClass('hydrated');
  });
});
