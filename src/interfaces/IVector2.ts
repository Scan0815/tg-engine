export interface IVector2 {
  x: number;
  y: number;

  // Optional methods - implemented by Vector2 class, not required for plain objects
  add?(v: IVector2): IVector2;
  subtract?(v: IVector2): IVector2;
  multiply?(scalar: number): IVector2;
  divide?(scalar: number): IVector2;
  magnitude?(): number;
  normalize?(): IVector2;
  dot?(v: IVector2): number;
  distance?(v: IVector2): number;
  clone?(): IVector2;
  equals?(v: IVector2): boolean;
}