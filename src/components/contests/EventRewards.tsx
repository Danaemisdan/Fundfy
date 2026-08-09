import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Gift, CheckCircle2 } from 'lucide-react';

export default function EventRewards({ data }: { data: any }) {
  const overallWinners = data.rewards?.find((r: any) => r.title === 'OVERALL WINNERS');
  const participants = data.rewards?.find((r: any) => r.title === 'EVERY PARTICIPANT RECEIVES');

  return (
    <div className="w-full bg-[#f8fafc] text-gray-900 py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Massive Prize Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-purple-600 mb-4">
            The Rewards
          </h2>
          <div className="flex flex-col items-center">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tighter mb-2">
              $50,000
            </span>
            <span className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest">
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
                  className="w-full md:w-1/3 bg-white rounded-t-3xl rounded-b-xl border border-gray-200 shadow-xl p-8 flex flex-col items-center text-center relative z-10 md:h-[320px] order-2 md:order-1"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 absolute -top-8 border-4 border-white shadow-md">
                    <span className="text-2xl font-black text-gray-400">2</span>
                  </div>
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-2">Runner Up</span>
                    <span className="text-4xl font-black text-gray-800 tracking-tight">{overallWinners.items[1].title}</span>
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
                  className="w-full md:w-1/3 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-t-3xl rounded-b-xl shadow-2xl p-8 flex flex-col items-center text-center relative z-20 md:h-[400px] order-1 md:order-2 transform md:-translate-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mb-4 absolute -top-10 border-4 border-white shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div className="mt-10 flex flex-col items-center">
                    <span className="text-yellow-300 font-bold tracking-widest text-sm uppercase mb-2">Grand Prize</span>
                    <span className="text-5xl font-black text-white tracking-tight mb-4">{overallWinners.items[0].title}</span>
                    <p className="text-purple-200 font-medium">{overallWinners.items[0].description}</p>
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
                  className="w-full md:w-1/3 bg-white rounded-t-3xl rounded-b-xl border border-gray-200 shadow-xl p-8 flex flex-col items-center text-center relative z-10 md:h-[280px] order-3 md:order-3"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 absolute -top-8 border-4 border-white shadow-md">
                    <span className="text-2xl font-black text-orange-400">3</span>
                  </div>
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-2">Bronze</span>
                    <span className="text-4xl font-black text-gray-800 tracking-tight">{overallWinners.items[2].title}</span>
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
                className="mt-12 max-w-2xl mx-auto bg-white border border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center gap-6"
              >
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <span className="block text-xl font-bold text-gray-900">{overallWinners.items[3].title}</span>
                  <span className="text-gray-500 font-medium">{overallWinners.items[3].description}</span>
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
            className="flex flex-col bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">For Every Participant</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {participants.items.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <span className="block text-lg font-bold text-gray-800 leading-tight mb-2">{item.title}</span>
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
