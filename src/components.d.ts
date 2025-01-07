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
    interface ExampleAnimator {
    }
    interface ExampleEntityBox {
        "vector": IVector2;
    }
    interface ExampleEntityGoal {
        "vector": IVector2;
    }
    interface ExampleEntityLevel {
    }
    interface ExampleEntityPlayer {
        "direction": 'down' | 'right' | 'up' | 'left';
        "flipH": () => Promise<void>;
        "flipV": () => Promise<void>;
        "getCollider": () => Promise<HTMLTgColliderElement>;
        "playAnimation": (type: "idle" | "walk") => Promise<void>;
        "type": 'idle' | 'walk';
        "vector": IVector2;
    }
    interface ExampleEntityWall {
        "vector": IVector2;
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
        "target": HTMLElement | null;
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
export interface ExampleEntityPlayerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLExampleEntityPlayerElement;
}
export interface TgColliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTgColliderElement;
}
declare global {
    interface HTMLExampleAnimatorElement extends Components.ExampleAnimator, HTMLStencilElement {
    }
    var HTMLExampleAnimatorElement: {
        prototype: HTMLExampleAnimatorElement;
        new (): HTMLExampleAnimatorElement;
    };
    interface HTMLExampleEntityBoxElement extends Components.ExampleEntityBox, HTMLStencilElement {
    }
    var HTMLExampleEntityBoxElement: {
        prototype: HTMLExampleEntityBoxElement;
        new (): HTMLExampleEntityBoxElement;
    };
    interface HTMLExampleEntityGoalElement extends Components.ExampleEntityGoal, HTMLStencilElement {
    }
    var HTMLExampleEntityGoalElement: {
        prototype: HTMLExampleEntityGoalElement;
        new (): HTMLExampleEntityGoalElement;
    };
    interface HTMLExampleEntityLevelElement extends Components.ExampleEntityLevel, HTMLStencilElement {
    }
    var HTMLExampleEntityLevelElement: {
        prototype: HTMLExampleEntityLevelElement;
        new (): HTMLExampleEntityLevelElement;
    };
    interface HTMLExampleEntityPlayerElementEventMap {
        "transition": boolean;
    }
    interface HTMLExampleEntityPlayerElement extends Components.ExampleEntityPlayer, HTMLStencilElement {
        addEventListener<K extends keyof HTMLExampleEntityPlayerElementEventMap>(type: K, listener: (this: HTMLExampleEntityPlayerElement, ev: ExampleEntityPlayerCustomEvent<HTMLExampleEntityPlayerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLExampleEntityPlayerElementEventMap>(type: K, listener: (this: HTMLExampleEntityPlayerElement, ev: ExampleEntityPlayerCustomEvent<HTMLExampleEntityPlayerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLExampleEntityPlayerElement: {
        prototype: HTMLExampleEntityPlayerElement;
        new (): HTMLExampleEntityPlayerElement;
    };
    interface HTMLExampleEntityWallElement extends Components.ExampleEntityWall, HTMLStencilElement {
    }
    var HTMLExampleEntityWallElement: {
        prototype: HTMLExampleEntityWallElement;
        new (): HTMLExampleEntityWallElement;
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
        "example-animator": HTMLExampleAnimatorElement;
        "example-entity-box": HTMLExampleEntityBoxElement;
        "example-entity-goal": HTMLExampleEntityGoalElement;
        "example-entity-level": HTMLExampleEntityLevelElement;
        "example-entity-player": HTMLExampleEntityPlayerElement;
        "example-entity-wall": HTMLExampleEntityWallElement;
        "example-game": HTMLExampleGameElement;
        "example-sprite": HTMLExampleSpriteElement;
        "example-sprite-map": HTMLExampleSpriteMapElement;
        "tg-camera": HTMLTgCameraElement;
        "tg-collider": HTMLTgColliderElement;
        "tg-sprite": HTMLTgSpriteElement;
        "tg-sprite-animator": HTMLTgSpriteAnimatorElement;
        "tg-sprite-map": HTMLTgSpriteMapElement;
    }
}
declare namespace LocalJSX {
    interface ExampleAnimator {
    }
    interface ExampleEntityBox {
        "vector"?: IVector2;
    }
    interface ExampleEntityGoal {
        "vector"?: IVector2;
    }
    interface ExampleEntityLevel {
    }
    interface ExampleEntityPlayer {
        "direction"?: 'down' | 'right' | 'up' | 'left';
        "onTransition"?: (event: ExampleEntityPlayerCustomEvent<boolean>) => void;
        "type"?: 'idle' | 'walk';
        "vector"?: IVector2;
    }
    interface ExampleEntityWall {
        "vector"?: IVector2;
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
        "target"?: HTMLElement | null;
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
        "example-animator": ExampleAnimator;
        "example-entity-box": ExampleEntityBox;
        "example-entity-goal": ExampleEntityGoal;
        "example-entity-level": ExampleEntityLevel;
        "example-entity-player": ExampleEntityPlayer;
        "example-entity-wall": ExampleEntityWall;
        "example-game": ExampleGame;
        "example-sprite": ExampleSprite;
        "example-sprite-map": ExampleSpriteMap;
        "tg-camera": TgCamera;
        "tg-collider": TgCollider;
        "tg-sprite": TgSprite;
        "tg-sprite-animator": TgSpriteAnimator;
        "tg-sprite-map": TgSpriteMap;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "example-animator": LocalJSX.ExampleAnimator & JSXBase.HTMLAttributes<HTMLExampleAnimatorElement>;
            "example-entity-box": LocalJSX.ExampleEntityBox & JSXBase.HTMLAttributes<HTMLExampleEntityBoxElement>;
            "example-entity-goal": LocalJSX.ExampleEntityGoal & JSXBase.HTMLAttributes<HTMLExampleEntityGoalElement>;
            "example-entity-level": LocalJSX.ExampleEntityLevel & JSXBase.HTMLAttributes<HTMLExampleEntityLevelElement>;
            "example-entity-player": LocalJSX.ExampleEntityPlayer & JSXBase.HTMLAttributes<HTMLExampleEntityPlayerElement>;
            "example-entity-wall": LocalJSX.ExampleEntityWall & JSXBase.HTMLAttributes<HTMLExampleEntityWallElement>;
            "example-game": LocalJSX.ExampleGame & JSXBase.HTMLAttributes<HTMLExampleGameElement>;
            "example-sprite": LocalJSX.ExampleSprite & JSXBase.HTMLAttributes<HTMLExampleSpriteElement>;
            "example-sprite-map": LocalJSX.ExampleSpriteMap & JSXBase.HTMLAttributes<HTMLExampleSpriteMapElement>;
            "tg-camera": LocalJSX.TgCamera & JSXBase.HTMLAttributes<HTMLTgCameraElement>;
            "tg-collider": LocalJSX.TgCollider & JSXBase.HTMLAttributes<HTMLTgColliderElement>;
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
