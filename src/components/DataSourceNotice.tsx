import { Clock, Database } from 'lucide-react';

export default function DataSourceNotice() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-3">
      <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex items-start gap-2 flex-1">
            <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-blue-900 font-semibold text-xs sm:text-sm mb-1">
                データ提供に関するご注意
              </p>
              <p className="text-blue-800 text-xs leading-relaxed">
                株価データは公開市場情報に基づいており、データ提供元の都合により15-20分程度遅延する場合があります。
                表示される情報の正確性、完全性、適時性を保証するものではありません。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-700 text-xs whitespace-nowrap">
            <Clock className="w-4 h-4" />
            <span>準リアルタイム</span>
          </div>
        </div>
      </div>
    </div>
  );
}
