/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IVector2 } from "./components/interfaces/IVector2";
import { ICollider } from "./components/interfaces/ICollider";
import { IAnimation } from "./components/interfaces/IAnimation";
import { ITile } from "./components/interfaces/ITile";
export { IVector2 } from "./components/interfaces/IVector2";
export { ICollider } from "./components/interfaces/ICollider";
export { IAnimation } from "./components/interfaces/IAnimation";
export { ITile } from "./components/interfaces/ITile";
export namespace Components {
    interface EntityBox {
        "vector": IVector2;
    }
    interface EntityGoal {
        "vector": IVector2;
    }
    interface EntityLevel {
    }
    interface EntityPlayer {
        "direction": 'down' | 'right' | 'up' | 'left';
        "flipH": () => Promise<void>;
        "flipV": () => Promise<void>;
        "getCollider": () => Promise<HTMLTgColliderElement>;
        "playAnimation": (type: "idle" | "walk") => Promise<void>;
        "type": 'idle' | 'walk';
        "vector": IVector2;
    }
    interface EntityWall {
        "vector": IVector2;
    }
    interface ExampleAnimator {
    }
    interface ExampleGame {
    }
    interface ExampleSprite {
    }
    interface ExampleSpriteMap {
    }
    interface TgCamera {
        "followSpeed": number;
        "height": number;
        "target": HTMLEntityPlayerElement | null;
        "width": number;
    }
    interface TgCollider {
        "checkCollisionOnPosition": (x: number, y: number, width: number, height: number) => Promise<TgCollider>;
        "debug": boolean;
        "debugColor": string;
        "height": number;
        "name": string;
        "offsetX": number;
        "offsetY": number;
        "scale": number;
        "type": string;
        "width": number;
        "x": number;
        "y": number;
    }
    interface TgEngine {
        "systems": any[];
    }
    /**
     * a component that can be used to display a sprite sheet image in a game or animation scene
     * It takes in the following properties:
     */
    interface TgSprite {
        /**
          * the frame of the sprite image
         */
        "frame": number;
        /**
          * whether to flip the sprite image horizontally
         */
        "hFlip": boolean;
        /**
          * the number of horizontal frames
         */
        "hFrames": number;
        /**
          * the height of the sprite image
         */
        "height": number;
        /**
          * the scale of the sprite image
         */
        "scale": number;
        /**
          * the source of the sprite image
         */
        "src": string;
        /**
          * whether to flip the sprite image vertically
         */
        "vFlip": boolean;
        /**
          * the number of vertical frames
         */
        "vFrames": number;
        /**
          * the width of the sprite image
         */
        "width": number;
    }
    /**
     * Component to animate a tg-sprite component using a animation object
     * It takes in the following properties:
     */
    interface TgSpriteAnimator {
        /**
          * the animations to be played
         */
        "animations": { [key: string]: IAnimation };
        /**
          * the number of times the animation should be played
         */
        "iterationCount": 'infinite' | number;
        /**
          * the animation to play
         */
        "play": string;
        /**
          * trigger if the sprite component hast changed props that used for animation like scale
         */
        "refresh": () => Promise<string>;
        /**
          * the state of the animation
         */
        "state": 'running' | 'paused';
    }
    interface TgSpriteMap {
        "hFrames": number;
        "height": number;
        "scale": number;
        "src": string;
        "tileHeight": number;
        "tileWidth": number;
        "tiles": ITile[];
        "vFrames": number;
        "width": number;
    }
}
export interface EntityPlayerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLEntityPlayerElement;
}
export interface TgColliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTgColliderElement;
}
declare global {
    interface HTMLEntityBoxElement extends Components.EntityBox, HTMLStencilElement {
    }
    var HTMLEntityBoxElement: {
        prototype: HTMLEntityBoxElement;
        new (): HTMLEntityBoxElement;
    };
    interface HTMLEntityGoalElement extends Components.EntityGoal, HTMLStencilElement {
    }
    var HTMLEntityGoalElement: {
        prototype: HTMLEntityGoalElement;
        new (): HTMLEntityGoalElement;
    };
    interface HTMLEntityLevelElement extends Components.EntityLevel, HTMLStencilElement {
    }
    var HTMLEntityLevelElement: {
        prototype: HTMLEntityLevelElement;
        new (): HTMLEntityLevelElement;
    };
    interface HTMLEntityPlayerElementEventMap {
        "transition": boolean;
    }
    interface HTMLEntityPlayerElement extends Components.EntityPlayer, HTMLStencilElement {
        addEventListener<K extends keyof HTMLEntityPlayerElementEventMap>(type: K, listener: (this: HTMLEntityPlayerElement, ev: EntityPlayerCustomEvent<HTMLEntityPlayerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLEntityPlayerElementEventMap>(type: K, listener: (this: HTMLEntityPlayerElement, ev: EntityPlayerCustomEvent<HTMLEntityPlayerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLEntityPlayerElement: {
        prototype: HTMLEntityPlayerElement;
        new (): HTMLEntityPlayerElement;
    };
    interface HTMLEntityWallElement extends Components.EntityWall, HTMLStencilElement {
    }
    var HTMLEntityWallElement: {
        prototype: HTMLEntityWallElement;
        new (): HTMLEntityWallElement;
    };
    interface HTMLExampleAnimatorElement extends Components.ExampleAnimator, HTMLStencilElement {
    }
    var HTMLExampleAnimatorElement: {
        prototype: HTMLExampleAnimatorElement;
        new (): HTMLExampleAnimatorElement;
    };
    interface HTMLExampleGameElement extends Components.ExampleGame, HTMLStencilElement {
    }
    var HTMLExampleGameElement: {
        prototype: HTMLExampleGameElement;
        new (): HTMLExampleGameElement;
    };
    interface HTMLExampleSpriteElement extends Components.ExampleSprite, HTMLStencilElement {
    }
    var HTMLExampleSpriteElement: {
        prototype: HTMLExampleSpriteElement;
        new (): HTMLExampleSpriteElement;
    };
    interface HTMLExampleSpriteMapElement extends Components.ExampleSpriteMap, HTMLStencilElement {
    }
    var HTMLExampleSpriteMapElement: {
        prototype: HTMLExampleSpriteMapElement;
        new (): HTMLExampleSpriteMapElement;
    };
    interface HTMLTgCameraElement extends Components.TgCamera, HTMLStencilElement {
    }
    var HTMLTgCameraElement: {
        prototype: HTMLTgCameraElement;
        new (): HTMLTgCameraElement;
    };
    interface HTMLTgColliderElementEventMap {
        "collision": ICollider;
    }
    interface HTMLTgColliderElement extends Components.TgCollider, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTgColliderElementEventMap>(type: K, listener: (this: HTMLTgColliderElement, ev: TgColliderCustomEvent<HTMLTgColliderElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTgColliderElementEventMap>(type: K, listener: (this: HTMLTgColliderElement, ev: TgColliderCustomEvent<HTMLTgColliderElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTgColliderElement: {
        prototype: HTMLTgColliderElement;
        new (): HTMLTgColliderElement;
    };
    interface HTMLTgEngineElement extends Components.TgEngine, HTMLStencilElement {
    }
    var HTMLTgEngineElement: {
        prototype: HTMLTgEngineElement;
        new (): HTMLTgEngineElement;
    };
    /**
     * a component that can be used to display a sprite sheet image in a game or animation scene
     * It takes in the following properties:
     */
    interface HTMLTgSpriteElement extends Components.TgSprite, HTMLStencilElement {
    }
    var HTMLTgSpriteElement: {
        prototype: HTMLTgSpriteElement;
        new (): HTMLTgSpriteElement;
    };
    /**
     * Component to animate a tg-sprite component using a animation object
     * It takes in the following properties:
     */
    interface HTMLTgSpriteAnimatorElement extends Components.TgSpriteAnimator, HTMLStencilElement {
    }
    var HTMLTgSpriteAnimatorElement: {
        prototype: HTMLTgSpriteAnimatorElement;
        new (): HTMLTgSpriteAnimatorElement;
    };
    interface HTMLTgSpriteMapElement extends Components.TgSpriteMap, HTMLStencilElement {
    }
    var HTMLTgSpriteMapElement: {
        prototype: HTMLTgSpriteMapElement;
        new (): HTMLTgSpriteMapElement;
    };
    interface HTMLElementTagNameMap {
        "entity-box": HTMLEntityBoxElement;
        "entity-goal": HTMLEntityGoalElement;
        "entity-level": HTMLEntityLevelElement;
        "entity-player": HTMLEntityPlayerElement;
        "entity-wall": HTMLEntityWallElement;
        "example-animator": HTMLExampleAnimatorElement;
        "example-game": HTMLExampleGameElement;
        "example-sprite": HTMLExampleSpriteElement;
        "example-sprite-map": HTMLExampleSpriteMapElement;
        "tg-camera": HTMLTgCameraElement;
        "tg-collider": HTMLTgColliderElement;
        "tg-engine": HTMLTgEngineElement;
        "tg-sprite": HTMLTgSpriteElement;
        "tg-sprite-animator": HTMLTgSpriteAnimatorElement;
        "tg-sprite-map": HTMLTgSpriteMapElement;
    }
}
declare namespace LocalJSX {
    interface EntityBox {
        "vector"?: IVector2;
    }
    interface EntityGoal {
        "vector"?: IVector2;
    }
    interface EntityLevel {
    }
    interface EntityPlayer {
        "direction"?: 'down' | 'right' | 'up' | 'left';
        "onTransition"?: (event: EntityPlayerCustomEvent<boolean>) => void;
        "type"?: 'idle' | 'walk';
        "vector"?: IVector2;
    }
    interface EntityWall {
        "vector"?: IVector2;
    }
    interface ExampleAnimator {
    }
    interface ExampleGame {
    }
    interface ExampleSprite {
    }
    interface ExampleSpriteMap {
    }
    interface TgCamera {
        "followSpeed"?: number;
        "height"?: number;
        "target"?: HTMLEntityPlayerElement | null;
        "width"?: number;
    }
    interface TgCollider {
        "debug"?: boolean;
        "debugColor"?: string;
        "height"?: number;
        "name"?: string;
        "offsetX"?: number;
        "offsetY"?: number;
        "onCollision"?: (event: TgColliderCustomEvent<ICollider>) => void;
        "scale"?: number;
        "type"?: string;
        "width"?: number;
        "x"?: number;
        "y"?: number;
    }
    interface TgEngine {
        "systems"?: any[];
    }
    /**
     * a component that can be used to display a sprite sheet image in a game or animation scene
     * It takes in the following properties:
     */
    interface TgSprite {
        /**
          * the frame of the sprite image
         */
        "frame"?: number;
        /**
          * whether to flip the sprite image horizontally
         */
        "hFlip"?: boolean;
        /**
          * the number of horizontal frames
         */
        "hFrames"?: number;
        /**
          * the height of the sprite image
         */
        "height"?: number;
        /**
          * the scale of the sprite image
         */
        "scale"?: number;
        /**
          * the source of the sprite image
         */
        "src"?: string;
        /**
          * whether to flip the sprite image vertically
         */
        "vFlip"?: boolean;
        /**
          * the number of vertical frames
         */
        "vFrames"?: number;
        /**
          * the width of the sprite image
         */
        "width"?: number;
    }
    /**
     * Component to animate a tg-sprite component using a animation object
     * It takes in the following properties:
     */
    interface TgSpriteAnimator {
        /**
          * the animations to be played
         */
        "animations"?: { [key: string]: IAnimation };
        /**
          * the number of times the animation should be played
         */
        "iterationCount"?: 'infinite' | number;
        /**
          * the animation to play
         */
        "play"?: string;
        /**
          * the state of the animation
         */
        "state"?: 'running' | 'paused';
    }
    interface TgSpriteMap {
        "hFrames"?: number;
        "height"?: number;
        "scale"?: number;
        "src"?: string;
        "tileHeight"?: number;
        "tileWidth"?: number;
        "tiles"?: ITile[];
        "vFrames"?: number;
        "width"?: number;
    }
    interface IntrinsicElements {
        "entity-box": EntityBox;
        "entity-goal": EntityGoal;
        "entity-level": EntityLevel;
        "entity-player": EntityPlayer;
        "entity-wall": EntityWall;
        "example-animator": ExampleAnimator;
        "example-game": ExampleGame;
        "example-sprite": ExampleSprite;
        "example-sprite-map": ExampleSpriteMap;
        "tg-camera": TgCamera;
        "tg-collider": TgCollider;
        "tg-engine": TgEngine;
        "tg-sprite": TgSprite;
        "tg-sprite-animator": TgSpriteAnimator;
        "tg-sprite-map": TgSpriteMap;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "entity-box": LocalJSX.EntityBox & JSXBase.HTMLAttributes<HTMLEntityBoxElement>;
            "entity-goal": LocalJSX.EntityGoal & JSXBase.HTMLAttributes<HTMLEntityGoalElement>;
            "entity-level": LocalJSX.EntityLevel & JSXBase.HTMLAttributes<HTMLEntityLevelElement>;
            "entity-player": LocalJSX.EntityPlayer & JSXBase.HTMLAttributes<HTMLEntityPlayerElement>;
            "entity-wall": LocalJSX.EntityWall & JSXBase.HTMLAttributes<HTMLEntityWallElement>;
            "example-animator": LocalJSX.ExampleAnimator & JSXBase.HTMLAttributes<HTMLExampleAnimatorElement>;
            "example-game": LocalJSX.ExampleGame & JSXBase.HTMLAttributes<HTMLExampleGameElement>;
            "example-sprite": LocalJSX.ExampleSprite & JSXBase.HTMLAttributes<HTMLExampleSpriteElement>;
            "example-sprite-map": LocalJSX.ExampleSpriteMap & JSXBase.HTMLAttributes<HTMLExampleSpriteMapElement>;
            "tg-camera": LocalJSX.TgCamera & JSXBase.HTMLAttributes<HTMLTgCameraElement>;
            "tg-collider": LocalJSX.TgCollider & JSXBase.HTMLAttributes<HTMLTgColliderElement>;
            "tg-engine": LocalJSX.TgEngine & JSXBase.HTMLAttributes<HTMLTgEngineElement>;
            /**
             * a component that can be used to display a sprite sheet image in a game or animation scene
             * It takes in the following properties:
             */
            "tg-sprite": LocalJSX.TgSprite & JSXBase.HTMLAttributes<HTMLTgSpriteElement>;
            /**
             * Component to animate a tg-sprite component using a animation object
             * It takes in the following properties:
             */
            "tg-sprite-animator": LocalJSX.TgSpriteAnimator & JSXBase.HTMLAttributes<HTMLTgSpriteAnimatorElement>;
            "tg-sprite-map": LocalJSX.TgSpriteMap & JSXBase.HTMLAttributes<HTMLTgSpriteMapElement>;
        }
    }
}
