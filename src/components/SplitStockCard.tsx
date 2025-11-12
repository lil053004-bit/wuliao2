import { TrendingUp, TrendingDown } from 'lucide-react';
import { StockInfo, StockPrice } from '../types/stock';

interface SplitStockCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function SplitStockCard({ info, latestPrice }: SplitStockCardProps) {
  const isPositive = info.change.includes('+') || parseFloat(info.change) > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="px-4 py-3">
      <div className="max-w-lg mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(31, 17, 8, 0.95) 50%, rgba(45, 24, 16, 0.95) 100%)',
            border: '2px solid rgba(255, 167, 38, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 140, 66, 0.2)'
          }}
        >
          <div className="relative z-10 px-4 py-6">
            <div>
              <div className="text-center pt-18 pb-2">
                <div className="text-amber-400 text-xl font-bold mb-1 drop-shadow-lg">
                  {info.name} ({info.code})
                </div>
                <div className="text-amber-300 text-sm drop-shadow">
                  {info.timestamp}
                </div>
              </div>

              <div className="grid gap-1" style={{ gridTemplateColumns: '40% 60%' }}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl text-accent-red font-black">
                      ¥{info.price}
                    </div>
                    <TrendIcon className="w-6 h-6 text-accent-red" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-amber-400 font-semibold drop-shadow">{info.change}</span>
                    <span className="text-sm text-amber-400 font-semibold drop-shadow">{info.changePercent}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold drop-shadow">始値</span>
                    <span className="text-accent-red">{latestPrice?.open || info.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold drop-shadow">高値</span>
                    <span className="text-accent-red">{latestPrice?.high || info.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold drop-shadow">終値</span>
                    <span className="text-accent-red">{latestPrice?.close || info.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold drop-shadow">安値</span>
                    <span className="text-accent-red">{latestPrice?.low || info.price}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-600/30">
                    <span className="text-amber-300 font-bold drop-shadow">前日比</span>
                    <span className="text-amber-400 font-semibold drop-shadow">{info.changePercent}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-600/30">
                    <span className="text-amber-300 font-bold drop-shadow">売買高</span>
                    <span className="text-accent-red">{latestPrice?.volume || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className="text-xs text-amber-200/80">
            データ出典: 公開市場情報（準リアルタイム）
          </p>
          <p className="text-xs text-amber-200/60 mt-1">
            ※本情報は参考資料であり、投資助言ではありません
          </p>
        </div>
      </div>
    </div>
  );
}
