# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **InputManager**: New singleton manager for unified input handling with key, mouse, and touch state tracking
- **Collision Groups/Layers**: Added `group` property to colliders and filter options for collision detection
- **AudioManager Events**: Event system for audio play, stop, ended, and error events with `on()`/`off()` API
- **AudioManager.isPlaying()**: Method to check if audio is currently playing
- **Camera Idle Detection**: Camera now stops RAF loop when target is reached, improving performance
- **Vector2 Utility Methods**: Added `add()`, `subtract()`, `multiply()`, `divide()`, `magnitude()`, `normalize()`, `dot()`, `distance()`, `clone()`, `equals()`, `angle()`, `toString()`, and static `from()` method
- **Vector2 Constants**: Added `ZERO` and `ONE` static constants
- **AABB Collision Utility**: Shared `checkAABBCollision()` function in utils
- **New Exports**: `checkAABBCollision`, `CalculateOffset`, `InputManager`, and various type exports
- **Tests**: Added unit tests for `tg-key-controller`, `tg-mouse-controller`, `Vector2`, and utils

### Changed
- **ColliderManager.checkCollisionOnPosition()**: Now always returns `ColliderResult[]` instead of `ColliderResult[] | undefined`
- **ColliderManager.checkCollisionOnPosition()**: Added optional filter options parameter for groups, types, and component/tile filtering
- **AudioManager.playAudio()**: Now returns a Promise for async handling
- **tg-collider**: Uses shared AABB collision utility
- **IVector2 Interface**: Extended with all new Vector2 methods

### Fixed
- **Memory Leak**: Fixed event listener memory leaks in `tg-mouse-controller` and `tg-touch-controller` by using arrow functions
- **Camera Memory Leak**: Added proper cleanup in `disconnectedCallback()` to cancel animation frame

### Removed
- Console.log statements from `tg-camera` and `tg-sprite-animator`
- Unused `calcTile()` function from utils

## [0.1.9] - 2024

### Changed
- Refactored AudioManager and ColliderManager to use globalThis for singleton pattern
- Enhanced TgSpriteMap with collider registration and rendering modes

## [0.1.8] - 2024

### Changed
- Updated property attributes

## [0.1.7] - 2024

### Added
- Initial public release with core components:
  - tg-sprite: Sprite rendering from sprite sheets
  - tg-sprite-animator: Sprite animation handling
  - tg-sprite-map: Tile-based map rendering
  - tg-camera: Camera system with target following
  - tg-collider: Collision detection system
  - tg-particle: Particle system
  - tg-key-controller: Keyboard input handling
  - tg-mouse-controller: Mouse input handling
  - tg-touch-controller: Touch input handling
- ColliderManager singleton for collision management
- AudioManager singleton for audio management
- Vector2 class for 2D vector operations
