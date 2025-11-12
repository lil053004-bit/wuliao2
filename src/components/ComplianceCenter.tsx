import { AlertTriangle, Database, Building, Mail, Phone, Shield, FileText, ExternalLink, X, Clock, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComplianceCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplianceCenter({ isOpen, onClose }: ComplianceCenterProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              合規情報センター
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="閉じる"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-red-900/30 border-2 border-red-600 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-300 mb-2">投資リスクに関する重要な警告</h3>
                <div className="text-red-100 text-sm space-y-2 leading-relaxed">
                  <p>
                    <strong className="underline">本サービスは情報提供のみを目的としており、投資助言・投資勧誘ではありません。</strong>
                  </p>
                  <p>
                    株式投資には<strong className="underline">元本割れのリスク</strong>があります。
                    投資判断は必ず<strong className="underline">ご自身の責任</strong>で行ってください。
                  </p>
                  <p>
                    当サービスは金融商品取引業者ではなく、投資による損失の責任は一切負いません。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-700">
              <Link
                to="/risk-disclosure"
                className="inline-flex items-center gap-2 text-red-300 hover:text-red-200 font-semibold text-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                詳細なリスク開示を確認
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-blue-900/30 border-2 border-blue-600 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-300 mb-2">データ提供に関するご注意</h3>
                <div className="text-blue-100 text-sm space-y-2 leading-relaxed">
                  <p>
                    株価データは公開市場情報に基づいており、データ提供元の都合により<strong>15-20分程度遅延</strong>する場合があります。
                  </p>
                  <p>
                    表示される情報の正確性、完全性、適時性を保証するものではありません。
                  </p>
                  <div className="flex items-center gap-2 text-blue-300 mt-3">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">準リアルタイム配信</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border-2 border-slate-600 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Building className="w-6 h-6 text-slate-300 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-200 mb-3">運営会社情報</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-200 font-semibold">株式会社金融グループ / Financial Group Inc</p>
                    <p className="text-slate-400 text-xs mt-1">金融商品取引業者ではありません（投資助言業務・金融商品仲介業務は行いません）</p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs">contact@financialgroup.jp</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs">+81 3-5555-1234</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs pt-2">
                    所在地: 〒100-0004 東京都千代田区大手町2-6-1
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/30 border-2 border-indigo-600 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-indigo-300 mb-2">Cookie使用について</h3>
                <div className="text-indigo-100 text-sm space-y-2 leading-relaxed">
                  <p>
                    当サイトでは、サービスの利便性向上およびGoogle AdSenseによる広告配信のためにCookieを使用しています。
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs">
                    <Link
                      to="/privacy"
                      className="text-indigo-300 hover:text-indigo-200 underline flex items-center gap-1"
                    >
                      プライバシーポリシー
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <span className="text-slate-500">|</span>
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-indigo-200 underline flex items-center gap-1"
                    >
                      Google広告設定
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
            <h3 className="text-base font-bold text-slate-200 mb-3">法律関連文書</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Link
                to="/terms"
                className="flex items-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>利用規約</span>
              </Link>
              <Link
                to="/privacy"
                className="flex items-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white text-sm"
              >
                <Shield className="w-4 h-4" />
                <span>プライバシー</span>
              </Link>
              <Link
                to="/disclaimer"
                className="flex items-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-orange-300 hover:text-orange-200 text-sm font-semibold"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>免責事項</span>
              </Link>
              <Link
                to="/risk-disclosure"
                className="flex items-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-red-300 hover:text-red-200 text-sm font-semibold"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>リスク開示</span>
              </Link>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
