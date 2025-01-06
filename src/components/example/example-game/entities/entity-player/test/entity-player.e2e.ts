import { newE2EPage } from '@stencil/core/testing';

describe('entity-player', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<entity-player></entity-player>');

    const element = await page.find('entity-player');
    expect(element).toHaveClass('hydrated');
  });
});
