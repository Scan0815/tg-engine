import { newSpecPage } from '@stencil/core/testing';
import { TgCamera } from '../tg-camera';
import { h } from '@stencil/core';

describe('tg-camera', () => {
  let mockRAF: jest.SpyInstance;
  
  beforeEach(() => {
    mockRAF = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      setTimeout(cb, 0);
      return 0;
    });
  });

  afterEach(() => {
    mockRAF.mockRestore();
  });

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      html: `<tg-camera></tg-camera>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-camera class="camera">
        <mock:shadow-root>
          <div class="camera-content" style="transform: translate(0px, 0px);">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </tg-camera>
    `);
  });

  it('renders with dimensions', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      html: `<tg-camera width="800" height="600"></tg-camera>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-camera class="camera" height="600" style="width: 800px; height: 600px;" width="800">
        <mock:shadow-root>
          <div class="camera-content" style="transform: translate(0px, 0px);">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </tg-camera>
    `);
  });

  it('follows target position', async () => {
    // Create a target element
    const target = document.createElement('div');
    target.id = 'target';
    target.style.width = '100px';
    target.style.height = '100px';
    target.style.position = 'absolute';
    target.style.left = '1000px';
    target.style.top = '800px';

    // Mock getBoundingClientRect for target
    const targetRect = { left: 1000, top: 800, width: 100, height: 100, right: 1100, bottom: 900 };
    target.getBoundingClientRect = () => targetRect as DOMRect;

    const page = await newSpecPage({
      components: [TgCamera],
      template: () => (
        <tg-camera width={800} height={600} target={target} followSpeed={1}></tg-camera>
      ),
    });

    const cameraInstance = page.rootInstance as TgCamera;
    await page.waitForChanges();

    // Mock getBoundingClientRect for camera content
    const contentRect = { left: 0, top: 0, width: 2000, height: 1500, right: 2000, bottom: 1500 };
    const cameraContent = page.root.shadowRoot.querySelector('.camera-content') as HTMLElement;
    cameraContent.getBoundingClientRect = () => contentRect as DOMRect;

    // Trigger a few animation frames to allow camera to update
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
    }

    // Camera should have moved to follow target
    expect(cameraInstance.offsetX).toBeLessThan(0);
    expect(cameraInstance.offsetY).toBeLessThan(0);
  });

  it('lerp function interpolates correctly', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      html: `<tg-camera></tg-camera>`,
    });

    const camera = page.rootInstance as TgCamera;
    const lerp = (camera as any)['lerp']; // Access private method

    // Test lerp with different t values
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(-100, 100, 0.5)).toBe(0);
  });

  it('respects boundary constraints', async () => {
    // Create a target element
    const target = document.createElement('div');
    target.id = 'target';
    target.style.width = '100px';
    target.style.height = '100px';

    // Mock getBoundingClientRect for target
    const targetRect = { left: 2000, top: 2000, width: 100, height: 100, right: 2100, bottom: 2100 };
    target.getBoundingClientRect = () => targetRect as DOMRect;

    const page = await newSpecPage({
      components: [TgCamera],
      template: () => (
        <tg-camera width={800} height={600} target={target} followSpeed={1}></tg-camera>
      ),
    });

    const cameraInstance = page.rootInstance as TgCamera;
    await page.waitForChanges();

    // Mock getBoundingClientRect for camera content
    const contentRect = { left: 0, top: 0, width: 2000, height: 1500, right: 2000, bottom: 1500 };
    const cameraContent = page.root.shadowRoot.querySelector('.camera-content') as HTMLElement;
    cameraContent.getBoundingClientRect = () => contentRect as DOMRect;

    // Trigger a few animation frames to allow camera to update
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
    }

    // Camera should be constrained within bounds
    // With width=800 and height=600, the maximum offset should be 0
    expect(cameraInstance.offsetX).toBeLessThanOrEqual(0);
    expect(cameraInstance.offsetY).toBeLessThanOrEqual(0);
  });

  it('handles null target gracefully', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      template: () => (
        <tg-camera width={800} height={600} target={null}></tg-camera>
      ),
    });

    const cameraInstance = page.rootInstance as TgCamera;
    await page.waitForChanges();

    // Camera should maintain its current position when target is null
    expect(cameraInstance.offsetX).toBe(0);
    expect(cameraInstance.offsetY).toBe(0);
  });
});
