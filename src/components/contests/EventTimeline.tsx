import { motion } from 'framer-motion';

export default function EventTimeline({ data, theme }: { data: any, theme: any }) {
  return (
    <section className="w-full bg-white py-32 md:py-48 relative z-20">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        
        <div className="mb-24">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">
            How to Participate
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {data.timeline.map((step: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group"
            >
              <div className="shrink-0 w-32">
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase text-${theme.primaryAccent}`}>
                  {step.date}
                </span>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-sans font-bold text-black mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-base text-gray-500 font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
