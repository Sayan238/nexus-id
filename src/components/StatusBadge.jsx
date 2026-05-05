import { motion } from 'framer-motion';

const StatusBadge = ({ status = 'Active Member' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
        bg-gradient-to-r from-gold-500/10 to-gold-600/10
        border border-gold-500/20 backdrop-blur-sm"
    >
      {/* Animated pulse dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500 shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
      </span>
      <span className="text-xs font-semibold text-gold-400 tracking-wide uppercase">
        {status}
      </span>
    </motion.div>
  );
};

export default StatusBadge;
