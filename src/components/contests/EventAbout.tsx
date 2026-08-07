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
          className="w-full"
        >
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-8">
            The Challenge
          </h2>
          
          <h3 className="text-3xl md:text-5xl font-sans font-bold text-black leading-[1.2] tracking-tight mb-8 max-w-3xl">
            Welcome to the {data.title}
          </h3>

          <div className="text-base md:text-[18px] text-gray-600 leading-[1.8] max-w-[650px] space-y-6">
            {data.description.split('. ').filter(Boolean).map((part: string, idx: number, arr: string[]) => {
              const text = part + (part.endsWith('.') ? '' : '.');
              
              if (idx === arr.length - 1 && arr.length > 1) {
                return (
                  <div key={idx} className="mt-10 pl-6 border-l-2 border-black">
                    <p className="text-black font-semibold text-xl leading-relaxed">
                      {text}
                    </p>
                  </div>
                );
              }
              
              return <p key={idx}>{text}</p>;
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
