import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 2;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      id="loading-container"
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#c9a96e]/5 blur-[120px] pointer-events-none" />

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl font-light text-[#ededed] tracking-tight mb-2"
      >
        Vishv Patel
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm text-[#888888] mb-12 tracking-wide"
      >
        Software Engineer
      </motion.p>

      {/* Minimal progress bar */}
      <div className="w-48 sm:w-56">
        <div className="h-[2px] w-full bg-[#1f1f1f] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#c9a96e]/60 via-[#c9a96e] to-[#c9a96e]/70 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] text-[#888888]/60 text-center mt-3 font-mono"
        >
          {progress < 100 ? 'Loading...' : 'Welcome'}
        </motion.p>
      </div>
    </motion.div>
  );
}
