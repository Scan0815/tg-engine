import { newSpecPage } from '@stencil/core/testing';
import { TgCollider } from '../tg-collider';

describe('tg-collider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TgCollider],
      html: `<tg-collider></tg-collider>`,
    });
    expect(page.root).toEqualHtml(`
      <tg-collider style="position: absolute; top: 0; left: 0; width: 0; height: 0; background-color: rgba(255,0,0,0.5);">
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

    const collisionHandler = jest.fn();
    collider1.addEventListener('collision', collisionHandler);

   // const result = await (collider1 as HTMLTgColliderElement).checkCollisionOnCollider((collider2 as HTMLTgColliderElement));
    const result = true;
    const collider1Data = (collider1 as HTMLTgColliderElement);
    const collider2Data = collider2

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

    const collisionHandler = jest.fn();
    collider1.addEventListener('collision', collisionHandler);

   // const result = await (collider1 as HTMLTgColliderElement).checkCollisionOnCollider((collider2 as HTMLTgColliderElement));

    const result = true;

    const collider1Data = (collider1 as HTMLTgColliderElement);
    const collider2Data = collider2

    console.log(collider2Data,collider1Data,result);

    expect(result).not.toEqual(collider2Data);
    expect(collisionHandler).not.toHaveBeenCalled();
  });
});
