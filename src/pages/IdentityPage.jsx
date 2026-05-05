import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import IdentityCard from '../components/IdentityCard';
import SkeletonLoader from '../components/SkeletonLoader';

const IdentityPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-[#050505]">
      {/* Particle starfield background */}
      <ParticleBackground />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Deep Grain / Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Improved Ambient Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gold-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gold-600/15 blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-transparent via-black/40 to-black/80" />
        
        {/* Moving light spots */}
        <motion.div
          animate={{ x: ['-20%', '20%'], y: ['-10%', '10%'] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-[20%] right-[30%] w-64 h-64 bg-white/5 blur-[80px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center py-12 md:py-20 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-gold-500/[0.06] border border-gold-500/10 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
            <span className="text-xs font-medium text-gold-500/80 tracking-wider uppercase">
              KIIT NEXUS
            </span>
          </motion.div>
          <h2 className="text-lg md:text-xl font-display font-light text-white/30 tracking-wider">
            MEMBER IDENTITY CARD
          </h2>
        </motion.div>

        {/* Card area with skeleton */}
        <div className="w-full flex justify-center px-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <SkeletonLoader key="skeleton" />
            ) : (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[700px]"
              >
                <IdentityCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 px-4 w-full max-w-[700px] mx-auto text-center"
        >
          <h2 className="text-2xl md:text-5xl lg:text-7xl font-display font-extrabold uppercase tracking-tighter">
            <span className="text-white/80">WHERE </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-500">
              IDENTITY
            </span>
            <span className="text-white/80"> MEETS IMPACT</span>
            <span className="text-gold-500">.</span>
          </h2>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-16 text-center"
        >
          <p className="text-[11px] text-white/15 font-mono tracking-wider">
            ◆ KIIT NEXUS TECH PLATFORM • EST. 2026 ◆
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default IdentityPage;
