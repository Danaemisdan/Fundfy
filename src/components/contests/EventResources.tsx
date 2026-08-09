import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code, Database, Globe, Cloud, LayoutTemplate } from 'lucide-react';

const icons = [
  <Cloud className="w-6 h-6 text-blue-400" />,
  <Code className="w-6 h-6 text-purple-400" />,
  <Database className="w-6 h-6 text-emerald-400" />,
  <Globe className="w-6 h-6 text-cyan-400" />,
  <LayoutTemplate className="w-6 h-6 text-orange-400" />
];

export default function EventResources({ data }: { data: any }) {
  if (!data.resources || data.resources.length === 0) return null;

  return (
    <div className="w-full bg-[#050505] text-white py-32 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
              Exclusive Access
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Resources</span>
          </h2>
          <p className="text-lg text-gray-400 font-medium">
            Unlock thousands of dollars worth of premium APIs, infrastructure credits, and masterclasses just by registering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.resources.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
                {icons[i % icons.length]}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed relative z-10">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
