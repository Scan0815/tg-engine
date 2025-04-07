/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */


export {ColliderManager} from './components/manager/collider.manager';
export {Vector2} from './components/interfaces/IVector2';
export {IVector2} from './components/interfaces/IVector2';
export {IAnimation} from './components/interfaces/IAnimation';
export {ITile} from './components/interfaces/ITile';
export {ICollider} from './components/interfaces/ICollider';
export {ISize} from './components/interfaces/ISize';

export type * from './components.d.ts';
