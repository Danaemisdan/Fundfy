import React from 'react';
import Globe from '../components/ui/globe';

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

/* 💡 CSS-only Light background for slides 2-5 💡 */
function LightBg({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-slate-50 z-0" />
      {/* Main purple/blue orb */}
      <div className="absolute z-0 pointer-events-none" style={{
        top: '50%', [flip ? 'left' : 'right']: '-10%',
        transform: 'translateY(-50%)',
        width: '900px', height: '900px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      {/* Secondary accent orb */}
      <div className="absolute z-0 pointer-events-none" style={{
        top: '-10%', [flip ? 'right' : 'left']: '20%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — EVERYONE GETS FUNDED (Light Theme)
═══════════════════════════════════════════ */
function Slide2() {
  const perks = [
    { n: '01', title: 'Assured Career Support', desc: 'Guaranteed guidance towards top-tier internships, full-time roles, and expert mentorship.', color: '#a855f7', glow: 'rgba(168,85,247,0.2)', bg: 'rgba(168,85,247,0.05)' },
    { n: '02', title: 'Priority Interview Access', desc: 'Fast-track your job hunt with direct interview shortlists from our global partner network.', color: '#3b82f6', glow: 'rgba(59,130,246,0.2)', bg: 'rgba(59,130,246,0.05)' },
    { n: '03', title: 'Enterprise AI Career Tools', desc: "Lifetime access to JobFinderAI's premium suite for resume optimization and mock interviews.", color: '#f59e0b', glow: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.05)' },
    { n: '04', title: 'Startup Ecosystem Access', desc: 'Connect with leading VCs, secure seed grants, and launch your vision on the Fundfy platform.', color: '#10b981', glow: 'rgba(16,185,129,0.2)', bg: 'rgba(16,185,129,0.05)' },
  ];
  return (
    <div id="slide-2" className="w-[1920px] h-[1080px] relative overflow-hidden flex">
      <LightBg />
      <TopLogos />
      <PartnerStrip />
      
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center w-[45%] h-full pl-32 pr-8 pb-32 pt-16">
        <div>
          <p className="text-[12px] font-black tracking-[0.45em] uppercase text-slate-500 mb-6 drop-shadow-sm">Our Commitment</p>
          <h2 className="text-[100px] leading-[0.9] font-black text-slate-900 tracking-tighter mb-10">
            Empowering<br/>Builders &<br/><span className="text-gradient-purple-orange">Visionaries.</span>
          </h2>
        </div>
        
        <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem 2.5rem', maxWidth: '520px', boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 0 40px rgba(79,70,229,0.05)', border: '1px solid rgba(79,70,229,0.15)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(to right, transparent, #4f46e5, transparent)', opacity: 0.3 }} />
          <span style={{ display: 'inline-block', background: 'rgba(79,70,229,0.1)', color: '#4f46e5', fontSize: '12px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px', border: '1px solid rgba(79,70,229,0.2)' }}>Universal Support</span>
          <p style={{ fontSize: '22px', fontWeight: 600, color: '#475569', lineHeight: 1.6 }}>A supportive ecosystem designed to elevate <span style={{ color: '#4f46e5', fontWeight: 800 }}>every single applicant.</span></p>
        </div>
      </div>
      
      {/* Right - 2x2 Grid */}
      <div className="relative z-10 flex flex-col justify-center w-[55%] h-full pr-32 pl-12 pb-24">
        <div className="grid grid-cols-2 gap-8 w-full mt-10">
          {perks.map((p) => (
            <div key={p.n} className="flex flex-col relative z-10" style={{ 
              padding: '3rem 2.5rem', 
              background: 'white', 
              borderRadius: '2rem', 
              boxShadow: `0 20px 40px rgba(0,0,0,0.04), 0 0 40px ${p.glow}`, 
              border: `1px solid rgba(0,0,0,0.05)`,
              borderTop: `4px solid ${p.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              <div style={{ 
                width: '72px', height: '72px', borderRadius: '1rem', 
                background: p.bg, border: `1px solid ${p.color}30`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '26px', fontWeight: 900, color: p.color, 
                marginBottom: '1.5rem'
              }}>{p.n}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: '1rem' }}>{p.title}</div>
              <div style={{ fontSize: '17px', fontWeight: 500, color: '#64748b', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
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
    { n: '01', title: 'Registration\n& Access', desc: 'First, secure your spot to instantly unlock Fundfy.app\'s premium tools and career resources.', color: '#a855f7' },
    { n: '02', title: 'Expert\nMasterclasses', desc: 'Next, build your foundation through hands-on training in AI tools and strategic communication.', color: '#3b82f6' },
    { n: '03', title: 'Global\nCompetition', desc: 'Then, put your skills to the test on a global stage in our revolutionary AI-evaluated contest.', color: '#0ea5e9' },
    { n: '04', title: 'Career\nRefinement', desc: 'Afterward, we help you stand out by polishing your resume and conducting intensive interview prep.', color: '#f59e0b' },
    { n: '05', title: 'Placements\n& Funding', desc: 'Finally, step into your future with direct pathways to top-tier jobs, internships, or seed funding.', color: '#10b981' },
  ];
  return (
    <div id="slide-3" className="w-[1920px] h-[1080px] relative overflow-hidden flex flex-col items-center justify-center">
      <LightBg />
      <TopLogos />
      <PartnerStrip />
      
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-20 mb-20 mt-[-20px]">
        <p className="text-[14px] font-black tracking-[0.45em] uppercase text-slate-500 mb-4 drop-shadow-sm">Journey To Success</p>
        <h2 style={{ fontSize: '90px', fontWeight: 900, color: '#0f172a', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
          How The Program <span className="text-gradient-purple-orange">Works.</span>
        </h2>
      </div>

      {/* Steps Track */}
      <div className="relative z-10 flex items-start justify-center w-full px-24 gap-6">
        
        {/* Glow Track Background */}
        <div className="absolute top-[36px] left-[150px] right-[150px] h-[4px] bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 opacity-40 z-0 rounded-full" />
        
        {steps.map((s, i, arr) => (
          <React.Fragment key={s.n}>
            <div className="flex flex-col relative z-10 flex-1 group">
              <div className="flex items-center gap-4 mb-8">
                <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'white', border: `4px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: s.color, boxShadow: `0 0 30px ${s.color}40`, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${s.color}40`, animation: 'spin 10s linear infinite' }} />
                  {s.n}
                </div>
              </div>
              <div style={{ background: 'white', border: `1px solid rgba(0,0,0,0.06)`, borderTop: `4px solid ${s.color}`, borderRadius: '1.5rem', padding: '2rem 1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem', whiteSpace: 'pre-line' }}>{s.title}</h3>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
            
            {i < arr.length - 1 && (
              <div className="flex items-center justify-center pt-8 z-10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
    <div id="slide-4" className="w-[1920px] h-[1080px] relative overflow-hidden flex pt-12 pb-24">
      <LightBg />
      <TopLogos />
      <PartnerStrip />
      
      {/* LEFT COLUMN: Header & Perks */}
      <div className="relative z-10 w-[45%] h-full flex flex-col justify-center pl-32 pr-12 mt-24">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-50 border border-purple-200 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[14px] font-black tracking-[0.3em] uppercase text-purple-700">Momentum EDU+</span>
          </div>
          
          <h2 style={{ fontSize: '110px', fontWeight: 900, color: '#0f172a', lineHeight: 0.9, letterSpacing: '-0.04em', textShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            FREE AI <br /><span className="text-gradient-purple-orange">EDUCATION</span>
          </h2>
          
          <p className="text-[22px] font-medium text-slate-600 mt-8 leading-relaxed max-w-xl">
            <strong className="text-slate-900 font-black">Join the free webinar</strong> to unlock 100% free access to Momentum EDU+ and kickstart your AI journey.
          </p>
        </div>

        {/* Winners Package List */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          {[
            { title: "Direct Seed Funding", sub: "To launch & scale your ideas", color: "#a855f7" },
            { title: "Assured Placements", sub: "Fast-tracked elite interviews", color: "#3b82f6" },
            { title: "Exclusive Mentorship", sub: "From global tech leaders", color: "#f59e0b" },
            { title: "Lifetime Premium", sub: "JobFinderAI & Fundfy.app", color: "#10b981" }
          ].map((perk, i) => (
            <div key={i} className="flex items-center gap-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${perk.color}15`, border: `1px solid ${perk.color}30` }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={perk.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-black text-[22px] tracking-tight leading-none mb-2">{perk.title}</span>
                <span className="text-slate-500 text-[16px] font-medium leading-none">{perk.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: The Grants Masonry Grid */}
      <div className="relative z-10 w-[55%] h-full flex flex-col justify-center pr-32 pl-4 mt-8">
        
        <div className="w-full h-full max-h-[700px] bg-white rounded-[3rem] p-16 border border-purple-100 relative overflow-hidden flex flex-col items-center justify-center text-center" style={{ boxShadow: '0 40px 80px rgba(168,85,247,0.1)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-purple-50 border-[8px] border-purple-100 text-[56px] mb-10 shadow-lg">🚀</div>
            <h3 className="text-[120px] font-black text-slate-900 leading-none tracking-tighter mb-8 drop-shadow-sm">₹50 <span className="text-gradient-purple-orange text-[90px]">Lakhs</span></h3>
            <p className="text-[28px] font-bold text-slate-600 leading-tight max-w-lg mx-auto">
              Total funding pool reserved for the <strong className="text-slate-900 font-black">builders and visionaries</strong> who truly deserve it.
            </p>
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
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://fundfy.app/?contest=career-accelerator-program&ref=chinni')}&color=000000&bgcolor=ffffff`;
  return (
    <div id="slide-5" className="w-[1920px] h-[1080px] relative overflow-hidden flex items-center justify-center pt-16">
      <LightBg flip />
      <TopLogos />
      <PartnerStrip />
      
      {/* Central Layout */}
      <div className="relative z-10 w-full max-w-[1700px] flex items-center justify-between gap-16 px-16 mt-[-40px]">
        
        {/* Left Side Content */}
        <div className="flex flex-col flex-1 pr-10">
          <p className="text-[14px] font-black tracking-[0.45em] uppercase text-emerald-600 mb-6 drop-shadow-sm">Next Steps</p>
          <h2 style={{ fontSize: '120px', fontWeight: 900, color: '#0f172a', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Your Career.<br /><span className="text-gradient-purple-orange">Accelerated.</span>
          </h2>
          
          <p className="text-[22px] font-medium text-slate-600 max-w-2xl leading-relaxed mb-12">
            This is more than a competition. It is a <strong className="text-slate-900 font-bold">global launchpad</strong> for your future. Secure your spot, access premium tools instantly, and start building.
          </p>
          
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-[2rem] p-10 w-full max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            {[{ label: 'Fee', val: '₹100', sub: 'Only', highlight: true }, 
              { label: 'Start', val: '1st Sep', sub: '2026', highlight: false }, 
              { label: 'Format', val: 'Global', sub: 'Online', highlight: false }, 
              { label: 'Deadline', val: '30th Nov', sub: '2026', highlight: false }
             ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col">
                  <div className="text-[12px] font-bold tracking-[0.35em] uppercase text-slate-400 mb-3">{s.label}</div>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: s.highlight ? '#10b981' : '#0f172a', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div className="text-[18px] font-medium text-slate-500 mt-2">{s.sub}</div>
                </div>
                {i < arr.length - 1 && <div className="w-[1px] h-20 bg-slate-200 mx-2" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side QR */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div style={{ 
            position: 'relative', 
            background: 'white', 
            border: '1px solid rgba(0,0,0,0.06)', 
            borderRadius: '2.5rem', 
            padding: '4rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            boxShadow: '0 30px 60px rgba(0,0,0,0.08), 0 0 80px rgba(168,85,247,0.1)', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #a855f7, #3b82f6)' }} />
            
            <span className="text-[15px] font-black tracking-[0.4em] text-purple-600 uppercase mb-3 relative z-10">Scan To Apply</span>
            <span className="text-[44px] font-black text-slate-900 tracking-tight mb-10 relative z-10 leading-none">JOIN TODAY</span>
            
            <div style={{ 
              width: '320px', 
              height: '320px', 
              background: 'white', 
              borderRadius: '2rem', 
              padding: '16px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
              position: 'relative',
              zIndex: 10
            }}>
              <img src={qr} alt="QR Code" style={{ width: '100%', height: '100%', borderRadius: '1.25rem', objectFit: 'contain' }} />
            </div>

            <div className="mt-10 flex items-center gap-3 relative z-10 bg-slate-50 px-8 py-4 rounded-full border border-slate-200">
              <span className="text-[20px] font-medium text-slate-500">or visit</span>
              <span className="text-[22px] font-bold text-slate-900 tracking-wide">fundfy.app</span>
            </div>
          </div>
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
