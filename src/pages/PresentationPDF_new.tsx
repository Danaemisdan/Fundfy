import React from 'react';
import Globe from '../components/ui/globe';
import { GraduationCap, Trophy, Rocket, Briefcase, Target, Users, Sparkles } from 'lucide-react';

/* 🏁 shared partner logo strip 🏁 */
function PartnerStrip() {
  const partners = [
    { src: "/Partners/AWS_v2.png", scale: 'scale-[1.3]' },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg", scale: 'scale-100' },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", scale: 'scale-[0.65]' },
    { src: "/Partners/TechMahindra.png", scale: 'scale-[1.5]' },
    { src: "/Partners/Foxconn.svg", scale: 'scale-[0.8]' },
    { src: "/Partners/DiceArtFilms_v2.png", scale: 'scale-[1.1]' },
    { src: "/Partners/JobFinderAI.png?v=3", scale: 'scale-100' },
    { src: "/Partners/MoreYeahs.png?v=3", scale: 'scale-100' },
    { src: "/Partners/XOXO_v2.png", scale: 'scale-100' },
    { src: "/Partners/Young_v2.png", scale: 'scale-[0.9]' },
    { src: "/Partners/TingoAI.png", scale: 'scale-90' },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl flex items-center justify-center py-5 px-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border-t border-gray-200/50 z-20">
      <div className="flex items-center gap-6">
        <span className="text-[12px] text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Powered By</span>
        <div className="flex items-center justify-between border-l border-gray-300 pl-8 ml-2 w-[1450px]">
          {partners.map((p, i) => (
            <div key={i} className="h-7 flex items-center justify-center shrink-0">
              <img src={p.src} alt="Partner" className={`h-full w-auto max-w-[120px] object-contain ${p.scale}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CSS-only background (replaces Globe for slides 2-5) ─── */
function DarkBg({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#050505] z-0" />
      {/* Main purple/blue orb */}
      <div className="absolute z-0 pointer-events-none" style={{
        top: '50%', [flip ? 'left' : 'right']: '-10%',
        transform: 'translateY(-50%)',
        width: '900px', height: '900px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      {/* Secondary accent */}
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: '-10%', [flip ? 'right' : 'left']: '20%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      {/* Overlay */}
      <div className="absolute inset-0 z-0" style={{
        background: flip
          ? 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.85) 100%)',
      }} />
    </>
  );
}

/* ─── glassmorphism card ─── */
function GlassCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '1.5rem',
      boxShadow: '0 20px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
      {/* Subtle colorful inner glow for that "sexy" tech feel without being messy */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px circle at 50% 0%, rgba(124,58,237,0.05), transparent)', pointerEvents: 'none' }} />
      {children}
    </div>
  );
}

/* ─── shared top logos ─── */
function TopLogos() {
  return (
    <div className="absolute top-12 left-16 z-40 flex items-center gap-6 bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
      <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-8 w-auto object-contain" />
      <div className="w-[1px] h-6 bg-gray-200"></div>
      <img src="/Partners/BrandForYou.png" alt="Brand For You" className="h-10 w-auto object-contain" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 1 — actual homepage hero
═══════════════════════════════════════════ */
function Slide1() {
  return (
    <div id="slide-1" className="w-[1920px] h-[1080px] relative overflow-hidden flex bg-black">
      <TopLogos />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 pointer-events-none z-0" />
      <div className="absolute inset-0 w-full h-[110%] top-[-5%] pointer-events-none z-0 opacity-100 flex items-center justify-center mix-blend-screen">
        <Globe />
      </div>
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center w-[55%] h-full pb-20 pl-32 pr-8 gap-20 mt-16">
        <div>
          <h1 className="text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-6 font-sans drop-shadow-2xl uppercase">
            GLOBAL <br />
            <span className="text-gradient-purple-orange">TALENT</span> HUNT 2026
          </h1>
          <div className="flex flex-col items-start gap-4 mt-4">
            <p className="text-xl font-bold tracking-[0.4em] text-white/70 uppercase">Showcase. Compete. Get <span className="text-purple-400">Discovered.</span></p>
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500/40 via-purple-600/20 to-transparent border border-purple-400/60 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] mt-4 backdrop-blur-sm">
              <span className="text-purple-50 text-[22px] font-black tracking-[0.25em] uppercase flex items-center gap-4">
                <span className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_15px_#a855f7]" />
                FIRST COHORT STARTS: <span className="text-white ml-2 drop-shadow-lg">1ST SEP 2026</span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight max-w-3xl">Career Accelerator Program</h2>
          <p className="text-xl text-gray-400 font-bold tracking-[0.2em] uppercase">The Future of Learning & Career Growth</p>
        </div>
      </div>
      {/* Right */}
      <div className="relative z-10 flex flex-col justify-center items-center w-[45%] h-full pb-20 pr-32 pl-8 gap-8">
        <div className="relative rounded-[3rem] p-16 w-full max-w-xl flex flex-col items-center border border-white/20 shadow-[0_0_80px_rgba(168,85,247,0.3)] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(40,10,60,0.95), rgba(10,20,50,0.95))' }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/20 pointer-events-none" />
          
          <div className="flex flex-col items-center gap-3 relative z-10 text-center mb-12">
            <span className="text-sm font-bold tracking-[0.6em] text-purple-300 uppercase">Ready To Transform?</span>
            <span className="text-[3.5rem] leading-[1.1] font-black text-white tracking-tight">START YOUR<br />JOURNEY</span>
          </div>

          <div className="flex flex-col items-center gap-10 relative z-10">
            <div className="w-64 h-64 bg-white rounded-[2rem] p-4 shadow-[0_0_60px_rgba(255,255,255,0.2)]">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Ffundfy.app%2Fc%2Fchinni&color=000000&bgcolor=ffffff" alt="QR Code" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-2xl font-black tracking-[0.5em] text-white/90 uppercase leading-snug">Scan to Apply</span>
              <span className="text-lg font-bold tracking-widest text-purple-400">fundfy.app/chinni</span>
            </div>
          </div>
        </div>
      </div>
      <PartnerStrip />
    </div>
  );
}

/* 💡 CSS-only Light background for slides 2-5 💡 */
function LightBg({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#fbfcfd] z-0" />
      <div className="absolute inset-0 z-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — EVERYONE GETS FUNDED (Light Theme)
═══════════════════════════════════════════ */
function Slide2() {
  return (
    <div id="slide-2" className="w-[1920px] h-[1080px] relative overflow-hidden flex flex-col justify-center bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.05)_0%,transparent_70%)] pointer-events-none" />
      <TopLogos />
      <PartnerStrip />
      
      {/* Header */}
      <div className="relative z-10 w-full px-32 mt-10 mb-12 flex flex-col items-center text-center">
        <p className="text-[14px] font-black tracking-[0.45em] uppercase text-purple-600 mb-4 drop-shadow-sm">Program Overview</p>
        <h2 className="text-[90px] leading-[0.9] font-black text-slate-900 tracking-tighter mb-4">
          What is the <span className="text-gradient-purple-orange">Global Talent Hunt?</span>
        </h2>
        <p className="text-[22px] font-medium text-slate-600 max-w-3xl leading-relaxed">
          The ultimate career accelerator program designed to bridge the gap between world-class education and top-tier industry placements.
        </p>
      </div>
      
      {/* 3-Column Bento Grid - Light Theme with Polish */}
      <div className="relative z-10 px-32 flex gap-8 h-[480px]">
        
        {/* Pillar 1 */}
        <div className="flex-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_30px_60px_rgba(168,85,247,0.08)] transition-transform duration-300 hover:-translate-y-2">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-100 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col relative z-10 shadow-[inset_0_0_30px_rgba(255,255,255,1),inset_0_2px_10px_rgba(255,255,255,0.8)] overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-400/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-200 flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(168,85,247,0.15),inset_0_2px_5px_rgba(255,255,255,1)]">
              <GraduationCap size={32} className="text-purple-600 drop-shadow-[0_2px_4px_rgba(168,85,247,0.3)]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[32px] font-black text-slate-900 tracking-tight mb-4 leading-none relative z-10">01. The Education</h3>
            <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
              Unlock <strong className="text-slate-900">100% free lifetime access</strong> to Momentum EDU+ and enterprise AI career tools. Learn directly from global tech leaders through exclusive masterclasses.
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="flex-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_30px_60px_rgba(59,130,246,0.08)] transition-transform duration-300 hover:-translate-y-2">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-100 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col relative z-10 shadow-[inset_0_0_30px_rgba(255,255,255,1),inset_0_2px_10px_rgba(255,255,255,0.8)] overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-200 flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(59,130,246,0.15),inset_0_2px_5px_rgba(255,255,255,1)]">
              <Trophy size={32} className="text-blue-600 drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[32px] font-black text-slate-900 tracking-tight mb-4 leading-none relative z-10">02. The Competition</h3>
            <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
              Showcase your skills on a <strong className="text-slate-900">global stage</strong>. Participate in high-stakes, AI-evaluated challenges designed to push your boundaries and identify true visionaries.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="flex-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_30px_60px_rgba(16,185,129,0.08)] transition-transform duration-300 hover:-translate-y-2">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-100 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col relative z-10 shadow-[inset_0_0_30px_rgba(255,255,255,1),inset_0_2px_10px_rgba(255,255,255,0.8)] overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-400/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(16,185,129,0.15),inset_0_2px_5px_rgba(255,255,255,1)]">
              <Rocket size={32} className="text-emerald-600 drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[32px] font-black text-slate-900 tracking-tight mb-4 leading-none relative z-10">03. The Outcome</h3>
            <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
              Fast-track your career with <strong className="text-slate-900">assured placements</strong> and priority interview shortlists. Top performers gain access to zero-equity seed funding and VC networks.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 3 — TIMELINE / STEPS (Light Theme)
═══════════════════════════════════════════ */
function Slide3() {
  const steps = [
    { n: '01', title: 'Registration\n& Access', points: ['Secure your spot', 'Unlock premium tools'] },
    { n: '02', title: 'Expert\nMasterclasses', points: ['Hands-on AI training', 'Strategic communication'] },
    { n: '03', title: 'Global\nCompetition', points: ['Compete globally', 'AI-evaluated contest'] },
    { n: '04', title: 'Career\nRefinement', points: ['Resume polishing', 'Intensive interview prep'] },
    { n: '05', title: 'Placements\n& Funding', points: ['Top-tier job pathways', 'Secure seed funding'] },
  ];
  return (
    <div id="slide-3" className="w-[1920px] h-[1080px] relative overflow-hidden flex flex-col items-center justify-center bg-black">
      <DarkBg />
      <TopLogos />
      <PartnerStrip />
      
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-20 mb-20 mt-[-20px]">
        <p className="text-[14px] font-black tracking-[0.45em] uppercase text-purple-400 mb-4 drop-shadow-sm">Journey To Success</p>
        <h2 style={{ fontSize: '90px', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
          How The Program <span className="text-gradient-purple-orange">Works.</span>
        </h2>
      </div>

      {/* Steps Track */}
      <div className="relative z-10 flex items-start justify-center w-full px-24 gap-6">
        
        {/* Glowing Dashed Track Line */}
        <div className="absolute top-[36px] left-[150px] right-[150px] h-0 border-t-[3px] border-dashed border-purple-500/50 z-0 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        
        {steps.map((s, i, arr) => (
          <React.Fragment key={s.n}>
            <div className={`flex flex-col relative z-10 flex-1 group ${i % 2 !== 0 ? 'mt-24' : ''}`}>
              <div className="flex items-center gap-4 mb-8 relative">
                {i % 2 !== 0 && (
                  <div className="absolute left-[38px] bottom-full w-[2px] h-[70px] bg-gradient-to-b from-purple-500/50 to-transparent z-[-1]" />
                )}
                <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(30,15,50,1), rgba(15,20,40,1))', backdropFilter: 'blur(10px)', border: `2px solid rgba(168,85,247,0.8)`, boxShadow: '0 0 40px rgba(168,85,247,0.4), inset 0 0 20px rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#fff', position: 'relative' }}>
                  {s.n}
                </div>
              </div>
              <GlassCard style={{ padding: '2rem 1.5rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', borderTop: '1px solid rgba(168,85,247,0.3)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>{s.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {s.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span style={{ color: '#a855f7', fontWeight: 'bold' }}>•</span>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
            
            {i < arr.length - 1 && (
              <div className="flex items-center justify-center pt-8 z-10 w-0 opacity-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4 — PRIZES & BENEFITS (Light Theme)
═══════════════════════════════════════════ */
function Slide4() {
  return (
    <div id="slide-4" className="w-[1920px] h-[1080px] relative overflow-hidden flex flex-col justify-center bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
      <TopLogos />
      <PartnerStrip />
      
      <div className="relative z-10 w-full px-32 mt-12 mb-10 text-center">
        <p className="text-[14px] font-black tracking-[0.45em] uppercase text-purple-600 mb-4 drop-shadow-sm">Grants & Rewards</p>
        <h2 className="text-[90px] leading-[0.9] font-black text-slate-900 tracking-tighter mb-2">
          Your Vision. <span className="text-gradient-purple-orange">Fully Funded.</span>
        </h2>
      </div>

      {/* Modern 21st.dev Bento Grid - Light Theme Polish */}
      <div className="relative z-10 px-32 w-full grid grid-cols-3 grid-rows-2 gap-6 h-[550px] mb-12">
        
        {/* HUGE Top Card - 50 Lakhs Grant Pool spans 2 columns */}
        <div className="col-span-2 row-span-1 relative rounded-[2.5rem] p-[1px] overflow-hidden group shadow-[0_30px_80px_rgba(168,85,247,0.15)] transition-transform duration-300 hover:-translate-y-1">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-orange-300 to-purple-400 opacity-80" />
          <div className="w-full h-full bg-white/80 backdrop-blur-2xl rounded-[2.4rem] p-12 flex flex-col justify-center relative z-10 overflow-hidden shadow-[inset_0_0_40px_rgba(255,255,255,1)]">
            {/* Mesh/Grid background effect inside card - Light */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-purple-400/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block bg-white text-purple-700 text-[12px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-6 border border-purple-200 shadow-sm">The Ultimate Grant Pool</span>
              <div className="flex items-end gap-6 mb-2">
                <span className="text-[120px] font-black text-slate-900 leading-[0.8] tracking-tighter">₹50 <span className="text-[85px] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500 drop-shadow-sm">Lakhs</span></span>
              </div>
              <p className="text-[20px] font-medium text-slate-600 max-w-lg mt-4 leading-relaxed">
                Total equity-free funding pool reserved strictly for top builders and visionary founders.
              </p>
            </div>
          </div>
        </div>

        {/* Small Card - Seed Funding */}
        <div className="col-span-1 row-span-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_20px_50px_rgba(168,85,247,0.08)] transition-transform duration-300 hover:-translate-y-1">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 flex flex-col justify-between relative z-10 shadow-[inset_0_0_20px_rgba(255,255,255,1)]">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-400/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-200 flex items-center justify-center shadow-[0_10px_20px_rgba(168,85,247,0.1),inset_0_2px_5px_rgba(255,255,255,1)] relative z-10">
              <Briefcase size={28} className="text-purple-600 drop-shadow-[0_2px_4px_rgba(168,85,247,0.3)]" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[26px] font-black text-slate-900 tracking-tight mb-2 leading-none">Direct Seed Funding</h3>
              <p className="text-[16px] text-slate-600 font-medium leading-relaxed">Secure capital to launch and scale your ambitious ideas.</p>
            </div>
          </div>
        </div>

        {/* Small Card - Assured Placements */}
        <div className="col-span-1 row-span-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_20px_50px_rgba(59,130,246,0.08)] transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 flex flex-col justify-between relative z-10 shadow-[inset_0_0_20px_rgba(255,255,255,1)]">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-400/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-200 flex items-center justify-center shadow-[0_10px_20px_rgba(59,130,246,0.1),inset_0_2px_5px_rgba(255,255,255,1)] relative z-10">
              <Target size={28} className="text-blue-600 drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[26px] font-black text-slate-900 tracking-tight mb-2 leading-none">Assured Placements</h3>
              <p className="text-[16px] text-slate-600 font-medium leading-relaxed">Fast-tracked elite interviews across our global partner network.</p>
            </div>
          </div>
        </div>

        {/* Small Card - Mentorship */}
        <div className="col-span-1 row-span-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_20px_50px_rgba(236,72,153,0.08)] transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-300 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 flex flex-col justify-between relative z-10 shadow-[inset_0_0_20px_rgba(255,255,255,1)]">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-400/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-pink-50 border border-pink-200 flex items-center justify-center shadow-[0_10px_20px_rgba(236,72,153,0.1),inset_0_2px_5px_rgba(255,255,255,1)] relative z-10">
              <Users size={28} className="text-pink-600 drop-shadow-[0_2px_4px_rgba(236,72,153,0.3)]" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[26px] font-black text-slate-900 tracking-tight mb-2 leading-none">Exclusive Mentorship</h3>
              <p className="text-[16px] text-slate-600 font-medium leading-relaxed">Learn directly from global tech leaders and industry experts.</p>
            </div>
          </div>
        </div>

        {/* Small Card - Premium Tools */}
        <div className="col-span-1 row-span-1 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_20px_50px_rgba(16,185,129,0.08)] transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-300 to-transparent opacity-80" />
          <div className="w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 flex flex-col justify-between relative z-10 shadow-[inset_0_0_20px_rgba(255,255,255,1)]">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-400/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.1),inset_0_2px_5px_rgba(255,255,255,1)] relative z-10">
              <Sparkles size={28} className="text-emerald-600 drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[26px] font-black text-slate-900 tracking-tight mb-2 leading-none">Lifetime Premium</h3>
              <p className="text-[16px] text-slate-600 font-medium leading-relaxed">100% free access to JobFinderAI and Fundfy.app tools forever.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 5 — JOIN NOW (Light Theme)
═══════════════════════════════════════════ */
function Slide5() {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://fundfy.app/c/chinni')}&color=000000&bgcolor=ffffff`;
  return (
    <div id="slide-5" className="w-[1920px] h-[1080px] relative overflow-hidden flex items-center justify-center pt-16 bg-black">
      <DarkBg flip />
      <TopLogos />
      <PartnerStrip />
      
      {/* Central Layout */}
      <div className="relative z-10 w-full max-w-[1700px] flex items-center justify-between gap-16 px-16 mt-[-40px]">
        
        {/* Left Side Content */}
        <div className="flex flex-col flex-1 pr-10">
          <p className="text-[14px] font-black tracking-[0.45em] uppercase text-purple-400 mb-6 drop-shadow-sm">Next Steps</p>
          <h2 style={{ fontSize: '120px', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '1.5rem', textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            Your Career.<br /><span className="text-gradient-purple-orange">Accelerated.</span>
          </h2>
          
          <p className="text-[22px] font-medium text-slate-300 max-w-2xl leading-relaxed mb-12">
            This is more than a competition. It is a <strong className="text-white font-bold">global launchpad</strong> for your future. Secure your spot, access premium tools instantly, and start building.
          </p>
          
          <GlassCard className="flex items-center justify-between w-full max-w-4xl" style={{ padding: '2.5rem' }}>
            {[{ label: 'Fee', val: '₹100', sub: 'Only', highlight: true }, 
              { label: 'Start', val: '1st Sep', sub: '2026', highlight: false }, 
              { label: 'Format', val: 'Global', sub: 'Online', highlight: false }, 
              { label: 'Deadline', val: '30th Nov', sub: '2026', highlight: false }
             ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col">
                  <div className="text-[12px] font-bold tracking-[0.35em] uppercase text-white/50 mb-3">{s.label}</div>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div className="text-[18px] font-medium text-slate-300 mt-2">{s.sub}</div>
                </div>
                {i < arr.length - 1 && <div className="w-[1px] h-20 bg-white/10 mx-2" />}
              </React.Fragment>
            ))}
          </GlassCard>
        </div>

        {/* Right Side QR */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <GlassCard className="flex flex-col items-center" style={{ padding: '4rem' }}>
            
            <span className="text-[15px] font-black tracking-[0.4em] text-purple-300 uppercase mb-3 relative z-10">Scan To Apply</span>
            <span className="text-[44px] font-black text-white tracking-tight mb-10 relative z-10 leading-none">JOIN TODAY</span>
            
            <div style={{ 
              width: '320px', 
              height: '320px', 
              background: 'white', 
              borderRadius: '2rem', 
              padding: '16px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              position: 'relative',
              zIndex: 10
            }}>
              <img src={qr} alt="QR Code" style={{ width: '100%', height: '100%', borderRadius: '1.25rem', objectFit: 'contain' }} />
            </div>

            <div className="mt-10 flex items-center gap-3 relative z-10 bg-white/10 px-8 py-4 rounded-full border border-white/20 backdrop-blur-md">
              <span className="text-[20px] font-medium text-slate-300">or visit</span>
              <span className="text-[22px] font-bold text-white tracking-wide">fundfy.app/chinni</span>
            </div>
          </GlassCard>
        </div>
        
      </div>
    </div>
  );
}

export default function PresentationPDFNew() {
  return (
    <div style={{ background: '#f8fafc', overflow: 'hidden' }}>
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
    </div>
  );
}
