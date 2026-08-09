import React from 'react';
import { motion } from 'framer-motion';

export default function EventJudging({ data }: { data: any }) {
  return (
    <div className="w-full bg-[#f4f4f4] text-black py-24 md:py-32 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Left Column: Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 flex flex-col"
          >
            <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block">
              Evaluation
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6 leading-[0.95]">
              Judging Criteria.
            </h2>
            <div className="w-16 h-2 bg-blue-600 mb-8" />
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              Projects will be evaluated by an expert panel of industry leaders based on these core metrics.
            </p>
          </motion.div>

          {/* Right Column: Structured Grid */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
              {data.judgingCriteria?.map((item: any, i: number) => {
                const isFeatured = i === 0;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white p-10 flex flex-col justify-between ${isFeatured ? 'md:col-span-2' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-12">
                      <h3 className="text-2xl font-black text-black tracking-tight uppercase pr-4">{item.name}</h3>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-4xl font-black text-blue-600 tracking-tighter">{item.weight}</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Weight</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
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
