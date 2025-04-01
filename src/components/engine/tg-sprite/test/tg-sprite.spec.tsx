import { newSpecPage } from '@stencil/core/testing';
import { TgSprite } from '../tg-sprite';
import { h } from '@stencil/core';

describe('tg-sprite', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      html: `<tg-sprite></tg-sprite>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 16px; height: 16px; transform: scale(1, 1); background-image: url(); background-repeat: no-repeat; background-size: 16px 16px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });

  it('renders with custom dimensions and scale', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite width={32} height={32} scale={2}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 64px; height: 64px; transform: scale(1, 1); background-image: url(); background-repeat: no-repeat; background-size: 64px 64px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });

  it('renders with sprite sheet and frame', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite src="test.png" width={16} height={16} hFrames={2} vFrames={2} frame={1}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 16px; height: 16px; transform: scale(1, 1); background-image: url(test.png); background-repeat: no-repeat; background-size: 32px 32px; background-position: -16px 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });

  it('renders with horizontal flip', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite hFlip={true}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 16px; height: 16px; transform: scale(-1, 1); background-image: url(); background-repeat: no-repeat; background-size: 16px 16px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });

  it('renders with vertical flip', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite vFlip={true}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 16px; height: 16px; transform: scale(1, -1); background-image: url(); background-repeat: no-repeat; background-size: 16px 16px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });

  it('renders with slot content', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite>
          <div>Test Content</div>
        </tg-sprite>
      ),
    });
    const sprite = page.root as HTMLElement;
    expect(sprite.shadowRoot.querySelector('slot')).toBeTruthy();
    expect(sprite.innerHTML).toContain('Test Content');
  });

  it('handles zero dimensions gracefully', async () => {
    const page = await newSpecPage({
      components: [TgSprite],
      template: () => (
        <tg-sprite width={0} height={0}></tg-sprite>
      ),
    });
    expect(page.root).toEqualHtml(`
      <tg-sprite style="width: 0; height: 0; transform: scale(1, 1); background-image: url(); background-repeat: no-repeat; background-size: 0px 0px; background-position: 0 0;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-sprite>
    `);
  });
});
