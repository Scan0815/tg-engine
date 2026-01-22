// Use globalThis to ensure singleton works across different bundles
const COLLIDER_MANAGER_KEY = '__TG_ENGINE_COLLIDER_MANAGER__';

interface GlobalWithColliderManager {
  [COLLIDER_MANAGER_KEY]?: ColliderManager;
}

export interface TileColliderData {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  name: string;
  mapId: string;
}

export interface ColliderResult {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  name: string;
  el?: HTMLElement;
  mapId?: string;
}

export function isTileCollider(collider: ColliderResult): collider is TileColliderData & ColliderResult {
  return 'mapId' in collider && collider.mapId !== undefined;
}

export class ColliderManager {
  private colliders: HTMLTgColliderElement[] = [];
  private tileColliders: TileColliderData[] = [];

  private constructor() {}

  public static getInstance(): ColliderManager {
    const global = globalThis as GlobalWithColliderManager;
    if (!global[COLLIDER_MANAGER_KEY]) {
      global[COLLIDER_MANAGER_KEY] = new ColliderManager();
    }
    return global[COLLIDER_MANAGER_KEY];
  }

  public getColliders() {
    return this.colliders;
  }

  addCollider(collider: HTMLTgColliderElement) {
    this.colliders.push(collider);
  }

  removeCollider(collider: HTMLTgColliderElement) {
    this.colliders = this.colliders.filter(c => c !== collider);
  }

  public getTileColliders(): TileColliderData[] {
    return this.tileColliders;
  }

  public registerTileColliders(mapId: string, colliders: Omit<TileColliderData, 'mapId'>[]): void {
    const newColliders = colliders.map(c => ({ ...c, mapId }));
    this.tileColliders.push(...newColliders);
  }

  public unregisterTileColliders(mapId: string): void {
    this.tileColliders = this.tileColliders.filter(c => c.mapId !== mapId);
  }

  private checkAABBCollision(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  public async checkCollisionOnPosition(x: number, y: number, width: number, height: number): Promise<ColliderResult[] | undefined> {
    const results: ColliderResult[] = [];

    // Check component colliders
    for (let i = 0; i < this.colliders.length; i++) {
      const collider = this.colliders[i];
      const collision = await collider.checkCollisionOnPosition(x, y, width, height);
      if (collision !== null) {
        results.push({
          x: collider.x,
          y: collider.y,
          width: collider.width,
          height: collider.height,
          type: collider.type,
          name: collider.name,
          el: collider,
        });
      }
    }

    // Check tile colliders
    for (let i = 0; i < this.tileColliders.length; i++) {
      const tc = this.tileColliders[i];
      if (this.checkAABBCollision(x, y, width, height, tc.x, tc.y, tc.width, tc.height)) {
        results.push(tc);
      }
    }

    if (results.length > 0) {
      return results;
    }
    return undefined;
  }

}
