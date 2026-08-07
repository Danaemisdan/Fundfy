import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Award, Trophy, ArrowRight } from 'lucide-react';

export default function EventRewards({ data, theme, onRegisterClick }: { data: any, theme: any, onRegisterClick?: () => void }) {
  
  // Find the categories from the data layer
  const participationRewards = data.rewards?.find((r: any) => r.title === 'EVERY PARTICIPANT RECEIVES');
  const cashPrizes = data.rewards?.find((r: any) => r.title === 'TOP WINNERS RECEIVE');

  return (
    <div className="w-full flex flex-col bg-white text-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-16 w-full mt-12">
        
        {/* EVERY PARTICIPANT RECEIVES HEADER */}
        {participationRewards && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col mb-16"
          >
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-[1px] bg-purple-200 flex-1 max-w-[200px]" />
              <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-purple-900">
                EVERY PARTICIPANT RECEIVES
              </h2>
              <div className="h-[1px] bg-purple-200 flex-1 max-w-[200px]" />
            </div>

            {/* PARTICIPANT ITEMS */}
            <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
              {participationRewards.items.map((item: any, i: number) => {
                const isPremium = item.title.includes('JobFinderAI');
                const title = item.title === 'Digital Participation Certificate' ? 'Participation Certificate' : item.title;
                const desc = isPremium 
                  ? 'Unlimited access to premium AI tools, resources and career-boosting features for every verified participant.' 
                  : 'Receive an official Participation Certificate after the successful completion of the contest.';
                const Icon = isPremium ? Crown : Award;

                return (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#f5f3ff] flex items-center justify-center shrink-0">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#6d28d9]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* EXCITING CASH PRIZES SECTION */}
        {cashPrizes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {/* CASH PRIZES HEADER */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-purple-400 opacity-60" strokeWidth={1.5} />
              <h2 className="text-lg md:text-xl font-bold tracking-[0.05em] text-purple-900">
                EXCITING CASH PRIZES
              </h2>
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-purple-400 opacity-60" strokeWidth={1.5} />
            </div>

            {/* PRIZE GRID */}
            <div className="w-full bg-white rounded-2xl border border-purple-50 shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-purple-50 overflow-hidden mb-6">
              {cashPrizes.items.map((item: any, i: number) => {
                
                // Color coding based on rank
                let colorClass = 'text-purple-600 bg-[#f5f3ff]'; // Default 4th, 5th
                let titleColor = 'text-[#8b5cf6]'; // Default purple
                
                if (i === 0) {
                  colorClass = 'text-yellow-600 bg-yellow-50';
                  titleColor = 'text-yellow-500';
                } else if (i === 1) {
                  colorClass = 'text-gray-500 bg-gray-50';
                  titleColor = 'text-gray-400';
                } else if (i === 2) {
                  colorClass = 'text-orange-600 bg-orange-50';
                  titleColor = 'text-orange-500';
                }

                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-center py-6 px-3 text-center relative group hover:bg-gray-50/50 transition-colors">
                    
                    {/* Laurel & Rank */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center scale-[2.2] opacity-20 pointer-events-none">
                        {/* Generic Laurel approximation using Award icon as background */}
                        <Award className={`w-10 h-10 ${titleColor}`} strokeWidth={1} />
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base shadow-sm ${colorClass} relative z-10`}>
                        {i + 1}
                      </div>
                    </div>

                    <h4 className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-1 ${titleColor}`}>
                      {item.title}
                    </h4>
                    
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sans tracking-tighter">
                      {item.value || 'TBA'}
                    </div>
                    
                    {/* AWS Pill */}
                    <div className="px-3 py-1 rounded-full bg-[#f5f3ff] text-[8px] font-bold tracking-wider text-[#6d28d9] uppercase whitespace-nowrap">
                      + $5,000 AWS Credits*
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* AWS BANNER & REGISTER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#f5f3ff] max-w-3xl w-full">
                <img src="/Partners/AWS.webp" alt="AWS" className="w-12 object-contain mix-blend-multiply shrink-0 opacity-80" />
                <p className="text-[10px] md:text-xs text-gray-600 font-medium leading-snug">
                  * All {cashPrizes.items.length} winners and runners-up will receive <strong className="text-purple-700">$5,000 AWS</strong> Activate Credits each to supercharge their learning and building journey.
                </p>
              </div>

              <button 
                onClick={onRegisterClick}
                className="px-6 py-3 bg-white text-gray-900 text-[11px] font-bold tracking-widest uppercase rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 shrink-0 w-full md:w-auto justify-center"
              >
                REGISTER NOW
                <ArrowRight className="w-3 h-3 text-purple-600" />
              </button>
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}
