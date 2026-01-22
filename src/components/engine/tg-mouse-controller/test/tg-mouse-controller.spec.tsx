import { newSpecPage } from '@stencil/core/testing';
import { TgMouseController } from '../tg-mouse-controller';

describe('tg-mouse-controller', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-mouse-controller class="mouse-area">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tg-mouse-controller>
    `);
  });

  it('initializes with isDragging false', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const component = page.rootInstance as TgMouseController;
    expect(component['isDragging']).toBe(false);
  });

  it('emits mouseButton1Down on left click', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('mouseButton1Down', spy);

    const event = new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(event);

    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('emits mouseButton2Down on right click', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('mouseButton2Down', spy);

    const event = new MouseEvent('mousedown', { button: 2, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(event);

    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('emits mouseRotation on mouse move while dragging', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('mouseRotation', spy);

    // Start dragging
    const mouseDownEvent = new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    // Move mouse
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 120 });
    page.root.dispatchEvent(mouseMoveEvent);
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ deltaX: 50, deltaY: 20 });
  });

  it('does not emit mouseRotation when not dragging', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('mouseRotation', spy);

    // Move mouse without clicking first
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 120 });
    page.root.dispatchEvent(mouseMoveEvent);
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('emits mouseButton1Up on mouse up', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('mouseButton1Up', spy);

    // Start dragging first
    const mouseDownEvent = new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(mouseDownEvent);

    // Release
    const mouseUpEvent = new MouseEvent('mouseup', { button: 0, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(mouseUpEvent);
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('stops dragging on mouse leave', async () => {
    const page = await newSpecPage({
      components: [TgMouseController],
      html: `<tg-mouse-controller></tg-mouse-controller>`,
    });

    const component = page.rootInstance as TgMouseController;

    // Start dragging
    const mouseDownEvent = new MouseEvent('mousedown', { button: 0, clientX: 100, clientY: 100 });
    page.root.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();
    expect(component['isDragging']).toBe(true);

    // Mouse leave
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    page.root.dispatchEvent(mouseLeaveEvent);
    await page.waitForChanges();

    expect(component['isDragging']).toBe(false);
  });
});
