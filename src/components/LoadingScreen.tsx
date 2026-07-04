import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "SYSTEM_BOOT: Initiating Vishv Patel's Core Sandbox...",
  "COMPILE_MODULE: Loading React 19 Client Hydrator...",
  "RESOLVING: Reading B.Tech CSE (2023-2027) Credentials...",
  "ANALYZING: Processing 55,000+ custom training messages...",
  "INTEGRATING: Binding Gemini AI LLM pipelines...",
  "CONNECTING: Initiating AWS S3, SageMaker, and Data Lakes...",
  "VERIFYING: Compiling Resume JobBERT embeddings [89% Accuracy]...",
  "COMPILING: Packing Flutter Chess stockfish engine thread pools...",
  "INITIALIZED: Complete engineering world is online. Booting visual stage..."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + step);
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 850);
      return () => clearTimeout(timeout);
    }

    // Slowly increment logs based on progress
    const targetLogIndex = Math.min(
      BOOT_LOGS.length - 1,
      Math.floor((progress / 100) * BOOT_LOGS.length)
    );
    if (targetLogIndex > logIndex) {
      setLogIndex(targetLogIndex);
    }
  }, [progress, logIndex, onComplete]);

  return (
    <motion.div
      id="loading-container"
      className="fixed inset-0 bg-[#030712] flex flex-col justify-between p-6 sm:p-12 z-50 overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">
            VP_CORE_BUILD_v1.0.4
          </span>
        </div>
        <span className="font-mono text-xs text-gray-500">
          PORT: 3000 // UTC+5:30
        </span>
      </div>

      {/* Center Console Logs */}
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center my-8">
        <div className="bg-[#090d16]/80 border border-gray-800/80 rounded-xl p-6 shadow-2xl backdrop-blur-md max-h-[350px] overflow-hidden">
          <div className="flex gap-1.5 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <div className="font-mono text-xs sm:text-sm text-gray-300 space-y-2.5 h-[230px] overflow-y-auto pr-2 scrollbar-none">
            <AnimatePresence mode="popLayout">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    idx === logIndex ? "text-cyan-400 font-semibold" : "text-gray-400"
                  } leading-relaxed`}
                >
                  <span className="text-purple-400 select-none mr-2">&gt;&gt;</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            {progress < 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-cyan-400 inline-block align-middle ml-1"
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Progress & Percentage */}
      <div className="max-w-xl mx-auto w-full space-y-4">
        <div className="flex justify-between items-end font-mono">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">
              Processing Node Pipeline
            </span>
            <span className="text-xs text-gray-300">
              {progress < 100 ? "Compiling engineering system..." : "Boot complete. Welcome."}
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-light text-cyan-400 tracking-tighter">
            {progress}%
          </span>
        </div>

        {/* Outer bar */}
        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden p-[1px] border border-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.4)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
