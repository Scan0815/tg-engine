import { newSpecPage } from '@stencil/core/testing';
import { TgSpriteMap } from '../tg-sprite-map';
import { TgSprite } from '../../tg-sprite/tg-sprite';
import { TgSpriteAnimator } from '../../tg-sprite-animator/tg-sprite-animator';
import { h } from '@stencil/core';

describe('tg-sprite-map', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TgSpriteMap],
      html: `<tg-sprite-map></tg-sprite-map>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-map style="width: 80px; height: 80px;">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-sprite-map>
    `);
  });

  it('renders with custom dimensions', async () => {
    const page = await newSpecPage({
      components: [TgSpriteMap],
      template: () => (
        <tg-sprite-map width={10} height={10} tileWidth={32} tileHeight={32}></tg-sprite-map>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-map style="width: 320px; height: 320px;">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-sprite-map>
    `);
  });

  it('renders with scale', async () => {
    const page = await newSpecPage({
      components: [TgSpriteMap],
      template: () => (
        <tg-sprite-map width={5} height={5} tileWidth={16} tileHeight={16} scale={2}></tg-sprite-map>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-map style="width: 160px; height: 160px;">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-sprite-map>
    `);
  });

  it('renders static tiles', async () => {
    const tiles = [
      { x: 0, y: 0, frames: [0] },
      { x: 1, y: 0, frames: [1] },
      { x: 0, y: 1, frames: [2] }
    ];

    const page = await newSpecPage({
      components: [TgSpriteMap, TgSprite],
      template: () => (
        <tg-sprite-map
          src="test.png"
          width={2}
          height={2}
          tileWidth={16}
          tileHeight={16}
          hFrames={4}
          vFrames={4}
          tiles={tiles}
        ></tg-sprite-map>
      ),
    });

    await page.waitForChanges();

    const sprites = page.root.shadowRoot.querySelectorAll('tg-sprite');
    expect(sprites.length).toBe(3);
    expect(sprites[0].style.position).toBe('absolute');
    expect(sprites[0].style.top).toBe('0px');
    expect(sprites[0].style.left).toBe('0px');
  });

  it('renders animated tiles', async () => {
    const tiles = [
      {
        x: 0,
        y: 0,
        frames: [0, 1, 2],
        duration: 100
      }
    ];

    const page = await newSpecPage({
      components: [TgSpriteMap, TgSprite, TgSpriteAnimator],
      template: () => (
        <tg-sprite-map
          src="test.png"
          width={1}
          height={1}
          tileWidth={16}
          tileHeight={16}
          hFrames={4}
          vFrames={4}
          tiles={tiles}
        ></tg-sprite-map>
      ),
    });

    await page.waitForChanges();

    const animators = page.root.shadowRoot.querySelectorAll('tg-sprite-animator');
    expect(animators.length).toBe(1);
    expect(animators[0].style.position).toBe('absolute');
    expect(animators[0].style.top).toBe('0px');
    expect(animators[0].style.left).toBe('0px');
  });

  it('handles empty tiles array', async () => {
    const page = await newSpecPage({
      components: [TgSpriteMap],
      template: () => (
        <tg-sprite-map tiles={[]}></tg-sprite-map>
      ),
    });

    await page.waitForChanges();

    const sprites = page.root.shadowRoot.querySelectorAll('tg-sprite');
    const animators = page.root.shadowRoot.querySelectorAll('tg-sprite-animator');
    expect(sprites.length).toBe(0);
    expect(animators.length).toBe(0);
  });

  it('handles tiles with invalid positions', async () => {
    const tiles = [
      { x: -1, y: 0, frames: [0] },
      { x: 0, y: -1, frames: [1] },
      { x: 10, y: 10, frames: [2] }
    ];

    const page = await newSpecPage({
      components: [TgSpriteMap, TgSprite],
      template: () => (
        <tg-sprite-map
          width={2}
          height={2}
          tileWidth={16}
          tileHeight={16}
          tiles={tiles}
        ></tg-sprite-map>
      ),
    });

    await page.waitForChanges();

    const sprites = page.root.shadowRoot.querySelectorAll('tg-sprite');
    expect(sprites.length).toBe(3);
    expect(sprites[0].style.left).toBe('-16px');
    expect(sprites[1].style.top).toBe('-16px');
    expect(sprites[2].style.left).toBe('160px');
    expect(sprites[2].style.top).toBe('160px');
  });

  it('handles tiles with empty frames array', async () => {
    const tiles = [
      { x: 0, y: 0, frames: [] }
    ];

    const page = await newSpecPage({
      components: [TgSpriteMap, TgSprite],
      template: () => (
        <tg-sprite-map
          width={1}
          height={1}
          tileWidth={16}
          tileHeight={16}
          tiles={tiles}
        ></tg-sprite-map>
      ),
    });

    await page.waitForChanges();

    const sprites = page.root.shadowRoot.querySelectorAll('tg-sprite');
    expect(sprites.length).toBe(1);
    expect(sprites[0].style.position).toBe('absolute');
    expect(sprites[0].style.top).toBe('0px');
    expect(sprites[0].style.left).toBe('0px');
  });
});
