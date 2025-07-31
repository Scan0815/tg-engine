import { newSpecPage } from '@stencil/core/testing';
import { TgParticle } from '../tg-particle';

describe('tg-particle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgParticle],
      html: `<tg-particle></tg-particle>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-particle>
        <mock:shadow-root>
          <div class="particle-container">
            <canvas></canvas>
          </div>
        </mock:shadow-root>
      </tg-particle>
    `);
  });

  it('renders with sprite source', async () => {
    const page = await newSpecPage({
      components: [TgParticle],
      html: `<tg-particle src="test.png" width="32" height="32"></tg-particle>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-particle src="test.png" width="32" height="32">
        <mock:shadow-root>
          <div class="particle-container">
            <canvas></canvas>
          </div>
        </mock:shadow-root>
      </tg-particle>
    `);
  });

  it('has default configuration', async () => {
    const page = await newSpecPage({
      components: [TgParticle],
      html: `<tg-particle></tg-particle>`,
    });
    const component = page.rootInstance as TgParticle;
    expect(component.config.count).toBe(50);
    expect(component.config.emissionRate).toBe(10);
    expect(component.config.life).toBe(2000);
  });
});