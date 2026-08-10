import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CONTESTS } from '../data/contests';
import { Trophy, Calendar, Cloud, Crown, FileCheck, Rocket, GraduationCap, Code, UploadCloud } from 'lucide-react';

export default function Poster() {
  const { id } = useParams();
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://fundfy.app/contests/${contest.id}`)}&color=000000&bgcolor=ffffff`;
  
  const titleWords = contest.title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#05050a] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans">
      
      {/* Poster Container - A4-ish Aspect Ratio */}
      <div 
        className="w-full max-w-[800px] relative rounded-2xl overflow-hidden flex flex-col bg-[#0a0a14] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        style={{
          backgroundImage: `url('/Partners/ChatGPT Image Aug 10, 2026, 03_20_07 PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        {/* Dark overlays to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0a0a14]/80 to-[#0a0a14] pointer-events-none z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col p-8 sm:p-12 h-full">

          {/* --- HEADER --- */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              {/* Pill */}
              <div className="flex items-center gap-3 bg-black/50 border border-white/20 px-5 py-2.5 rounded-full backdrop-blur-md">
                <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-4 sm:h-5 object-contain" />
                <span className="text-white/30 font-light text-sm">|</span>
                <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-4 sm:h-5 object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] tracking-[0.3em] text-gray-400 uppercase font-bold">Presents</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-widest">GLOBAL TALENT HUNT 2026</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 rounded-full">
              <span className="text-white font-bold text-sm tracking-wide">REGISTER NOW</span>
            </div>
          </div>

          {/* --- TITLE SECTION --- */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-8 mb-8">
            <div className="flex flex-col">
              <h1 className="text-6xl sm:text-7xl font-black text-white leading-[0.85] tracking-tighter mb-4 drop-shadow-2xl font-futuristic">
                GLOBAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">TALENT</span> <br />
                HUNT <span className="text-gray-400">2026</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
              </p>
            </div>

            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-600 leading-none tracking-tighter">
                  {firstWord}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-2xl sm:text-3xl font-black text-white leading-none uppercase">{restOfTitle}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-pink-500 px-6 py-1.5 rounded-full">
                <span className="text-white text-[10px] font-bold tracking-[0.1em] uppercase">All Levels Welcome</span>
              </div>
            </div>
          </div>

          {/* --- INNOVATOR BOX --- */}
          <div className="w-full bg-[#111122]/60 border border-blue-500/30 rounded-2xl p-5 mb-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500" />
            <p className="text-sm sm:text-base font-bold text-blue-200 tracking-wide uppercase mb-1">
              The world is looking for <span className="text-blue-400">innovators.</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
              Are you ready to build the future of {contest.category}?
            </p>
          </div>

          {/* --- STATS ROW --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Trophy size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Prize Pool</span>
                <span className="text-lg sm:text-xl font-black text-white leading-tight">₹50 LAKHS</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest">In Cash & Rewards</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full border border-orange-500/30 flex items-center justify-center shrink-0">
                <img src="/Partners/AWS_v2.png" className="h-5 object-contain" alt="AWS" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Giving Away</span>
                <span className="text-lg sm:text-xl font-black text-white leading-tight">$5,000</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest">In AWS Credits</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Calendar size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Deadline</span>
                <span className="text-lg sm:text-xl font-black text-white leading-tight">NOV 30,</span>
                <span className="text-sm font-black text-white leading-tight">2026</span>
              </div>
            </div>
          </div>

          {/* --- REWARDS & PERKS --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/50" />
                <h3 className="text-sm font-black text-purple-400 tracking-[0.2em] uppercase">Amazing Rewards</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-purple-500/50" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex flex-col items-center p-4 border border-purple-500/30 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent text-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 mb-3 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <Crown size={20} />
                  </div>
                  <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase mb-1">1st Place</span>
                  <span className="text-xl font-black text-white mb-1">₹15 LAKHS</span>
                  <span className="text-[9px] text-gray-400">Grand Prize</span>
                </div>
                <div className="flex flex-col items-center p-4 border border-blue-500/30 rounded-2xl bg-gradient-to-b from-blue-900/20 to-transparent text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400/20 border border-gray-400/50 flex items-center justify-center text-gray-300 mb-3">
                    <Trophy size={20} />
                  </div>
                  <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase mb-1">2nd Place</span>
                  <span className="text-xl font-black text-white mb-1">₹10 LAKHS</span>
                  <span className="text-[9px] text-gray-400">Runner Up</span>
                </div>
                <div className="flex flex-col items-center p-4 border border-orange-500/30 rounded-2xl bg-gradient-to-b from-orange-900/20 to-transparent text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400 mb-3">
                    <Trophy size={20} />
                  </div>
                  <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase mb-1">3rd Place</span>
                  <span className="text-xl font-black text-white mb-1">₹5 LAKHS</span>
                  <span className="text-[9px] text-gray-400">Bronze</span>
                </div>
                <div className="flex flex-col items-center p-4 border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-yellow-500 mb-3">
                    <Trophy size={20} />
                  </div>
                  <span className="text-[9px] text-gray-300 font-bold tracking-widest uppercase mb-1">Honorable</span>
                  <span className="text-lg font-black text-white mb-1">₹20 LAKHS</span>
                  <span className="text-[8px] text-gray-400 leading-tight">Distributed Among 10 Teams</span>
                </div>
              </div>
            </div>

            <div className="col-span-1 border border-purple-500/20 rounded-2xl bg-[#11111a] p-6 flex flex-col justify-center">
              <h3 className="text-xs font-black text-purple-400 tracking-[0.1em] uppercase mb-5">Every Participant Gets</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <FileCheck className="text-purple-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-xs text-gray-300">Verified Global Participation Certificate</span>
                </div>
                <div className="flex items-start gap-3">
                  <Crown className="text-yellow-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-xs text-gray-300">Lifetime FREE JobFinderAI Premium</span>
                </div>
                <div className="flex items-start gap-3">
                  <Cloud className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-xs text-gray-300">$500 AWS Cloud Credits for Deployment</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- PHASES AND QR ROW --- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-500/50" />
                <h3 className="text-xs font-black text-blue-400 tracking-[0.2em] uppercase">5 Phases. 1 Goal.</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-500/50" />
              </div>
              <div className="flex items-center justify-between gap-2">
                {[ 
                  { icon: <Rocket size={24}/>, label: 'Phase 1', sub: 'Registration' },
                  { icon: <GraduationCap size={24}/>, label: 'Phase 2', sub: 'Masterclasses' },
                  { icon: <Code size={24}/>, label: 'Phase 3', sub: 'Build Phase' },
                  { icon: <UploadCloud size={24}/>, label: 'Phase 4', sub: 'Submission' },
                  { icon: <Trophy size={24}/>, label: 'Phase 5', sub: 'Finals' },
                ].map((phase, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="text-blue-400 mb-2">{phase.icon}</div>
                    <span className="text-[9px] font-bold text-gray-300 uppercase">{phase.label}</span>
                    <span className="text-[8px] text-gray-500 uppercase">{phase.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-6 border-l border-white/10 pl-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold mb-1">Enter The Arena.</span>
                <span className="text-xl font-black text-blue-400 tracking-widest uppercase mb-2">Register Now!</span>
                <span className="text-[8px] text-gray-500 tracking-widest uppercase">Scan To Register</span>
              </div>
              <div className="w-24 h-24 bg-white p-1.5 rounded-xl shadow-2xl">
                <img src={qrCodeUrl} className="w-full h-full rounded-lg" alt="QR" />
              </div>
            </div>
          </div>

          {/* --- FOOTER PARTNERS --- */}
          <div className="flex flex-col items-center pt-8 border-t border-white/10">
            <span className="text-[9px] tracking-[0.3em] font-bold text-gray-500 uppercase mb-5">Powered By</span>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 w-full opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-5 sm:h-6 object-contain brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-5 sm:h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-3 sm:h-4 object-contain brightness-0 invert" />
              <img src="/Partners/Epic_Games_logo.svg.webp" alt="Epic Games" className="h-5 sm:h-6 object-contain brightness-0 invert" />
              <img src="/Partners/DiceArtFilms_v2.png" alt="Dice Art" className="h-4 sm:h-5 object-contain" />
              <img src="/Partners/JobFinderAI.png?v=3" alt="JobFinderAI" className="h-4 sm:h-5 object-contain" />
              <img src="/Partners/MoreYeahs.png?v=3" alt="MoreYeahs" className="h-4 sm:h-5 object-contain" />
              <img src="/Partners/Young_v2.png" alt="Young Coders" className="h-5 sm:h-6 object-contain" />
              <img src="/Partners/TingoAI.png" alt="Tingo" className="h-4 sm:h-5 object-contain" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
