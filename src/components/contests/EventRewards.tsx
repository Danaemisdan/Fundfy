import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function EventRewards({ data }: { data: any }) {
  const overallWinners = data.rewards?.find((r: any) => r.title === 'OVERALL WINNERS');
  const participants = data.rewards?.find((r: any) => r.title === 'EVERY PARTICIPANT RECEIVES');

  return (
    <div className="w-full bg-white text-black py-24 md:py-32 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block">
              The Rewards
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.95]">
              ₹50 Lakhs in Backing.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-xl text-gray-600 font-medium">
              We don't just reward — we back the best talent, startups &amp; ideas with grants, opportunities, and career support.
            </p>
          </div>
        </div>

        {overallWinners && (
          <div className="mb-24">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-10 border-b-2 border-black pb-4">Top Performers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1st Place */}
              {overallWinners.items[0] && (
                <div className="bg-black text-white p-10 flex flex-col justify-between border-4 border-black">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                      1st Place
                    </span>
                    <h4 className="text-5xl font-black tracking-tighter mb-4">{overallWinners.items[0].title}</h4>
                  </div>
                  <p className="text-gray-400 font-medium mt-12 text-lg">{overallWinners.items[0].description}</p>
                </div>
              )}

              {/* 2nd & 3rd Place Stacked */}
              <div className="flex flex-col gap-6">
                {overallWinners.items[1] && (
                  <div className="bg-[#f4f4f4] text-black p-8 flex-1 flex flex-col justify-between border border-gray-200">
                    <div>
                      <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                        2nd Place
                      </span>
                      <h4 className="text-4xl font-black tracking-tighter mb-2">{overallWinners.items[1].title}</h4>
                    </div>
                    <p className="text-gray-600 font-medium mt-6">{overallWinners.items[1].description}</p>
                  </div>
                )}
                
                {overallWinners.items[2] && (
                  <div className="bg-[#f4f4f4] text-black p-8 flex-1 flex flex-col justify-between border border-gray-200">
                    <div>
                      <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                        3rd Place
                      </span>
                      <h4 className="text-4xl font-black tracking-tighter mb-2">{overallWinners.items[2].title}</h4>
                    </div>
                    <p className="text-gray-600 font-medium mt-6">{overallWinners.items[2].description}</p>
                  </div>
                )}
              </div>

              {/* Honorable Mentions */}
              {overallWinners.items[3] && (
                <div className="bg-white text-black p-10 flex flex-col justify-between border-4 border-[#f4f4f4]">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-200 text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                      Honorable Mentions
                    </span>
                    <h4 className="text-4xl font-black tracking-tighter mb-4">{overallWinners.items[3].title}</h4>
                  </div>
                  <p className="text-gray-500 font-medium mt-12">{overallWinners.items[3].description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Every Participant */}
        {participants && (
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Every Participant Receives</h3>
            <div className="bg-[#051430] text-white p-10 md:p-12 flex flex-col md:flex-row gap-12 items-start md:items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {participants.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-600 p-1">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                    <span className="block text-lg font-bold leading-tight">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
