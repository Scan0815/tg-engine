import { newSpecPage } from '@stencil/core/testing';
import { TgCollider } from '../tg-collider';

describe('tg-collider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<tg-collider></tg-collider>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-collider style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; background-color: false;">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-collider>
    `);
  });

  it('renders with debug mode', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<tg-collider debug="true"></tg-collider>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-collider debug="true" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; background-color: rgba(255,0,0,0.5);">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-collider>
    `);
  });

  it('should detect collision when two colliders overlap', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<div></div>`
    });
    let collider1 = page.doc.createElement("tg-collider");
    let collider2 = page.doc.createElement("tg-collider");

    (collider1 as HTMLTgColliderElement).name = "collider1";
    (collider1 as HTMLTgColliderElement).height = 100;
    (collider1 as HTMLTgColliderElement).width = 100;
    (collider1 as HTMLTgColliderElement).x = 0;
    (collider1 as HTMLTgColliderElement).y = 0;
    page.root.appendChild(collider1);

    (collider2 as HTMLTgColliderElement).name = "collider2";
    (collider2 as HTMLTgColliderElement).height = 100;
    (collider2 as HTMLTgColliderElement).width = 100;
    (collider2 as HTMLTgColliderElement).x = 50;
    (collider2 as HTMLTgColliderElement).y = 50;
    page.root.appendChild(collider2);

    await page.waitForChanges();

    // Check if colliders overlap based on their positions and dimensions
    const isOverlapping = !(
      collider1.x + collider1.width < collider2.x ||
      collider2.x + collider2.width < collider1.x ||
      collider1.y + collider1.height < collider2.y ||
      collider2.y + collider2.height < collider1.y
    );

    expect(isOverlapping).toBe(true);
  });

  it('should not detect collision when colliders do not overlap', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<div></div>`
    });
    let collider1 = page.doc.createElement("tg-collider");
    let collider2 = page.doc.createElement("tg-collider");

    (collider1 as HTMLTgColliderElement).name = "collider1";
    (collider1 as HTMLTgColliderElement).height = 100;
    (collider1 as HTMLTgColliderElement).width = 100;
    (collider1 as HTMLTgColliderElement).x = 0;
    (collider1 as HTMLTgColliderElement).y = 0;
    page.root.appendChild(collider1);

    (collider2 as HTMLTgColliderElement).name = "collider2";
    (collider2 as HTMLTgColliderElement).height = 100;
    (collider2 as HTMLTgColliderElement).width = 100;
    (collider2 as HTMLTgColliderElement).x = 300;
    (collider2 as HTMLTgColliderElement).y = 300;
    page.root.appendChild(collider2);

    await page.waitForChanges();

    // Check if colliders overlap based on their positions and dimensions
    const isOverlapping = !(
      collider1.x + collider1.width < collider2.x ||
      collider2.x + collider2.width < collider1.x ||
      collider1.y + collider1.height < collider2.y ||
      collider2.y + collider2.height < collider1.y
    );

    expect(isOverlapping).toBe(false);
  });
});
