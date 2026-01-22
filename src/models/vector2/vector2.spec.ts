import { Vector2 } from './vector2';

describe('Vector2', () => {
  describe('constructor', () => {
    it('creates a vector with x and y values', () => {
      const v = new Vector2(3, 4);
      expect(v.x).toBe(3);
      expect(v.y).toBe(4);
    });
  });

  describe('static constants', () => {
    it('has correct UP direction', () => {
      expect(Vector2.UP.x).toBe(0);
      expect(Vector2.UP.y).toBe(-1);
    });

    it('has correct DOWN direction', () => {
      expect(Vector2.DOWN.x).toBe(0);
      expect(Vector2.DOWN.y).toBe(1);
    });

    it('has correct LEFT direction', () => {
      expect(Vector2.LEFT.x).toBe(-1);
      expect(Vector2.LEFT.y).toBe(0);
    });

    it('has correct RIGHT direction', () => {
      expect(Vector2.RIGHT.x).toBe(1);
      expect(Vector2.RIGHT.y).toBe(0);
    });

    it('has correct ZERO vector', () => {
      expect(Vector2.ZERO.x).toBe(0);
      expect(Vector2.ZERO.y).toBe(0);
    });

    it('has correct ONE vector', () => {
      expect(Vector2.ONE.x).toBe(1);
      expect(Vector2.ONE.y).toBe(1);
    });
  });

  describe('from', () => {
    it('creates a Vector2 from an object', () => {
      const v = Vector2.from({ x: 5, y: 10 });
      expect(v.x).toBe(5);
      expect(v.y).toBe(10);
    });
  });

  describe('add', () => {
    it('adds two vectors correctly', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      const result = v1.add(v2);
      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });

    it('returns a new vector instance', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      const result = v1.add(v2);
      expect(result).not.toBe(v1);
      expect(result).not.toBe(v2);
    });
  });

  describe('subtract', () => {
    it('subtracts two vectors correctly', () => {
      const v1 = new Vector2(5, 7);
      const v2 = new Vector2(2, 3);
      const result = v1.subtract(v2);
      expect(result.x).toBe(3);
      expect(result.y).toBe(4);
    });
  });

  describe('multiply', () => {
    it('multiplies vector by scalar correctly', () => {
      const v = new Vector2(3, 4);
      const result = v.multiply(2);
      expect(result.x).toBe(6);
      expect(result.y).toBe(8);
    });

    it('handles negative scalars', () => {
      const v = new Vector2(3, 4);
      const result = v.multiply(-1);
      expect(result.x).toBe(-3);
      expect(result.y).toBe(-4);
    });
  });

  describe('divide', () => {
    it('divides vector by scalar correctly', () => {
      const v = new Vector2(6, 8);
      const result = v.divide(2);
      expect(result.x).toBe(3);
      expect(result.y).toBe(4);
    });

    it('returns zero vector when dividing by zero', () => {
      const v = new Vector2(6, 8);
      const result = v.divide(0);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });
  });

  describe('magnitude', () => {
    it('calculates magnitude correctly', () => {
      const v = new Vector2(3, 4);
      expect(v.magnitude()).toBe(5);
    });

    it('returns 0 for zero vector', () => {
      const v = new Vector2(0, 0);
      expect(v.magnitude()).toBe(0);
    });
  });

  describe('normalize', () => {
    it('normalizes vector to unit length', () => {
      const v = new Vector2(3, 4);
      const result = v.normalize();
      expect(result.x).toBeCloseTo(0.6);
      expect(result.y).toBeCloseTo(0.8);
      expect(result.magnitude()).toBeCloseTo(1);
    });

    it('returns zero vector when normalizing zero vector', () => {
      const v = new Vector2(0, 0);
      const result = v.normalize();
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });
  });

  describe('dot', () => {
    it('calculates dot product correctly', () => {
      const v1 = new Vector2(1, 2);
      const v2 = new Vector2(3, 4);
      expect(v1.dot(v2)).toBe(11);
    });

    it('returns 0 for perpendicular vectors', () => {
      const v1 = new Vector2(1, 0);
      const v2 = new Vector2(0, 1);
      expect(v1.dot(v2)).toBe(0);
    });
  });

  describe('distance', () => {
    it('calculates distance correctly', () => {
      const v1 = new Vector2(0, 0);
      const v2 = new Vector2(3, 4);
      expect(v1.distance(v2)).toBe(5);
    });

    it('returns 0 for same position', () => {
      const v1 = new Vector2(5, 5);
      const v2 = new Vector2(5, 5);
      expect(v1.distance(v2)).toBe(0);
    });
  });

  describe('clone', () => {
    it('creates an identical copy', () => {
      const v = new Vector2(3, 4);
      const clone = v.clone();
      expect(clone.x).toBe(3);
      expect(clone.y).toBe(4);
    });

    it('returns a new instance', () => {
      const v = new Vector2(3, 4);
      const clone = v.clone();
      expect(clone).not.toBe(v);
    });
  });

  describe('equals', () => {
    it('returns true for equal vectors', () => {
      const v1 = new Vector2(3, 4);
      const v2 = new Vector2(3, 4);
      expect(v1.equals(v2)).toBe(true);
    });

    it('returns false for different vectors', () => {
      const v1 = new Vector2(3, 4);
      const v2 = new Vector2(4, 3);
      expect(v1.equals(v2)).toBe(false);
    });
  });

  describe('angle', () => {
    it('returns correct angle for right direction', () => {
      const v = new Vector2(1, 0);
      expect(v.angle()).toBe(0);
    });

    it('returns correct angle for down direction', () => {
      const v = new Vector2(0, 1);
      expect(v.angle()).toBeCloseTo(Math.PI / 2);
    });

    it('returns correct angle for left direction', () => {
      const v = new Vector2(-1, 0);
      expect(v.angle()).toBeCloseTo(Math.PI);
    });
  });

  describe('toString', () => {
    it('returns correct string representation', () => {
      const v = new Vector2(3, 4);
      expect(v.toString()).toBe('Vector2(3, 4)');
    });
  });
});
