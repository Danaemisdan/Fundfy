import React from 'react';
import { Globe as GlobeIcon, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MotionButton } from '../ui/MotionButton';

export default function Header({ registrationUrl = "/register", buttonText = "REGISTER NOW", onRegisterClick, logoUrl = "/" }: { registrationUrl?: string, buttonText?: string, onRegisterClick?: () => void, logoUrl?: string }) {
  const navigate = useNavigate();
  return (
    <header className="relative z-50 flex flex-row justify-between items-center px-6 md:px-8 lg:px-12 py-4 shrink-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 shadow-sm">
      <Link to={logoUrl} className="flex items-center gap-1.5 md:gap-3 cursor-pointer group">
        <div className="flex items-center gap-1.5 md:gap-3">
          <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 md:h-7 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
          </div>
        <div className="w-[1px] h-6 bg-gray-300 hidden md:block opacity-50 ml-1"></div>
        <div className="hidden md:block text-[9px] font-bold text-gray-500 leading-tight group-hover:text-purple-500 transition-colors uppercase tracking-[0.2em]">
          PRESENTS<br />
          <span className="text-gray-900 group-hover:text-purple-500 text-[10px]">GLOBAL TALENT HUNT 2026</span>
        </div>
      </Link>
      
      <div className="flex items-center gap-2 md:gap-6">
        <Link to="/signin" className="text-[9px] md:text-xs font-bold text-gray-500 hover:text-purple-600 transition-colors uppercase tracking-wider">
          Login
        </Link>
        <MotionButton 
          onClick={() => onRegisterClick ? onRegisterClick() : navigate(registrationUrl)}
          label={buttonText}
          className="!bg-[#0a0a0a] !border-[#0a0a0a] !text-white shadow-lg hover:shadow-xl"
        />
      </div>
    </header>
  );
}
