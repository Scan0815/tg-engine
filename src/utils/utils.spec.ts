import { checkAABBCollision, CalculateOffset } from './utils';

describe('utils', () => {
  describe('checkAABBCollision', () => {
    it('returns true when two rectangles overlap', () => {
      // Rect1: 0,0 100x100 overlaps with Rect2: 50,50 100x100
      expect(checkAABBCollision(0, 0, 100, 100, 50, 50, 100, 100)).toBe(true);
    });

    it('returns false when rectangles do not overlap', () => {
      // Rect1: 0,0 100x100 does not overlap with Rect2: 200,200 100x100
      expect(checkAABBCollision(0, 0, 100, 100, 200, 200, 100, 100)).toBe(false);
    });

    it('returns true when rectangles touch edges', () => {
      // Rect1: 0,0 100x100 touches Rect2: 99,0 100x100 (1px overlap)
      expect(checkAABBCollision(0, 0, 100, 100, 99, 0, 100, 100)).toBe(true);
    });

    it('returns false when rectangles are adjacent but not overlapping', () => {
      // Rect1: 0,0 100x100 adjacent to Rect2: 100,0 100x100
      expect(checkAABBCollision(0, 0, 100, 100, 100, 0, 100, 100)).toBe(false);
    });

    it('returns true when one rectangle is inside another', () => {
      // Rect1: 0,0 100x100 contains Rect2: 25,25 50x50
      expect(checkAABBCollision(0, 0, 100, 100, 25, 25, 50, 50)).toBe(true);
    });

    it('returns true when rectangles are identical', () => {
      expect(checkAABBCollision(50, 50, 100, 100, 50, 50, 100, 100)).toBe(true);
    });

    it('handles negative coordinates', () => {
      expect(checkAABBCollision(-50, -50, 100, 100, 0, 0, 100, 100)).toBe(true);
      expect(checkAABBCollision(-100, -100, 50, 50, 0, 0, 50, 50)).toBe(false);
    });

    it('handles zero-sized rectangles', () => {
      expect(checkAABBCollision(50, 50, 0, 0, 50, 50, 100, 100)).toBe(false);
    });
  });

  describe('CalculateOffset', () => {
    it('returns correct offset for first frame', () => {
      const result = CalculateOffset(32, 32, 1, 0, 4);
      expect(result.offsetX).toBe(-0); // JavaScript's -0 is equal to 0
      expect(result.offsetY).toBe(-0);
    });

    it('returns correct offset for second frame in row', () => {
      const result = CalculateOffset(32, 32, 1, 1, 4);
      expect(result.offsetX).toBe(-32);
      expect(result.offsetY).toBe(-0);
    });

    it('returns correct offset for frame in second row', () => {
      const result = CalculateOffset(32, 32, 1, 4, 4);
      expect(result.offsetX).toBe(-0);
      expect(result.offsetY).toBe(-32);
    });

    it('returns correct offset for middle frame', () => {
      const result = CalculateOffset(32, 32, 1, 5, 4);
      expect(result.offsetX).toBe(-32);
      expect(result.offsetY).toBe(-32);
    });

    it('handles scale factor', () => {
      const result = CalculateOffset(32, 32, 2, 1, 4);
      expect(result.offsetX).toBe(-64);
      expect(result.offsetY).toBe(-0);
    });

    it('handles invalid hFrames (0)', () => {
      const result = CalculateOffset(32, 32, 1, 0, 0);
      expect(result).toEqual({ offsetX: 0, offsetY: 0 });
    });

    it('handles invalid hFrames (negative)', () => {
      const result = CalculateOffset(32, 32, 1, 0, -1);
      expect(result).toEqual({ offsetX: 0, offsetY: 0 });
    });
  });
});
