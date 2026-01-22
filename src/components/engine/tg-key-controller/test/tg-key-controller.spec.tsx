import { newSpecPage } from '@stencil/core/testing';
import { TgKeyController } from '../tg-key-controller';

describe('tg-key-controller', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgKeyController],
      html: `<tg-key-controller></tg-key-controller>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-key-controller>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-key-controller>
    `);
  });

  it('accepts keys prop', async () => {
    const page = await newSpecPage({
      components: [TgKeyController],
      html: `<tg-key-controller></tg-key-controller>`,
    });

    const component = page.rootInstance as TgKeyController;
    component.keys = ['ArrowUp', 'ArrowDown'];

    expect(component.keys).toEqual(['ArrowUp', 'ArrowDown']);
  });

  it('emits pressKeyDown event for monitored keys', async () => {
    const page = await newSpecPage({
      components: [TgKeyController],
      html: `<tg-key-controller></tg-key-controller>`,
    });

    const component = page.rootInstance as TgKeyController;
    component.keys = ['ArrowUp', 'Space'];

    const keyDownSpy = jest.fn();
    page.root.addEventListener('pressKeyDown', keyDownSpy);

    const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
    component.handleKeyDown(event);

    expect(keyDownSpy).toHaveBeenCalled();
  });

  it('does not emit event for non-monitored keys', async () => {
    const page = await newSpecPage({
      components: [TgKeyController],
      html: `<tg-key-controller></tg-key-controller>`,
    });

    const component = page.rootInstance as TgKeyController;
    component.keys = ['ArrowUp', 'Space'];

    const keyDownSpy = jest.fn();
    page.root.addEventListener('pressKeyDown', keyDownSpy);

    const event = new KeyboardEvent('keydown', { code: 'KeyA' });
    component.handleKeyDown(event);

    expect(keyDownSpy).not.toHaveBeenCalled();
  });

  it('emits pressKeyUp event for monitored keys', async () => {
    const page = await newSpecPage({
      components: [TgKeyController],
      html: `<tg-key-controller></tg-key-controller>`,
    });

    const component = page.rootInstance as TgKeyController;
    component.keys = ['ArrowUp', 'Space'];

    const keyUpSpy = jest.fn();
    page.root.addEventListener('pressKeyUp', keyUpSpy);

    const event = new KeyboardEvent('keyup', { code: 'Space' });
    component.handleKeyUp(event);

    expect(keyUpSpy).toHaveBeenCalled();
  });
});
