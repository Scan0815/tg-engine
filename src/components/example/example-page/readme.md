# example-page



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [tg-sprite](../../engine/tg-sprite)
- [tg-sprite-animator](../../engine/tg-sprite-animator)
- [tg-sprite-map](../../engine/tg-sprite-map)
- [tg-camera](../../engine/tg-camera)
- [tg-collider](../../engine/tg-collider)
- [tg-touch-controller](../../engine/tg-touch-controller)
- [example-mouse-controller](../example-mouse-controller)
- [example-key-controller](../example-key-controller)
- [example-particle](../example-particle)
- [example-game](../example-game)

### Graph
```mermaid
graph TD;
  example-page --> tg-sprite
  example-page --> tg-sprite-animator
  example-page --> tg-sprite-map
  example-page --> tg-camera
  example-page --> tg-collider
  example-page --> tg-touch-controller
  example-page --> example-mouse-controller
  example-page --> example-key-controller
  example-page --> example-particle
  example-page --> example-game
  tg-sprite-map --> tg-sprite-animator
  tg-sprite-map --> tg-sprite
  example-mouse-controller --> tg-mouse-controller
  example-key-controller --> tg-key-controller
  example-particle --> tg-particle
  example-game --> tg-touch-controller
  example-game --> tg-camera
  example-game --> example-entity-level
  example-game --> example-entity-wall
  example-game --> example-entity-box
  example-game --> example-entity-goal
  example-game --> example-entity-player
  example-entity-level --> tg-sprite-map
  example-entity-wall --> tg-collider
  example-entity-box --> tg-collider
  example-entity-goal --> tg-collider
  example-entity-player --> tg-collider
  example-entity-player --> tg-sprite-animator
  example-entity-player --> tg-sprite
  style example-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
