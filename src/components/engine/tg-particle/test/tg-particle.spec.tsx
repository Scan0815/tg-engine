import { newSpecPage } from '@stencil/core/testing';
import { TgParticle } from '../tg-particle';

// Mock Image and HTMLCanvasElement for testing environment
const mockImage = {
  crossOrigin: '',
  onload: null,
  src: '',
  complete: false,
  naturalWidth: 0
};

const mockCanvasContext = {
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  drawImage: jest.fn(),
  fillRect: jest.fn(),
  globalAlpha: 1,
  fillStyle: '#ffffff'
};

global.Image = jest.fn(() => mockImage) as any;
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext) as any;

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
    expect(component.config.burst).toBe(false);
  });

  it('should start and stop correctly', async () => {
    const page = await newSpecPage({
      components: [TgParticle],
      html: `<tg-particle playing="false"></tg-particle>`,
    });
    const component = page.rootInstance as TgParticle;
    
    expect(component.playing).toBe(false);
    
    component.playing = true;
    await page.waitForChanges();
    
    expect(component.playing).toBe(true);
  });

  it('should handle different particle configurations', async () => {
    const customConfig = {
      count: 100,
      emissionRate: 20,
      life: 3000,
      lifeVariation: 1000,
      velocity: { x: 10, y: -30 },
      velocityVariation: { x: 5, y: 10 },
      acceleration: { x: 0, y: 5 },
      accelerationVariation: { x: 2, y: 2 },
      size: 2,
      sizeVariation: 0.5,
      rotation: 0,
      rotationSpeed: 1,
      rotationSpeedVariation: 0.5,
      alpha: 0.8,
      alphaDecay: 0.01,
      color: '#ff0000',
      spread: 90,
      gravity: { x: 0, y: 10 },
      burst: true
    };

    const page = await newSpecPage({
      components: [TgParticle],
      html: `<tg-particle></tg-particle>`,
    });
    const component = page.rootInstance as TgParticle;
    
    component.config = customConfig;
    await page.waitForChanges();
    
    expect(component.config.count).toBe(100);
    expect(component.config.burst).toBe(true);
    expect(component.config.color).toBe('#ff0000');
  });
});