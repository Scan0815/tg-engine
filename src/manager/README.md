# TG Engine Managers

Managers are singleton classes that handle specific functionality across the engine. They provide centralized management of game systems like collision detection and audio playback.

## Collider Manager

Handles collision detection between collider components. Maintains a list of all active colliders and provides methods to check for collisions.

### Methods
- `getInstance(): ColliderManager` - Get singleton instance
- `getColliders(): any[]` - Get all registered colliders
- `addCollider(collider: HTMLTgColliderElement): void` - Add new collider
- `removeCollider(collider: any): void` - Remove collider
- `checkCollisionOnPosition(x, y, width, height): Promise<TgCollider[]>` - Check for collisions

### Usage
```typescript
const manager = ColliderManager.getInstance();
manager.addCollider(collider);
const collisions = await manager.checkCollisionOnPosition(x, y, width, height);
```

## Audio Manager

Manages audio playback using object pooling to prevent audio clipping. Allows multiple instances of the same sound for efficient playback.

### Methods
- `getInstance(): AudioManager` - Get singleton instance
- `addAudio(key: string, src: string, poolSize: number = 5, loop: boolean = false): void` - Add audio pool
- `playAudio(key: string): void` - Play sound
- `stopAudio(key: string): void` - Stop sound
- `setVolume(key: string, volume: number): void` - Set volume (0-1)
- `removeAudio(key: string): void` - Remove audio pool

### Usage
```typescript
const manager = AudioManager.getInstance();
manager.addAudio('jump', 'path/to/jump.mp3', 5);
manager.playAudio('jump');
manager.setVolume('jump', 0.5);
```

## Best Practices

### Collider Manager
- Remove colliders when no longer needed to prevent memory leaks
- Use async/await when checking for collisions
- Consider performance implications when adding many colliders
- Handle collision results appropriately

### Audio Manager
- Preload audio pools at game startup for better performance
- Use appropriate pool sizes based on sound frequency
- Clean up unused audio pools to free memory
- Handle audio playback errors gracefully
- Use descriptive keys for audio pools 