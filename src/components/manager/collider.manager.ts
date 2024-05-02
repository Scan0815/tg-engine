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

  addCollider(collider: any) {
    this.colliders.push(collider);
  }

  removeCollider(collider: any) {
    this.colliders = this.colliders.filter(c => c !== collider);
  }

  public updateColliderPositions() {
    this.colliders.forEach(collider => collider.updatePosition());
  }

  public checkAllCollisions() {
    for (let i = 0; i < this.colliders.length; i++) {
      for (let j = i + 1; j < this.colliders.length; j++) {
        if (this.colliders[i].checkCollision(this.colliders[j])) {
          console.log('Collision detected between', this.colliders[i], 'and', this.colliders[j]);
        }
      }
    }
  }
}
