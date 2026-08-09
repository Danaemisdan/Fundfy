import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';

export default function EventAbout({ data }: { data: any }) {
  return (
    <div className="w-full bg-white text-[#050505] py-24 md:py-32 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20"
        >
          <div className="flex flex-col max-w-2xl">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 block">
              About The Challenge
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-black">
              Build the Next Generation of Solutions.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed border-l-4 border-black pl-6">
              {data.description}
            </p>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col bg-[#f4f4f4] p-10 rounded-none border-b-4 border-transparent hover:border-black transition-colors"
          >
            <div className="mb-12">
              <Target className="w-10 h-10 text-black stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-black text-black tracking-tight mb-4 uppercase">The Objective</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Solve real-world problems using cutting-edge APIs and frameworks. You'll be challenged to create highly scalable, performant applications from scratch in a competitive timeframe.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-[#f4f4f4] p-10 rounded-none border-b-4 border-transparent hover:border-black transition-colors"
          >
            <div className="mb-12">
              <Zap className="w-10 h-10 text-black stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-black text-black tracking-tight mb-4 uppercase">What You'll Build</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              From robust full-stack web applications to AI-powered predictive models. Bring your own ideas or choose from our partner-sponsored specific problem statements.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col bg-[#f4f4f4] p-10 rounded-none border-b-4 border-transparent hover:border-black transition-colors"
          >
            <div className="mb-12">
              <Users className="w-10 h-10 text-black stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-black text-black tracking-tight mb-4 uppercase">Who Should Join</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Open to university students, recent graduates, and seasoned developers. Whether you're a frontend wizard or a backend architect, there's a track designed for you.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
