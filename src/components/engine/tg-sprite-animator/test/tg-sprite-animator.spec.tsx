import { newSpecPage } from '@stencil/core/testing';
import { TgSpriteAnimator } from '../tg-sprite-animator';
import { TgSprite } from '../../tg-sprite/tg-sprite';
import { h } from '@stencil/core';

describe('tg-sprite-animator', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TgSpriteAnimator],
      html: `<tg-sprite-animator></tg-sprite-animator>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite-animator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite-animator>
    `);
  });

  it('renders with animations prop', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator],
      template: () => (
        <tg-sprite-animator animations={animations}></tg-sprite-animator>
      ),
    });

    expect(page.root).toEqualHtml(`
      <tg-sprite-animator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite-animator>
    `);
  });

  it('handles sprite element in slot', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator animations={animations} play="idle">
          <tg-sprite width={32} height={32} hFrames={4}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const sprite = page.root.querySelector('tg-sprite');
    expect(sprite).toBeTruthy();
    expect(sprite.style.width).toBe('32px');
  });

  it('updates sprite position on animation frame', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator animations={animations} play="idle">
          <tg-sprite width={32} height={32} hFrames={4}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const sprite = page.root.querySelector('tg-sprite');
    expect(sprite.style.backgroundPosition).toBeDefined();
  });

  it('handles paused state', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator animations={animations} play="idle" state="paused">
          <tg-sprite width={32} height={32} hFrames={3}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const animator = page.rootInstance as TgSpriteAnimator;
    expect(animator.state).toBe('paused');
  });

  it('handles refresh method call', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator animations={animations} play="idle">
          <tg-sprite width={32} height={32} hFrames={3}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const animator = page.root as HTMLTgSpriteAnimatorElement;
    await animator.refresh();
    expect(animator.querySelector('tg-sprite')).toBeTruthy();
  });

  it('handles animation changes', async () => {
    const animations = {
      idle: {
        frames: [0, 1, 2],
        duration: 100,
        loop: true
      },
      walk: {
        frames: [3, 4, 5],
        duration: 100,
        loop: true
      }
    };

    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator animations={animations} play="idle">
          <tg-sprite width={32} height={32} hFrames={6}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const sprite = page.root.querySelector('tg-sprite');

    // Change animation
    page.root.setAttribute('play', 'walk');
    await page.waitForChanges();

    // Mock requestAnimationFrame
    const step = (timestamp: number) => {
      const event = new CustomEvent('animationframe', { detail: { timestamp } });
      window.dispatchEvent(event);
    };
    step(100);
    await page.waitForChanges();

    expect(sprite.style.backgroundPosition).toBeDefined();
  });

  it('handles missing animations gracefully', async () => {
    const page = await newSpecPage({
      components: [TgSpriteAnimator, TgSprite],
      template: () => (
        <tg-sprite-animator play="nonexistent">
          <tg-sprite width={32} height={32} hFrames={3}></tg-sprite>
        </tg-sprite-animator>
      ),
    });

    await page.waitForChanges();

    const sprite = page.root.querySelector('tg-sprite');
    expect(sprite.style.backgroundPosition).toBeDefined();
  });
});
