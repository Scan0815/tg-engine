# tg-collider



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default               |
| ------------ | ------------- | ----------- | --------- | --------------------- |
| `debug`      | `debug`       |             | `boolean` | `false`               |
| `debugColor` | `debug-color` |             | `string`  | `'rgba(255,0,0,0.5)'` |
| `height`     | `height`      |             | `number`  | `0`                   |
| `name`       | `name`        |             | `string`  | `"default"`           |
| `offsetX`    | `offset-x`    |             | `number`  | `0`                   |
| `offsetY`    | `offset-y`    |             | `number`  | `0`                   |
| `scale`      | `scale`       |             | `number`  | `1`                   |
| `type`       | `type`        |             | `string`  | `"default"`           |
| `width`      | `width`       |             | `number`  | `0`                   |
| `x`          | `x`           |             | `number`  | `0`                   |
| `y`          | `y`           |             | `number`  | `0`                   |


## Events

| Event       | Description | Type                     |
| ----------- | ----------- | ------------------------ |
| `collision` |             | `CustomEvent<ICollider>` |


## Methods

### `checkCollisionOnPosition(x: number, y: number, width: number, height: number) => Promise<TgCollider>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `x`      | `number` |             |
| `y`      | `number` |             |
| `width`  | `number` |             |
| `height` | `number` |             |

#### Returns

Type: `Promise<TgCollider>`




## Dependencies

### Used by

 - [entity-box](../../example/example-game/entities/entity-box)
 - [entity-goal](../../example/example-game/entities/entity-goal)
 - [entity-player](../../example/example-game/entities/entity-player)
 - [entity-wall](../../example/example-game/entities/entity-wall)

### Graph
```mermaid
graph TD;
  entity-box --> tg-collider
  entity-goal --> tg-collider
  entity-player --> tg-collider
  entity-wall --> tg-collider
  style tg-collider fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
