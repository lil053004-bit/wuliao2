import { Link } from 'react-router-dom';
import { FileText, Shield, AlertTriangle } from 'lucide-react';

export default function LegalLinksHeader() {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <Link
            to="/terms"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1 px-2 hover:bg-slate-800 rounded"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>利用規約</span>
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            to="/privacy"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1 px-2 hover:bg-slate-800 rounded"
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>プライバシー</span>
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            to="/disclaimer"
            className="flex items-center gap-1 text-orange-300 hover:text-orange-200 transition-colors py-1 px-2 hover:bg-slate-800 rounded font-semibold"
          >
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>免責事項</span>
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            to="/risk-disclosure"
            className="flex items-center gap-1 text-red-300 hover:text-red-200 transition-colors py-1 px-2 hover:bg-slate-800 rounded font-semibold"
          >
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>リスク開示</span>
          </Link>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <Link
            to="/contact"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1 px-2 hover:bg-slate-800 rounded"
          >
            <span>お問い合わせ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
