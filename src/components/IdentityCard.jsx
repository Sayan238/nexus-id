import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import ProfileImage from './ProfileImage';
import StatusBadge from './StatusBadge';
import VerifiedBadge from './VerifiedBadge';
import EmailSection from './EmailSection';
import SocialButtons from './SocialButtons';
import { FolderGit2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const memberData = {
  name: 'Sayan Barman',
  role: 'Non-Technical Lead',
  department: 'Broadcasting',
  email: '2415510003@kiit.ac.in',
  memberId: 'NX-2026-0042',
  joinDate: 'Jan 2026',
  avatar: '/profile.png',
};

const IdentityCard = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for tilt - Made snappier for "Fast Response"
  const springConfig = { stiffness: 300, damping: 15, mass: 0.3 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Mouse follow light
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const springLightX = useSpring(lightX, { stiffness: 100, damping: 30 });
  const springLightY = useSpring(lightY, { stiffness: 100, damping: 30 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    lightX.set(x * 100);
    lightY.set(y * 100);
  }, [mouseX, mouseY, lightX, lightY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    lightX.set(50);
    lightY.set(50);
    setIsHovered(false);
  }, [mouseX, mouseY, lightX, lightY]);

  // For gradient border angle
  const [borderAngle, setBorderAngle] = useState(0);
  useEffect(() => {
    let raf;
    const animateBorder = () => {
      setBorderAngle((prev) => (prev + 0.5) % 360);
      raf = requestAnimationFrame(animateBorder);
    };
    if (isHovered) {
      raf = requestAnimationFrame(animateBorder);
    }
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className="w-full max-w-[580px] mx-auto px-4"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.02 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Mouse-follow light effect - Enhanced for "Light Sweep" */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
          style={{
            background: useTransform(
              [springLightX, springLightY],
              ([x, y]) =>
                `radial-gradient(800px circle at ${x}% ${y}%, rgba(255,215,0,0.12), transparent 70%)`
            ),
          }}
        />

        {/* Glow effect border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl md:rounded-3xl z-0 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 215, 0, 0.12),
                transparent 80%
              )
            `,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            transition: 'all 0.4s ease',
          }}
        />

        {/* Holographic shine stripe */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,215,0,0.04) 55%, transparent 60%)',
          }}
        />

        {/* Card content */}
        <div className="relative z-20 glass-card rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-0 overflow-hidden">
          {/* Internal Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
          
          {/* Top bar: Verified Access */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full
              bg-gold-500/[0.06] border border-gold-500/15">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-gold-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
              </span>
              <span className="text-[8px] md:text-[11px] font-semibold text-gold-400/90 tracking-[0.2em] uppercase">
                Verified Access
              </span>
            </div>
            <span className="text-[9px] md:text-xs font-mono text-white/30 tracking-widest">
              {memberData.memberId}
            </span>
          </motion.div>

          {/* Main content: Profile + Info */}
          <div className="flex flex-row gap-2 md:gap-8 items-center md:items-start mb-6">
            {/* Left: Avatar */}
            <div className="relative flex-shrink-0">
              <ProfileImage src={memberData.avatar} alt={memberData.name} />
            </div>

            {/* Right: Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1 md:gap-2">
              <div className="flex flex-col gap-0.5 md:gap-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <h1 className="text-[28px] sm:text-3xl md:text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-tight text-white leading-[0.9] flex flex-col">
                      <span className="block sm:inline">Sayan</span>
                      <span className="block sm:inline">Barman</span>
                    </h1>
                    <div className="md:hidden">
                      <VerifiedBadge />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <VerifiedBadge />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-1"
                >
                  <p className="text-[11px] md:text-base text-white/50 font-medium whitespace-nowrap">
                    {memberData.role}
                  </p>
                  <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
                  <div className="inline-flex">
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-semibold tracking-wider uppercase
                      bg-gold-500/10 text-gold-500 border border-gold-500/20">
                      {memberData.department}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Active Nexus Member badge */}
          <div className="mt-4 md:mt-8 flex justify-center md:justify-start">
            <StatusBadge status="Active Nexus Member" />
          </div>

          {/* Email */}
          <div className="mt-6 md:mt-8">
            <EmailSection email={memberData.email} />
          </div>

          {/* Social Buttons */}
          <div className="mt-6 md:mt-8">
            <SocialButtons />
          </div>

          {/* Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="mt-6 md:mt-8"
          >
            <motion.button
              onClick={() => navigate('/projects')}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl
                bg-gradient-to-r from-gold-500/[0.08] to-gold-600/[0.04]
                border border-gold-500/15 hover:border-gold-500/30
                hover:shadow-[0_0_25px_rgba(255,215,0,0.08)]
                transition-all duration-300 cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gold-500/10 border border-gold-500/15
                  flex items-center justify-center group-hover:bg-gold-500/15 transition-colors">
                  <FolderGit2 className="w-4 h-4 md:w-5 md:h-5 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    View Projects
                  </p>
                  <p className="text-[10px] md:text-[11px] text-white/30 font-mono">
                    3 contributions
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/30 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-300" />
            </motion.button>
          </motion.div>

          {/* Bottom meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-gold-500/40" />
              <span className="text-[10px] md:text-[11px] text-white/25 font-mono">
                Joined {memberData.joinDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-gold-500/40" />
              <span className="text-[10px] md:text-[11px] text-white/25 font-mono">
                Level 5
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-gold-500/40" />
              <span className="text-[10px] md:text-[11px] text-white/25 font-mono">
                42 Contribs
              </span>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
            className="mt-6 md:mt-8 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent origin-left"
          />

          {/* Bottom brand watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center justify-center mt-3 md:mt-4"
          >
            <span className="text-[9px] md:text-[10px] text-white/10 font-display tracking-[0.3em] uppercase">
              KIIT Nexus Community
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IdentityCard;
