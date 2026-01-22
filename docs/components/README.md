# TG Engine Components

This section provides detailed documentation for all components available in TG Engine.

## Core Components

### [Sprite Component](./sprite.md)
The `tg-sprite` component is the foundation for displaying individual sprites in your game. It handles the basic rendering of sprite frames from a sprite sheet.

### [Sprite Animator](./sprite-animator.md)
The `tg-sprite-animator` component controls the animation of sprites, allowing you to define and play different animation sequences.

### [Sprite Map](./sprite-map.md)
The `tg-sprite-map` component manages tile-based maps, making it easy to create game levels and environments.

## Engine Components

### [Collider](./collider.md)
The `tg-collider` component provides collision detection capabilities for your game objects.

### [Camera](./camera.md)
The `tg-camera` component controls the game viewport, allowing you to follow players or create scrolling effects.

## Component Usage Examples

### Basic Sprite Display
```html
<tg-sprite 
    src="path/to/sprite.png"
    width="32"
    height="32"
    hFrames="4"
    vFrames="1">
</tg-sprite>
```

### Animated Sprite
```html
<tg-sprite-animator 
    animations='{"walk": {"frames": [0,1,2,3], "duration": 100}}'
    play="walk">
    <tg-sprite 
        src="path/to/sprite.png"
        width="32"
        height="32"
        hFrames="4"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>
```

### Tile Map
```html
<tg-sprite-map
    src="path/to/tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[{"x": 0, "y": 0, "frame": 0}]'>
</tg-sprite-map>
```

## Component Relationships

Components can be nested to create more complex game elements:

```
<tg-sprite-map>
    <tg-sprite-animator>
        <tg-sprite></tg-sprite>
    </tg-sprite-animator>
</tg-sprite-map>
```

## Best Practices

1. **Sprite Sheets**
   - Organize your sprite sheets with consistent frame sizes
   - Use clear naming conventions for your sprite assets
   - Optimize sprite sheets to minimize memory usage

2. **Animations**
   - Define animations with appropriate frame durations
   - Use meaningful names for animation states
   - Consider performance when creating complex animations

3. **Maps**
   - Break large maps into smaller chunks for better performance
   - Use appropriate tile sizes for your game's scale
   - Consider using different layers for different map elements

4. **Collision Detection**
   - Use appropriate collision box sizes
   - Implement collision response in your game logic
   - Consider using different collision layers

5. **Camera Management**
   - Implement smooth camera movement
   - Consider camera boundaries
   - Handle different screen sizes appropriately

## Component Events

All components emit events that you can listen to:

```javascript
const sprite = document.querySelector('tg-sprite');
sprite.addEventListener('frameChange', (event) => {
    console.log('Frame changed:', event.detail);
});
```

For detailed event documentation, see the individual component pages. 