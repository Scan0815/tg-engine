import { IVector2 } from '../../../interfaces';
import { Vector2 } from '../../../models/vector2';

const TILE_SIZE = 80;

export const TilePos = (tile: number) => {
  return tile * TILE_SIZE;
};

export const MoveToDirection = (direction: 'up' | 'down' | 'left' | 'right', vector: IVector2): Vector2 => {
  const pos = Vector2.from(vector);

  switch (direction) {
    case 'up':
      return pos.add(new Vector2(0, -TILE_SIZE));
    case 'down':
      return pos.add(new Vector2(0, TILE_SIZE));
    case 'left':
      return pos.add(new Vector2(-TILE_SIZE, 0));
    case 'right':
      return pos.add(new Vector2(TILE_SIZE, 0));
    default:
      return pos;
  }
};

