import { newE2EPage } from '@stencil/core/testing';

describe('tg-particle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-particle></tg-particle>');

    const element = await page.find('tg-particle');
    expect(element).toHaveClass('hydrated');
  });

  it('contains canvas element', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-particle></tg-particle>');

    const canvas = await page.find('tg-particle >>> canvas');
    expect(canvas).not.toBeNull();
  });

  it('starts playing when playing prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-particle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="></tg-particle>');

    const component = await page.find('tg-particle');
    await component.setProperty('playing', true);
    await page.waitForChanges();

    const playingValue = await component.getProperty('playing');
    expect(playingValue).toBe(true);
  });
});