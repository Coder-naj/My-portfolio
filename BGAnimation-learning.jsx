import { useEffect, useRef } from "react";

export function SimpleParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle array
    const particles = [];

    // Create one particle
    function createParticle(x, y) {
      return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,   // random velocity X
        vy: (Math.random() - 0.5) * 2,   // random velocity Y
        size: 20 + Math.random() * 30,
        life: 100,                      // how long it lives
        age: 0
      };
    }

    // Spawn particles on mouse move
    const handleMouseMove = (e) => {
      particles.push(createParticle(e.clientX, e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    function animate() {
      // Clear the canvas with a fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw every particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade out
        const opacity = 1 - p.age / p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${opacity})`;
        ctx.fill();

        // Remove dead particles
        if (p.age >= p.life) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#111",
        zIndex: -1
      }}
    />
  );
}