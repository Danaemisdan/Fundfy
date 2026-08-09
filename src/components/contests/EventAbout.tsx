import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';

export default function EventAbout({ data }: { data: any }) {
  return (
    <div className="w-full bg-[#050505] text-white py-32 relative border-t border-white/10 overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-24 items-center text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
              About The Challenge
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
            Build the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Solutions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-20">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white relative z-10 tracking-tight">The Objective</h3>
            <p className="text-gray-400 font-medium leading-relaxed relative z-10">
              Solve real-world problems using cutting-edge APIs and frameworks. You'll be challenged to create highly scalable, performant applications from scratch in a competitive timeframe.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white relative z-10 tracking-tight">What You'll Build</h3>
            <p className="text-gray-400 font-medium leading-relaxed relative z-10">
              From robust full-stack web applications to AI-powered predictive models. Bring your own ideas or choose from our partner-sponsored specific problem statements.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white relative z-10 tracking-tight">Who Should Join</h3>
            <p className="text-gray-400 font-medium leading-relaxed relative z-10">
              Open to university students, recent graduates, and seasoned developers. Whether you're a frontend wizard or a backend architect, there's a track designed for you.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
