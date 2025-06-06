/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export { ColliderManager } from './manager/collider.manager';
export { AudioManager } from './manager/audio.manager';
export * from './interfaces';
export { Vector2 } from './models/vector2/vector2';

// Export types
export type * from './components.d.ts';
