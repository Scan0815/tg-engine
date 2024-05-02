# Sprite Game Package

The Sprite Game Package is a collection of web components built with StencilJS, designed for easy and efficient integration of sprite-based graphics into web-based games and animations. This package includes components for displaying individual sprites, animating them, and managing sprite maps.

ALPHA VERSION: This package is currently in alpha and may not be suitable for production use. Please report any issues or bugs you encounter.

## Components

### `tg-sprite`

A component that displays a single sprite from a sprite sheet.

#### Properties

- **`src`**: String - URL of the sprite image.
- **`width`**: Number - Width of a single sprite frame.
- **`height`**: Number - Height of a single sprite frame.
- **`scale`**: Number - Scale factor for the sprite image.
- **`frame`**: Number - Initial frame to display.
- **`hFrames`**: Number - Number of horizontal frames in the sprite sheet.
- **`vFrames`**: Number - Number of vertical frames in the sprite sheet.
- **`vFlip`**: Boolean - Whether to flip the sprite image vertically.
- **`hFlip`**: Boolean - Whether to flip the sprite image horizontally.

Here is a basic example of how to use the `tg-sprite` component in your application:

```html
<tg-sprite src="path/to/sprite.png" width="32" height="32" hFrames="10" vFrames="10"></tg-sprite>
```


### `tg-sprite-animator`

A component to animate `tg-sprite` using predefined animations.

#### Properties

- **`animations`**: Object - A dictionary of animations.
- **`play`**: String - The key of the animation to play.
- **`state`**: Enum('running', 'paused') - Controls the playback state.
- **`iterationCount`**: Enum('infinite', Number) - How many times to play the animation.

#### Example Usage

```html
<tg-sprite-animator animations='{"walk": {"frames": [0,1,2,3,4], "duration": 100}}' play="walk" iterationCount="infinite">
  <tg-sprite src="path/to/walking-sprite.png" width="32" height="32" hFrames="5" vFrames="1"></tg-sprite>
</tg-sprite-animator>
```

### `tg-sprite-map`

A component to manage and display a map of tiles, each potentially an animated sprite.

#### Properties

- **`src`**: String - URL of the sprite sheet used for tiles.
- **`vFrames`**: Number - Number of vertical frames in the tile sheet.
- **`hFrames`**: Number - Number of horizontal frames in the tile sheet.
- **`width`**: Number - Width of each tile.
- **`height`**: Number - Height of each tile.
- **`scale`**: Number - Scale factor for the tile image.
- **`tiles`**: Array of `ITile` - Array of tile objects to be rendered.

#### Example Usage

```html
<tg-sprite-map src="path/to/tilemap.png" width="32" height="32" hFrames="10" vFrames="10" tiles='[{"x": 0, "y": 0, "frames": [0, 1, 2, 3], "duration": 300}]'>
</tg-sprite-map>
```

## Installation

To install the Sprite Game Package, add it to your project using npm:

```bash
npm install tg-engine
```

## Usage

Refer to the component examples above for how to integrate the sprite components into your application.

## Contributing

Contributions are welcome! Please read our contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### Notes

- Adjust the example code blocks to match the actual properties and behavior of your components.
- Ensure that all examples are simple and clear to help users understand how to use each component effectively.
- If you have detailed documentation or a demo site, consider linking to these resources for more comprehensive guidance.
