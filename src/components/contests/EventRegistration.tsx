import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EventRegistration({ data, theme }: { data: any, theme: any }) {
  
  const renderContent = () => {
    switch (data.registration.mode) {
      case 'EMBEDDED_FORM':
      case 'EXTERNAL_URL':
        return (
          <div className="flex justify-center">
            <Link 
              to={`/register?contest=${data.id}`}
              className={`px-12 py-6 bg-white text-black rounded-full font-bold tracking-[0.2em] text-sm uppercase hover:scale-105 transition-transform duration-300 shadow-2xl shadow-${theme.primaryAccent}/20`}
            >
              {data.registration.buttonText}
            </Link>
          </div>
        );
      case 'COMING_SOON':
      default:
        return (
          <div className="flex justify-center">
            <div className="px-12 py-6 bg-white/10 text-white border border-white/20 rounded-full font-bold tracking-[0.2em] text-sm uppercase backdrop-blur-md">
              {data.registration.buttonText}
            </div>
          </div>
        );
    }
  };

  return (
    <section className="w-full bg-[#050505] text-white py-32 md:py-48 relative overflow-hidden">
      
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr ${theme.accentGradient} opacity-10 blur-[100px] pointer-events-none rounded-full`} />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[100px] font-futuristic font-bold tracking-tighter uppercase"
          >
            Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Arena.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent()}
        </motion.div>

      </div>
    </section>
  );
}
