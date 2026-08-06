import { motion } from 'framer-motion';

export default function EventJudging({ data }: { data: any }) {
  return (
    <section className="w-full bg-[#f8f9fa] py-32 md:py-48 relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row gap-16 md:gap-32">
        
        <div className="w-full md:w-1/3 shrink-0">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-black tracking-tight sticky top-32">
            Judging
          </h2>
        </div>

        <div className="w-full flex flex-col gap-12">
          {data.judgingCriteria.map((crit: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-gray-200 pb-12"
            >
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-2xl md:text-4xl font-sans font-bold text-black">
                  {crit.name}
                </h3>
                <span className="text-sm font-bold tracking-[0.2em] text-gray-400 ml-4">
                  {crit.weight}
                </span>
              </div>
              <p className="text-lg text-gray-500 font-medium max-w-xl">
                {crit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
