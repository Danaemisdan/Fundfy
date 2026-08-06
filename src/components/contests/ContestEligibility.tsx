import React from 'react';
import { motion } from 'framer-motion';

export default function ContestEligibility({ data, theme }: { data: any, theme: any }) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-20 md:py-32 bg-white">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        
        <div className="w-full md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase sticky top-32"
          >
            {data.title}
          </motion.h2>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-12 border-l border-gray-100 pl-8 md:pl-16">
          {data.rules.map((rule: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className={`absolute -left-[33px] md:-left-[65px] top-1.5 w-2 h-2 rounded-full bg-${theme.primaryAccent}`} />
              <h3 className="text-xl md:text-2xl font-sans font-bold text-[#1e2335] mb-3">
                {rule.title}
              </h3>
              <p className="text-base text-gray-600 font-medium">
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
