import { motion } from 'framer-motion';

const VerifiedBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 15 }}
      className="inline-flex items-center gap-1.5 ml-2"
      title="Verified Member"
    >
      <div className="relative">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
        >
          {/* Shield background */}
          <path
            d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.645.54.967.82 1.175.28.208.63.273 1.33.404l.636.119c2.45.459 3.674.688 3.992 1.63.318.943-.533 1.927-2.234 3.894l-.437.505c-.484.56-.726.84-.842 1.185-.116.345-.097.72-.058 1.47l.035.683c.126 2.505.19 3.757-.611 4.271-.801.514-1.905.031-4.114-.934l-.57-.25c-.627-.273-.94-.41-1.272-.41-.332 0-.645.137-1.272.41l-.57.25c-2.209.965-3.313 1.448-4.114.934-.801-.514-.737-1.766-.611-4.271l.035-.683c.039-.75.058-1.125-.058-1.47-.116-.345-.358-.625-.842-1.185l-.437-.505C2.866 11.555 2.015 10.571 2.333 9.628c.318-.942 1.543-1.171 3.992-1.63l.636-.119c.7-.131 1.05-.196 1.33-.404.28-.208.46-.53.82-1.175l.042-.076z"
            fill="url(#verifiedGradient)"
          />
          {/* Checkmark */}
          <path
            d="M8.5 12.5l2.5 2.5 4.5-5"
            stroke="#050505"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="verifiedGradient" x1="2" y1="2" x2="22" y2="22">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFC300" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 0px rgba(255,215,0,0)',
              '0 0 12px rgba(255,215,0,0.4)',
              '0 0 0px rgba(255,215,0,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default VerifiedBadge;
