import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code, Database, Globe, Cloud, LayoutTemplate } from 'lucide-react';

const icons = [
  <Cloud className="w-8 h-8 text-blue-600 stroke-[1.5]" />,
  <Code className="w-8 h-8 text-blue-600 stroke-[1.5]" />,
  <Database className="w-8 h-8 text-blue-600 stroke-[1.5]" />,
  <Globe className="w-8 h-8 text-blue-600 stroke-[1.5]" />,
  <LayoutTemplate className="w-8 h-8 text-blue-600 stroke-[1.5]" />
];

export default function EventResources({ data }: { data: any }) {
  if (!data.resources || data.resources.length === 0) return null;

  return (
    <div className="w-full bg-[#051430] text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col mb-20 max-w-3xl">
          <span className="text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-4 block">
            Exclusive Access
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.95]">
            Premium Resources.
          </h2>
          <p className="text-xl text-blue-200 font-medium max-w-xl">
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
              className="bg-white p-10 rounded-none flex flex-col group cursor-default"
            >
              <div className="mb-10">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-2xl font-black text-[#051430] mb-4 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
