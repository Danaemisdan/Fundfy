import React from 'react';
import { CONTESTS } from '../../data/contests';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ContestShowcase({ referrerMode = false, referralCode = '' }: { referrerMode?: boolean, referralCode?: string }) {
  const navigate = useNavigate();

  return (
    <section className={`w-full relative z-10 ${referrerMode ? 'bg-transparent pt-12 pb-16' : 'bg-white pt-24 pb-32'}`}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 mb-16 relative z-20">
        <div className="flex flex-col items-start gap-4">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-500">
            {referrerMode ? 'Available Contests' : 'Choose Your Challenge.'}
          </span>
          {!referrerMode && (
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-[0.9]">
               Current <span className="text-gray-400">Opportunities.</span>
             </h2>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-20">
        <div className="flex flex-col border-t-4 border-black">
          {CONTESTS.map((contest, index) => {
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={contest.id}
                onClick={() => {
                  if (referrerMode && referralCode) {
                    navigate(`/contests/${contest.id}?ref=${referralCode}`);
                  } else {
                    navigate(`/contests/${contest.id}`);
                  }
                }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 border-b border-gray-200 hover:bg-[#f4f4f4] cursor-pointer transition-colors px-4 md:px-8 -mx-4 md:-mx-8"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-12 md:items-center w-full md:w-auto">
                  <div className="flex flex-col gap-2 w-full md:w-64 shrink-0">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">{contest.category}</span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase w-fit px-3 py-1 ${contest.status === 'OPEN' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {contest.status === 'OPEN' ? 'OPEN NOW' : 'COMING SOON'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <h3 className="text-2xl md:text-4xl font-black text-black tracking-tight group-hover:text-purple-600 transition-colors">
                      {contest.title}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-gray-500 max-w-xl">
                      {contest.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto mt-8 md:mt-0 justify-between md:justify-end">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">Status</span>
                    <span className="text-lg md:text-xl font-black text-black">
                      {contest.prizeHighlight}
                    </span>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
