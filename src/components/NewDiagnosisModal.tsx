import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import RobotScholarIcon from './RobotScholarIcon';

interface NewDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  stockPrice: string;
  priceChange: string;
  isStreaming?: boolean;
  isConnecting?: boolean;
  onLineConversion?: () => void;
}

const formatAnalysisText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const formattedLine = line.replace(/(\d+\.?\d*%?|\d+円|[+-]\d+\.?\d*)/g, (match) => {
      return `<span class="text-orange-600 font-semibold text-lg">${match}</span>`;
    });

    const isBold = line.includes('###') || line.includes('**') || line.match(/^[\d]+\./);
    const cleanLine = formattedLine.replace(/###|\*\*/g, '');

    if (isBold) {
      return `<div key="${index}" class="font-bold text-gray-900 mt-4 mb-2">${cleanLine}</div>`;
    }

    return `<div key="${index}" class="text-gray-700">${cleanLine}</div>`;
  }).join('');
};

export default function NewDiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  stockPrice,
  priceChange,
  isStreaming = false,
  isConnecting = false,
  onLineConversion,
}: NewDiagnosisModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-2 sm:p-4 backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.85) 0%, rgba(255, 167, 38, 0.85) 50%, rgba(255, 183, 77, 0.85) 100%)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[95vh] z-[9999]" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border-4 border-white pt-12 sm:pt-16">
          <div className="relative sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between border-b-4 border-orange-400 backdrop-blur-sm z-10 shadow-lg">
          <div className="flex-1 text-center pr-8">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
              {stockName}（{stockCode}）AI市場分析レポート（参考資料）
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm hover:shadow-lg"
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4 bg-gradient-to-br from-orange-50 to-amber-50">

          <p className="text-xs text-center text-gray-600 mb-3">
            データ出典: 公開市場情報 | 本レポートは参考資料であり、投資助言ではありません
          </p>

          <div className="relative bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 border-orange-200 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-orange-200/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative space-y-2 sm:space-y-3">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-orange-200 backdrop-blur-sm shadow-lg">
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                  {isConnecting ? (
                    <div className="text-center py-4">
                      <p className="text-orange-600 font-bold">市場データ分析中...</p>
                    </div>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: formatAnalysisText(analysis) }} />
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse ml-1"></span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {onLineConversion && (
                <>
                  <button
                    onClick={onLineConversion}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm mt-6 animate-button-pulse animate-glow-ring-green group"
                    style={{ willChange: 'transform' }}
                  >
                    <div
                      className="absolute inset-0 opacity-20 animate-gradient-shift"
                      style={{
                        background: 'linear-gradient(90deg, rgba(34,197,94,0.3) 0%, rgba(74,222,128,0.5) 50%, rgba(34,197,94,0.3) 100%)',
                        backgroundSize: '200% 100%'
                      }}
                    />

                    <div
                      className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-[shimmer-sweep_2s_ease-in-out]"
                      style={{
                        animation: 'shimmer-sweep 5s ease-in-out infinite',
                        animationDelay: '1.5s'
                      }}
                    />

                    <ExternalLink className="relative w-6 h-6 animate-icon-bounce" />
                    <span className="relative">市場分析情報をLINEで受け取る（参考情報）</span>
                  </button>

                  <div className="mt-3 p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-600/30">
                    <p className="text-xs text-green-200 leading-relaxed">
                      LINEで登録すると、参考情報として市場分析レポートをお届けします。※投資助言ではありません
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
