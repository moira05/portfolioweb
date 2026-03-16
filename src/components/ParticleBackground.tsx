"use client";
import { useEffect, useRef } from "react";

const COLORS: [number, number, number][] = [
  [80, 100, 255], [50, 50, 200], [120, 60, 240],
  [180, 60, 240], [240, 80, 160], [200, 150, 30],
  [100, 140, 255], [160, 80, 220], [40, 40, 180],
  [200, 100, 240], [240, 120, 80], [60, 180, 220],
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W: number, H: number;
    let animId: number;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = (arr: typeof COLORS) => arr[Math.floor(Math.random() * arr.length)];

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0;
      color: [number, number, number] = [0, 0, 0];
      size = 1; alpha = 1; alphaTarget = 1; alphaSpeed = 0.005;
      isStreak = false; streakLen = 5; angle = 0; twinkle = false;

      constructor() { this.reset(true); }

      reset(initial = false) {
        this.x = rand(0, W);
        this.y = initial ? rand(0, H) : rand(-10, H + 10);
        this.color = pick(COLORS);
        this.size = rand(0.4, 2.2);
        this.isStreak = Math.random() < 0.25;
        this.streakLen = rand(3, 9);
        this.angle = rand(-Math.PI / 4, Math.PI / 4);
        this.vx = rand(-0.08, 0.08);
        this.vy = rand(-0.12, 0.06);
        this.alpha = rand(0.3, 0.95);
        this.alphaTarget = rand(0.2, 0.95);
        this.alphaSpeed = rand(0.003, 0.012);
        this.twinkle = Math.random() < 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.twinkle) {
          this.alpha += (this.alphaTarget - this.alpha) * this.alphaSpeed;
          if (Math.abs(this.alpha - this.alphaTarget) < 0.02)
            this.alphaTarget = rand(0.05, 0.9);
        }
        if (this.x < -20) this.x = W + 20;
        if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        if (this.y > H + 20) this.y = -20;
      }

      draw() {
        const [r, g, b] = this.color;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        if (this.isStreak) {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle + Math.PI / 2);
          const grad = ctx.createLinearGradient(0, -this.streakLen / 2, 0, this.streakLen / 2);
          grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = this.size;
          ctx.beginPath();
          ctx.moveTo(0, -this.streakLen / 2);
          ctx.lineTo(0, this.streakLen / 2);
          ctx.stroke();
        } else {
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
          glow.addColorStop(0, `rgba(${r},${g},${b},1)`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    let particles: Particle[] = [];

    function init() {
      const parent = canvas!.parentElement;
      W = canvas!.width = parent ? parent.offsetWidth : window.innerWidth;
      H = canvas!.height = parent ? parent.offsetHeight : window.innerHeight;
      const count = Math.floor((W * H) / 7000);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) { p.update(); p.draw(); }
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", init);
    init();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}