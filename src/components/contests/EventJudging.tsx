import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Brain, Code2, Sparkles, Zap, Presentation } from 'lucide-react';

const icons = [
  <Brain className="w-6 h-6 text-purple-400" />,
  <Code2 className="w-6 h-6 text-cyan-400" />,
  <Sparkles className="w-6 h-6 text-emerald-400" />,
  <Zap className="w-6 h-6 text-yellow-400" />,
  <Presentation className="w-6 h-6 text-orange-400" />
];

export default function EventJudging({ data }: { data: any }) {
  return (
    <div className="w-full bg-[#050505] text-white py-32 border-t border-white/5 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Left Column: Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 w-max">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                Evaluation
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              Judging <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Criteria</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              Projects will be evaluated by an expert panel of industry leaders based on these core metrics.
            </p>
          </motion.div>

          {/* Right Column: Bento Grid */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.judgingCriteria?.map((item: any, i: number) => {
                const isFeatured = i === 0;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative bg-white/[0.02] rounded-3xl p-8 border border-white/10 flex flex-col hover:bg-white/[0.04] transition-all duration-500 overflow-hidden ${isFeatured ? 'md:col-span-2' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-start justify-between mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {icons[i % icons.length]}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter">{item.weight}</span>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase">Weight</span>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.name}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
