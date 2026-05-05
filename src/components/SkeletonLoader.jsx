import { motion } from 'framer-motion';

const SkeletonLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full max-w-[700px] mx-auto"
    >
      <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border-0">
        {/* Top bar skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-32 md:w-40 h-6 md:h-7 rounded-full skeleton" />
          <div className="w-20 md:w-24 h-4 rounded-md skeleton" />
        </div>

        {/* Main content skeleton */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
          {/* Avatar Area */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl skeleton" />
          </div>

          {/* Info Area */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="w-full max-w-[200px] h-8 md:h-10 rounded-lg skeleton" />
              <div className="w-full max-w-[150px] h-8 md:h-10 rounded-lg skeleton" />
            </div>
            <div className="w-32 h-5 rounded-md skeleton" />
            <div className="w-24 h-5 rounded-full skeleton" />
          </div>
        </div>

        {/* Status badge skeleton */}
        <div className="w-40 h-7 rounded-full skeleton mb-4" />

        {/* Email skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-12 h-3 rounded skeleton ml-1" />
          <div className="w-full h-11 rounded-xl skeleton" />
        </div>

        {/* Social skeleton */}
        <div className="space-y-3 mb-5">
          <div className="w-12 h-3 rounded skeleton" />
          <div className="flex gap-2.5">
            <div className="w-20 h-9 rounded-xl skeleton" />
            <div className="w-20 h-9 rounded-xl skeleton" />
            <div className="w-20 h-9 rounded-xl skeleton" />
          </div>
        </div>

        {/* Projects button skeleton */}
        <div className="w-full h-12 rounded-xl skeleton mb-6" />

        {/* Bottom meta skeleton */}
        <div className="flex gap-3">
          <div className="w-20 h-3 rounded skeleton" />
          <div className="w-20 h-3 rounded skeleton" />
          <div className="w-20 h-3 rounded skeleton" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonLoader;
