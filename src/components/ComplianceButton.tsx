import { Shield, Info } from 'lucide-react';
import { useState } from 'react';

interface ComplianceButtonProps {
  onClick: () => void;
}

export default function ComplianceButton({ onClick }: ComplianceButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl transition-all duration-300 ease-out hover:scale-105 border-2 border-blue-400/50"
        aria-label="合規情報を表示"
      >
        <div className={`flex items-center gap-2 transition-all duration-300 ${isHovered ? 'px-4 py-3' : 'p-3'}`}>
          <Shield className="w-6 h-6 flex-shrink-0" />
          <span
            className={`font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            合規情報
          </span>
        </div>

        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 animate-pulse">
          <Info className="w-3 h-3 text-white" />
        </div>

        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      </button>

      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-lg whitespace-nowrap border border-slate-700 animate-fade-in">
          重要な法律情報を確認
          <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-900/95" />
        </div>
      )}
    </div>
  );
}
