import { Building, Mail, Phone } from 'lucide-react';

export default function CompanyInfoBanner() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-slate-700 p-2 rounded-lg">
            <Building className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">運営会社情報</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-slate-300 font-semibold">株式会社金融グループ / Financial Group Inc</p>
                <p className="text-slate-400 text-xs">金融商品取引業者ではありません（投資助言業務・金融商品仲介業務は行いません）</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">contact@financialgroup.jp</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
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
    </div>
  );
}
