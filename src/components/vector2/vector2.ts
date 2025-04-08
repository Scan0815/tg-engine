import { IVector2 } from '../interfaces';

export class Vector2 implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static UP = new Vector2(0, -1);
  static DOWN = new Vector2(0, 1);
  static LEFT = new Vector2(-1, 0);
  static RIGHT = new Vector2(1, 0);
}
