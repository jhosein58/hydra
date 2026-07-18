"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mouse = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.scale(dpr, dpr);
    };

    resize();

    const particles: Particle[] = [];

    const PARTICLE_COUNT = Math.min(
      120,
      Math.floor((window.innerWidth * window.innerHeight) / 25000),
    );

    function createParticles() {
      particles.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    }

    createParticles();

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -1;
        }

        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -1;
        }

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          particle.x -= dx * 0.003;
          particle.y -= dy * 0.003;
        }

        ctx.beginPath();

        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = distance < 120 ? "#7ab6ff" : "#4f8cff";

        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > 140 * 140) continue;

          const distance = Math.sqrt(distanceSquared);

          const opacity = 1 - distance / 140;

          ctx.beginPath();

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(79, 140, 255, ${opacity * 0.25})`;

          ctx.lineWidth = 1;

          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}
