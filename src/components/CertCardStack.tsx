import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA } from '../data';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Shared card renderer ─── */
function CertCard({ cert, className = '' }: { cert: typeof CERTIFICATIONS_DATA[number]; className?: string }) {
  return (
    <div
      onClick={() => {
        if (cert.credentialUrl) {
          window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
        }
      }}
      className={`bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 shadow-2xl backdrop-blur-xl cursor-pointer hover:border-[#c9a96e]/30 transition-colors duration-200 ${className}`}
    >
      {/* Badge Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a96e]/8 to-transparent rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#c9a96e]/20 to-[#c9a96e]/5 border border-[#c9a96e]/20 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-[#c9a96e]" />
          </div>
          <span className="font-mono text-[9px] bg-[#c9a96e]/5 text-[#c9a96e] border border-[#c9a96e]/15 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold flex items-center gap-1">
            {cert.year} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#ededed] tracking-tight leading-snug line-clamp-2">
            {cert.title}
          </h4>
          <p className="text-[10px] text-[#c9a96e]/70 font-medium mt-1 uppercase tracking-wider">
            {cert.issuer}
          </p>
        </div>

        <div className="border-t border-[#1f1f1f] pt-3 space-y-1.5">
          <span className="text-[9px] uppercase tracking-wider text-[#888888]/50 font-bold block">
            Core Skills Covered
          </span>
          <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
            {cert.skillsCovered.slice(0, 3).map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[8px] bg-black/60 text-[#888888] border border-[#1f1f1f] px-1.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
            {cert.skillsCovered.length > 3 && (
              <span className="text-[8px] text-[#c9a96e] font-bold pl-1">
                +{cert.skillsCovered.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile carousel (visible < lg) ─── */
function MobileCertCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = (idx: number) => {
    setActiveIdx(Math.max(0, Math.min(CERTIFICATIONS_DATA.length - 1, idx)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(activeIdx + 1);
      else goTo(activeIdx - 1);
    }
  };

  return (
    <div className="lg:hidden py-6">
      {/* Card area */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${activeIdx * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {CERTIFICATIONS_DATA.map((cert) => (
            <div key={cert.id} className="w-full flex-shrink-0 px-2">
              <CertCard cert={cert} className="relative w-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={() => goTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#888888] hover:text-[#c9a96e] hover:border-[#c9a96e]/30 disabled:opacity-20 disabled:hover:text-[#888888] disabled:hover:border-[#1f1f1f] transition-all cursor-pointer"
          aria-label="Previous certificate"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {CERTIFICATIONS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIdx
                  ? 'w-6 h-1.5 bg-[#c9a96e]'
                  : 'w-1.5 h-1.5 bg-[#888888]/30 hover:bg-[#888888]/50'
              }`}
              aria-label={`Go to certificate ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIdx + 1)}
          disabled={activeIdx === CERTIFICATIONS_DATA.length - 1}
          className="w-8 h-8 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#888888] hover:text-[#c9a96e] hover:border-[#c9a96e]/30 disabled:opacity-20 disabled:hover:text-[#888888] disabled:hover:border-[#1f1f1f] transition-all cursor-pointer"
          aria-label="Next certificate"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[10px] text-[#888888]/40 text-center mt-3">
        Swipe or tap arrows · Tap card to view certificate
      </p>
    </div>
  );
}

/* ─── Desktop hover stack (visible >= lg) ─── */
function DesktopCertStack() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="hidden lg:flex relative py-8 px-4 flex-col items-center justify-center min-h-[380px] w-full overflow-hidden select-none">
      
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#c9a96e]/5 blur-[100px] pointer-events-none" />

      {/* Dynamic Stacking Area */}
      <div className="relative w-full max-w-sm h-[240px] flex items-center justify-center">
        {CERTIFICATIONS_DATA.map((cert, index) => {
          const isHovered = hoveredIdx !== null;
          const isCurrentHovered = hoveredIdx === index;

          let xOffset = 0;
          let yOffset = index * -12;
          let scale = 1 - (CERTIFICATIONS_DATA.length - 1 - index) * 0.05;
          let rotate = (index - 1) * 2.5;
          let zIndex = index;

          if (isHovered) {
            const centerShift = index - 1;
            xOffset = centerShift * 135;
            yOffset = Math.abs(centerShift) * 10;
            rotate = centerShift * 8;
            scale = isCurrentHovered ? 1.05 : 0.95;
            zIndex = isCurrentHovered ? 30 : index;
          }

          return (
            <motion.div
              key={cert.id}
              className="absolute w-[280px]"
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
              <CertCard cert={cert} className="relative" />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center max-w-sm px-4">
        <p className="text-xs text-[#888888]/50 italic">
          {hoveredIdx !== null 
            ? `Click to verify`
            : "Hover to spread · Click to verify"
          }
        </p>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function CertCardStack() {
  return (
    <>
      <DesktopCertStack />
      <MobileCertCarousel />
    </>
  );
}
