# TG Engine

[![Tests](https://github.com/Scan0815/tg-engine/actions/workflows/test.yml/badge.svg)](https://github.com/Scan0815/tg-engine/actions/workflows/test.yml)

TG Engine is a lightweight game engine built with StencilJS, designed for creating 2D sprite-based games and animations in the browser. It provides a set of web components that handle sprite rendering, animation, collision detection, camera control, and touch input.

## Installation

```bash
npm install tg-engine
```

## Components

### `tg-sprite`

Displays a single sprite from a sprite sheet.

#### Properties

- **`src`**: String - URL or base64 string of the sprite image
- **`width`**: Number - Width of a single sprite frame in pixels
- **`height`**: Number - Height of a single sprite frame in pixels
- **`scale`**: Number - Scale factor for the sprite (default: 1)
- **`frame`**: Number - Initial frame to display (default: 0)
- **`hFrames`**: Number - Number of horizontal frames in the sprite sheet
- **`vFrames`**: Number - Number of vertical frames in the sprite sheet
- **`vFlip`**: Boolean - Whether to flip the sprite vertically (default: false)
- **`hFlip`**: Boolean - Whether to flip the sprite horizontally (default: false)

#### Example

```html
<tg-sprite 
  src="path/to/sprite.png"
  width={16}
  height={16}
  hFrames={2}
  vFrames={4}
  scale={5}
  frame={0}
/>
```

### `tg-sprite-animator`

Animates a `tg-sprite` component using predefined animations.

#### Properties

- **`animations`**: Object - Dictionary of animations
  ```typescript
  {
    [animationName: string]: {
      frames: number[],
      duration: number
    }
  }
  ```
- **`play`**: String - Name of the animation to play
- **`state`**: 'running' | 'paused' - Controls animation playback
- **`iterationCount`**: 'infinite' | number - Number of times to play the animation

#### Example

```html
<tg-sprite-animator
  animations={{
    'walk': { frames: [0, 1, 2, 3], duration: 100 },
    'idle': { frames: [4, 5], duration: 400 }
  }}
  play="walk"
  state="running"
  iterationCount="infinite"
>
  <tg-sprite
    src="path/to/sprite.png"
    width={16}
    height={16}
    hFrames={2}
    vFrames={4}
    scale={5}
  />
</tg-sprite-animator>
```

### `tg-sprite-map`

Renders a tile-based map using a sprite sheet.

#### Properties

- **`src`**: String - URL or base64 string of the tile sheet
- **`width`**: Number - Width of the map in tiles
- **`height`**: Number - Height of the map in tiles
- **`tileWidth`**: Number - Width of each tile in pixels
- **`tileHeight`**: Number - Height of each tile in pixels
- **`hFrames`**: Number - Number of horizontal frames in the tile sheet
- **`vFrames`**: Number - Number of vertical frames in the tile sheet
- **`scale`**: Number - Scale factor for the tiles (default: 1)
- **`tiles`**: Array<ITile> - Array of tile objects
  ```typescript
  interface ITile {
    x: number;
    y: number;
    frames: number[];
    duration?: number;
  }
  ```

#### Example

```html
<tg-sprite-map
  src="path/to/tiles.png"
  width={8}
  height={8}
  tileWidth={16}
  tileHeight={16}
  hFrames={10}
  vFrames={10}
  scale={5}
  tiles={[
    { x: 0, y: 0, frames: [0] },
    { x: 1, y: 0, frames: [1] },
    { x: 0, y: 1, frames: [2] },
    { x: 1, y: 1, frames: [3] }
  ]}
/>
```

### `tg-camera`

Follows a target element with smooth interpolation.

#### Properties

- **`width`**: Number - Width of the camera viewport
- **`height`**: Number - Height of the camera viewport
- **`target`**: HTMLElement - Element to follow
- **`smooth`**: Number - Smoothing factor for camera movement (default: 0.1)

#### Example

```html
<tg-camera width={400} height={400} target={targetElement} smooth={0.1}>
  <div class="game-world">
    <!-- Your game content here -->
  </div>
</tg-camera>
```

### `tg-collider`

Detects collisions between elements.

#### Properties

- **`name`**: String - Unique identifier for the collider
- **`width`**: Number - Width of the collision box
- **`height`**: Number - Height of the collision box
- **`x`**: Number - X position offset (default: 0)
- **`y`**: Number - Y position offset (default: 0)

#### Example

```html
<div class="player">
  <tg-collider name="player" width={32} height={32} />
</div>
```

### `tg-touch-controller`

Handles touch input with swipe detection.

#### Events

- **`onSwipeUp`**: Function - Called when swiping up
- **`onSwipeDown`**: Function - Called when swiping down
- **`onSwipeLeft`**: Function - Called when swiping left
- **`onSwipeRight`**: Function - Called when swiping right

#### Example

```html
<tg-touch-controller
  onSwipeUp={() => handleSwipe('up')}
  onSwipeDown={() => handleSwipe('down')}
  onSwipeLeft={() => handleSwipe('left')}
  onSwipeRight={() => handleSwipe('right')}
>
  <div class="touch-area">
    <!-- Touch area content -->
  </div>
</tg-touch-controller>
```

## Usage in a Project

1. Install the package:
```bash
npm install tg-engine
```

2. Import the components in your project:
```typescript
import { defineCustomElements } from 'tg-engine/loader';

defineCustomElements();
```

3. Use the components in your HTML/JSX:
```html
<tg-sprite-map
  src="path/to/tiles.png"
  width={8}
  height={8}
  tileWidth={16}
  tileHeight={16}
  hFrames={10}
  vFrames={10}
  scale={5}
  tiles={tiles}
/>
```

## Contributing

Contributions are welcome! Please read our contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### Notes

- Adjust the example code blocks to match the actual properties and behavior of your components.
- Ensure that all examples are simple and clear to help users understand how to use each component effectively.
- If you have detailed documentation or a demo site, consider linking to these resources for more comprehensive guidance.
