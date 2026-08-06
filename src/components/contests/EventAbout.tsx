import { motion } from 'framer-motion';

export default function EventAbout({ data }: { data: any }) {
  return (
    <section className="w-full bg-[#f8f9fa] py-32 md:py-48 relative z-20">
      <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-start">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-8">
            The Challenge
          </h2>
          
          <p className="text-3xl md:text-5xl lg:text-7xl font-sans font-medium text-black leading-[1.1] tracking-tight">
            {data.description}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
