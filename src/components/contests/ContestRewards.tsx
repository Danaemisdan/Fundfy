import React from 'react';
import { motion } from 'framer-motion';

export default function ContestRewards({ data, theme }: { data: any, theme: any }) {
  return (
    <section className="relative w-full bg-[#11131c] text-white py-24 md:py-32 overflow-hidden mt-10">
      
      <div className={`absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br ${theme.accentGradient} opacity-10 blur-[100px] -z-10`} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">
            {data.title}
          </h2>
        </div>

        {/* Grand Prize */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mb-20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase block mb-4">
                {data.grandPrize.title}
              </span>
              <h3 className={`text-6xl md:text-8xl lg:text-[120px] font-futuristic font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient} leading-none tracking-tighter`}>
                {data.grandPrize.cash}
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {data.grandPrize.perks.map((perk: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${theme.secondaryAccent}`} />
                  <span className="text-sm md:text-base font-semibold tracking-wide text-gray-300 uppercase">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Runner Ups */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.runnerUps.map((runnerUp: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-3">
                  {runnerUp.title}
                </span>
                <p className="text-xl md:text-2xl font-futuristic font-bold text-white leading-tight">
                  {runnerUp.prize}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Special Reward */}
          {data.special && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentGradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
              <div className={`relative h-full w-full bg-[#11131c] border-2 border-${theme.primaryAccent}/30 p-8 md:p-10 rounded-3xl flex flex-col justify-center overflow-hidden`} >
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase block mb-3 relative z-10">
                  {data.special.title}
                </span>
                <h4 className="text-2xl md:text-3xl font-sans font-semibold text-white leading-snug relative z-10">
                  {data.special.prize}
                </h4>
              </div>
            </motion.div>
          )}

        </div>

        {/* Participation Rewards Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="shrink-0">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              {data.participation.title}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4 md:gap-8 w-full">
            {data.participation.items.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-500" />
                <span className="text-[10px] md:text-xs font-semibold tracking-wider text-gray-300 uppercase">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
