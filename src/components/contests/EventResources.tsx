import React from 'react';
import { motion } from 'framer-motion';
import { Database, Laptop, Video } from 'lucide-react';

export default function EventResources({ data }: { data: any }) {
  if (!data.resources || data.resources.length === 0) return null;

  const icons = [Database, Video, Laptop];

  return (
    <div className="w-full bg-white text-gray-900 py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-purple-600 mb-4">
              Premium Access
            </h2>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
              Tools to Build the Future
            </h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              We provide you with everything you need to succeed. From industry-leading cloud infrastructure to live mentoring sessions with top engineers, your journey is fully supported.
            </p>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.resources.map((item: any, i: number) => {
              const Icon = icons[i % icons.length];
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
