# tg-sprite-animator



<!-- Auto Generated Below -->


## Overview

Component to animate a tg-sprite component using a animation object
It takes in the following properties:

## Properties

| Property         | Attribute         | Description                                        | Type                             | Default      |
| ---------------- | ----------------- | -------------------------------------------------- | -------------------------------- | ------------ |
| `animations`     | --                | the animations to be played                        | `{ [key: string]: IAnimation; }` | `null`       |
| `iterationCount` | `iteration-count` | the number of times the animation should be played | `"infinite" \| number`           | `'infinite'` |
| `play`           | `play`            | the animation to play                              | `string`                         | `null`       |
| `state`          | `state`           | the state of the animation                         | `"paused" \| "running"`          | `'running'`  |


## Methods

### `refresh() => Promise<string>`

trigger if the sprite component hast changed props
that used for animation like scale

#### Returns

Type: `Promise<string>`




## Dependencies

### Used by

 - [entity-player](../../example/example-game/entities/entity-player)
 - [example-animator](../../example/example-animator)
 - [tg-sprite-map](../tg-sprite-map)

### Graph
```mermaid
graph TD;
  entity-player --> tg-sprite-animator
  example-animator --> tg-sprite-animator
  tg-sprite-map --> tg-sprite-animator
  style tg-sprite-animator fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
