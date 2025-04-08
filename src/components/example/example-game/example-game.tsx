import { ComponentInterface, Component, Element, h, Host, Listen } from '@stencil/core';
import { Vector2 } from '../../vector2/vector2';
import { MoveToDirection, TilePos } from './helper';
import { ColliderManager } from '../../manager/collider.manager';

@Component({
  tag: 'example-game',
  styleUrl: 'example-game.scss',
  shadow: true,
})
export class ExampleGame implements ComponentInterface {

  @Element() el: HTMLExampleGameElement;

  private player: HTMLExampleEntityPlayerElement;
  private camera: HTMLTgCameraElement;
  private boxesInGoal: HTMLExampleEntityBoxElement[] = [];
  private playerTransition: boolean = false;
  @Listen('keydown', { target: 'window' })
  async handleKeyDown(ev: KeyboardEvent) {
    const inputs = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
    };
    await this.walk(inputs[ev.key]);
  }

  componentDidLoad() {
    this.camera.target = this.player;
  }

  async walk(direction: 'up' | 'down' | 'left' | 'right') {
    if(this.playerTransition) {
      return;
    }
    this.player.direction = direction;
    const oldVector = new Vector2(this.player.vector.x, this.player.vector.y);
    const vector = MoveToDirection(direction, this.player.vector);
    // Check if colliding
    const colliders = await ColliderManager.getInstance().checkCollisionOnPosition(vector.x, vector.y, 70, 70);
    const colliding = colliders?.filter(c => c?.name === 'wall' || c?.name === 'box')[0];
    if (colliding) {
      switch (colliding.name) {
        case 'box':
          const box = colliding.el.offsetParent as HTMLExampleEntityBoxElement;
          const movedBox = await this.moveBox(box, direction);
          if (movedBox) {
            this.player.vector = vector;
          } else {
            // Reset player position
            this.player.vector = oldVector;
            return;
          }
          break;
        case 'wall':
          // Reset player position
          this.player.vector = oldVector;
          return;

      }
    }
    // Move player
    this.player.vector = vector;
  }

  async checkWin() {
    const boxes = this.el.shadowRoot.querySelectorAll('example-entity-box');
    const goals = this.el.shadowRoot.querySelectorAll('example-entity-goal');
    if (boxes.length === goals.length) {
      this.boxesInGoal = Array.from(boxes).filter((box: HTMLExampleEntityBoxElement) => {
        return Array.from(goals).some((goal: HTMLExampleEntityGoalElement) => {
          return box.vector.x === goal.vector.x && box.vector.y === goal.vector.y;
        });
      });
      if (this.boxesInGoal.length === goals.length) {
        console.log('You win!');
      }
    }
  }

  async moveBox(box: HTMLExampleEntityBoxElement, direction: 'up' | 'down' | 'left' | 'right') {
    const oldVector = new Vector2(box.vector.x, box.vector.y);
    const vector = MoveToDirection(direction, box.vector);
    const colliders = await ColliderManager.getInstance().checkCollisionOnPosition(vector.x, vector.y, 70, 70);
    const collidingWallOrBox = colliders?.filter(c => c?.name === 'wall' || c?.name === 'box')[0];
    const collidingGoal = colliders?.filter(c => c?.name === 'goal')[0];
    const colliding = collidingWallOrBox || collidingGoal;
    if (colliding) {
      switch (colliding?.name) {
        case 'wall':
        case 'box':
          // Reset box position
          box.vector = oldVector;
          return false;
        case 'goal':
          // Set box position
          box.vector = vector;
          await this.checkWin();
          return true;
      }
    } else {
      // set box position
      box.vector = vector;
      return true;
    }
  }


  render() {
    return (
      <Host>
        <tg-touch-controller
          onSwipeUp={() => console.log('Swiped up!')}
          onSwipeDown={() => console.log('Swiped down!')}
          onSwipeLeft={() => console.log('Swiped left!')}
          onSwipeRight={() => console.log('Swiped right!')}
        >
        <tg-camera ref={ref => this.camera = ref} width={600} height={600}>
          <example-entity-level />
          <example-entity-wall vector={new Vector2(0, 0)} />
          <example-entity-wall vector={new Vector2(TilePos(1), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(2), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(3), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(4), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(5), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(6), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(7), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(8), 0)} />
          <example-entity-wall vector={new Vector2(TilePos(9), 0)} />

          <example-entity-wall vector={new Vector2(0, TilePos(1))} />
          <example-entity-wall vector={new Vector2(0, TilePos(2))} />
          <example-entity-wall vector={new Vector2(0, TilePos(3))} />
          <example-entity-wall vector={new Vector2(0, TilePos(4))} />
          <example-entity-wall vector={new Vector2(0, TilePos(5))} />
          <example-entity-wall vector={new Vector2(0, TilePos(6))} />
          <example-entity-wall vector={new Vector2(0, TilePos(7))} />
          <example-entity-wall vector={new Vector2(0, TilePos(8))} />
          <example-entity-wall vector={new Vector2(0, TilePos(9))} />

          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(1))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(2))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(3))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(4))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(5))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(6))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(7))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(8))} />

          <example-entity-wall vector={new Vector2(TilePos(1), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(2), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(3), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(4), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(5), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(6), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(7), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(8), TilePos(9))} />
          <example-entity-wall vector={new Vector2(TilePos(9), TilePos(9))} />

          <example-entity-box vector={new Vector2(TilePos(4), TilePos(4))} />
          <example-entity-box vector={new Vector2(TilePos(6), TilePos(6))} />

          <example-entity-goal vector={new Vector2(TilePos(8), TilePos(7))} />
          <example-entity-goal vector={new Vector2(TilePos(8), TilePos(8))} />

          <example-entity-player ref={ref => this.player = ref}
                         type="idle"
                         direction="down"
                         onTransition={(ev) => this.playerTransition =  ev.detail}
                         vector={new Vector2(TilePos(2), TilePos(2))} />
        </tg-camera>
        </tg-touch-controller>
      </Host>
    );
  }

}
