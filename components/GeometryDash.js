
import React, { useEffect, useRef, useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GeometryDash = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [percentage, setPercentage] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -10;
    const SPEED = 6;
    const PLAYER_SIZE = 30;
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 450;

    // Game Objects
    let player = {
      x: 100,
      y: CANVAS_HEIGHT - 80 - PLAYER_SIZE,
      vy: 0,
      rotation: 0,
      onGround: true
    };

    let obstacles = [];
    let particles = [];
    let frameCount = 0;
    let distance = 0;
    let isGameRunning = false;

    const createObstacle = (type, x) => {
      // types: 'spike', 'block'
      return { x, type, width: 40, height: 40 };
    };

    // Simple procedural level generator state
    let nextObstacleX = 600;

    const resetGame = () => {
      player = {
        x: 100,
        y: CANVAS_HEIGHT - 80 - PLAYER_SIZE,
        vy: 0,
        rotation: 0,
        onGround: true
      };
      obstacles = [];
      particles = [];
      frameCount = 0;
      distance = 0;
      nextObstacleX = 600;
      setPercentage(0);
    };

    const jump = () => {
      if (player.onGround) {
        player.vy = JUMP_FORCE;
        player.onGround = false;
        // Sparkle particles on jump
        for(let i=0; i<5; i++) {
          particles.push({
            x: player.x,
            y: player.y + PLAYER_SIZE,
            vx: -Math.random() * 3,
            vy: Math.random() * 2,
            life: 1,
            color: '#818cf8'
          });
        }
      }
    };

    const handleInput = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.type === 'mousedown') {
        if (isGameRunning) {
          jump();
        } else {
          startGame();
        }
        if (e.type !== 'mousedown') e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('mousedown', handleInput);

    const startGame = () => {
      resetGame();
      isGameRunning = true;
      setGameState('PLAYING');
    };

    const endGame = () => {
      isGameRunning = false;
      setGameState('GAMEOVER');
      setBest(prev => Math.max(prev, Math.floor(distance / 50)));
    };

    const update = () => {
      if (!isGameRunning) return;

      distance += SPEED;
      setPercentage(Math.floor(distance / 100));

      // Physics
      player.vy += GRAVITY;
      player.y += player.vy;

      // Ground collision
      const groundY = CANVAS_HEIGHT - 80;
      if (player.y + PLAYER_SIZE > groundY) {
        player.y = groundY - PLAYER_SIZE;
        player.vy = 0;
        player.onGround = true;
        // Snap rotation to 90deg increments when landing
        player.rotation = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2);
      } else {
        player.rotation += 0.15; // Rotate in air
      }

      // Procedural Generation
      if (nextObstacleX < player.x + CANVAS_WIDTH) {
        const type = Math.random() > 0.4 ? 'spike' : 'block';
        obstacles.push(createObstacle(type, nextObstacleX));
        nextObstacleX += 250 + Math.random() * 300;
      }

      // Obstacle collision and movement
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= SPEED;

        // Collision Check
        const pRect = { left: player.x + 5, right: player.x + PLAYER_SIZE - 5, top: player.y + 5, bottom: player.y + PLAYER_SIZE - 5 };
        const oRect = { left: obs.x + 5, right: obs.x + obs.width - 5, top: groundY - obs.height + 5, bottom: groundY - 5 };

        if (obs.type === 'spike') {
          // Approximate triangle collision
          if (pRect.right > oRect.left && pRect.left < oRect.right && pRect.bottom > oRect.top) {
            endGame();
          }
        } else if (obs.type === 'block') {
           if (pRect.right > oRect.left && pRect.left < oRect.right && pRect.bottom > oRect.top) {
            // Check if hitting side or top
            if (pRect.bottom > oRect.top + 10) {
               endGame(); // Hit side
            } else {
               player.y = groundY - obs.height - PLAYER_SIZE;
               player.vy = 0;
               player.onGround = true;
               player.rotation = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2);
            }
          }
        }

        if (obs.x < -100) obstacles.splice(i, 1);
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) particles.splice(i, 1);
      }
      
      // Trail particles
      if (player.onGround && Math.random() > 0.5) {
        particles.push({
          x: player.x,
          y: player.y + PLAYER_SIZE,
          vx: -2,
          vy: -Math.random(),
          life: 0.5,
          color: 'rgba(255,255,255,0.3)'
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Distant Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      const scrollOffset = (distance % 100);
      for(let x = -scrollOffset; x < CANVAS_WIDTH; x += 100) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
      }

      // Ground
      const groundY = CANVAS_HEIGHT - 80;
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, groundY, CANVAS_WIDTH, 80);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(CANVAS_WIDTH, groundY); ctx.stroke();

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      });
      ctx.globalAlpha = 1;

      // Obstacles
      obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'spike') {
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width / 2, groundY - obs.height);
          ctx.lineTo(obs.x + obs.width, groundY);
          ctx.fill();
          // Glow
          ctx.shadowBlur = 15; ctx.shadowColor = '#f43f5e';
          ctx.strokeStyle = '#fda4af'; ctx.stroke();
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x, groundY - obs.height, obs.width, obs.height);
        }
        ctx.restore();
      });

      // Player
      ctx.save();
      ctx.translate(player.x + PLAYER_SIZE / 2, player.y + PLAYER_SIZE / 2);
      ctx.rotate(player.rotation);
      
      // Box body
      ctx.fillStyle = '#818cf8';
      ctx.fillRect(-PLAYER_SIZE/2, -PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE);
      // Face/Detail
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(-PLAYER_SIZE/2 + 4, -PLAYER_SIZE/2 + 4, PLAYER_SIZE - 8, PLAYER_SIZE - 8);
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(2, -8, 6, 6);
      ctx.fillRect(10, -8, 6, 6);
      
      ctx.restore();

      animationFrameId = requestAnimationFrame(() => {
        update();
        draw();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleInput);
      canvas.removeEventListener('mousedown', handleInput);
    };
  }, []);

  return html`
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950 font-sans select-none overflow-hidden">
      <div className="absolute top-8 left-8 flex flex-col gap-1">
        <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Progress</div>
        <div className="text-white text-3xl font-black italic tracking-tighter">${percentage}m</div>
      </div>
      
      <div className="absolute top-8 right-8 text-right">
        <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Best</div>
        <div className="text-indigo-400 text-2xl font-black italic">${best}m</div>
      </div>

      <div className="relative border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.1)] bg-black group">
        <canvas 
          ref=${canvasRef} 
          width="800" 
          height="450" 
          className="max-w-full h-auto aspect-[16/9] cursor-pointer"
        />

        ${gameState === 'START' && html`
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
            <h1 className="text-6xl font-black text-white italic tracking-tighter mb-2">NEON<span className="text-indigo-500">DASH</span></h1>
            <p className="text-zinc-400 mb-8 uppercase tracking-widest text-xs font-bold">Survive the rhythmic void</p>
            <button 
              onClick=${() => {}} 
              className="group bg-white text-black font-black px-10 py-4 rounded-full hover:scale-105 transition-transform flex items-center gap-3"
            >
              START SESSION
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
            </button>
            <div className="mt-8 flex gap-6 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <span>[SPACE] TO JUMP</span>
              <span>•</span>
              <span>[CLICK] TO JUMP</span>
            </div>
          </div>
        `}

        ${gameState === 'GAMEOVER' && html`
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/40 backdrop-blur-md">
            <div className="text-rose-500 text-xs font-black uppercase tracking-[0.3em] mb-2">Crash Detected</div>
            <h2 className="text-white text-7xl font-black italic tracking-tighter mb-8 animate-pulse">FAILED</h2>
            <button 
              onClick=${() => {}} 
              className="bg-white text-black font-black px-12 py-4 rounded-full hover:scale-105 transition-all shadow-xl shadow-white/10"
            >
              TRY AGAIN
            </button>
          </div>
        `}
      </div>

      <div className="mt-8 flex items-center gap-12">
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold">SPACE</div>
            <span className="text-[10px] text-zinc-600 font-bold uppercase">Jump</span>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            </div>
            <span className="text-[10px] text-zinc-600 font-bold uppercase">Click</span>
        </div>
      </div>
    </div>
  `;
};

export default GeometryDash;
