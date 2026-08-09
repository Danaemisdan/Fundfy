import React from 'react';
import { motion } from 'framer-motion';

export default function EventTimeline({ data }: { data: any }) {
  if (!data.timeline || data.timeline.length === 0) return null;

  return (
    <div className="w-full bg-[#050505] text-white py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Roadmap
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Important Dates
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 transform md:-translate-x-1/2 rounded-full" />
          
          <div className="flex flex-col gap-12">
            {data.timeline.map((item: any, i: number) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#050505] transform -translate-x-1/2 z-10 mt-1 md:mt-0" />
                  
                  {/* Date Block */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start pl-12 md:pl-16' : 'md:justify-end pl-12 md:pl-0 md:pr-16'}`}>
                    <span className="text-blue-400 font-bold tracking-widest text-sm uppercase bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                      {item.date}
                    </span>
                  </div>
                  
                  {/* Content Block */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:text-right pl-12 md:pl-0 md:pr-16 mt-4 md:mt-0' : 'md:items-start md:text-left pl-12 md:pl-16 mt-4 md:mt-0'}`}>
                    <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
