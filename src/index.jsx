import './index.scss';

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x = (this.x + 0.01) % 1.0;
  }

  render(ctx) {
      const width = 1.0/300.0;
      const height = 1.0/300.0;

      ctx.fillStyle = 'white';
      ctx.fillRect(this.x - width / 2.0, this.y - height / 2.0, width, height);
  }
}

class ParticleEngine {
  constructor() {
    this.particles = [];

    for(let i = 0; i < 100; i += 1) {
      this.particles.push(new Particle(Math.random(), Math.random()));
    }
  }

  update() {
    this.particles.forEach(p => p.update());
  }

  render(ctx) {
    ctx.save();
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.scale(ctx.canvas.width, ctx.canvas.height);
    // ctx.clearRect(0.0, 0.0, 1.0, 1.0);
    this.particles.forEach(p => p.render(ctx));
    ctx.restore();
  }
}

const root = document.getElementById("root");
const canvas = document.createElement("canvas");
root.appendChild(canvas);

const ctx = canvas.getContext('2d');
const pe = new ParticleEngine();

const draw_f = () => {
  pe.update();
  pe.render(ctx)
  window.requestAnimationFrame(draw_f);
};

window.requestAnimationFrame(draw_f);