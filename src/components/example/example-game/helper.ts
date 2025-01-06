import { IVector2, Vector2 } from '../../interfaces/IVector2';

export const TilePos = (tile:number) => {
  return tile * 80
}

export const MoveToDirection = (direction:'up'|'down'|'left'|'right', vector:IVector2):IVector2 => {
  switch (direction) {
    case 'up':
      vector = new Vector2(vector.x += Vector2.UP.x, vector.y += TilePos(Vector2.UP.y));
      break;
    case 'down':
      vector = new Vector2(vector.x += Vector2.DOWN.x, vector.y += TilePos(Vector2.DOWN.y));
      break;
    case 'left':
      vector = new Vector2(vector.x += TilePos(Vector2.LEFT.x), vector.y += Vector2.LEFT.y);
      break;
    case 'right':
      vector = new Vector2(vector.x += TilePos(Vector2.RIGHT.x), vector.y += Vector2.RIGHT.y);
      break;
  }
  return vector;
}

