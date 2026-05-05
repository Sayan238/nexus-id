import { useEffect, useRef, useCallback } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticles = useCallback((width, height) => {
    const particles = [];
    const isMobile = width < 768;
    // Dramatically reduce count on mobile for performance
    const baseCount = isMobile ? 50 : 180;
    const count = Math.min(Math.floor((width * height) / (isMobile ? 12000 : 5000)), baseCount);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 1.5 : 2.5) + 0.5,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.5 : 0.8),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.5 : 0.8),
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        isGold: Math.random() > 0.6,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    // Cap DPR for mobile performance (don't over-render on tiny high-res screens)
    let dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      particlesRef.current = createParticles(width, height);
    };

    resize();

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        p.pulse += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulse) * 0.4 + 0.6;

        // Mouse interaction: faster attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 300 * 0.04;
          p.speedX += dx * force * 0.02;
          p.speedY += dy * force * 0.02;
        }

        // Dampen speed - Less damping for more "flow"
        p.speedX *= 0.997;
        p.speedY *= 0.997;

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle
        const color = p.isGold
          ? `rgba(255, 215, 0, ${p.opacity * pulseFactor})`
          : `rgba(255, 255, 255, ${p.opacity * pulseFactor * 0.6})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow
        if (p.isGold) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulseFactor * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity * pulseFactor * 0.15})`;
          ctx.fill();
        }

        // Draw connections - Skip on mobile for massive performance gain
        if (width >= 768) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const connDist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (connDist < 150) {
              const alpha = (1 - connDist / 150) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.isGold || p2.isGold
                ? `rgba(255, 215, 0, ${alpha})`
                : `rgba(255, 255, 255, ${alpha * 0.6})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
