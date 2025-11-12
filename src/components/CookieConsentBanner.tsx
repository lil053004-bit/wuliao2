import { Cookie, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t-4 border-blue-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-base mb-2">Cookie使用に関するお知らせ</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                当サイトでは、サービスの利便性向上およびGoogle AdSenseによる広告配信のためにCookieを使用しています。
                継続してご利用いただくことで、Cookieの使用に同意したものとみなされます。
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  to="/privacy"
                  className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                >
                  プライバシーポリシー
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="text-gray-500">|</span>
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                >
                  広告設定
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              拒否
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm"
            >
              同意する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
