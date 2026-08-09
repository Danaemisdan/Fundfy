import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';

export default function EventAbout({ data }: { data: any }) {
  return (
    <div className="w-full bg-white text-gray-900 py-24 relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-16 items-center text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-bold tracking-widest text-purple-600 uppercase mb-4">
            About The Challenge
          </h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
            Build the Next Generation of Solutions
          </p>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">The Objective</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Solve real-world problems using cutting-edge APIs and frameworks. You'll be challenged to create highly scalable, performant applications from scratch in a competitive timeframe.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">What You'll Build</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              From robust full-stack web applications to AI-powered predictive models. Bring your own ideas or choose from our partner-sponsored specific problem statements.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Who Should Join</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Open to university students, recent graduates, and seasoned developers. Whether you're a frontend wizard or a backend architect, there's a track designed for you.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
