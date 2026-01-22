# API Reference

This section provides detailed technical documentation for the TG Engine API.

## Core Components

### Sprite Component
- [Properties](./sprite.md#properties)
- [Methods](./sprite.md#methods)
- [Events](./sprite.md#events)

### Sprite Animator Component
- [Properties](./sprite-animator.md#properties)
- [Methods](./sprite-animator.md#methods)
- [Events](./sprite-animator.md#events)

### Sprite Map Component
- [Properties](./sprite-map.md#properties)
- [Methods](./sprite-map.md#methods)
- [Events](./sprite-map.md#events)

### Collider Component
- [Properties](./collider.md#properties)
- [Methods](./collider.md#methods)
- [Events](./collider.md#events)

### Camera Component
- [Properties](./camera.md#properties)
- [Methods](./camera.md#methods)
- [Events](./camera.md#events)

## Type Definitions

### Animation Interface
```typescript
interface Animation {
    frames: number[];      // Array of frame numbers to play in sequence
    duration: number;      // Duration of each frame in milliseconds
}

interface Animations {
    [key: string]: Animation;  // Dictionary of named animations
}
```

### Tile Interface
```typescript
interface ITile {
    x: number;          // X position in the map grid
    y: number;          // Y position in the map grid
    frame: number;      // Frame number from the sprite sheet
    frames?: number[];  // Optional array of frames for animated tiles
    duration?: number;  // Optional duration for animated tiles
}
```

### Camera Bounds Interface
```typescript
interface CameraBounds {
    x: number;      // X position of the boundary
    y: number;      // Y position of the boundary
    width: number;  // Width of the boundary
    height: number; // Height of the boundary
}
```

## Event Types

### Collision Events
```typescript
interface CollisionEvent {
    detail: {
        other: HTMLElement;  // The other element involved in the collision
        x: number;          // X position of the collision
        y: number;          // Y position of the collision
    }
}
```

### Camera Events
```typescript
interface CameraEvent {
    detail: {
        x: number;    // X position of the camera
        y: number;    // Y position of the camera
        zoom?: number; // Optional zoom level
    }
}
```

### Animation Events
```typescript
interface AnimationEvent {
    detail: {
        name: string;  // Name of the animation
        frame: number; // Current frame number
    }
}
```

## Constants

### Camera Modes
```typescript
type CameraMode = 'follow' | 'fixed' | 'lerp';
```

### Collider Types
```typescript
type ColliderType = 'box' | 'circle';
```

## Utility Functions

### Sprite Utilities
```typescript
function calculateFramePosition(
    frame: number,
    width: number,
    height: number,
    hFrames: number
): { x: number, y: number }
```

### Collision Utilities
```typescript
function checkCollision(
    a: HTMLElement,
    b: HTMLElement,
    type: ColliderType
): boolean
```

### Camera Utilities
```typescript
function lerp(
    start: number,
    end: number,
    t: number
): number
```

## Error Handling

The engine uses standard error handling patterns:

```typescript
class TGEngineError extends Error {
    constructor(message: string, code: string) {
        super(message);
        this.name = 'TGEngineError';
        this.code = code;
    }
}
```

Common error codes:
- `INVALID_FRAME`: Frame number is out of bounds
- `INVALID_ANIMATION`: Animation name does not exist
- `INVALID_COLLIDER`: Invalid collider configuration
- `INVALID_CAMERA`: Invalid camera configuration

## Performance Considerations

### Memory Management
- Sprite sheets are cached automatically
- Unused animations are cleaned up
- Collision detection is optimized

### Rendering
- Uses requestAnimationFrame for smooth animation
- Implements basic culling for off-screen elements
- Supports hardware acceleration when available

### Event Handling
- Events are debounced where appropriate
- Event listeners are automatically cleaned up
- Custom event pooling is implemented

## Browser Support

The engine supports all modern browsers that implement:
- Web Components
- Custom Elements
- Shadow DOM
- CSS Grid
- CSS Transform

Minimum browser versions:
- Chrome: 67+
- Firefox: 63+
- Safari: 10.1+
- Edge: 79+

## Version History

### 1.0.8 (Current)
- Added camera shake effect
- Improved collision detection
- Added dead zone support for camera

### 1.0.7
- Added lerp mode for camera
- Improved animation performance
- Added boundary support for camera

### 1.0.6
- Added trigger colliders
- Improved sprite map performance
- Added animation events

## Contributing

For information about contributing to the engine, see the [Contributing Guide](../contributing.md). 