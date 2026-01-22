import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { IParticle, IParticleConfig } from '../../../interfaces';
import { Vector2 } from '../../../models/vector2';

@Component({
  tag: 'tg-particle',
  styleUrl: 'tg-particle.scss',
  shadow: true,
})
export class TgParticle {
  @Element() el: HTMLElement;

  @Prop() src: string;
  @Prop() width: number = 16;
  @Prop() height: number = 16;
  @Prop() hFrames: number = 1;
  @Prop() vFrames: number = 1;
  @Prop() scale: number = 1;
  @Prop() canvasWidth: number = 400;
  @Prop() canvasHeight: number = 300;
  @Prop() autoSize: boolean = false;
  @Prop() offsetX: number = 0;
  @Prop() offsetY: number = 0;
  @Prop() config: IParticleConfig = {
    count: 50,
    emissionRate: 10,
    life: 2000,
    lifeVariation: 500,
    velocity: { x: 0, y: -50 },
    velocityVariation: { x: 30, y: 20 },
    acceleration: { x: 0, y: 0 },
    accelerationVariation: { x: 0, y: 0 },
    size: 1,
    sizeVariation: 0.5,
    rotation: 0,
    rotationSpeed: 0,
    rotationSpeedVariation: 2,
    alpha: 1,
    alphaDecay: 0.02,
    spread: 45,
    gravity: { x: 0, y: 20 },
    burst: false
  };
  @Prop() playing: boolean = false;
  @Prop() loop: boolean = false;

  @State() particles: IParticle[] = [];
  @State() isActive: boolean = false;
  @State() actualCanvasWidth: number = 400;
  @State() actualCanvasHeight: number = 300;

  private animationId: number;
  private lastEmissionTime: number = 0;
  private emissionTimer: number = 0;
  private canvasRef: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private spriteImage: HTMLImageElement;

  componentDidLoad() {
    this.setupCanvas();
    this.loadSprite();
  }

  @Watch('playing')
  playingChanged(newValue: boolean) {
    if (newValue) {
      this.start();
    } else {
      this.stop();
    }
  }

  @Watch('src')
  srcChanged() {
    this.loadSprite();
  }

  private setupCanvas() {
    this.canvasRef = this.el.shadowRoot.querySelector('canvas');
    this.ctx = this.canvasRef.getContext('2d');
    this.updateCanvasSize();
  }

  private updateCanvasSize() {
    if (!this.canvasRef) return;

    if (this.autoSize && this.particles.length > 0) {
      const bounds = this.calculateParticleBounds();
      this.actualCanvasWidth = Math.max(200, bounds.width + 100); // Add padding
      this.actualCanvasHeight = Math.max(200, bounds.height + 100);
    } else {
      this.actualCanvasWidth = this.canvasWidth;
      this.actualCanvasHeight = this.canvasHeight;
    }

    this.canvasRef.width = this.actualCanvasWidth;
    this.canvasRef.height = this.actualCanvasHeight;
  }

  private calculateParticleBounds() {
    if (this.particles.length === 0) {
      return { width: this.canvasWidth, height: this.canvasHeight, minX: 0, minY: 0, maxX: this.canvasWidth, maxY: this.canvasHeight };
    }

    let minX = this.particles[0].position.x;
    let maxX = this.particles[0].position.x;
    let minY = this.particles[0].position.y;
    let maxY = this.particles[0].position.y;

    this.particles.forEach(particle => {
      const particleSize = this.width * this.scale * particle.size;
      minX = Math.min(minX, particle.position.x - particleSize / 2);
      maxX = Math.max(maxX, particle.position.x + particleSize / 2);
      minY = Math.min(minY, particle.position.y - particleSize / 2);
      maxY = Math.max(maxY, particle.position.y + particleSize / 2);
    });

    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      minY,
      maxX,
      maxY
    };
  }

  private loadSprite() {
    if (!this.src) return;
    
    this.spriteImage = new Image();
    this.spriteImage.crossOrigin = 'anonymous';
    this.spriteImage.onload = () => {
      if (this.playing) {
        this.start();
      }
    };
    this.spriteImage.src = this.src;
  }

  private start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.lastEmissionTime = performance.now();
    this.emissionTimer = 0;
    
    if (this.config.burst) {
      this.emitBurst();
    }
    
    this.animate();
  }

  private stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private emitBurst() {
    for (let i = 0; i < this.config.count; i++) {
      this.createParticle();
    }
  }

  private createParticle(): IParticle {
    const centerX = this.actualCanvasWidth / 2 + this.offsetX;
    const centerY = this.actualCanvasHeight / 2 + this.offsetY;
    
    const spreadRad = (this.config.spread * Math.PI) / 180;
    const angle = (Math.random() - 0.5) * spreadRad;
    
    const velocityMagnitude = Vector2.from(this.config.velocity).magnitude();
    
    const life = this.config.life + (Math.random() - 0.5) * this.config.lifeVariation;
    
    const particle: IParticle = {
      position: { x: centerX, y: centerY },
      velocity: {
        x: Math.cos(angle) * velocityMagnitude + (Math.random() - 0.5) * this.config.velocityVariation.x,
        y: Math.sin(angle) * velocityMagnitude + (Math.random() - 0.5) * this.config.velocityVariation.y
      },
      acceleration: {
        x: this.config.acceleration.x + (Math.random() - 0.5) * this.config.accelerationVariation.x,
        y: this.config.acceleration.y + (Math.random() - 0.5) * this.config.accelerationVariation.y
      },
      life: life,
      maxLife: life,
      size: this.config.size + (Math.random() - 0.5) * this.config.sizeVariation,
      rotation: this.config.rotation + Math.random() * Math.PI * 2,
      rotationSpeed: this.config.rotationSpeed + (Math.random() - 0.5) * this.config.rotationSpeedVariation,
      alpha: this.config.alpha,
      color: this.config.color,
      frame: Math.floor(Math.random() * (this.hFrames * this.vFrames))
    };

    this.particles = [...this.particles, particle];
    return particle;
  }

  private updateParticle(particle: IParticle, deltaTime: number) {
    particle.velocity.x += (particle.acceleration.x + this.config.gravity.x) * deltaTime;
    particle.velocity.y += (particle.acceleration.y + this.config.gravity.y) * deltaTime;
    
    particle.position.x += particle.velocity.x * deltaTime;
    particle.position.y += particle.velocity.y * deltaTime;
    
    particle.rotation += particle.rotationSpeed * deltaTime;
    
    particle.life -= deltaTime * 1000;
    
    const lifeFactor = particle.life / particle.maxLife;
    particle.alpha = this.config.alpha * lifeFactor;
  }

  private renderParticle(particle: IParticle) {
    if (particle.alpha <= 0) return;

    const renderWidth = this.width * this.scale * particle.size;
    const renderHeight = this.height * this.scale * particle.size;

    this.ctx.save();
    this.ctx.globalAlpha = particle.alpha;
    this.ctx.translate(particle.position.x, particle.position.y);
    this.ctx.rotate(particle.rotation);
    
    if (this.spriteImage && this.spriteImage.complete && this.spriteImage.naturalWidth > 0) {
      // Render sprite if available and loaded
      const frameX = particle.frame % this.hFrames;
      const frameY = Math.floor(particle.frame / this.hFrames);
      
      const sourceX = frameX * this.width;
      const sourceY = frameY * this.height;
      
      this.ctx.drawImage(
        this.spriteImage,
        sourceX, sourceY, this.width, this.height,
        -renderWidth / 2, -renderHeight / 2, renderWidth, renderHeight
      );
    } else {
      // Fallback: render colored rectangle
      this.ctx.fillStyle = particle.color || '#ffffff';
      this.ctx.fillRect(-renderWidth / 2, -renderHeight / 2, renderWidth, renderHeight);
    }
    
    this.ctx.restore();
  }

  private animate = () => {
    if (!this.isActive) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastEmissionTime) / 1000;
    this.lastEmissionTime = currentTime;

    if (!this.config.burst && this.particles.length < this.config.count) {
      this.emissionTimer += deltaTime * 1000;
      const emissionInterval = 1000 / this.config.emissionRate;
      
      while (this.emissionTimer >= emissionInterval && this.particles.length < this.config.count) {
        this.createParticle();
        this.emissionTimer -= emissionInterval;
      }
    }

    this.particles = this.particles.filter(particle => {
      this.updateParticle(particle, deltaTime);
      return particle.life > 0;
    });

    // Update canvas size if auto-sizing is enabled
    if (this.autoSize) {
      this.updateCanvasSize();
    }

    this.ctx.clearRect(0, 0, this.actualCanvasWidth, this.actualCanvasHeight);
    
    this.particles.forEach(particle => {
      this.renderParticle(particle);
    });

    if (this.particles.length > 0 || (!this.config.burst && this.isActive)) {
      this.animationId = requestAnimationFrame(this.animate);
    } else if (this.loop && this.particles.length === 0) {
      if (this.config.burst) {
        this.emitBurst();
      }
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.isActive = false;
    }
  };

  disconnectedCallback() {
    this.stop();
  }

  render() {
    return (
      <div class="particle-container">
        <canvas ref={el => this.canvasRef = el}></canvas>
      </div>
    );
  }
}