# example-engine



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [tg-camera](../../engine/tg-camera)
- [example-entity-level](./entities/entity-level)
- [example-entity-wall](./entities/entity-wall)
- [example-entity-box](./entities/entity-box)
- [example-entity-goal](./entities/entity-goal)
- [example-entity-player](./entities/entity-player)

### Graph
```mermaid
graph TD;
  example-game --> tg-camera
  example-game --> example-entity-level
  example-game --> example-entity-wall
  example-game --> example-entity-box
  example-game --> example-entity-goal
  example-game --> example-entity-player
  example-entity-level --> tg-sprite-map
  tg-sprite-map --> tg-sprite-animator
  tg-sprite-map --> tg-sprite
  example-entity-wall --> tg-collider
  example-entity-box --> tg-collider
  example-entity-goal --> tg-collider
  example-entity-player --> tg-collider
  example-entity-player --> tg-sprite-animator
  example-entity-player --> tg-sprite
  style example-game fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
