import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import ProjectsSection from '../components/ProjectsSection';

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Back Button */}
      <div className="relative z-20 w-full max-w-[1000px] mx-auto px-6 pt-12">
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-white/40 hover:text-gold-500 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm tracking-widest uppercase">Back to Card</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-4">
        <ProjectsSection />
      </div>

      {/* Footer */}
      <div className="relative z-10 py-12 text-center">
        <p className="text-[11px] text-white/10 font-mono tracking-[0.4em] uppercase">
          Nexus Project Archive • 2026
        </p>
      </div>

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px]
          bg-gradient-radial from-gold-500/[0.02] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px]
          bg-gradient-radial from-gold-600/[0.02] to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ProjectsPage;
