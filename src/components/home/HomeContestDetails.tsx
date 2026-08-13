import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CONTESTS } from '../../data/contests';

// Shared timeline (same across all contests)
const SHARED_TIMELINE = [
  { date: 'Phase 1', title: 'Registration & Instant Access', description: 'Sign up and get instant access to Momentum EDU+ and premium learning tools.' },
  { date: 'Phase 2', title: 'Masterclasses & Upskilling', description: 'Learn AI, communication skills, and discover industry-specific AI use-cases.' },
  { date: 'Phase 3', title: 'AI-Hosted Contest', description: 'Compete in our revolutionary contest hosted entirely by AI to showcase your new skills.' },
  { date: 'Phase 4', title: 'Grooming & Resume Building', description: 'Get your resume polished, communication refined, and become fully job-ready.' },
  { date: 'Phase 5', title: 'Assured Placements & Support', description: 'We support you completely to get a job, internship, startup funding, or recognition.' },
];

const PRIZES = [
  { place: '1st Place', amount: '$15,000', bg: 'bg-black', text: 'text-white', badge: 'bg-white text-black' },
  { place: '2nd Place', amount: '$10,000', bg: 'bg-[#f4f4f4]', text: 'text-black', badge: 'bg-black text-white' },
  { place: '3rd Place', amount: '$5,000',  bg: 'bg-[#f4f4f4]', text: 'text-black', badge: 'bg-black text-white' },
  { place: 'Top 10',   amount: '$2,000 each', bg: 'bg-white border border-gray-200', text: 'text-black', badge: 'bg-gray-200 text-black' },
];

const PARTICIPANT_PERKS = [
  'Assured Internship / Job Support',
  'Confirmed Interview',
  'Momentum EDU+ AI Companion (Lifetime)',
  'Lifetime FREE JobFinderAI Premium',
];

interface Props {
  contestId?: string | null;
}

export default function HomeContestDetails({ contestId }: Props) {
  const contest = contestId ? CONTESTS.find(c => c.id === contestId) : null;
  const timeline = contest?.timeline ?? SHARED_TIMELINE;

  return (
    <div className="w-full bg-white">

      {/* ── ROADMAP ── */}
      <div className="w-full bg-[#050505] text-white py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-16">

          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">Roadmap</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Important Dates</h3>
            {contest && (
              <p className="mt-4 text-gray-400 font-medium text-lg max-w-xl">{contest.subtitle}</p>
            )}
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform md:-translate-x-1/2" />

            <div className="flex flex-col gap-16">
              {timeline.map((item: any, i: number) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-[4px] border-[#050505] rounded-none transform -translate-x-1/2 z-10 mt-1 md:mt-0" />

                    {/* Date badge */}
                    <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start pl-12 md:pl-16' : 'md:justify-end pl-12 md:pl-0 md:pr-16'}`}>
                      <span className="text-white font-bold tracking-[0.2em] text-[10px] uppercase border-2 border-white/20 hover:border-white transition-colors px-4 py-2 bg-[#050505]">
                        {item.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:text-right pl-12 md:pl-0 md:pr-16 mt-6 md:mt-0' : 'md:items-start md:text-left pl-12 md:pl-16 mt-6 md:mt-0'}`}>
                      <h4 className="text-3xl font-black text-white tracking-tight mb-2">{item.title}</h4>
                      <p className="text-gray-400 font-medium leading-relaxed max-w-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── PRIZE POOL ── */}
      <div className="w-full bg-white text-black py-24 md:py-32 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block">The Rewards</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.95]">
                $50,000<br /><span className="text-gray-400">Prize Pool.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-xl text-gray-600 font-medium">
                Significant cash prizes, premium credits, and career-defining opportunities — for every single participant.
              </p>
            </div>
          </div>

          {/* Winner cards */}
          <div className="mb-24">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-10 border-b-2 border-black pb-4">Top Performers</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {PRIZES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${p.bg} ${p.text} p-8 flex flex-col justify-between border border-gray-100`}
                >
                  <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 ${p.badge}`}>
                    {p.place}
                  </span>
                  <h4 className="text-4xl font-black tracking-tighter">{p.amount}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Every participant */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Every Participant Receives</h3>
            <div className="bg-[#051430] text-white p-10 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PARTICIPANT_PERKS.map((perk, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-600 p-1 shrink-0">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                    <span className="block text-lg font-bold leading-tight">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
