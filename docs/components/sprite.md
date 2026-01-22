# Sprite Component

The `tg-sprite` component is the core component for displaying individual sprites in your game. It handles the rendering of sprite frames from a sprite sheet.

## Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `src` | string | URL of the sprite image | - |
| `width` | number | Width of a single sprite frame | - |
| `height` | number | Height of a single sprite frame | - |
| `scale` | number | Scale factor for the sprite image | 1 |
| `frame` | number | Initial frame to display | 0 |
| `hFrames` | number | Number of horizontal frames in the sprite sheet | 1 |
| `vFrames` | number | Number of vertical frames in the sprite sheet | 1 |
| `vFlip` | boolean | Whether to flip the sprite image vertically | false |
| `hFlip` | boolean | Whether to flip the sprite image horizontally | false |

## Usage

### Basic Usage

```html
<tg-sprite 
    src="path/to/sprite.png"
    width="32"
    height="32"
    hFrames="4"
    vFrames="1">
</tg-sprite>
```

### With Animation

```html
<tg-sprite-animator animations='{"walk": {"frames": [0,1,2,3], "duration": 100}}' play="walk">
    <tg-sprite 
        src="path/to/sprite.png"
        width="32"
        height="32"
        hFrames="4"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>
```

## Events

The `tg-sprite` component emits the following events:

### `frameChange`
Emitted when the sprite frame changes.

```javascript
const sprite = document.querySelector('tg-sprite');
sprite.addEventListener('frameChange', (event) => {
    console.log('Current frame:', event.detail.frame);
});
```

## Methods

### `setFrame(frame: number)`
Sets the current frame of the sprite.

```javascript
const sprite = document.querySelector('tg-sprite');
sprite.setFrame(2);
```

## Sprite Sheet Layout

The component expects sprite sheets to be organized in a grid layout:

```
+--------+--------+--------+--------+
| Frame  | Frame  | Frame  | Frame  |
|   0    |   1    |   2    |   3    |
+--------+--------+--------+--------+
```

## Examples

### Basic Sprite Display
```html
<tg-sprite 
    src="player.png"
    width="32"
    height="32"
    hFrames="4"
    vFrames="1">
</tg-sprite>
```

### Flipped Sprite
```html
<tg-sprite 
    src="player.png"
    width="32"
    height="32"
    hFrames="4"
    vFrames="1"
    hFlip="true">
</tg-sprite>
```

### Scaled Sprite
```html
<tg-sprite 
    src="player.png"
    width="32"
    height="32"
    hFrames="4"
    vFrames="1"
    scale="2">
</tg-sprite>
```

## Best Practices

1. **Sprite Sheet Organization**
   - Keep sprite sheets organized with consistent frame sizes
   - Use clear naming conventions for your sprite assets
   - Optimize sprite sheets to minimize memory usage

2. **Performance**
   - Use appropriate frame sizes for your game's scale
   - Consider using sprite atlases for better performance
   - Minimize the number of sprite sheets in use at once

3. **Asset Management**
   - Keep sprite assets in a dedicated directory
   - Use meaningful names for sprite files
   - Consider using a build process to optimize sprite sheets

## Common Issues

### Sprite Not Displaying
- Check that the `src` path is correct
- Verify that `width` and `height` match your sprite sheet
- Ensure `hFrames` and `vFrames` are set correctly

### Wrong Frame Display
- Verify that the frame numbers are within the valid range
- Check that the sprite sheet layout matches the specified dimensions
- Ensure the frame property is being set correctly

### Performance Issues
- Consider reducing the number of sprites on screen
- Optimize sprite sheet sizes
- Use appropriate scale values 