
import React, { useEffect, useRef, useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const PixelBasketball = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Game Constants
    const GRAVITY = 0.25;
    const FRICTION = 0.98;
    const BOUNCE = 0.7;
    const P_SPEED = 5;
    const P_JUMP = -7;

    // Game State
    let ball = { x: 400, y: 200, vx: 0, vy: 0, radius: 10 };
    let p1 = { x: 150, y: 350, vx: 0, vy: 0, angle: 0, va: 0, score: 0, color: '#6366f1' };
    let p2 = { x: 650, y: 350, vx: 0, vy: 0, angle: 0, va: 0, score: 0, color: '#f43f5e' };
    
    const keys = {};

    const handleKeyDown = (e) => { keys[e.code] = true; };
    const handleKeyUp = (e) => { keys[e.code] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const resetBall = () => {
      ball.x = 400;
      ball.y = 100;
      ball.vx = (Math.random() - 0.5) * 10;
      ball.vy = 0;
      p1.x = 150; p1.y = 350; p1.vx = 0; p1.vy = 0; p1.angle = 0;
      p2.x = 650; p2.y = 350; p2.vx = 0; p2.vy = 0; p2.angle = 0;
    };

    const update = () => {
      if (winner) return;

      // Player 1 Controls (W or Space)
      if (keys['KeyW'] || keys['Space']) {
        if (p1.y >= 350) {
          p1.vy = P_JUMP;
          p1.va = 0.3;
          p1.vx = 2;
        }
      }
      // Player 2 Controls (Up Arrow)
      if (keys['ArrowUp']) {
        if (p2.y >= 350) {
          p2.vy = P_JUMP;
          p2.va = -0.3;
          p2.vx = -2;
        }
      }

      // Physics - Players
      [p1, p2].forEach(p => {
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.angle += p.va;
        p.va *= 0.95;

        if (p.y > 350) {
          p.y = 350;
          p.vy = 0;
          p.angle = 0;
          p.va = 0;
        }
        if (p.x < 50) p.x = 50;
        if (p.x > 750) p.x = 750;
      });

      // Physics - Ball
      ball.vy += GRAVITY;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Ball Wall Collisions
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > 800) {
        ball.vx = -ball.vx * BOUNCE;
        ball.x = ball.x < 400 ? ball.radius : 800 - ball.radius;
      }
      if (ball.y + ball.radius > 450) {
        ball.vy = -ball.vy * BOUNCE;
        ball.y = 450 - ball.radius;
      }

      // Player-Ball Collision
      [p1, p2].forEach(p => {
        // Body collision
        let dx = ball.x - p.x;
        let dy = ball.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball.radius + 20) {
          let angle = Math.atan2(dy, dx);
          ball.vx = Math.cos(angle) * 8 + p.vx;
          ball.vy = Math.sin(angle) * 8 + p.vy;
        }

        // Arm/Hand collision (wacky swing)
        let hx = p.x + Math.cos(p.angle) * 30;
        let hy = p.y + Math.sin(p.angle) * 30;
        let hdx = ball.x - hx;
        let hdy = ball.y - hy;
        let hdist = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hdist < ball.radius + 15) {
          let hangle = Math.atan2(hdy, hdx);
          ball.vx = Math.cos(hangle) * 12;
          ball.vy = Math.sin(hangle) * 12;
        }
      });

      // Hoop Detection
      // P1 Hoop (Left)
      if (ball.x < 60 && ball.y > 190 && ball.y < 210 && ball.vy > 0) {
        p2.score++;
        setScore({ p1: p1.score, p2: p2.score });
        if (p2.score >= 5) setWinner('Player 2');
        resetBall();
      }
      // P2 Hoop (Right)
      if (ball.x > 740 && ball.y > 190 && ball.y < 210 && ball.vy > 0) {
        p1.score++;
        setScore({ p1: p1.score, p2: p2.score });
        if (p1.score >= 5) setWinner('Player 1');
        resetBall();
      }
    };

    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Court Lines
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 450); ctx.lineTo(800, 450);
      ctx.stroke();

      // Hoops
      ctx.lineWidth = 6;
      // Left Hoop
      ctx.strokeStyle = '#f97316';
      ctx.strokeRect(0, 200, 50, 5);
      // Right Hoop
      ctx.strokeRect(750, 200, 50, 5);

      // Draw Players (Pixelated Rects)
      [p1, p2].forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        // Body
        ctx.fillRect(-15, -15, 30, 30);
        // Arm
        ctx.fillRect(0, -5, 35, 10);
        ctx.restore();
      });

      // Draw Ball
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      // Ball lines
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ball.x - ball.radius, ball.y); ctx.lineTo(ball.x + ball.radius, ball.y);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(() => {
        update();
        draw();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [winner]);

  return html`
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="flex justify-between w-full max-w-2xl mb-4 px-4">
        <div className="text-center">
          <div className="text-indigo-500 font-black text-4xl">${score.p1}</div>
          <div className="text-zinc-500 text-xs uppercase tracking-widest">P1 (W)</div>
        </div>
        <div className="text-zinc-400 font-bold text-xl self-center">VS</div>
        <div className="text-center">
          <div className="text-rose-500 font-black text-4xl">${score.p2}</div>
          <div className="text-zinc-500 text-xs uppercase tracking-widest">P2 (UP)</div>
        </div>
      </div>
      
      <div className="relative border-4 border-zinc-800 rounded-lg overflow-hidden shadow-2xl bg-black">
        <canvas 
          ref=${canvasRef} 
          width="800" 
          height="500" 
          className="max-w-full h-auto aspect-[16/10] cursor-none"
          style=${{ imageRendering: 'pixelated' }}
        />
        
        ${winner && html`
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <h2 className="text-white text-5xl font-black mb-4 tracking-tighter">${winner.toUpperCase()} WINS!</h2>
            <button 
              onClick=${() => { setWinner(null); setScore({ p1: 0, p2: 0 }); }}
              className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-colors"
            >
              PLAY AGAIN
            </button>
          </div>
        `}
      </div>

      <div className="mt-6 text-zinc-500 text-xs flex gap-8">
        <div className="flex items-center gap-2">
          <span className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 font-bold">W / SPACE</span> Jump & Swing P1
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 font-bold">UP ARROW</span> Jump & Swing P2
        </div>
      </div>
    </div>
  `;
};

export default PixelBasketball;
