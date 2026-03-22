'use client';
import React, { useEffect, useRef } from 'react';

export default function InteractiveParticles({ 
  mouseX, mouseY 
}: { 
  mouseX: number; mouseY: number 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  // Use a ref for mouse coords to prevent useEffect from restarting on every tiny movement
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  // Update ref when props change without causing a re-render/re-mount
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the custom ball SVG sprite
    const ballImg = new Image();
    ballImg.src = '/icons/ball.svg';
    let ballReady = false;
    ballImg.onload = () => { ballReady = true; };
    
    // Resize mapping constraint
    let BALL_RADIUS = 25;
    const resizeRenderer = () => {
      canvas.width = window.innerWidth;
      // Floor above the dock line
      canvas.height = Math.max(0, window.innerHeight - 130);
      
      // Dynamic resizing according to screens
      BALL_RADIUS = Math.max(12, Math.min(30, canvas.width / 50));
    };
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    // Initialize exactly 200 dropping ball entities
    if (particles.current.length === 0) {
      const P_COUNT = 200;
      for (let i = 0; i < P_COUNT; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: -100 - (Math.random() * 3000), // Drop from way high up initially
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2
        });
      }
    }

    let animationId: number;

    const render = () => {
      if (!isMounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const pts = particles.current;
      const count = pts.length;
      
      // Current mouse position from tracking ref
      const currentMouseX = mouseRef.current.x;
      const currentMouseY = mouseRef.current.y;

      for (let i = 0; i < count; i++) {
        const p = pts[i];
        
        // Physics constants
        p.vy += 0.25; // Gravity
        p.vx *= 0.985; // Friction
        p.vy *= 0.985;

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repelling calculation (push strongly aside)
        if (currentMouseY < canvas.height && currentMouseY > 0 && currentMouseX > 0 && currentMouseX < canvas.width) {
          const dx = p.x - currentMouseX;
          const dy = p.y - currentMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < 150) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 4.5;
            p.vy += (dy / dist) * force * 4.5;
          }
        }

        // Boundary walls
        if (p.x < BALL_RADIUS) { p.x = BALL_RADIUS; p.vx *= -0.5; }
        if (p.x > canvas.width - BALL_RADIUS) { p.x = canvas.width - BALL_RADIUS; p.vx *= -0.5; }
        
        // The Yellow Line (invisible floor bounds)
        if (p.y > canvas.height - BALL_RADIUS) {
          p.y = canvas.height - BALL_RADIUS;
          p.vy *= -0.3; // Bounce floor
        }
      }

      // Ball-to-ball elastic collision resolution
      for (let i = 0; i < count; i++) {
        const p = pts[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = pts[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = BALL_RADIUS * 2;
          
          if (dist > 0 && dist < minD) {
            const overlap = minD - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            
            // Resolve intersection linearly
            p.x -= nx * overlap * 0.5;
            p.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;
            
            // Gentle momentum transfer simulation
            const p1vx = p.vx, p1vy = p.vy;
            p.vx = p.vx * 0.9 + p2.vx * 0.1;
            p.vy = p.vy * 0.9 + p2.vy * 0.1;
            p2.vx = p2.vx * 0.9 + p1vx * 0.1;
            p2.vy = p2.vy * 0.9 + p1vy * 0.1;
          }
        }
        
        // Render step (Draw the custom uploaded SVG sprite if ready)
        if (ballReady) {
          ctx.drawImage(ballImg, p.x - BALL_RADIUS, p.y - BALL_RADIUS, BALL_RADIUS * 2, BALL_RADIUS * 2);
        } else {
          // Fallback while loading
          ctx.fillStyle = 'orange';
          ctx.beginPath();
          ctx.arc(p.x, p.y, BALL_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeRenderer);
    };
  }, []); // Run ONCE, track mouse via ref inside loop

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
