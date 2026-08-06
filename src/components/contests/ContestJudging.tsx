import React from 'react';
import { motion } from 'framer-motion';

export default function ContestJudging({ data, theme }: { data: any, theme: any }) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-24 md:py-32">
      
      <div className="mb-16 md:mb-20 flex flex-col items-start">
        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
          {data.title}
        </h2>
        <p className="text-3xl md:text-5xl font-sans font-semibold text-[#1e2335] leading-tight tracking-tight max-w-xl">
          How we evaluate greatness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {data.criteria.map((crit: any, idx: number) => {
          // Asymmetric layout: first item spans 8 cols, second spans 4 cols, etc.
          const colSpan = idx === 0 ? 'md:col-span-8' : idx === 1 ? 'md:col-span-4' : idx === 2 ? 'md:col-span-4' : idx === 3 ? 'md:col-span-8' : 'md:col-span-12';
          const bgClass = idx === 0 ? `${theme.glassEffect} backdrop-blur-md` : 'bg-white border-gray-200';
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${colSpan} ${bgClass} border p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[250px] group`}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-xl md:text-3xl font-futuristic font-bold text-[#1e2335] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300">
                  {crit.name}
                </h3>
                <span className="text-sm font-bold tracking-[0.2em] text-gray-400">
                  {crit.weight}
                </span>
              </div>
              <p className="text-base text-gray-600 font-medium max-w-md">
                {crit.desc}
              </p>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
