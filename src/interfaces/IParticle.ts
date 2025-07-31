import { IVector2 } from './IVector2';

export interface IParticle {
  position: IVector2;
  velocity: IVector2;
  acceleration: IVector2;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  color?: string;
  frame?: number;
}

export interface IParticleConfig {
  count: number;
  emissionRate: number;
  life: number;
  lifeVariation: number;
  velocity: IVector2;
  velocityVariation: IVector2;
  acceleration: IVector2;
  accelerationVariation: IVector2;
  size: number;
  sizeVariation: number;
  rotation: number;
  rotationSpeed: number;
  rotationSpeedVariation: number;
  alpha: number;
  alphaDecay: number;
  color?: string;
  spread: number; // Emission cone angle in degrees
  gravity: IVector2;
  burst?: boolean; // If true, emit all particles at once
}