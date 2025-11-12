import RadarStockDiscovery from './RadarStockDiscovery';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  stockCode?: string;
  stockName?: string;
  onDiagnosis?: () => void;
  disabled?: boolean;
}

export default function HeroSection({ stockCode = '----', stockName = '', onDiagnosis, disabled = false }: HeroSectionProps) {
  const hasStockData = stockCode !== '----' && stockName;

  return (
    <div className="relative w-full">
      <div className="w-full px-4 py-6 flex flex-col items-center">
        <RadarStockDiscovery />
      </div>

      {onDiagnosis && (
        <div className="px-4 py-3">
          <div className="max-w-lg mx-auto">
            <button
              onClick={onDiagnosis}
              disabled={disabled}
              className="relative group w-full py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 animate-glow-ring shadow-[0_0_30px_rgba(255,140,66,0.5)]"
            >
              <div
                className="absolute inset-0 opacity-20 animate-gradient-shift"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,140,66,0.3) 0%, rgba(255,167,38,0.5) 50%, rgba(255,140,66,0.3) 100%)',
                  backgroundSize: '200% 100%'
                }}
              />

              <div
                className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                style={{
                  animation: 'shimmer-sweep 4s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              />

              <div className="relative flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {hasStockData ? `【${stockName}】` : '銘柄'}の情報を見る
                  </span>
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <span className="text-xs text-orange-100 font-semibold">※教育・学習用の情報表示ツール</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
