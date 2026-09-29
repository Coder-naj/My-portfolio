import { useEffect, useRef } from "react";
import { useTheme, hexToRgb } from "../context/ThemeContext";

/**
 * Smoke that trails the mouse plus slow ambient plumes drifting in from the
 * top-right. Canvas 2D particles with additive blending, tinted by the
 * current accent colour. Honors prefers-reduced-motion.
 */
export function Background() {
  const canvasRef = useRef(null);
  const { accent } = useTheme();
  const accentRef = useRef(accent);

  useEffect(() => {
    accentRef.current = accent;
  }, [accent]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, lastAmbient = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let sprite = null;
    let spriteColor = "";
    const makeSprite = (hex) => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const g = c.getContext("2d");
      const [r, gr, b] = hexToRgb(hex);
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, `rgba(${r},${gr},${b},0.55)`);
      grad.addColorStop(0.4, `rgba(${r},${gr},${b},0.22)`);
      grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
      return c;
    };

    const MAX = 360;
    const parts = [];
    const spawn = (x, y, vx, vy, size, life) => {
      if (parts.length >= MAX) parts.shift();
      parts.push({ x, y, vx, vy, size, life, age: 0, seed: Math.random() * 100 });
    };

    let px = null, py = null;
    const onMove = (e) => {
      if (px !== null) {
        const dx = e.clientX - px;
        const dy = e.clientY - py;
        const speed = Math.hypot(dx, dy);
        const n = Math.min(4, Math.ceil(speed / 14));
        for (let i = 0; i < n; i++) {
          spawn(
            e.clientX - (dx * i) / n + (Math.random() - 0.5) * 12,
            e.clientY - (dy * i) / n + (Math.random() - 0.5) * 12,
            dx * 0.06,
            dy * 0.06,
            50 + Math.random() * 50 + speed * 0.4,
            90 + Math.random() * 60
          );
        }
      }
      px = e.clientX;
      py = e.clientY;
    };

    const frame = (time) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;

      if (spriteColor !== accentRef.current) {
        spriteColor = accentRef.current;
        sprite = makeSprite(spriteColor);
      }

      if (time - lastAmbient > 650) {
        lastAmbient = time;
        spawn(
          w * (0.65 + Math.random() * 0.35),
          -30,
          -0.25 - Math.random() * 0.3,
          0.35 + Math.random() * 0.3,
          140 + Math.random() * 120,
          280 + Math.random() * 160
        );
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age++;
        const t = p.age / p.life;
        if (t >= 1) {
          parts.splice(i, 1);
          continue;
        }
        p.vx += Math.sin(p.y * 0.006 + p.seed + time * 0.0008) * 0.02;
        p.vy += Math.cos(p.x * 0.006 + p.seed + time * 0.0007) * 0.02;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        const size = p.size * (1 + t * 1.6);
        ctx.globalAlpha = (1 - t) * Math.min(1, t * 8) * 0.9;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true">
        <canvas ref={canvasRef} className="site-bg__smoke" />
        <div className="site-bg__vignette" />
        <div className="site-bg__grain" />
      </div>
      <div className="mouse-spotlight" aria-hidden="true" />
    </>
  );
}
