import { newSpecPage } from '@stencil/core/testing';
import { TgCamera } from '../tg-camera';
import { h } from '@stencil/core';

describe('tg-camera', () => {
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

  it('renders with target', async () => {
    const target = document.createElement('div');
    const page = await newSpecPage({
      components: [TgCamera],
      template: () => (
        <tg-camera target={target} width={800} height={600}></tg-camera>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-camera class="camera" style="width: 800px; height: 600px;">
        <mock:shadow-root>
          <div class="camera-content" style="transform: translate(0px, 0px);">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </tg-camera>
    `);
  });

  it('renders with follow speed', async () => {
    const page = await newSpecPage({
      components: [TgCamera],
      html: `<tg-camera follow-speed="0.5"></tg-camera>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-camera class="camera" follow-speed="0.5">
        <mock:shadow-root>
          <div class="camera-content" style="transform: translate(0px, 0px);">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </tg-camera>
    `);
  });
});
