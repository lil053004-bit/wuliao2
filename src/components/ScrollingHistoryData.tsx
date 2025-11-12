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
          className="relative overflow-hidden"
          style={{
            backgroundImage: 'url(/assets/top2.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
                        <span className="text-neon-green font-semibold">{price.date}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-accent-red text-xs font-semibold">{price.volume || 'N/A'}株</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">始値</span>
                          <span className="text-accent-red text-xs font-semibold">{price.open}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">終値</span>
                          <span className="text-accent-red text-xs font-semibold">{price.close}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">前日比</span>
                          <span className="text-accent-red text-xs font-semibold">{price.change || '0.0'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">PER</span>
                          <span className="text-accent-red font-semibold">{price.per || 'N/A'}<span className="text-[10px]">倍</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">PBR</span>
                          <span className="text-accent-red font-semibold">{price.pbr || 'N/A'}<span className="text-[10px]">倍</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-neon-green font-bold">利回り</span>
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
          <p className="text-xs text-gray-400">
            データ出典: 公開市場情報 | 更新: 準リアルタイム
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ※過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
