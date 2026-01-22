# Sprite Animator Component

The `tg-sprite-animator` component controls the animation of sprites by managing frame sequences and timing. It works in conjunction with the `tg-sprite` component to create animated game characters and objects.

## Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `animations` | object | Dictionary of animation definitions | - |
| `play` | string | Key of the animation to play | - |
| `state` | 'running' \| 'paused' | Controls the playback state | 'running' |
| `iterationCount` | 'infinite' \| number | How many times to play the animation | 'infinite' |

## Animation Definition

The `animations` property expects an object with the following structure:

```typescript
interface Animation {
    frames: number[];      // Array of frame numbers to play in sequence
    duration: number;      // Duration of each frame in milliseconds
}

interface Animations {
    [key: string]: Animation;  // Dictionary of named animations
}
```

Example:
```javascript
{
    "idle": {
        "frames": [0, 1, 2, 3],
        "duration": 100
    },
    "walk": {
        "frames": [4, 5, 6, 7],
        "duration": 80
    }
}
```

## Usage

### Basic Animation

```html
<tg-sprite-animator 
    animations='{"idle": {"frames": [0,1,2,3], "duration": 100}}'
    play="idle">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="8"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>
```

### Multiple Animations

```html
<tg-sprite-animator 
    animations='{
        "idle": {"frames": [0,1,2,3], "duration": 100},
        "walk": {"frames": [4,5,6,7], "duration": 80},
        "jump": {"frames": [8,9,10], "duration": 60}
    }'
    play="idle">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="11"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>
```

### Controlled Animation

```html
<tg-sprite-animator 
    id="playerAnimator"
    animations='{"walk": {"frames": [0,1,2,3], "duration": 100}}'
    play="walk"
    state="paused"
    iterationCount="3">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="4"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>

<script>
    const animator = document.getElementById('playerAnimator');
    
    // Start animation
    animator.state = 'running';
    
    // Pause animation
    animator.state = 'paused';
    
    // Change animation
    animator.play = 'walk';
</script>
```

## Events

The `tg-sprite-animator` component emits the following events:

### `animationStart`
Emitted when an animation starts playing.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.addEventListener('animationStart', (event) => {
    console.log('Animation started:', event.detail.name);
});
```

### `animationEnd`
Emitted when an animation finishes playing.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.addEventListener('animationEnd', (event) => {
    console.log('Animation ended:', event.detail.name);
});
```

### `animationChange`
Emitted when switching between animations.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.addEventListener('animationChange', (event) => {
    console.log('Animation changed:', event.detail.from, 'to', event.detail.to);
});
```

## Methods

### `playAnimation(name: string)`
Plays a specific animation by name.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.playAnimation('walk');
```

### `pauseAnimation()`
Pauses the current animation.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.pauseAnimation();
```

### `resumeAnimation()`
Resumes a paused animation.

```javascript
const animator = document.querySelector('tg-sprite-animator');
animator.resumeAnimation();
```

## Best Practices

1. **Animation Organization**
   - Use meaningful names for animations
   - Group related animations together
   - Keep frame sequences logical and ordered

2. **Performance**
   - Use appropriate frame durations
   - Minimize the number of frames in animations
   - Consider using sprite atlases

3. **State Management**
   - Handle animation state changes appropriately
   - Implement proper animation transitions
   - Consider using state machines for complex animations

## Common Issues

### Animation Not Playing
- Check that the animation name exists in the animations object
- Verify that the frame numbers are valid
- Ensure the state is set to 'running'

### Wrong Frame Sequence
- Verify that the frames array contains valid frame numbers
- Check that the sprite sheet has all required frames
- Ensure the frame duration is appropriate

### Performance Problems
- Reduce the number of animated sprites
- Optimize frame durations
- Consider using sprite atlases 