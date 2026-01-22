/**
 * Checks for Axis-Aligned Bounding Box (AABB) collision between two rectangles
 * @returns true if the rectangles overlap
 */
export const checkAABBCollision = (
  x1: number, y1: number, w1: number, h1: number,
  x2: number, y2: number, w2: number, h2: number
): boolean => {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
};

export const CalculateOffset = (width:number,height:number,scale:number,currentFrame:number,hFrames:number) => {
  // Handle invalid hFrames
  if (hFrames <= 0) {
    return { offsetX: 0, offsetY: 0 };
  }

  const row = Math.floor(currentFrame / hFrames);
  const col = currentFrame % hFrames;

  const offsetX = -col * width * scale;
  const offsetY = -row * height * scale;

  return { offsetX, offsetY };
}
