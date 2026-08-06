import React from 'react';
import { Globe as GlobeIcon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ registrationUrl = "www.globaltalenthunt.com", buttonText = "REGISTER NOW", onRegisterClick }: { registrationUrl?: string, buttonText?: string, onRegisterClick?: () => void }) {
  return (
    <header className="relative z-50 flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 pt-6 shrink-0 w-full max-w-7xl mx-auto">
      <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
        <GlobeIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-700 shrink-0 group-hover:text-purple-500 transition-colors" strokeWidth={1} />
        <div className="text-[10px] md:text-sm font-medium text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
          One World. Endless Talent.<br />
          Limitless Opportunities.
        </div>
      </Link>
      
      <button 
        onClick={() => onRegisterClick ? onRegisterClick() : window.open(registrationUrl, '_blank')}
        className="flex flex-col items-center justify-center px-6 py-2 md:py-2.5 rounded-full bg-[#11131c] text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden border border-white/10 shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex items-center gap-2 relative z-10">
          <span className="font-bold tracking-[0.2em] text-[10px] md:text-[12px] text-white uppercase">{buttonText}</span>
          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        
        <span className="text-[7px] md:text-[9px] text-gray-400 font-medium tracking-widest relative z-10 mt-0.5 uppercase">{registrationUrl.replace('https://', '').split('/')[0]}</span>
      </button>
    </header>
  );
}
