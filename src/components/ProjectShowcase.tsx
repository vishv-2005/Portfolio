import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '../data';

export default function ProjectShowcase() {
  return (
    <div className="space-y-20">
      {PROJECTS_DATA.map((proj, idx) => {
        const isEven = idx % 2 === 0;
        
        return (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            {/* Project number */}
            <span className="text-sm font-mono text-[#64ffda] mb-4 block">
              {String(idx + 1).padStart(2, '0')}.
            </span>

            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-start`}>
              
              {/* Content side */}
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                  {proj.title}
                </h3>
                
                <p className="text-[#8892b0] leading-relaxed text-sm lg:text-base">
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono text-[#64ffda]/80 bg-[#64ffda]/5 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-3">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                    aria-label={`View ${proj.title} on GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                      aria-label={`View ${proj.title} live demo`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description card side */}
              <div className="lg:w-1/2">
                <div className="bg-[#112240] rounded-lg p-6 border border-[#1d3461]/50 hover:border-[#64ffda]/20 transition-colors">
                  <p className="text-[#8892b0] text-sm leading-relaxed">
                    {proj.longDescription}
                  </p>

                  {/* Key metrics — simple inline */}
                  <div className="mt-5 pt-4 border-t border-[#1d3461]/50 grid grid-cols-3 gap-4">
                    {proj.metrics.map((met, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[#64ffda] font-mono text-xs font-medium">{met.value}</div>
                        <div className="text-[#8892b0]/60 text-[10px] mt-0.5">{met.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
