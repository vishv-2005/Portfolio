import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const STORY_CHAPTERS = [
  { id: 'hero', label: 'Hello', threshold: 0 },
  { id: 'about', label: 'My Story', threshold: 0.1 },
  { id: 'achievements', label: 'Highlights', threshold: 0.26 },
  { id: 'skills', label: 'What I Know', threshold: 0.42 },
  { id: 'projects', label: 'What I Built', threshold: 0.62 },
  { id: 'contact', label: "Let's Talk", threshold: 0.85 },
];

const SCROLL_TEASERS = [
  { trigger: 0.05, text: "Scroll to discover my journey ↓", fadeOut: 0.1 },
  { trigger: 0.2, text: "Key achievements & impact ↓", fadeOut: 0.26 },
  { trigger: 0.35, text: "Keep going — see what I can do ↓", fadeOut: 0.42 },
  { trigger: 0.55, text: "Next up — projects I've built ↓", fadeOut: 0.62 },
  { trigger: 0.78, text: "Almost there — let's connect ↓", fadeOut: 0.85 },
];

export default function ScrollStory() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);

      let current = 0;
      for (let i = STORY_CHAPTERS.length - 1; i >= 0; i--) {
        if (progress >= STORY_CHAPTERS[i].threshold) {
          current = i;
          break;
        }
      }
      setActiveChapter(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ━━━ TOP PROGRESS BAR ━━━ */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#c9a96e] via-[#c9a96e] to-[#c9a96e]/40"
          style={{ width: progressBarWidth }}
        />
        {/* Glowing tip */}
        <motion.div
          className="absolute top-0 h-[2px] w-8 bg-[#c9a96e] blur-sm"
          style={{ left: progressBarWidth }}
        />
      </motion.div>


      {/* ━━━ SIDE CHAPTER NAV (desktop) ━━━ */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="fixed left-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-start gap-6"
            aria-label="Scroll progress"
          >
            {STORY_CHAPTERS.map((chapter, i) => {
              const isActive = i === activeChapter;
              const isPast = i < activeChapter;

              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id === 'hero' ? '' : chapter.id}`}
                  onClick={(e) => {
                    if (chapter.id === 'hero') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  {/* Dot + connecting line */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? 'bg-[#c9a96e] border-[#c9a96e] shadow-[0_0_8px_rgba(201,169,110,0.5)] scale-125'
                          : isPast
                            ? 'bg-[#c9a96e]/50 border-[#c9a96e]/50'
                            : 'bg-transparent border-[#333] group-hover:border-[#c9a96e]/40'
                      }`}
                    />
                    {/* Connecting line to next dot */}
                    {i < STORY_CHAPTERS.length - 1 && (
                      <div
                        className={`absolute top-4 w-px h-6 transition-colors duration-500 ${
                          isPast ? 'bg-[#c9a96e]/30' : 'bg-[#1f1f1f]'
                        }`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[11px] tracking-wider uppercase transition-all duration-500 ${
                      isActive
                        ? 'text-[#c9a96e] font-medium translate-x-0.5'
                        : isPast
                          ? 'text-[#888888]/60'
                          : 'text-[#888888]/30 group-hover:text-[#888888]/60'
                    }`}
                  >
                    {chapter.label}
                  </span>
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>


      {/* ━━━ FLOATING TEASERS (between sections) ━━━ */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {SCROLL_TEASERS.map((teaser, i) => {
            const show = scrollProgress >= teaser.trigger && scrollProgress < teaser.fadeOut;
            if (!show) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs sm:text-sm text-[#888888]/60 tracking-wide whitespace-nowrap">
                  {teaser.text}
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-8 rounded-full border border-[#c9a96e]/30 flex items-start justify-center pt-1.5"
                >
                  <div className="w-1 h-2 bg-[#c9a96e]/50 rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
