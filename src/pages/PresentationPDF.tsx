import React from 'react';
import Globe from '../components/ui/globe';

/* ─── shared partner logo strip ─── */
function PartnerStrip() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl flex items-center justify-between py-5 px-20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border-t border-gray-200/50 z-20">
      <div className="flex items-center gap-6">
        <span className="text-[10px] text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Powered By</span>
        <div className="flex items-center gap-7 border-l border-gray-300 pl-7">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-7 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-7 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 object-contain" />
        </div>
      </div>
      <div className="flex items-center gap-7 border-l border-gray-300 pl-7">
        <span className="text-[10px] text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Partners</span>
        <img src="/Partners/BrandForYou.png" className="h-7 object-contain" alt="BrandForYou" />
        <img src="/Partners/DiceArtFilms_v2.png" className="h-7 object-contain" alt="Dice Art" />
        <img src="/Partners/JobFinderAI.png?v=3" className="h-6 object-contain" alt="JobFinderAI" />
        <img src="/Partners/MoreYeahs.png?v=3" className="h-6 object-contain" alt="MoreYeahs" />
        <img src="/Partners/TingoAI.png" className="h-6 object-contain" alt="Tingo" />
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
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '1.5rem',
      boxShadow: '0 0 60px rgba(255,255,255,0.04)',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)' }} />
      {children}
    </div>
  );
}

/* ─── shared top logos ─── */
function TopLogos() {
  return (
    <div className="absolute top-12 left-16 z-40 flex items-center gap-6 bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
      <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-8 w-auto object-contain" />
      <span className="text-gray-300 font-light text-3xl">|</span>
      <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-8 w-auto object-contain" />
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
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-500/20 to-transparent border border-purple-500/30 rounded-full">
              <span className="text-purple-200 text-xs font-bold tracking-[0.3em] uppercase">FIRST COHORT STARTS <span className="text-white">30TH AUG 2026</span></span>
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
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Ffundfy.app%2F%3Fcontest%3Dcareer-accelerator-program%26ref%3Dchinni&color=000000&bgcolor=ffffff" alt="QR Code" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-2xl font-black tracking-[0.5em] text-white/90 uppercase leading-snug">Scan to Apply</span>
              <span className="text-lg font-bold tracking-widest text-purple-400">fundfy.app</span>
            </div>
          </div>
        </div>
      </div>
      <PartnerStrip />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — EVERYONE GETS FUNDED
═══════════════════════════════════════════ */
function Slide2() {
  const perks = [
    { n: '01', title: 'Comprehensive Career Support', desc: 'Structured pathways to internships, full-time roles, and exclusive industry referrals.' },
    { n: '02', title: 'Priority Interview Access', desc: 'Bypass traditional screening with direct interview opportunities for all participants.' },
    { n: '03', title: 'Enterprise AI Career Tools', desc: 'Unrestricted access to the JobFinderAI platform to accelerate your professional growth.' },
    { n: '04', title: 'Startup Ecosystem Access', desc: 'Seamless entry into the Fundfy.app network to connect with global investors and secure grants.' },
  ];
  return (
    <div id="slide-2" className="w-[1920px] h-[1080px] relative overflow-hidden flex">
      {/* Light Background */}
      <div className="absolute inset-0 bg-slate-50 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        top: '10%', right: '-10%',
        width: '800px', height: '800px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: '-10%', left: '10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <TopLogos />
      <PartnerStrip />
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center w-[45%] h-full pl-32 pr-8 pb-32 pt-16">
        <div>
          <p className="text-[12px] font-black tracking-[0.45em] uppercase text-slate-500 mb-6">Our Commitment</p>
          <h2 className="text-[90px] leading-[0.9] font-black text-slate-900 tracking-tighter mb-10">
            Empowering<br/>Builders &<br/><span className="text-gradient-purple-orange">Visionaries.</span>
          </h2>
        </div>
        
        <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.75rem 2.25rem', maxWidth: '480px', boxShadow: '0 20px 40px rgba(79,70,229,0.08), 0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(79,70,229,0.2)' }}>
          <span style={{ display: 'inline-block', background: 'rgba(79,70,229,0.1)', color: '#4f46e5', fontSize: '11px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>Universal Support</span>
          <p style={{ fontSize: '20px', fontWeight: 700, color: '#374151', lineHeight: 1.5 }}>A supportive ecosystem designed to elevate <span style={{ color: '#4f46e5' }}>every single applicant.</span></p>
        </div>
      </div>
      {/* Right */}
      <div className="relative z-10 flex flex-col justify-center w-[55%] h-full pr-32 pl-12 pb-24 gap-5">
        {perks.map((p, i) => (
          <div key={p.n} className="flex items-center gap-7 relative z-10" style={{ 
            padding: '2rem 2.5rem', 
            background: 'white', 
            borderRadius: '1.5rem', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)', 
            border: '1px solid rgba(226,232,240,0.8)',
            transform: `translateX(${i * 24}px)`
          }}>
            <div style={{ width: '64px', height: '64px', flexShrink: 0, borderRadius: '50%', background: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: '#4f46e5' }}>{p.n}</div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#111827', letterSpacing: '-0.015em' }}>{p.title}</div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#64748b', marginTop: '6px' }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 3 — TIMELINE / STEPS
═══════════════════════════════════════════ */
function Slide3() {
  const steps = [
    { n: '01', title: 'Registration\n& Access', desc: 'Secure your spot and unlock immediate access to Fundfy.app’s premium tools.', color: '#a855f7' },
    { n: '02', title: 'Expert\nMasterclasses', desc: 'Master AI tools, strategic communication, and industry-specific skills led by top experts.', color: '#3b82f6' },
    { n: '03', title: 'Global\nCompetition', desc: 'Showcase your talent on a global stage in our revolutionary AI-evaluated contest.', color: '#0ea5e9' },
    { n: '04', title: 'Career\nRefinement', desc: 'Elevate your professional profile with polished resumes and intensive interview prep.', color: '#f59e0b' },
    { n: '05', title: 'Placements\n& Funding', desc: 'Gain direct pathways to top-tier jobs, internships, and startup seed funding.', color: '#10b981' },
  ];
  return (
    <div id="slide-3" className="w-[1920px] h-[1080px] relative overflow-hidden flex flex-col items-center justify-center">
      <DarkBg />
      <TopLogos />
      <PartnerStrip />
      <div className="relative z-10 w-full px-20 mt-[-40px]">
        <div className="text-center mb-24">
          <p className="text-[12px] font-black tracking-[0.45em] uppercase text-gray-500 mb-6">The Program Journey</p>
          <h2 className="text-[85px] font-black text-white tracking-tighter">
            From Registration to <span className="text-gradient-purple-orange">Recognition.</span>
          </h2>
        </div>
        
        <div className="relative flex justify-center w-full mt-10 gap-6">
          {/* Connecting Line behind the circles */}
          <div className="absolute top-[32px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-center w-[300px] relative z-10">
              {/* The "Pointer" Circle */}
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', 
                background: '#050505', border: `2px solid ${s.color}`, color: s.color, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '22px', fontWeight: 900, marginBottom: '32px', 
                boxShadow: `0 0 30px ${s.color}50, inset 0 0 15px ${s.color}30`,
                position: 'relative', zIndex: 2
              }}>
                {s.n}
                {/* Inner dot */}
                <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '12px', height: '12px', borderRadius: '50%', background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
              </div>
              
              {/* Vertical connector line from circle to card */}
              <div style={{ position: 'absolute', top: '64px', left: '50%', width: '1px', height: '32px', background: `linear-gradient(to bottom, ${s.color}, transparent)`, transform: 'translateX(-50%)', zIndex: 1 }} />

              {/* The Card */}
              <div style={{ 
                width: '100%', 
                background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.95) 100%)', 
                backdropFilter: 'blur(24px)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                borderTop: `2px solid ${s.color}`, 
                borderRadius: '1.5rem', 
                padding: '2.5rem 1.5rem', 
                textAlign: 'center', 
                position: 'relative', 
                boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 -10px 40px ${s.color}15`,
                display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: `linear-gradient(to right, transparent, ${s.color}, transparent)`, opacity: 0.8 }} />
                
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '16px', whiteSpace: 'pre-line', letterSpacing: '-0.02em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#9ca3af', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4 — GET BACKED
═══════════════════════════════════════════ */
function Slide4() {
  const grants = [
    { tier: '1ST', label: 'Startup Grant — Top Performer', amount: '$15,000', top: true },
    { tier: '2ND', label: 'Startup Grant — Runner Up', amount: '$10,000', top: false },
    { tier: '3RD', label: 'Startup Grant — 3rd Finalist', amount: '$5,000', top: false },
    { tier: 'TOP 10', label: 'Pool — Distributed across Top 10 Finalists', amount: '$20,000', top: false },
  ];
  return (
    <div id="slide-4" className="w-[1920px] h-[1080px] relative overflow-hidden flex">
      <DarkBg />
      <TopLogos />
      <PartnerStrip />
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center w-[42%] h-full pl-32 pr-8 pb-32 pt-16">
        <p className="text-[11px] font-black tracking-[0.45em] uppercase text-gray-500 mb-4">For Top Performers</p>
        <div style={{ fontSize: '120px', fontWeight: 900, color: 'white', lineHeight: 0.82, letterSpacing: '-0.045em' }}>₹50<br /><span style={{ fontSize: '56px', fontWeight: 300, color: '#1f2937', letterSpacing: '-0.03em' }}>Lakhs</span></div>
        <div className="text-[32px] font-black text-gradient-purple-orange mt-2 mb-10 tracking-tight">in Funding.</div>
        <p className="text-lg font-medium text-gray-400 leading-[1.75] max-w-md">
          We <span className="text-white font-bold">don't give prizes.</span><br />
          We <span className="text-white font-bold">fund the best talent</span> — through grants, opportunities, and meaningful career support.
        </p>
      </div>
      {/* Right */}
      <div className="relative z-10 flex flex-col justify-center w-[58%] h-full pr-28 pl-6 pb-24 gap-4">
        <p className="text-[11px] font-black tracking-[0.45em] uppercase text-gray-500 mb-2">Startup Grants</p>
        {grants.map(g => (
          <GlassCard key={g.tier} style={{ padding: '1.5rem 2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...(g.top ? { border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 40px rgba(168,85,247,0.15)' } : {}) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '100px', padding: '6px 14px', background: g.top ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.06)', color: g.top ? '#c084fc' : '#6b7280' }}>{g.tier}</span>
              <span style={{ fontSize: '17px', fontWeight: 600, color: '#9ca3af' }}>{g.label}</span>
            </div>
            <span className={g.top ? 'text-gradient-purple-orange' : ''} style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '-0.025em', color: g.top ? undefined : 'white', position: 'relative', zIndex: 1 }}>{g.amount}</span>
          </GlassCard>
        ))}
        <div style={{ marginTop: '8px', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', borderRadius: '1rem', padding: '14px 24px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(110,231,183,0.7)', lineHeight: 1.7 }}>All participants receive <span style={{ color: '#10b981', fontWeight: 700 }}>assured career support</span>, confirmed interviews, and lifetime access to JobFinderAI + Fundfy.app — regardless of rank.</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 5 — JOIN NOW
═══════════════════════════════════════════ */
function Slide5() {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://fundfy.app/?contest=career-accelerator-program&ref=chinni')}&color=000000&bgcolor=ffffff`;
  return (
    <div id="slide-5" className="w-[1920px] h-[1080px] relative overflow-hidden flex">
      <DarkBg flip />
      <TopLogos />
      <PartnerStrip />
      
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center w-[55%] h-full pl-32 pr-10 pb-32 pt-16">
        <p className="text-[11px] font-black tracking-[0.45em] uppercase text-emerald-400 mb-6">Register Today</p>
        <h2 style={{ fontSize: '100px', fontWeight: 900, color: 'white', lineHeight: 0.85, letterSpacing: '-0.045em', marginBottom: '1.5rem' }}>
          Your Career.<br /><span className="text-gradient-purple-orange">Accelerated.</span>
        </h2>
        <div className="flex gap-10 mt-6 mb-10">
          {[{ label: 'Registration', val: '₹100 Only', green: true }, { label: 'First Cohort', val: '30th Aug 2026', green: false }, { label: 'Mode', val: 'Global Online', green: false }, { label: 'Deadline', val: 'Nov 30, 2026', green: false }].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />}
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#374151', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: s.green ? '#10b981' : 'white' }}>{s.val}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(to right, rgba(6,78,59,0.8), rgba(6,95,70,0.8))', borderRadius: '1.5rem', padding: '2px', maxWidth: '600px', boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}>
          <div style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(24px)', borderRadius: '1.4rem', padding: '1.25rem 2rem', border: '1px solid rgba(16,185,129,0.3)' }}>
            <span style={{ display: 'inline-block', background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '100px', padding: '4px 14px', marginBottom: '8px' }}>Assured Placements & Support</span>
            <p style={{ fontSize: '22px', fontWeight: 900, color: 'white', textTransform: 'uppercase', lineHeight: 1.3 }}><span style={{ color: '#10b981' }}>FOR EVERY PARTICIPANT:</span><br />Assured Internships & Interviews</p>
          </div>
        </div>
      </div>
      {/* Right: QR */}
      <div className="relative z-10 flex flex-col justify-center items-center w-[45%] h-full pr-28 pl-8 pb-24">
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(88,28,135,0.6), rgba(30,58,138,0.4))', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2rem', padding: '3rem', width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 50px rgba(168,85,247,0.3)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)' }} />
          <span className="text-xs font-bold tracking-[0.4em] text-purple-300 uppercase mb-2 relative z-10">Ready To Transform?</span>
          <span className="text-3xl font-black text-white tracking-tight mb-8 relative z-10">START YOUR JOURNEY</span>
          <div className="flex items-center gap-10 relative z-10">
            <div style={{ width: '180px', height: '180px', background: 'white', borderRadius: '1.5rem', padding: '12px', boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}>
              <img src={qr} alt="QR Code" style={{ width: '100%', height: '100%', borderRadius: '1rem' }} />
            </div>
            <div>
              <p className="text-base font-black tracking-[0.4em] text-white/90 uppercase leading-snug mb-2">Scan to<br />Apply</p>
              <p className="text-sm font-bold text-purple-300">fundfy.app</p>
            </div>
          </div>
        </div>
      </div>
      <PartnerStrip />
    </div>
  );
}

export default function PresentationPDF() {
  return (
    <div style={{ background: '#050505', overflow: 'hidden' }}>
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
    </div>
  );
}
