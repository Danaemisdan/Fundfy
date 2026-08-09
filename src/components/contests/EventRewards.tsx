import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Gift, CheckCircle2 } from 'lucide-react';

export default function EventRewards({ data }: { data: any }) {
  const overallWinners = data.rewards?.find((r: any) => r.title === 'OVERALL WINNERS');
  const participants = data.rewards?.find((r: any) => r.title === 'EVERY PARTICIPANT RECEIVES');

  return (
    <div className="w-full bg-[#050505] text-white py-32 border-t border-white/5 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Massive Prize Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
              The Rewards
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 tracking-tighter mb-4 drop-shadow-2xl">
              $50,000
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-[0.3em]">
              Total Prize Pool
            </span>
          </div>
        </div>

        {overallWinners && (
          <div className="relative mb-32">
            
            {/* Podium Layout */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 md:h-[400px]">
              
              {/* 2nd Place */}
              {overallWinners.items[1] && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-full md:w-1/3 bg-white/[0.03] backdrop-blur-md rounded-t-3xl rounded-b-xl border border-white/10 p-8 flex flex-col items-center text-center relative z-10 md:h-[320px] order-2 md:order-1 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center mb-4 absolute -top-8 shadow-[0_0_30px_rgba(156,163,175,0.3)] border-2 border-[#050505]">
                    <span className="text-2xl font-black text-white drop-shadow-md">2</span>
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                    <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase mb-3">{overallWinners.items[1].description}</span>
                    <span className="text-4xl font-black text-white tracking-tight">{overallWinners.items[1].title}</span>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              {overallWinners.items[0] && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="w-full md:w-1/3 bg-gradient-to-b from-yellow-500/20 to-purple-900/40 backdrop-blur-md rounded-t-3xl rounded-b-xl border border-yellow-500/30 p-8 flex flex-col items-center text-center relative z-20 md:h-[420px] order-1 md:order-2 transform md:-translate-y-4 shadow-[0_0_50px_rgba(234,179,8,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-50 pointer-events-none rounded-t-3xl" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center mb-4 absolute -top-10 shadow-[0_0_40px_rgba(234,179,8,0.5)] border-2 border-[#050505]">
                    <Trophy className="w-10 h-10 text-white drop-shadow-md" />
                  </div>
                  <div className="mt-12 flex flex-col items-center relative z-10">
                    <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase mb-4">{overallWinners.items[0].description}</span>
                    <span className="text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">{overallWinners.items[0].title}</span>
                  </div>
                </motion.div>
              )}

              {/* 3rd Place */}
              {overallWinners.items[2] && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="w-full md:w-1/3 bg-white/[0.03] backdrop-blur-md rounded-t-3xl rounded-b-xl border border-white/10 p-8 flex flex-col items-center text-center relative z-10 md:h-[280px] order-3 md:order-3 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 absolute -top-8 shadow-[0_0_30px_rgba(249,115,22,0.3)] border-2 border-[#050505]">
                    <span className="text-2xl font-black text-white drop-shadow-md">3</span>
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                    <span className="text-orange-400/80 font-bold tracking-[0.2em] text-xs uppercase mb-3">{overallWinners.items[2].description}</span>
                    <span className="text-4xl font-black text-white tracking-tight">{overallWinners.items[2].title}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Honorable Mentions */}
            {overallWinners.items[3] && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 max-w-2xl mx-auto bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-2xl font-black text-white tracking-tight mb-1">{overallWinners.items[3].title}</span>
                  <span className="text-gray-400 font-medium text-sm">{overallWinners.items[3].description}</span>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Every Participant */}
        {participants && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-gradient-to-br from-white/[0.05] to-transparent rounded-3xl p-10 md:p-16 border border-white/10 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">For Every Participant</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {participants.items.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/20 rounded-full p-1">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-gray-200 leading-tight">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
