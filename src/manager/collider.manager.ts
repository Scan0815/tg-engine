import { checkAABBCollision } from '../utils/utils';

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
  group?: string;
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
  group?: string;
}

export interface CollisionFilterOptions {
  /** Only check colliders in these groups */
  groups?: string[];
  /** Only check colliders of these types */
  types?: string[];
  /** Exclude colliders with these names */
  excludeNames?: string[];
  /** Only check component colliders (not tile colliders) */
  componentOnly?: boolean;
  /** Only check tile colliders (not component colliders) */
  tileOnly?: boolean;
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

  /**
   * Check for collisions at a position with optional filtering
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param width - Width of collision box
   * @param height - Height of collision box
   * @param options - Optional filter settings
   */
  public async checkCollisionOnPosition(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: CollisionFilterOptions
  ): Promise<ColliderResult[]> {
    const results: ColliderResult[] = [];

    // Check component colliders (unless tileOnly is set)
    if (!options?.tileOnly) {
      for (let i = 0; i < this.colliders.length; i++) {
        const collider = this.colliders[i];

        // Apply filters
        if (options?.groups && collider.group && !options.groups.includes(collider.group)) {
          continue;
        }
        if (options?.types && !options.types.includes(collider.type)) {
          continue;
        }
        if (options?.excludeNames && options.excludeNames.includes(collider.name)) {
          continue;
        }

        const collision = await collider.checkCollisionOnPosition(x, y, width, height);
        if (collision !== null) {
          results.push({
            x: collider.x,
            y: collider.y,
            width: collider.width,
            height: collider.height,
            type: collider.type,
            name: collider.name,
            group: collider.group,
            el: collider,
          });
        }
      }
    }

    // Check tile colliders (unless componentOnly is set)
    if (!options?.componentOnly) {
      for (let i = 0; i < this.tileColliders.length; i++) {
        const tc = this.tileColliders[i];

        // Apply filters
        if (options?.groups && tc.group && !options.groups.includes(tc.group)) {
          continue;
        }
        if (options?.types && !options.types.includes(tc.type)) {
          continue;
        }
        if (options?.excludeNames && options.excludeNames.includes(tc.name)) {
          continue;
        }

        if (checkAABBCollision(x, y, width, height, tc.x, tc.y, tc.width, tc.height)) {
          results.push(tc);
        }
      }
    }

    return results;
  }

  /**
   * Get all colliders in a specific group
   * @param group - The group name to filter by
   */
  public getCollidersByGroup(group: string): HTMLTgColliderElement[] {
    return this.colliders.filter(c => c.group === group);
  }

  /**
   * Get all colliders of a specific type
   * @param type - The type to filter by
   */
  public getCollidersByType(type: string): HTMLTgColliderElement[] {
    return this.colliders.filter(c => c.type === type);
  }

}
