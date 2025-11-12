import { StockPrice } from '../types/stock';

interface ScrollingHistoryDataProps {
  prices: StockPrice[];
  stockName: string;
}

export default function ScrollingHistoryData({ prices, stockName }: ScrollingHistoryDataProps) {
  if (prices.length === 0) {
    return null;
  }

  const doubledPrices = [...prices.slice(0, 10), ...prices.slice(0, 10)];

  return (
    <div className="px-4 py-3">
      <div className="max-w-lg mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(31, 17, 8, 0.95) 50%, rgba(45, 24, 16, 0.95) 100%)',
            border: '2px solid rgba(255, 167, 38, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 140, 66, 0.2)',
            height: '300px'
          }}
        >
          <div className="text-center pt-4 pb-2">
            <h2 className="text-2xl font-bold text-transparent select-none">&nbsp;</h2>
          </div>
          <div className="relative z-10 px-6 py-2 h-full overflow-hidden">
            <div className="animate-scroll-step">
              {doubledPrices.map((price, index) => {
                return (
                  <div
                    key={`${price.date}-${index}`}
                    className="h-[110px] flex flex-col justify-center"
                  >
                    <div className="text-center mb-1">
                      <div className="flex items-center justify-center gap-3 text-sm mb-1">
                        <span className="text-amber-400 font-semibold drop-shadow">{price.date}</span>
                        <span className="text-amber-300/60">•</span>
                        <span className="text-accent-red text-xs font-semibold">{price.volume || 'N/A'}株</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">始値</span>
                          <span className="text-accent-red text-xs font-semibold">{price.open}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">終値</span>
                          <span className="text-accent-red text-xs font-semibold">{price.close}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">前日比</span>
                          <span className="text-accent-red text-xs font-semibold">{price.change || '0.0'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">PER</span>
                          <span className="text-accent-red font-semibold">{price.per || 'N/A'}<span className="text-[10px]">倍</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">PBR</span>
                          <span className="text-accent-red font-semibold">{price.pbr || 'N/A'}<span className="text-[10px]">倍</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold drop-shadow">利回り</span>
                          <span className="text-accent-red font-semibold">{price.dividend || 'N/A'}<span className="text-[10px]">%</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-amber-200/80">
            データ出典: 公開市場情報 | 更新: 準リアルタイム
          </p>
          <p className="text-xs text-amber-200/60 mt-1">
            ※過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
