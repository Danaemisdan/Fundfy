import React, { useState, useEffect } from 'react';
import { CONTESTS } from '../../data/contests';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PlaceholderArtwork({ type, theme }: { type: string, theme: any }) {
  // Return CSS-based intentional artwork depending on the contest type
  switch (type) {
    case 'AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#0a0a0a] overflow-hidden">
          <div className="relative w-full max-w-[200px] aspect-[16/10] bg-gray-900 border border-gray-700 rounded-t-xl shadow-2xl flex flex-col">
            <div className="h-3 border-b border-gray-800 flex items-center px-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"/>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"/>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"/>
            </div>
            <div className="flex-1 p-2 flex flex-col gap-1 opacity-50">
              <div className={`w-3/4 h-1 bg-${theme.primaryAccent} rounded`} />
              <div className={`w-1/2 h-1 bg-${theme.secondaryAccent} rounded`} />
              <div className="w-full h-1 bg-gray-700 rounded" />
            </div>
          </div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr ${theme.accentGradient} opacity-20 blur-3xl`} />
        </div>
      );
    case 'JOB':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-gray-50 overflow-hidden">
          <div className="w-32 h-40 bg-white shadow-xl rounded-lg border border-gray-100 p-3 flex flex-col gap-2 transform -rotate-6">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="w-full h-2 bg-gray-200 rounded" />
            <div className="w-2/3 h-2 bg-gray-100 rounded" />
            <div className="mt-auto w-full h-8 bg-green-50 rounded" />
          </div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr ${theme.accentGradient} opacity-10 blur-3xl`} />
        </div>
      );
    case '3D_ASSET':
    case '3D_CHARACTER':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#111] overflow-hidden">
          {/* Wireframe box */}
          <div className={`w-24 h-24 border border-${theme.primaryAccent}/50 transform rotate-45 skew-x-12 relative flex items-center justify-center`}>
            <div className={`absolute inset-0 border border-${theme.secondaryAccent}/50 transform rotate-45`} />
            <div className={`w-12 h-12 bg-gradient-to-br ${theme.accentGradient} opacity-30 blur-xl`} />
          </div>
        </div>
      );
    case 'UI_UX':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-white overflow-hidden">
          <div className="w-40 h-24 border-2 border-dashed border-yellow-200 rounded-xl relative flex items-center justify-center">
            <div className="w-20 h-10 bg-yellow-100 rounded-lg" />
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-orange-100 rounded-full" />
          </div>
        </div>
      );
    default:
      return (
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentGradient} opacity-10`} />
      );
  }
}

export default function ContestShowcase({ referrerMode = false, referralCode = '' }: { referrerMode?: boolean, referralCode?: string }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CONTESTS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CONTESTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CONTESTS.length) % CONTESTS.length);
  };

  const getOffset = (index: number) => {
    const diff = index - activeIndex;
    const half = Math.floor(CONTESTS.length / 2);
    if (diff > half) return diff - CONTESTS.length;
    if (diff < -half) return diff + CONTESTS.length;
    return diff;
  };

  return (
    <section className={`w-full text-white relative z-10 overflow-hidden ${referrerMode ? 'bg-transparent pt-12 pb-16' : 'bg-[#050505] pt-24 pb-32'}`}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 mb-16 relative z-20">
        <h2 className="text-4xl md:text-7xl font-futuristic font-bold tracking-tighter">
          CHOOSE YOUR<br/>
          <span className="text-gray-500">CHALLENGE.</span>
        </h2>
      </div>

      {/* Contest Carousel */}
      <div 
        className="relative w-full h-[550px] flex items-center justify-center mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {CONTESTS.map((contest, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;
          
          return (
            <motion.div
              key={contest.id}
              initial={false}
              animate={{
                x: `calc(${offset * 105}% + ${offset * 20}px)`,
                scale: isActive ? 1 : 0.85,
                opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                zIndex: isActive ? 30 : 20 - Math.abs(offset),
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: isVisible && Math.abs(offset) <= 1 ? 'auto' : 'none'
              }}
              className={`absolute w-[85%] max-w-[340px] md:max-w-[400px] h-[520px] bg-[#111] rounded-3xl border border-white/10 overflow-hidden group flex flex-col shadow-2xl ${
                isActive ? 'cursor-pointer' : 'cursor-pointer'
              }`}
              onClick={() => {
                if (isActive && contest.status === 'OPEN') {
                  if (referrerMode) {
                    const link = `https://fundfy.app/contests/${contest.id}?ref=${referralCode}`;
                    navigator.clipboard.writeText(link);
                    setCopiedId(contest.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  } else {
                    navigate('/contests/' + contest.id);
                  }
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              {/* Artwork Top Half */}
              <div className="h-[250px] relative overflow-hidden bg-black">
                <div className={`absolute inset-0 transition-transform duration-700 ${isActive ? 'group-hover:scale-105' : ''}`}>
                  <img 
                    src={`/contests/${contest.id}.jpg`} 
                    alt={contest.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-80 group-hover:opacity-100' : 'opacity-50'}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const placeholder = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div style={{ display: 'none' }} className="w-full h-full">
                    <PlaceholderArtwork type={contest.artworkType} theme={contest.theme} />
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${contest.status === 'OPEN' ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-white/5 text-gray-400 backdrop-blur-md'}`}>
                    {contest.status === 'OPEN' ? 'OPEN NOW' : 'COMING SOON'}
                  </span>
                </div>
              </div>

              {/* Content Bottom Half */}
              <div className="flex-1 p-6 flex flex-col relative z-10 bg-[#111]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">{contest.category}</span>
                  <span className="text-[10px] font-bold tracking-widest text-gray-600">{contest.difficulty}</span>
                </div>
                
                <h3 className={`text-2xl font-futuristic font-bold tracking-tight mb-2 transition-all ${isActive ? 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400' : 'text-gray-300'}`}>
                  {contest.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium mb-8">
                  {contest.subtitle}
                </p>

                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Prize Pool</span>
                    <span className={`text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${contest.theme.accentGradient}`}>
                      {contest.prizeHighlight}
                    </span>
                  </div>
                  
                  <button className={`text-[10px] font-bold tracking-[0.2em] uppercase border px-4 py-2 rounded-full transition-colors duration-300 ${isActive ? 'border-white/20 group-hover:bg-white group-hover:text-black' : 'border-white/5 text-gray-500'}`}>
                    {isActive ? (referrerMode ? (copiedId === contest.id ? 'COPIED!' : 'COPY LINK') : 'VIEW') : 'SELECT'}
                  </button>
                </div>
              </div>

              {/* Hover Glow */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-t ${contest.theme.accentGradient} opacity-0 group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-500`} />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8 mt-12 relative z-20">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
        >
          <ChevronLeft className="w-5 h-5 ml-[-2px]" />
        </button>
        <div className="flex gap-2">
          {CONTESTS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-6' : 'bg-white/20 w-2 hover:bg-white/50'}`} 
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
        >
          <ChevronRight className="w-5 h-5 mr-[-2px]" />
        </button>
      </div>

    </section>
  );
}
