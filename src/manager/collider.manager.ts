import { TgCollider } from '../components/engine/tg-collider/tg-collider';

// Use globalThis to ensure singleton works across different bundles
const COLLIDER_MANAGER_KEY = '__TG_ENGINE_COLLIDER_MANAGER__';

export class ColliderManager {
  private colliders: any[] = [];

  private constructor() {}

  public static getInstance(): ColliderManager {
    if (!(globalThis as any)[COLLIDER_MANAGER_KEY]) {
      (globalThis as any)[COLLIDER_MANAGER_KEY] = new ColliderManager();
    }
    return (globalThis as any)[COLLIDER_MANAGER_KEY];
  }

  public getColliders() {
    return this.colliders;
  }

  addCollider(collider: HTMLTgColliderElement) {
    this.colliders.push(collider);
  }

  removeCollider(collider: any) {
    this.colliders = this.colliders.filter(c => c !== collider);
  }

  public async checkCollisionOnPosition(x: number, y: number, width: number, height: number): Promise<TgCollider[]> {
    const results:TgCollider[] = [];
    for (let i = 0; i < this.colliders.length; i++) {
      const collision = await this.colliders[i].checkCollisionOnPosition(x, y, width, height)
      if(collision !== null) {
        results.push(collision);
      }
    }
    if(results.length > 0) {
      return results;
    }
    return
  }

}
