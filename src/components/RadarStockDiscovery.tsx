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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

      const colors = [
        { base: 'rgba(0, 200, 255, 0.4)', glow: 'rgba(0, 200, 255, 0.6)' },
        { base: 'rgba(255, 100, 200, 0.4)', glow: 'rgba(255, 100, 200, 0.6)' },
        { base: 'rgba(100, 255, 100, 0.4)', glow: 'rgba(100, 255, 100, 0.6)' },
      ];

      for (let i = 1; i <= 3; i++) {
        const colorSet = colors[i - 1];
        const pulseOffset = Math.sin(Date.now() * 0.001 + i * 0.5) * 0.15;

        ctx.shadowColor = colorSet.glow;
        ctx.shadowBlur = 8 + pulseOffset * 5;
        ctx.strokeStyle = colorSet.base.replace('0.4', String(0.4 + pulseOffset));
        ctx.lineWidth = 2 + pulseOffset * 0.5;

        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 3) * i, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(200, 150, 255, 0.3)';
      ctx.lineWidth = 1.5;
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

      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      sweepGradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
      sweepGradient.addColorStop(0.5, 'rgba(255, 100, 150, 0.2)');
      sweepGradient.addColorStop(1, 'rgba(100, 200, 255, 0.05)');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, radarAngle - 0.5, radarAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      const trailGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      trailGradient.addColorStop(0, 'rgba(100, 200, 255, 0.15)');
      trailGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

      ctx.fillStyle = trailGradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, radarAngle - 1.5, radarAngle - 0.5);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      radarAngle += 0.02;

      stockPositions.forEach((stock, index) => {
        stock.angle += 0.003;
        const adjustedRadius = stock.radius * (maxRadius / 200);
        stock.x = centerX + Math.cos(stock.angle) * adjustedRadius;
        stock.y = centerY + Math.sin(stock.angle) * adjustedRadius;

        let stockAngle = Math.atan2(stock.y - centerY, stock.x - centerX);
        if (stockAngle < 0) stockAngle += Math.PI * 2;

        let normalizedRadarAngle = radarAngle % (Math.PI * 2);
        if (normalizedRadarAngle < 0) normalizedRadarAngle += Math.PI * 2;

        let angleDiff = Math.abs(stockAngle - normalizedRadarAngle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;

        const sweepAngle = 1.2;
        if (angleDiff < sweepAngle) {
          const alpha = 1 - (angleDiff / sweepAngle) * 0.5;
          let fontSize: number;
          if (stock.size === 'large') fontSize = 24;
          else if (stock.size === 'medium') fontSize = 18;
          else fontSize = 14;

          const hue = (index * 30 + Date.now() * 0.05) % 360;
          const color = `hsla(${hue}, 85%, 65%, ${alpha})`;
          const glowColor = `hsla(${hue}, 90%, 70%, 0.8)`;

          ctx.font = `bold ${fontSize}px 'Noto Sans JP', sans-serif`;
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 15;
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
        style={{ borderRadius: '8px' }}
      />
    </div>
  );
}
