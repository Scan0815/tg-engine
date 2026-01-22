import { IAnimation } from './IAnimation';
import { IVector2 } from './IVector2';

export interface ITile extends IVector2, IAnimation {
  collidable?: boolean;
  colliderType?: string;
  colliderName?: string;
}
