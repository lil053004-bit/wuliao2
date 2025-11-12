import { useEffect, useRef } from 'react';

const popularJapaneseStocks = [
  { name: 'トヨタ', size: 'large' },
  { name: 'ソニー', size: 'large' },
  { name: '任天堂', size: 'medium' },
  { name: 'ソフトバンク', size: 'large' },
  { name: 'キーエンス', size: 'medium' },
  { name: '三菱UFJ', size: 'medium' },
  { name: 'ファーストリ', size: 'small' },
  { name: 'リクルート', size: 'medium' },
  { name: '日立', size: 'medium' },
  { name: 'パナソニック', size: 'small' },
  { name: '三井物産', size: 'small' },
  { name: '伊藤忠', size: 'small' },
  { name: 'KDDI', size: 'medium' },
  { name: '東京エレクトロン', size: 'small' },
  { name: 'ダイキン', size: 'small' },
  { name: '信越化学', size: 'small' },
  { name: '武田薬品', size: 'medium' },
  { name: 'ホンダ', size: 'medium' },
  { name: '日産', size: 'small' },
  { name: 'セブン&アイ', size: 'small' },
];

export default function RadarStockDiscovery() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const magnifier = magnifierRef.current;
    if (!canvas || !magnifier) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let animationFrame: number;
    let radarAngle = 0;
    let magnifierX = 150;
    let magnifierY = 100;
    let velocityX = 1.2;
    let velocityY = 0.8;
    let time = 0;

    const stockPositions = popularJapaneseStocks.map((stock, index) => {
      const angle = (index / popularJapaneseStocks.length) * Math.PI * 2;
      const radius = 80 + Math.random() * 120;
      return {
        ...stock,
        angle,
        radius,
        x: 0,
        y: 0,
      };
    });

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxRadius = Math.min(rect.width, rect.height) / 2 - 20;

      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.strokeStyle = 'rgba(255, 167, 38, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 3) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.stroke();
      }

      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + Math.cos(radarAngle) * maxRadius,
        centerY + Math.sin(radarAngle) * maxRadius
      );
      gradient.addColorStop(0, 'rgba(255, 167, 38, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 167, 38, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 167, 38, 0.05)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, radarAngle - 0.5, radarAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      radarAngle += 0.02;

      time += 0.01;
      magnifierX += velocityX;
      magnifierY += velocityY;

      magnifierX += Math.sin(time * 2) * 0.5;
      magnifierY += Math.cos(time * 1.7) * 0.5;

      if (magnifierX < 60 || magnifierX > rect.width - 60) {
        velocityX = -velocityX * (0.9 + Math.random() * 0.2);
        magnifierX = Math.max(60, Math.min(rect.width - 60, magnifierX));
      }
      if (magnifierY < 60 || magnifierY > rect.height - 60) {
        velocityY = -velocityY * (0.9 + Math.random() * 0.2);
        magnifierY = Math.max(60, Math.min(rect.height - 60, magnifierY));
      }

      if (Math.random() < 0.02) {
        velocityX += (Math.random() - 0.5) * 0.5;
        velocityY += (Math.random() - 0.5) * 0.5;
      }

      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      const maxSpeed = 2;
      if (speed > maxSpeed) {
        velocityX = (velocityX / speed) * maxSpeed;
        velocityY = (velocityY / speed) * maxSpeed;
      }

      magnifier.style.transform = `translate(${magnifierX - 40}px, ${magnifierY - 40}px)`;

      stockPositions.forEach((stock) => {
        stock.angle += 0.003;
        const adjustedRadius = stock.radius * (maxRadius / 200);
        stock.x = centerX + Math.cos(stock.angle) * adjustedRadius;
        stock.y = centerY + Math.sin(stock.angle) * adjustedRadius;

        const dx = stock.x - magnifierX;
        const dy = stock.y - magnifierY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const revealRadius = 70;

        if (distance < revealRadius) {
          const alpha = 1 - (distance / revealRadius) * 0.3;
          let fontSize: number;
          if (stock.size === 'large') fontSize = 24;
          else if (stock.size === 'medium') fontSize = 18;
          else fontSize = 14;

          ctx.font = `bold ${fontSize}px 'Noto Sans JP', sans-serif`;
          ctx.fillStyle = `rgba(255, 167, 38, ${alpha})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.shadowColor = 'rgba(255, 167, 38, 0.8)';
          ctx.shadowBlur = 10;
          ctx.fillText(stock.name, stock.x, stock.y);
          ctx.shadowBlur = 0;
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: '300px' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}
      />

      <div
        ref={magnifierRef}
        className="absolute pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          transition: 'transform 0.05s linear',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(255,167,38,0.6)]"
        >
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="url(#magnifierGradient)"
            strokeWidth="4"
            fill="rgba(255, 255, 255, 0.05)"
          />
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="rgba(255, 255, 255, 0.1)"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="50"
            x2="70"
            y2="70"
            stroke="url(#handleGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="rgba(255, 255, 255, 0.4)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="magnifierGradient" x1="0" y1="0" x2="60" y2="60">
              <stop offset="0%" stopColor="#ffa726" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient id="handleGradient" x1="50" y1="50" x2="70" y2="70">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ffa726" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
