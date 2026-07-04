import { useRef } from 'react';
import { TIMELINE_DATA } from '../data';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Milestone, 
  Briefcase, 
  Calendar, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  education: GraduationCap,
  milestone: Milestone,
  project: Briefcase
};

const COLOR_MAP: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  education: {
    border: "border-cyan-500/25 hover:border-cyan-400/50",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "rgba(34, 211, 238, 0.15)"
  },
  milestone: {
    border: "border-purple-500/25 hover:border-purple-400/50",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  project: {
    border: "border-emerald-500/25 hover:border-emerald-400/50",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(16, 185, 129, 0.15)"
  }
};

export default function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full py-8 select-none">
      
      {/* Decorative center timeline track */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/5 via-cyan-500/20 to-purple-500/5 -translate-x-1/2 hidden md:block" />
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/5 via-cyan-500/20 to-purple-500/5 md:hidden" />

      <div className="space-y-12 md:space-y-16">
        {TIMELINE_DATA.map((evt, idx) => {
          const IconComp = ICON_MAP[evt.type] || Milestone;
          const colors = COLOR_MAP[evt.type] || COLOR_MAP.milestone;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={idx}
              className={`flex flex-col md:flex-row items-stretch w-full ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Left/Right Card Spacer */}
              <div className="w-full md:w-1/2" />

              {/* Central Chronological Node Bullet */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_${colors.glow}]`}
                >
                  <IconComp className={`w-5 h-5 ${colors.text}`} />
                </motion.div>
              </div>

              {/* Interactive Story Event Card */}
              <div className="w-full md:w-1/2 pl-16 md:pl-12 md:pr-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.82, y: -40 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`
                    bg-[#070b14]/75 border ${colors.border} rounded-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden group hover:shadow-[0_0_30px_${colors.glow}] transition-all duration-300
                  `}
                >
                  {/* Glowing vertical band on the card side closest to timeline */}
                  <div className={`absolute top-0 bottom-0 w-1 ${
                    isEven ? 'left-0' : 'right-0'
                  } bg-gradient-to-b from-cyan-400 to-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300`} />

                  <div className="flex flex-col gap-3">
                    
                    {/* Header: Year Tag & Event Type */}
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-mono font-bold ${colors.bg} ${colors.text} border ${colors.border} px-3 py-0.5 rounded-full`}>
                        {evt.year}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-semibold">
                        {evt.type}
                      </span>
                    </div>

                    {/* Event Title & Institution */}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-100 group-hover:text-cyan-300 transition-colors tracking-tight leading-snug">
                        {evt.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 italic block mt-0.5">
                        {evt.institution}
                      </span>
                    </div>

                    {/* Event Description */}
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {evt.description}
                    </p>

                    {/* Associated Skills tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/40">
                      {evt.skills.map((sk, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[9px] bg-white/[0.02] text-slate-400 border border-white/5 hover:border-cyan-400/20 hover:text-slate-200 px-2 py-0.5 rounded transition-all duration-150"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-[10px] font-mono text-slate-500">
        <span className="animate-pulse text-cyan-400 font-bold uppercase tracking-widest mr-1">⚡ STAGE CONNECTED:</span> 
        SCROLL TO ANIMATE ENTIRE CHRONOLOGICAL WORKFLOW IN REAL-TIME
      </div>

    </div>
  );
}
