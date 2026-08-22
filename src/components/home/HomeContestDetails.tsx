import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { CONTESTS } from '../../data/contests';

// Shared timeline (same across all contests)
const SHARED_TIMELINE = [
  { date: 'Phase 1', title: 'Registration & Access', description: 'Sign up and get immediate access to Fundfy.app and premium learning tools.' },
  { date: 'Phase 2', title: 'Masterclasses & Upskilling', description: 'Learn AI, communication skills, and discover industry-specific AI use-cases.' },
  { date: 'Phase 3', title: 'AI-Hosted Contest', description: 'Compete in our revolutionary contest hosted entirely by AI to showcase your new skills.' },
  { date: 'Phase 4', title: 'Grooming & Resume Building', description: 'Get your resume polished, communication refined, and become fully job-ready.' },
  { date: 'Phase 5', title: 'Assured Placements & Support', description: 'We support you completely to get a job, internship, startup funding, or recognition.' },
];

const PRIZES = [
  { place: '1st Finalist', amount: '₹15 Lakhs', bg: 'bg-black', text: 'text-white', badge: 'bg-white text-black' },
  { place: '2nd Finalist', amount: '₹10 Lakhs', bg: 'bg-[#f4f4f4]', text: 'text-black', badge: 'bg-black text-white' },
  { place: '3rd Finalist', amount: '₹5 Lakhs',  bg: 'bg-[#f4f4f4]', text: 'text-black', badge: 'bg-black text-white' },
  { place: 'Top 10',   amount: '₹2 Lakhs', bg: 'bg-white border border-gray-200', text: 'text-black', badge: 'bg-gray-200 text-black' },
];

const PARTICIPANT_PERKS = [
  'Assured Internship / Job Support',
  'Confirmed Interview',
  'Fundfy.app Free Forever',
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
      {/* ── ROADMAP ── */}
      <div className="w-full bg-[#050505] text-white py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-16">

          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500 mb-4">Roadmap</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Important Dates</h3>
            <p className="mt-4 text-gray-400 font-medium text-lg max-w-xl">
              The first cohort will begin from 1st September 2026.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="flex flex-col">
              {timeline.map((item: any, i: number) => {
                const isCompleted = i === 0;
                const isActive = i === 1;

                const circleColor = isCompleted ? 'bg-blue-600 border-blue-600' : isActive ? 'bg-[#050505] border-blue-500' : 'bg-[#050505] border-white/20';
                const iconColor = isCompleted ? 'text-white' : isActive ? 'text-blue-500' : 'text-gray-500';
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative pl-12 pb-10 last:pb-0"
                  >
                    {/* Segment Line */}
                    {i !== timeline.length - 1 && (
                      <div className={`absolute left-[11px] top-[24px] bottom-[-8px] w-[2px] ${isCompleted ? 'bg-blue-600' : 'bg-white/10'}`} />
                    )}

                    {/* Icon Circle */}
                    <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${circleColor}`}>
                      {isCompleted ? (
                        <Check className={`w-3.5 h-3.5 ${iconColor} stroke-[3]`} />
                      ) : (
                        <Clock className={`w-3.5 h-3.5 ${iconColor} stroke-[2.5]`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col -mt-1">
                      <span className="text-gray-500 font-medium text-[13px] mb-1">{item.date}</span>
                      <h4 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h4>
                      <p className="text-gray-400 font-medium text-[15px] leading-relaxed max-w-md">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* —— SUPPORT FUND —— */}
      <div className="w-full bg-white text-black py-24 md:py-32 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block">Grants & Funding.</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.95]">
                ₹50 Lakhs<br /><span className="text-gray-400">in Grants.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-xl text-gray-600 font-medium">
                We don't just reward — we back the best talent, startups &amp; ideas with grants, opportunities, and career support.
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
