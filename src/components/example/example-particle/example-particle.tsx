import { Component, State, h } from '@stencil/core';
import { IParticleConfig } from '../../../interfaces';

@Component({
  tag: 'example-particle',
  styleUrl: 'example-particle.scss',
  shadow: true,
})
export class ExampleParticle {
  @State() isExplosionPlaying: boolean = false;
  @State() isFirePlaying: boolean = false;
  @State() isSmokedPlaying: boolean = false;

  private explosionConfig: IParticleConfig = {
    count: 100,
    emissionRate: 0,
    life: 1500,
    lifeVariation: 500,
    velocity: { x: 0, y: -80 },
    velocityVariation: { x: 100, y: 50 },
    acceleration: { x: 0, y: 0 },
    accelerationVariation: { x: 20, y: 10 },
    size: 1,
    sizeVariation: 0.8,
    rotation: 0,
    rotationSpeed: 0,
    rotationSpeedVariation: 5,
    alpha: 1,
    alphaDecay: 0.02,
    color: '#ff4444',
    spread: 360,
    gravity: { x: 0, y: 50 },
    burst: true
  };

  private fireConfig: IParticleConfig = {
    count: 30,
    emissionRate: 15,
    life: 2000,
    lifeVariation: 800,
    velocity: { x: 0, y: -30 },
    velocityVariation: { x: 20, y: 15 },
    acceleration: { x: 0, y: -10 },
    accelerationVariation: { x: 5, y: 5 },
    size: 0.8,
    sizeVariation: 0.4,
    rotation: 0,
    rotationSpeed: 0,
    rotationSpeedVariation: 1,
    alpha: 0.9,
    alphaDecay: 0.015,
    color: '#ff8800',
    spread: 30,
    gravity: { x: 0, y: -20 },
    burst: false
  };

  private smokeConfig: IParticleConfig = {
    count: 20,
    emissionRate: 5,
    life: 4000,
    lifeVariation: 1000,
    velocity: { x: 0, y: -20 },
    velocityVariation: { x: 15, y: 10 },
    acceleration: { x: 0, y: -5 },
    accelerationVariation: { x: 2, y: 2 },
    size: 1.5,
    sizeVariation: 1,
    rotation: 0,
    rotationSpeed: 0,
    rotationSpeedVariation: 0.5,
    alpha: 0.6,
    alphaDecay: 0.008,
    color: '#888888',
    spread: 20,
    gravity: { x: 0, y: -10 },
    burst: false
  };

  private handleExplosion = () => {
    this.isExplosionPlaying = true;
    setTimeout(() => {
      this.isExplosionPlaying = false;
    }, 3000);
  };

  private handleFire = () => {
    this.isFirePlaying = !this.isFirePlaying;
  };

  private handleSmoke = () => {
    this.isSmokedPlaying = !this.isSmokedPlaying;
  };

  render() {
    return (
      <div class="example-container">
        <h2>TG Particle System Examples</h2>

        <div class="controls">
          <button onClick={this.handleExplosion}>Explosion Effect</button>
          <button onClick={this.handleFire}>
            {this.isFirePlaying ? 'Stop Fire' : 'Start Fire'}
          </button>
          <button onClick={this.handleSmoke}>
            {this.isSmokedPlaying ? 'Stop Smoke' : 'Start Smoke'}
          </button>
        </div>

        <div class="particle-demos">
          <div class="demo-section">
            <h3>Explosion (Burst Mode)</h3>
            <div class="particle-container">
              <tg-particle
                width={8}
                height={8}
                scale={3}
                config={this.explosionConfig}
                playing={this.isExplosionPlaying}
                loop={false}
              />
            </div>
          </div>

          <div class="demo-section">
            <h3>Fire (Continuous Emission)</h3>
            <div class="particle-container">
              <tg-particle
                width={6}
                height={6}
                scale={2}
                config={this.fireConfig}
                playing={this.isFirePlaying}
                loop={true}
              />
            </div>
          </div>

          <div class="demo-section">
            <h3>Smoke (Slow Emission)</h3>
            <div class="particle-container">
              <tg-particle
                width={12}
                height={12}
                scale={2}
                config={this.smokeConfig}
                playing={this.isSmokedPlaying}
                loop={true}
              />
            </div>
          </div>
        </div>

        <div class="info">
          <h3>Configuration Examples:</h3>
          <div class="config-info">
            <h4>Explosion Effect:</h4>
            <ul>
              <li>Burst mode (all particles at once)</li>
              <li>High velocity variation (360° spread)</li>
              <li>Gravity pulling particles down</li>
              <li>Short lifetime with variation</li>
            </ul>

            <h4>Fire Effect:</h4>
            <ul>
              <li>Continuous emission</li>
              <li>Upward velocity with small spread</li>
              <li>Negative gravity (particles rise)</li>
              <li>Medium lifetime</li>
            </ul>

            <h4>Smoke Effect:</h4>
            <ul>
              <li>Slow emission rate</li>
              <li>Gentle upward movement</li>
              <li>Long lifetime with fade</li>
              <li>Large size variation</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
