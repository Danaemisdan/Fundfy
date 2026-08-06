import { motion } from 'framer-motion';

export default function EventRewards({ data, theme }: { data: any, theme: any }) {
  return (
    <div className="w-full flex flex-col">
      {data.rewards.map((category: any, idx: number) => {
        // Theme variables based on category.theme
        let bgClass = 'bg-[#f8f9fa]';
        let textClass = 'text-black';
        let subtextClass = 'text-gray-500';
        let borderClass = 'border-gray-200';
        
        if (category.theme === 'dark') {
          bgClass = 'bg-[#11131c]';
          textClass = 'text-white';
          subtextClass = 'text-gray-400';
          borderClass = 'border-white/10';
        } else if (category.theme === 'premium') {
          bgClass = 'bg-black';
          textClass = 'text-white';
          subtextClass = 'text-gray-400';
          borderClass = 'border-white/10';
        }

        return (
          <section key={idx} className={`relative w-full py-32 md:py-48 ${bgClass} ${textClass} border-b ${borderClass} overflow-hidden`}>
            
            {category.theme === 'premium' && (
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${theme.accentGradient} opacity-10 blur-[150px] -z-10`} />
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 flex flex-col items-center text-center">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 md:mb-24"
              >
                <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 opacity-70">
                  {category.title}
                </h2>
              </motion.div>

              <div className="w-full flex flex-col gap-12 md:gap-20">
                {category.items.map((item: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    {item.value && (
                      <h3 className={`text-6xl md:text-[140px] font-futuristic font-bold leading-none tracking-tighter mb-4 ${category.theme === 'dark' ? `text-transparent bg-clip-text bg-gradient-to-br ${theme.accentGradient}` : ''}`}>
                        {item.value}
                      </h3>
                    )}
                    <h4 className={`text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4 ${item.value ? '' : (category.theme === 'premium' ? `text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}` : '')}`}>
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className={`text-lg md:text-xl font-medium ${subtextClass} max-w-2xl`}>
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}
