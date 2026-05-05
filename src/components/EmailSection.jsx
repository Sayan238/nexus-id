import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Mail } from 'lucide-react';

const EmailSection = ({ email = 'sayan.barman@nexus.dev' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="relative group"
    >
      {/* EMAIL label */}
      <p className="text-[10px] font-semibold text-white/30 tracking-[0.2em] uppercase mb-1.5 ml-1">
        Email
      </p>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl
        bg-white/[0.03] border border-white/[0.06]
        hover:border-gold-500/20 hover:bg-white/[0.05]
        transition-all duration-300"
      >
        <Mail size={16} className="text-gold-500/60 flex-shrink-0" />
        <span className="text-sm text-white/60 font-mono tracking-wide flex-1 truncate">
          {email}
        </span>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.85 }}
          className="relative flex items-center justify-center w-8 h-8 rounded-lg
            bg-white/[0.05] hover:bg-gold-500/10
            border border-transparent hover:border-gold-500/20
            transition-all duration-300 cursor-pointer"
          title="Copy email"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Check size={14} className="text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Copy size={14} className="text-white/40 group-hover:text-gold-500/80 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Copied tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            className="absolute -top-8 right-0 px-2.5 py-1 rounded-md
              bg-green-500/20 border border-green-500/30
              text-xs text-green-400 font-medium whitespace-nowrap"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailSection;
