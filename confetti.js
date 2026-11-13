// Lightweight canvas confetti generator for celebrations
class ConfettiEffect {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animating = false;
    document.body.appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  start(duration = 4000) {
    this.resize();
    this.particles = [];
    const colors = ['#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653', '#e63946', '#a8dadc', '#ffd166', '#06d6a0'];
    const count = Math.min(180, Math.floor(window.innerWidth / 8));
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.4 - this.height * 0.3,
        w: Math.random() * 12 + 6,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        scale: 1,
        vScale: (Math.random() - 0.5) * 0.05
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.render();
    }

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.stop();
    }, duration);
  }

  stop() {
    this.animating = false;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles = [];
  }

  render() {
    if (!this.animating) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;
      p.scale += p.vScale;
      if (p.scale < 0.2 || p.scale > 1.2) p.vScale = -p.vScale;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.scale(p.scale, 1);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();

      if (p.y > this.height) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
    }

    requestAnimationFrame(() => this.render());
  }
}

window.ConfettiEffect = ConfettiEffect;
