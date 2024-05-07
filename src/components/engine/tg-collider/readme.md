# tg-collider



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type     | Default     |
| --------- | ---------- | ----------- | -------- | ----------- |
| `height`  | `height`   |             | `number` | `0`         |
| `name`    | `name`     |             | `string` | `"default"` |
| `offsetX` | `offset-x` |             | `number` | `0`         |
| `offsetY` | `offset-y` |             | `number` | `0`         |
| `scale`   | `scale`    |             | `number` | `1`         |
| `width`   | `width`    |             | `number` | `0`         |


## Events

| Event       | Description | Type                     |
| ----------- | ----------- | ------------------------ |
| `collision` |             | `CustomEvent<ICollider>` |


## Methods

### `checkCollision(other: TgCollider) => Promise<ICollider>`



#### Parameters

| Name    | Type         | Description |
| ------- | ------------ | ----------- |
| `other` | `TgCollider` |             |

#### Returns

Type: `Promise<ICollider>`



### `checkCollisionOnPosition(x: number, y: number, width: number, height: number) => Promise<ICollider>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `x`      | `number` |             |
| `y`      | `number` |             |
| `width`  | `number` |             |
| `height` | `number` |             |

#### Returns

Type: `Promise<ICollider>`



### `updatePosition() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
