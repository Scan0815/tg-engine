# Camera Component

The `tg-camera` component controls the game viewport, allowing you to follow players, create scrolling effects, and manage the game's visual perspective.

## Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `target` | HTMLElement | Element to follow | - |
| `mode` | 'follow' \| 'fixed' \| 'lerp' | Camera movement mode | 'follow' |
| `offsetX` | number | X offset from target | 0 |
| `offsetY` | number | Y offset from target | 0 |
| `zoom` | number | Camera zoom level | 1 |
| `bounds` | {x: number, y: number, width: number, height: number} | Camera movement boundaries | - |
| `lerpSpeed` | number | Smoothing speed for lerp mode | 0.1 |
| `deadzone` | {x: number, y: number, width: number, height: number} | Dead zone for camera movement | - |

## Usage

### Basic Camera Following

```html
<tg-camera
    target="player"
    mode="follow"
    offsetX="0"
    offsetY="0">
</tg-camera>
```

### Smooth Camera Movement

```html
<tg-camera
    target="player"
    mode="lerp"
    lerpSpeed="0.1"
    offsetX="0"
    offsetY="0">
</tg-camera>
```

### Fixed Camera with Boundaries

```html
<tg-camera
    mode="fixed"
    bounds='{"x": 0, "y": 0, "width": 800, "height": 600}'>
</tg-camera>
```

### Camera with Dead Zone

```html
<tg-camera
    target="player"
    mode="follow"
    deadzone='{"x": 100, "y": 100, "width": 200, "height": 200}'>
</tg-camera>
```

## Events

The `tg-camera` component emits the following events:

### `cameraMove`
Emitted when the camera position changes.

```javascript
const camera = document.querySelector('tg-camera');
camera.addEventListener('cameraMove', (event) => {
    console.log('Camera position:', event.detail.x, event.detail.y);
});
```

### `cameraZoom`
Emitted when the camera zoom changes.

```javascript
const camera = document.querySelector('tg-camera');
camera.addEventListener('cameraZoom', (event) => {
    console.log('Camera zoom:', event.detail.zoom);
});
```

## Methods

### `setPosition(x: number, y: number)`
Sets the camera position directly.

```javascript
const camera = document.querySelector('tg-camera');
camera.setPosition(100, 100);
```

### `setZoom(zoom: number)`
Sets the camera zoom level.

```javascript
const camera = document.querySelector('tg-camera');
camera.setZoom(2);
```

### `setTarget(target: HTMLElement)`
Sets a new target for the camera to follow.

```javascript
const camera = document.querySelector('tg-camera');
const newTarget = document.getElementById('newTarget');
camera.setTarget(newTarget);
```

### `shake(intensity: number, duration: number)`
Applies a camera shake effect.

```javascript
const camera = document.querySelector('tg-camera');
camera.shake(5, 1000); // intensity: 5, duration: 1000ms
```

## Camera Modes

### Follow Mode
The camera directly follows the target with optional offset.

```html
<tg-camera
    target="player"
    mode="follow"
    offsetX="0"
    offsetY="-50">
</tg-camera>
```

### Lerp Mode
The camera smoothly interpolates to the target position.

```html
<tg-camera
    target="player"
    mode="lerp"
    lerpSpeed="0.1">
</tg-camera>
```

### Fixed Mode
The camera stays in a fixed position with optional boundaries.

```html
<tg-camera
    mode="fixed"
    bounds='{"x": 0, "y": 0, "width": 800, "height": 600}'>
</tg-camera>
```

## Best Practices

1. **Camera Movement**
   - Use appropriate movement modes for your game type
   - Implement smooth transitions between camera states
   - Consider using dead zones for more natural movement

2. **Performance**
   - Keep camera updates efficient
   - Use appropriate zoom levels
   - Consider implementing camera culling

3. **Boundaries**
   - Set appropriate camera boundaries
   - Handle edge cases gracefully
   - Consider different screen sizes

4. **Effects**
   - Use camera effects sparingly
   - Implement smooth transitions
   - Consider performance impact

## Common Issues

### Camera Not Following
- Check that the target element exists
- Verify the target ID is correct
- Ensure the camera mode is set appropriately

### Jittery Movement
- Adjust lerp speed for smoother movement
- Consider using a dead zone
- Check for performance issues

### Boundary Issues
- Verify boundary values are correct
- Handle edge cases properly
- Consider screen resolution

## Example Implementation

Here's a complete example of implementing a game camera:

```html
<tg-camera
    id="gameCamera"
    target="player"
    mode="lerp"
    lerpSpeed="0.1"
    offsetX="0"
    offsetY="-50"
    bounds='{"x": 0, "y": 0, "width": 800, "height": 600}'
    deadzone='{"x": 100, "y": 100, "width": 200, "height": 200}'>
</tg-camera>

<script>
    const camera = document.getElementById('gameCamera');
    const player = document.getElementById('player');
    
    // Handle camera movement
    camera.addEventListener('cameraMove', (event) => {
        console.log('Camera position:', event.detail.x, event.detail.y);
    });
    
    // Handle camera zoom
    camera.addEventListener('cameraZoom', (event) => {
        console.log('Camera zoom:', event.detail.zoom);
    });
    
    // Camera shake on player hit
    player.addEventListener('hit', () => {
        camera.shake(5, 1000);
    });
    
    // Change camera target
    function switchTarget(newTarget) {
        camera.setTarget(newTarget);
    }
    
    // Update camera zoom
    function updateZoom(zoom) {
        camera.setZoom(zoom);
    }
</script>
``` 