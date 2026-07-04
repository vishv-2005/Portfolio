import { useState } from 'react';
import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA } from '../data';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';

export default function CertCardStack() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative py-12 px-4 flex flex-col items-center justify-center min-h-[420px] w-full overflow-hidden select-none">
      
      {/* Background soft ambient AWS-blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Dynamic Stacking Area */}
      <div className="relative w-full max-w-sm h-[260px] flex items-center justify-center">
        {CERTIFICATIONS_DATA.map((cert, index) => {
          // Custom stack configurations when normal vs hovered
          const isHovered = hoveredIdx !== null;
          const isCurrentHovered = hoveredIdx === index;

          // Fan spread parameters
          let xOffset = 0;
          let yOffset = index * -12;
          let scale = 1 - (CERTIFICATIONS_DATA.length - 1 - index) * 0.05;
          let rotate = (index - 1) * 2.5;
          let zIndex = index;

          if (isHovered) {
            // Fan out horizontally
            const centerShift = index - 1; // -1, 0, 1
            xOffset = centerShift * 135;
            yOffset = Math.abs(centerShift) * 10;
            rotate = centerShift * 8;
            scale = isCurrentHovered ? 1.05 : 0.95;
            zIndex = isCurrentHovered ? 30 : index;
          }

          return (
            <motion.div
              key={cert.id}
              onClick={() => {
                if (cert.credentialUrl) {
                  window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="absolute w-[240px] sm:w-[280px] bg-[#0c1424] border border-blue-900/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl cursor-pointer hover:border-cyan-400/50 transition-colors duration-200"
              style={{ originX: 0.5, originY: 1 }}
              animate={{
                x: xOffset,
                y: yOffset,
                scale: scale,
                rotate: rotate,
                zIndex: zIndex,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Badge Glow Layer */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-xl pointer-events-none" />

              {/* Card Contents */}
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-mono text-[9px] bg-blue-500/10 text-cyan-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold flex items-center gap-1">
                    {cert.year} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-100 tracking-tight leading-snug line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] text-blue-400 font-medium mt-1 uppercase tracking-wider">
                    {cert.issuer}
                  </p>
                </div>

                {/* Cover list */}
                <div className="border-t border-blue-900/30 pt-3 space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                    Core Skills Covered
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
                    {cert.skillsCovered.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[8px] bg-white/[0.03] text-slate-300 border border-white/5 px-1.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skillsCovered.length > 3 && (
                      <span className="text-[8px] text-cyan-400 font-bold pl-1">
                        +{cert.skillsCovered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Detailed Display of current selected/hovered certification details */}
      <div className="mt-8 text-center max-w-sm px-4">
        <p className="text-xs text-slate-500 font-mono italic">
          {hoveredIdx !== null 
            ? `Click to verify AWS ${CERTIFICATIONS_DATA[hoveredIdx].id.toUpperCase()} on Credly`
            : "Hover to spread stack. Click any credential card to verify on Credly."
          }
        </p>
      </div>
    </div>
  );
}
