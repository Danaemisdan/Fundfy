import React from 'react';
import { motion } from 'framer-motion';

export default function ContestStatsStrip({ data, theme }: { data: any, theme: any }) {
  return (
    <div className="w-full bg-[#050505] border-y-2 border-white/10 py-10 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex flex-wrap md:flex-nowrap items-center justify-between gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {data.stats.map((stat: any, idx: number) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`w-full md:w-1/3 flex flex-col items-center justify-center text-center pt-6 md:pt-0 ${idx === 0 ? 'pt-0' : ''}`}
          >
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
              {stat.value}
            </h3>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
