import { TgCollider } from '../components/engine/tg-collider/tg-collider';

export class ColliderManager {
  private static instance: ColliderManager;
  private colliders: any[] = [];

  private constructor() {}

  public static getInstance(): ColliderManager {
    if (!ColliderManager.instance) {
      ColliderManager.instance = new ColliderManager();
    }
    return ColliderManager.instance;
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
