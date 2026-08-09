import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2, LayoutTemplate, Globe, Presentation } from 'lucide-react';

export default function EventJudging({ data }: { data: any }) {
  if (!data.judgingCriteria || data.judgingCriteria.length === 0) return null;

  // Map icons based on index or name
  const icons = [Lightbulb, Code2, LayoutTemplate, Globe, Presentation];

  return (
    <div className="w-full bg-[#f8fafc] text-gray-900 py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-purple-600 mb-4">
            Judging Criteria
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            How You Will Be Scored
          </h3>
          <p className="text-lg text-gray-500 font-medium">
            Our expert panel of judges will evaluate your submission based on a rigorous and transparent scoring rubric. Focus on these core areas to maximize your chances of winning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.judgingCriteria.map((item: any, i: number) => {
            const Icon = icons[i % icons.length];
            // Make the first item take up more space in the bento grid if needed, or just standard grid
            const isFeatured = i === 0 || i === 1; 
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={\`bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow \${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}\`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-black text-purple-600 tracking-tighter">
                    {item.weight}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
