import { useState } from 'react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Server, 
  Smartphone, 
  Database, 
  Cloud, 
  Sparkles, 
  FolderGit, 
  Award, 
  Activity, 
  Hourglass,
  Layout,
  Flame,
  Globe,
  Eye,
  FileText,
  Paintbrush,
  Columns4,
  Cpu,
  MonitorCheck
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  Programming: Code,
  Frontend: Smartphone,
  Backend: Server,
  Databases: Database,
  Cloud: Cloud,
  AI: Sparkles,
  Tools: FolderGit
};

const SKILL_SPECIFIC_ICONS: Record<string, any> = {
  "React": Layout,
  "Flask": Flame,
  "MongoDB Atlas": Globe,
  "EasyOCR": Eye,
  "PyMuPDF": FileText,
  "Tailwind CSS": Paintbrush,
  "MySQL": Columns4
};

export default function SkillsEcosystem() {
  // Always keep a skill selected, default to first item
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS_DATA[0]);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  const handleNodeActive = (skill: Skill) => {
    setActiveSkill(skill);
  };

  return (
    <div className="w-full relative select-none">
      
      {/* Informative Header / Helper Tag */}
      <div className="mb-6 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>GRID_ARRAY: {SKILLS_DATA.length} CORE TECHNOLOGY NODES AVAILABLE</span>
        <span className="animate-pulse text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
          <Cpu className="w-3 h-3" /> Hover nodes to live-compile diagnostics
        </span>
      </div>

      {/* Main split grid: 12-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side (8 Cols): Dense Grid of Skills */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SKILLS_DATA.map((skill) => {
            const IconComp = SKILL_SPECIFIC_ICONS[skill.name] || CATEGORY_ICONS[skill.category] || Code;
            const isHovered = hoveredSkillName === skill.name;
            const isActive = activeSkill.name === skill.name;

            return (
              <motion.button
                key={skill.name}
                onMouseEnter={() => {
                  setHoveredSkillName(skill.name);
                  handleNodeActive(skill);
                }}
                onMouseLeave={() => setHoveredSkillName(null)}
                onClick={() => handleNodeActive(skill)} // Click support for mobile/tablets
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer relative overflow-hidden group min-h-[110px]
                  ${isActive 
                    ? 'bg-cyan-950/20 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.15)] text-white' 
                    : isHovered
                      ? 'bg-blue-900/10 border-blue-500/50 text-slate-100'
                      : 'bg-[#080d16]/70 border-gray-800/80 hover:border-gray-700/60 text-slate-400 hover:text-slate-100'
                  }
                `}
              >
                {/* Active neon pointer light on the top */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]" />
                )}

                {/* Skill Proficiency Dots at top right */}
                <div className="absolute top-2 right-2.5 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`w-1 h-1 rounded-full ${
                        i < skill.level 
                          ? isActive ? 'bg-cyan-400' : 'bg-slate-500' 
                          : 'bg-slate-800'
                      }`} 
                    />
                  ))}
                </div>

                {/* Glowing Icon Wrapper */}
                <div className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-cyan-400/20 text-cyan-300' 
                    : isHovered 
                      ? 'bg-blue-500/10 text-cyan-400'
                      : 'bg-[#0b1220]/80 text-slate-400'
                  }
                `}>
                  <IconComp className="w-4.5 h-4.5 transition-transform group-hover:rotate-6 duration-200" />
                </div>

                <div>
                  <h4 className="text-xs font-bold font-mono tracking-tight leading-none mb-1 text-gray-200">
                    {skill.name}
                  </h4>
                  <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-500 font-mono block">
                    {skill.category}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Side (4 Cols): Sticky Mechatronic Diagnostics Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-gradient-to-b from-[#0c1222] to-[#040710] border border-blue-900/35 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden min-h-[360px] flex flex-col justify-between">
            {/* Radial decorative gradients */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[60px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[60px] pointer-events-none" />

            <div className="space-y-5 relative z-10">
              
              {/* Telemetry Header */}
              <div className="flex justify-between items-center border-b border-gray-800/60 pb-3">
                <span className="text-[9px] text-cyan-400 font-bold border border-cyan-400/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Telemetry Active
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  node: {activeSkill.name.replace(/\s+/g, '_').toLowerCase()}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  {(() => {
                    const IconComp = SKILL_SPECIFIC_ICONS[activeSkill.name] || CATEGORY_ICONS[activeSkill.category] || Code;
                    return <IconComp className="w-5.5 h-5.5" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-100 tracking-tight leading-none">
                    {activeSkill.name}
                  </h3>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block mt-1 font-mono">
                    {activeSkill.category} System Suite
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#050811]/60 border border-gray-800/40 rounded-xl p-3.5">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeSkill.description}
                </p>
              </div>

              {/* Implementation logs */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Integrated In Products</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.projectsUsedIn.map((p, pIdx) => (
                    <span 
                      key={pIdx}
                      className="text-[10px] bg-white/[0.03] hover:bg-cyan-500/10 text-slate-300 border border-white/5 px-2 py-0.5 rounded transition-colors duration-150"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>



            </div>

            {/* Micro footer message */}
            <div className="text-[9px] text-center text-slate-600 font-mono pt-4 border-t border-gray-900/60 mt-4 flex items-center justify-center gap-1.5">
              <MonitorCheck className="w-3 h-3 text-cyan-500" />
              <span>DIAGNOSTICS COMPILED AUTOMATICALLY</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
