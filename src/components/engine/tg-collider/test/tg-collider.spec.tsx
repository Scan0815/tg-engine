import { newSpecPage } from '@stencil/core/testing';
import { TgCollider } from '../tg-collider';

describe('tg-collider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<tg-collider></tg-collider>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-collider style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; background-color: rgba(255,0,0,0.5);">
        <mock:shadow-root>
        </mock:shadow-root>
      </tg-collider>
    `);
  });
  it('should detect collision when two colliders do overlap', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<div></div>`
    });
    let collider1 = page.doc.createElement("tg-collider");
    let collider2 = page.doc.createElement("tg-collider");

    (collider1 as any).name = "collider1";
    (collider1 as any).height = 100;
    (collider1 as any).width = 100;
    (collider1 as any).x = 0;
    (collider1 as any).y = 0;
    page.root.appendChild(collider1);

    (collider2 as any).name = "collider2";
    (collider2 as any).height = 100;
    (collider2 as any).width = 100;
    (collider2 as any).x = 50;
    (collider2 as any).y = 50;
    page.root.appendChild(collider2);

    await page.waitForChanges();

    const collisionHandler = jest.fn();
    collider1.addEventListener('collision', collisionHandler);

    const result = await (collider1 as HTMLTgColliderElement).checkCollision((collider2 as HTMLTgColliderElement));

    const collider1Data = await (collider1 as HTMLTgColliderElement).getData();
    const collider2Data = await collider2.getData()

    console.log(collider2Data,collider1Data,result);

    expect(result).toEqual(collider2Data);
    expect(collisionHandler).toHaveBeenCalled();
  });
  it('should not detect collision when two colliders do not overlap', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<div></div>`
    });
    let collider1 = page.doc.createElement("tg-collider");
    let collider2 = page.doc.createElement("tg-collider");

    (collider1 as any).name = "collider1";
    (collider1 as any).height = 100;
    (collider1 as any).width = 100;
    (collider1 as any).x = 0;
    (collider1 as any).y = 0;
    page.root.appendChild(collider1);

    (collider2 as any).name = "collider2";
    (collider2 as any).height = 100;
    (collider2 as any).width = 100;
    (collider2 as any).x = 300;
    (collider2 as any).y = 300;
    page.root.appendChild(collider2);

    await page.waitForChanges();

    const collisionHandler = jest.fn();
    collider1.addEventListener('collision', collisionHandler);

    const result = await (collider1 as HTMLTgColliderElement).checkCollision((collider2 as HTMLTgColliderElement));

    const collider1Data = await (collider1 as HTMLTgColliderElement).getData();
    const collider2Data = await collider2.getData()

    console.log(collider2Data,collider1Data,result);

    expect(result).not.toEqual(collider2Data);
    expect(collisionHandler).not.toHaveBeenCalled();
  });
});
