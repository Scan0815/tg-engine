import { ISize } from './ISize';
import { IVector2 } from './IVector2';

export interface ICollider extends IVector2,ISize{
  type: string
}
