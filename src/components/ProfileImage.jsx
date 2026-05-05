import { motion } from 'framer-motion';

const ProfileImage = ({ src, alt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        layout: { duration: 0.3 }
      }}
      className="relative group flex-shrink-0 z-30"
    >
      {/* Outer glow ring - Enhanced for more impact */}
      <div className="absolute -inset-4 rounded-full bg-gold-500/20 
        opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />

      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-500/40 via-gold-600/20 to-gold-500/40 
        opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

      {/* Animated border gradient */}
      <div className="absolute -inset-[2px] rounded-2xl overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, #FFD700, transparent, #FFC300, transparent, #FFD700)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Image container */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden
        bg-gradient-to-br from-white/[0.06] to-white/[0.02]
        border border-white/[0.1] group-hover:border-gold-500/50
        shadow-2xl transition-all duration-500"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          loading="eager"
        />

        {/* Holographic shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          translate-x-[-100%] group-hover:translate-x-[100%]"
          style={{ transition: 'transform 0.7s ease, opacity 0.3s ease' }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileImage;
