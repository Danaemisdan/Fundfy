import { motion } from 'framer-motion';

export default function EventHero({ data, theme, onRegisterClick }: { data: any, theme: any, onRegisterClick: () => void }) {
  return (
    <section className={`relative w-full min-h-[90vh] bg-[#050505] text-white flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden`}>
      
      {/* Abstract generative backdrop using the theme */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] rounded-full bg-gradient-to-br ${theme.accentGradient} opacity-[0.07] blur-3xl -z-10`} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col md:flex-row items-center gap-4"
        >
          <span className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-gray-300 uppercase backdrop-blur-md`}>
            {data.status === 'OPEN' ? 'REGISTRATION OPEN' : 'COMING SOON'}
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
            {data.category} / {data.difficulty}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[120px] lg:text-[160px] font-futuristic font-bold leading-[0.85] tracking-tighter uppercase max-w-5xl"
        >
          {data.title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-3xl font-medium tracking-tight text-gray-400 max-w-2xl"
        >
          {data.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mb-20"
        >
          <button 
            onClick={onRegisterClick}
            className={`px-10 py-5 bg-white text-black rounded-full font-bold tracking-[0.2em] text-sm uppercase hover:scale-105 transition-transform duration-300 shadow-2xl shadow-${theme.primaryAccent}/20`}
          >
            {data.registration.buttonText}
          </button>
        </motion.div>

        {/* Hero Statistics placed directly below the hero content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-white/10 pt-8 mt-auto"
        >
          {data.statistics.map((stat: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                {stat.label}
              </span>
              <span className={`text-xl md:text-2xl font-futuristic font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
