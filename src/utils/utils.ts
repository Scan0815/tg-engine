export const CalculateOffset = (width:number,height:number,scale:number,currentFrame:number,hFrames:number) => {
  const row = Math.floor(currentFrame / hFrames);
  const col = currentFrame % hFrames;

  const offsetX = -col * width * scale;
  const offsetY = -row * height * scale;

  return { offsetX, offsetY };
}

export const calcTile = (tile:number) => {
  return tile * 80
}
