import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  phase: number;
  fadeSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export default function StarCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Resize Observer for robust dimensional tracking
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      
      // Update canvas resolution (taking into account high-DPI displays)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Star collection
    const starCount = Math.min(180, Math.floor((dimensions.width * dimensions.height) / 10000));
    const stars: Star[] = [];
    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(173, 216, 230, ', // Light blue
      'rgba(255, 244, 224, ', // Soft yellow
      'rgba(240, 248, 255, '  // Alice blue
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 1.5 + 0.2,
        speed: Math.random() * 0.04 + 0.01,
        alpha: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        fadeSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Meteor setup
    let meteor: Meteor = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false
    };

    const triggerMeteor = () => {
      meteor.active = true;
      meteor.x = Math.random() * (dimensions.width * 0.6);
      meteor.y = Math.random() * (dimensions.height * 0.4);
      meteor.length = Math.random() * 80 + 40;
      meteor.speed = Math.random() * 12 + 8;
      meteor.angle = Math.PI / 6 + (Math.random() * 0.15 - 0.07); // ~30 degrees
      meteor.opacity = 1;
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw Nebulous Gas/Background Glowing Orbs (Atmospheric glow)
      const gradient1 = ctx.createRadialGradient(
        dimensions.width * 0.8, dimensions.height * 0.1, 10,
        dimensions.width * 0.8, dimensions.height * 0.1, Math.max(300, dimensions.width * 0.3)
      );
      gradient1.addColorStop(0, 'rgba(30, 58, 138, 0.05)'); // blue-900 10%
      gradient1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const gradient2 = ctx.createRadialGradient(
        dimensions.width * 0.15, dimensions.height * 0.75, 10,
        dimensions.width * 0.15, dimensions.height * 0.75, Math.max(400, dimensions.width * 0.4)
      );
      gradient2.addColorStop(0, 'rgba(88, 28, 135, 0.03)'); // purple-900 5%
      gradient2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // 2. Render and update Stars
      for (const star of stars) {
        // Slow horizontal drifting representing parallax drift
        star.x += star.speed;
        if (star.x > dimensions.width) {
          star.x = 0;
          star.y = Math.random() * dimensions.height;
        }

        // Twinkle phase calculations
        star.phase += star.fadeSpeed;
        const twinkleAlpha = star.alpha * (0.4 + 0.6 * Math.sin(star.phase));

        ctx.fillStyle = `${star.color}${twinkleAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Sub-pixel beautiful blooming for prominent stars
        if (star.size > 1.3) {
          ctx.fillStyle = `${star.color}${twinkleAlpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Render and update Meteor if active
      if (meteor.active) {
        const dx = Math.cos(meteor.angle) * meteor.speed;
        const dy = Math.sin(meteor.angle) * meteor.speed;

        ctx.strokeStyle = `rgba(186, 230, 253, ${meteor.opacity})`; // Sky-200
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + Math.cos(meteor.angle) * meteor.length, meteor.y + Math.sin(meteor.angle) * meteor.length);
        ctx.stroke();

        meteor.x += dx;
        meteor.y += dy;
        meteor.opacity -= 0.025;

        if (meteor.opacity <= 0 || meteor.x > dimensions.width || meteor.y > dimensions.height) {
          meteor.active = false;
        }
      } else {
        // Very rare trigger chance for meteors
        if (Math.random() < 0.002) {
          triggerMeteor();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
