import { IVector2 } from '../../interfaces';

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
  static ZERO = new Vector2(0, 0);
  static ONE = new Vector2(1, 1);

  /**
   * Creates a new Vector2 from an object with x and y properties
   */
  static from(v: { x: number; y: number }): Vector2 {
    return new Vector2(v.x, v.y);
  }

  /**
   * Adds another vector to this vector and returns a new Vector2
   */
  add(v: IVector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtracts another vector from this vector and returns a new Vector2
   */
  subtract(v: IVector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  /**
   * Multiplies this vector by a scalar and returns a new Vector2
   */
  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * Divides this vector by a scalar and returns a new Vector2
   */
  divide(scalar: number): Vector2 {
    if (scalar === 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  /**
   * Returns the magnitude (length) of this vector
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns a normalized (unit length) version of this vector
   */
  normalize(): Vector2 {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2(0, 0);
    }
    return this.divide(mag);
  }

  /**
   * Returns the dot product of this vector and another vector
   */
  dot(v: IVector2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Returns the distance between this vector and another vector
   */
  distance(v: IVector2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Returns a copy of this vector
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Checks if this vector equals another vector
   */
  equals(v: IVector2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * Returns the angle of this vector in radians
   */
  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Returns a string representation of this vector
   */
  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }
}
