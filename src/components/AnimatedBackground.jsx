import React, { useEffect, useRef } from "react";

const CONFIG = {
  count: 160,
  connDist: 160,
  mouseDist: 180,
  lineAlpha: 0.35,
  mouseGlowRadius: 250,
  bgColor: "#0d0d14",
  particleColors: [
    [255, 255, 255],
    [160, 180, 255],
    [180, 140, 255],
  ],
};

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrameId, W, H, particles;
    const mouse = { x: 0, y: 0 };

    class Particle {
      constructor(init) {
        this.reset(init);
      }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : Math.random() < 0.5 ? -5 : H + 5;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 1.8 + 0.6;
        this.baseAlpha = Math.random() * 0.5 + 0.35;
        this.alpha = this.baseAlpha;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.006 + Math.random() * 0.01;
        this.color =
          CONFIG.particleColors[
            Math.floor(Math.random() * CONFIG.particleColors.length)
          ];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;
        this.alpha = this.baseAlpha * (0.7 + 0.3 * Math.sin(this.pulse));
        const dx = this.x - mouse.x,
          dy = this.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONFIG.mouseDist && d > 0) {
          const force = ((CONFIG.mouseDist - d) / CONFIG.mouseDist) * 0.7;
          this.x += (dx / d) * force;
          this.y += (dy / d) * force;
        }
        if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10)
          this.reset(false);
      }
      draw() {
        const [r, g, b] = this.color;
        const grd = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.r * 4,
        );
        grd.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
        ctx.fill();
      }
    }

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      mouse.x = W / 2;
      mouse.y = H / 2;
      particles = Array.from(
        { length: CONFIG.count },
        () => new Particle(true),
      );
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i],
            p2 = particles[j];
          const dx = p1.x - p2.x,
            dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONFIG.connDist) {
            const t = 1 - d / CONFIG.connDist;
            const alpha = t * t * CONFIG.lineAlpha;
            const [r1, g1, b1] = p1.color;
            const [r2, g2, b2] = p2.color;
            const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grd.addColorStop(0, `rgba(${r1},${g1},${b1},${alpha})`);
            grd.addColorStop(1, `rgba(${r2},${g2},${b2},${alpha})`);
            ctx.strokeStyle = grd;
            ctx.lineWidth = t * 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseGlow = () => {
      const grd = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        CONFIG.mouseGlowRadius,
      );
      grd.addColorStop(0, "rgba(120,100,255,0.07)");
      grd.addColorStop(0.5, "rgba(80,120,255,0.03)");
      grd.addColorStop(1, "rgba(80,100,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, CONFIG.mouseGlowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = CONFIG.bgColor;
      ctx.fillRect(0, 0, W, H);
      drawMouseGlow();
      drawConnections();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", // fixed to viewport — never scrolls
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1, // behind absolutely everything
      }}
    />
  );
};

export default AnimatedBackground;
