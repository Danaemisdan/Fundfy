import { motion } from 'framer-motion';

export default function EventWhyParticipate({ data }: { data: any }) {
  return (
    <section className="w-full bg-white py-32 md:py-48 relative z-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        <div className="mb-24">
          <h2 className="text-4xl md:text-7xl font-sans font-bold text-black tracking-tight">
            Why you <span className="italic text-gray-400">must</span> participate.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-16">
          {data.whyParticipate.map((reason: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <div className="text-xl font-futuristic font-bold tracking-tighter text-gray-300 mb-6">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-black mb-4 leading-tight">
                {reason.title}
              </h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
