# Getting Started with TG Engine

This guide will help you get started with TG Engine, from installation to creating your first sprite-based game.

## Prerequisites

Before you begin, make sure you have:

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A modern web browser that supports Web Components

## Installation

1. Create a new project directory (if you haven't already):
```bash
mkdir my-game
cd my-game
```

2. Initialize a new npm project:
```bash
npm init -y
```

3. Install TG Engine:
```bash
npm install tg-engine
```

## Basic Setup

1. Create an HTML file (e.g., `index.html`):
```html
<!DOCTYPE html>
<html>
<head>
    <title>My TG Engine Game</title>
    <script type="module" src="node_modules/tg-engine/dist/tg-engine.esm.js"></script>
</head>
<body>
    <tg-sprite-animator id="player" animations='{"idle": {"frames": [0], "duration": 100}}' play="idle">
        <tg-sprite src="path/to/your/sprite.png" width="32" height="32" hFrames="1" vFrames="1"></tg-sprite>
    </tg-sprite-animator>
</body>
</html>
```

2. Set up a development server (you can use any static file server, or the one provided by TG Engine):
```bash
npx serve
```

## Project Structure

A typical TG Engine project structure might look like this:

```
my-game/
├── index.html
├── package.json
├── node_modules/
├── assets/
│   └── sprites/
│       ├── player.png
│       └── tiles.png
└── src/
    └── game.js
```

## Basic Concepts

### Sprites
Sprites are the basic building blocks of your game. They are 2D images that can be animated and manipulated.

### Sprite Sheets
A sprite sheet is a single image containing multiple frames of animation or different sprites arranged in a grid.

### Components
TG Engine provides several web components:
- `tg-sprite`: Displays a single sprite
- `tg-sprite-animator`: Controls sprite animations
- `tg-sprite-map`: Manages tile-based maps
- `tg-collider`: Handles collision detection
- `tg-camera`: Controls the game viewport

## Next Steps

1. Read the [Components Documentation](./components/README.md) to learn about each component in detail
2. Check out the [Examples](./examples/README.md) for practical usage examples
3. Explore the [API Reference](./api/README.md) for detailed technical information

## Common Issues

### Sprite Not Displaying
- Make sure the sprite path is correct
- Check that the width and height match your sprite sheet
- Verify that hFrames and vFrames are set correctly

### Animation Not Working
- Ensure the animations object is properly formatted
- Check that the frame numbers exist in your sprite sheet
- Verify that the play property is set to a valid animation name

## Getting Help

If you encounter issues or need help:
1. Check the [GitHub Issues](https://github.com/Scan0815/tg-engine/issues)
2. Create a new issue if your problem isn't already reported
3. Join the community discussions 