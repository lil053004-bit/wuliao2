import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface RiskAcknowledgmentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  stockName: string;
}

export default function RiskAcknowledgmentModal({
  isOpen,
  onAccept,
  onCancel,
  stockName
}: RiskAcknowledgmentModalProps) {
  const [acceptedItems, setAcceptedItems] = useState({
    notAdvice: false,
    riskExists: false,
    selfResponsibility: false,
    consultProfessional: false
  });

  if (!isOpen) return null;

  const allAccepted = Object.values(acceptedItems).every(v => v);

  const handleCheckboxChange = (key: keyof typeof acceptedItems) => {
    setAcceptedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAccept = () => {
    if (allAccepted) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 border-b-4 border-red-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              重要：リスク確認事項
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-900 font-bold text-lg mb-2">
              【{stockName}】の情報確認を行う前に
            </p>
            <p className="text-red-800 text-sm leading-relaxed">
              以下の重要事項をご確認いただき、全ての項目にチェックを入れてください。
            </p>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={acceptedItems.notAdvice}
                onChange={() => handleCheckboxChange('notAdvice')}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-900 text-sm leading-relaxed">
                <strong className="text-red-700">本サービスは情報提供のみを目的としており、投資助言・投資勧誘ではないことを理解しました。</strong>
                当サービスは金融商品取引法第29条の登録を受けた金融商品取引業者ではありません。
              </span>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={acceptedItems.riskExists}
                onChange={() => handleCheckboxChange('riskExists')}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-900 text-sm leading-relaxed">
                <strong className="text-red-700">株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、投資元本を割り込む可能性があることを理解しました。</strong>
                過去の実績は将来の成果を保証するものではありません。
              </span>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={acceptedItems.selfResponsibility}
                onChange={() => handleCheckboxChange('selfResponsibility')}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-900 text-sm leading-relaxed">
                <strong className="text-red-700">最終的な投資判断は自己の責任において行い、本サービスの利用により生じた損害について当社は一切の責任を負わないことを理解しました。</strong>
              </span>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={acceptedItems.consultProfessional}
                onChange={() => handleCheckboxChange('consultProfessional')}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-900 text-sm leading-relaxed">
                <strong className="text-red-700">実際に投資を行う際は、証券会社等の金融商品取引業者に相談することを理解しました。</strong>
              </span>
            </label>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-amber-900 text-sm leading-relaxed">
              <strong>注意：</strong>
              本サービスで提供される情報は参考情報であり、特定の銘柄の売買を推奨・勧誘するものではありません。
              AI分析結果は過去のデータに基づくものであり、将来の投資成果を保証するものではありません。
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleAccept}
              disabled={!allAccepted}
              className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                allAccepted
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              全て確認しました
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
