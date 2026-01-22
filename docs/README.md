# TG Engine Documentation

Welcome to the TG Engine documentation. This documentation will help you understand and use the TG Engine, a sprite-based game engine built with StencilJS.

## Table of Contents

1. [Getting Started](./getting-started.md)
2. [Components](./components/README.md)
   - [Sprite Component](./components/sprite.md)
   - [Sprite Animator](./components/sprite-animator.md)
   - [Sprite Map](./components/sprite-map.md)
   - [Collider](./components/collider.md)
   - [Camera](./components/camera.md)
3. [API Reference](./api/README.md)
4. [Examples](./examples/README.md)
5. [Contributing](./contributing.md)

## Overview

TG Engine is a collection of web components built with StencilJS, designed for easy and efficient integration of sprite-based graphics into web-based games and animations. The engine provides components for:

- Displaying individual sprites
- Animating sprites
- Managing sprite maps
- Handling collisions
- Camera management

## Installation

To install TG Engine in your project:

```bash
npm install tg-engine
```

## Quick Start

Here's a quick example of how to use TG Engine:

```html
<!-- Import the components -->
<script type="module" src="node_modules/tg-engine/dist/tg-engine.esm.js"></script>

<!-- Use the components -->
<tg-sprite-animator animations='{"walk": {"frames": [0,1,2,3,4], "duration": 100}}' play="walk">
  <tg-sprite src="path/to/sprite.png" width="32" height="32" hFrames="5" vFrames="1"></tg-sprite>
</tg-sprite-animator>
```

## Version Information

Current Version: 1.0.8 (Alpha)

> **Note**: This package is currently in alpha and may not be suitable for production use. Please report any issues or bugs you encounter.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 