import { AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RiskDisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem('risk-disclaimer-acknowledged');
    if (acknowledged !== 'true') {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('risk-disclaimer-acknowledged', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 to-red-600 border-b-2 border-red-700 shadow-xl animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-xs md:text-sm leading-tight">
              投資リスク警告：本サービスは情報提供のみを目的とし、投資助言ではありません。投資判断はご自身の責任で行ってください。
            </p>
          </div>
          <button
            onClick={handleAcknowledge}
            className="px-3 py-1 bg-white text-red-700 font-bold text-xs rounded hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            了解
          </button>
          <button
            onClick={handleAcknowledge}
            className="p-1 hover:bg-red-700 rounded transition-colors flex-shrink-0"
            aria-label="閉じる"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
