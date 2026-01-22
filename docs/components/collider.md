# Collider Component

The `tg-collider` component provides collision detection capabilities for your game objects. It can be used to detect collisions between different game elements and trigger appropriate responses.

## Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `type` | 'box' \| 'circle' | Type of collision shape | 'box' |
| `width` | number | Width of the collision box | - |
| `height` | number | Height of the collision box | - |
| `radius` | number | Radius of the collision circle | - |
| `offsetX` | number | X offset of the collision shape | 0 |
| `offsetY` | number | Y offset of the collision shape | 0 |
| `isTrigger` | boolean | Whether the collider is a trigger | false |
| `layer` | number | Collision layer for filtering | 0 |
| `mask` | number | Collision mask for filtering | -1 |

## Usage

### Basic Box Collider

```html
<tg-sprite src="player.png" width="32" height="32">
    <tg-collider
        type="box"
        width="32"
        height="32">
    </tg-collider>
</tg-sprite>
```

### Circle Collider

```html
<tg-sprite src="player.png" width="32" height="32">
    <tg-collider
        type="circle"
        radius="16">
    </tg-collider>
</tg-sprite>
```

### Trigger Collider

```html
<tg-sprite src="trigger.png" width="32" height="32">
    <tg-collider
        type="box"
        width="32"
        height="32"
        isTrigger="true">
    </tg-collider>
</tg-sprite>
```

### Offset Collider

```html
<tg-sprite src="player.png" width="32" height="32">
    <tg-collider
        type="box"
        width="32"
        height="32"
        offsetX="8"
        offsetY="4">
    </tg-collider>
</tg-sprite>
```

## Events

The `tg-collider` component emits the following events:

### `collisionStart`
Emitted when a collision begins.

```javascript
const collider = document.querySelector('tg-collider');
collider.addEventListener('collisionStart', (event) => {
    console.log('Collision started with:', event.detail.other);
});
```

### `collisionEnd`
Emitted when a collision ends.

```javascript
const collider = document.querySelector('tg-collider');
collider.addEventListener('collisionEnd', (event) => {
    console.log('Collision ended with:', event.detail.other);
});
```

### `triggerEnter`
Emitted when a trigger collider is entered.

```javascript
const trigger = document.querySelector('tg-collider[isTrigger="true"]');
trigger.addEventListener('triggerEnter', (event) => {
    console.log('Trigger entered by:', event.detail.other);
});
```

### `triggerExit`
Emitted when a trigger collider is exited.

```javascript
const trigger = document.querySelector('tg-collider[isTrigger="true"]');
trigger.addEventListener('triggerExit', (event) => {
    console.log('Trigger exited by:', event.detail.other);
});
```

## Methods

### `isColliding(other: HTMLElement)`
Checks if this collider is colliding with another element.

```javascript
const collider = document.querySelector('tg-collider');
const other = document.querySelector('.other-element');
const isColliding = collider.isColliding(other);
```

### `getBounds()`
Gets the current bounds of the collider.

```javascript
const collider = document.querySelector('tg-collider');
const bounds = collider.getBounds();
console.log('Collider bounds:', bounds);
```

## Collision Layers

Collision layers allow you to control which objects can collide with each other:

```html
<!-- Player collider (layer 1) -->
<tg-collider
    type="box"
    width="32"
    height="32"
    layer="1"
    mask="2,3">
</tg-collider>

<!-- Enemy collider (layer 2) -->
<tg-collider
    type="box"
    width="32"
    height="32"
    layer="2"
    mask="1,3">
</tg-collider>

<!-- Trigger collider (layer 3) -->
<tg-collider
    type="box"
    width="32"
    height="32"
    layer="3"
    mask="1,2"
    isTrigger="true">
</tg-collider>
```

## Best Practices

1. **Collision Shape Selection**
   - Use box colliders for rectangular objects
   - Use circle colliders for round objects
   - Consider using multiple colliders for complex shapes

2. **Performance**
   - Keep collision shapes simple
   - Use appropriate layer masks
   - Consider using spatial partitioning for many objects

3. **Trigger Usage**
   - Use triggers for non-physical interactions
   - Keep trigger areas as small as possible
   - Consider using different layers for triggers

4. **Collision Response**
   - Handle collision events efficiently
   - Implement appropriate physics responses
   - Consider using a physics engine for complex interactions

## Common Issues

### Collisions Not Detecting
- Check that colliders are properly sized
- Verify layer masks are set correctly
- Ensure colliders are positioned correctly

### Performance Problems
- Reduce the number of active colliders
- Use appropriate collision shapes
- Implement spatial partitioning

### Trigger Issues
- Verify isTrigger is set correctly
- Check trigger event handlers
- Ensure trigger layers are set properly

## Example Implementation

Here's a complete example of implementing collision detection:

```html
<tg-sprite id="player" src="player.png" width="32" height="32">
    <tg-collider
        id="playerCollider"
        type="box"
        width="32"
        height="32"
        layer="1"
        mask="2,3">
    </tg-collider>
</tg-sprite>

<tg-sprite id="enemy" src="enemy.png" width="32" height="32">
    <tg-collider
        id="enemyCollider"
        type="box"
        width="32"
        height="32"
        layer="2"
        mask="1">
    </tg-collider>
</tg-sprite>

<tg-sprite id="trigger" src="trigger.png" width="32" height="32">
    <tg-collider
        id="triggerCollider"
        type="box"
        width="32"
        height="32"
        layer="3"
        mask="1"
        isTrigger="true">
    </tg-collider>
</tg-sprite>

<script>
    const playerCollider = document.getElementById('playerCollider');
    const enemyCollider = document.getElementById('enemyCollider');
    const triggerCollider = document.getElementById('triggerCollider');
    
    // Handle collisions with enemies
    playerCollider.addEventListener('collisionStart', (event) => {
        if (event.detail.other === enemyCollider) {
            console.log('Player hit enemy!');
        }
    });
    
    // Handle trigger events
    triggerCollider.addEventListener('triggerEnter', (event) => {
        if (event.detail.other === playerCollider) {
            console.log('Player entered trigger area!');
        }
    });
    
    // Check for collisions programmatically
    function checkCollisions() {
        const isColliding = playerCollider.isColliding(enemyCollider);
        if (isColliding) {
            console.log('Player is colliding with enemy');
        }
    }
</script>
``` 