# Sprite Map Component

The `tg-sprite-map` component is designed to manage and display tile-based maps in your game. It efficiently renders large maps using sprite sheets and supports animated tiles.

## Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `src` | string | URL of the sprite sheet used for tiles | - |
| `width` | number | Width of each tile | - |
| `height` | number | Height of each tile | - |
| `hFrames` | number | Number of horizontal frames in the tile sheet | 1 |
| `vFrames` | number | Number of vertical frames in the tile sheet | 1 |
| `scale` | number | Scale factor for the tile image | 1 |
| `tiles` | ITile[] | Array of tile objects to be rendered | [] |

## Tile Interface

The `tiles` property expects an array of tile objects with the following structure:

```typescript
interface ITile {
    x: number;          // X position in the map grid
    y: number;          // Y position in the map grid
    frame: number;      // Frame number from the sprite sheet
    frames?: number[];  // Optional array of frames for animated tiles
    duration?: number;  // Optional duration for animated tiles
}
```

## Usage

### Basic Tile Map

```html
<tg-sprite-map
    src="tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1},
        {"x": 2, "y": 0, "frame": 2}
    ]'>
</tg-sprite-map>
```

### Animated Tiles

```html
<tg-sprite-map
    src="tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[
        {
            "x": 0,
            "y": 0,
            "frames": [0, 1, 2, 3],
            "duration": 100
        }
    ]'>
</tg-sprite-map>
```

### Scaled Map

```html
<tg-sprite-map
    src="tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    scale="2"
    tiles='[
        {"x": 0, "y": 0, "frame": 0}
    ]'>
</tg-sprite-map>
```

## Events

The `tg-sprite-map` component emits the following events:

### `tileClick`
Emitted when a tile is clicked.

```javascript
const map = document.querySelector('tg-sprite-map');
map.addEventListener('tileClick', (event) => {
    console.log('Tile clicked:', event.detail.x, event.detail.y);
});
```

### `tileHover`
Emitted when the mouse hovers over a tile.

```javascript
const map = document.querySelector('tg-sprite-map');
map.addEventListener('tileHover', (event) => {
    console.log('Tile hovered:', event.detail.x, event.detail.y);
});
```

## Methods

### `setTile(x: number, y: number, frame: number)`
Sets a tile at the specified position.

```javascript
const map = document.querySelector('tg-sprite-map');
map.setTile(1, 2, 3);
```

### `getTile(x: number, y: number)`
Gets the tile at the specified position.

```javascript
const map = document.querySelector('tg-sprite-map');
const tile = map.getTile(1, 2);
```

### `clearTile(x: number, y: number)`
Removes a tile at the specified position.

```javascript
const map = document.querySelector('tg-sprite-map');
map.clearTile(1, 2);
```

### `setTiles(tiles: ITile[])`
Sets multiple tiles at once.

```javascript
const map = document.querySelector('tg-sprite-map');
map.setTiles([
    { x: 0, y: 0, frame: 0 },
    { x: 1, y: 0, frame: 1 }
]);
```

## Best Practices

1. **Map Organization**
   - Break large maps into smaller chunks
   - Use consistent tile sizes
   - Organize tile sheets logically

2. **Performance**
   - Use appropriate tile sizes
   - Implement tile culling for large maps
   - Consider using different layers for different map elements

3. **Asset Management**
   - Keep tile sheets organized
   - Use meaningful names for tile assets
   - Optimize tile sheets for memory usage

4. **Map Design**
   - Plan your map layout before implementation
   - Use consistent tile numbering
   - Consider using a tile editor for map creation

## Common Issues

### Tiles Not Displaying
- Check that the tile coordinates are valid
- Verify that the frame numbers exist in the sprite sheet
- Ensure the tile sheet dimensions are correct

### Performance Issues
- Reduce the number of animated tiles
- Implement tile culling
- Break large maps into smaller chunks

### Memory Usage
- Optimize tile sheet sizes
- Use appropriate tile dimensions
- Consider using tile atlases

## Example Implementation

Here's a complete example of implementing a simple game map:

```html
<tg-sprite-map
    id="gameMap"
    src="tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    scale="2"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1},
        {"x": 2, "y": 0, "frame": 2},
        {"x": 0, "y": 1, "frame": 3},
        {"x": 1, "y": 1, "frame": 4},
        {"x": 2, "y": 1, "frame": 5}
    ]'>
</tg-sprite-map>

<script>
    const map = document.getElementById('gameMap');
    
    // Handle tile clicks
    map.addEventListener('tileClick', (event) => {
        const { x, y } = event.detail;
        console.log(`Clicked tile at (${x}, ${y})`);
    });
    
    // Update a tile
    map.setTile(1, 1, 6);
    
    // Add an animated tile
    map.setTile(3, 0, {
        frames: [0, 1, 2],
        duration: 100
    });
</script>
``` 