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
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-start`}>
              
              {/* Content side */}
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#ededed] group-hover:text-[#c9a96e] transition-colors">
                  {proj.title}
                </h3>
                
                <p className="text-[#888888] leading-relaxed text-sm lg:text-base">
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono text-[#c9a96e]/80 bg-[#c9a96e]/5 px-2.5 py-1 rounded"
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
                    className="text-[#ededed] hover:text-[#c9a96e] transition-colors"
                    aria-label={`View ${proj.title} on GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ededed] hover:text-[#c9a96e] transition-colors"
                      aria-label={`View ${proj.title} live demo`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description card side */}
              <div className="lg:w-1/2">
                <div className="bg-[#111111] rounded-lg p-6 border border-[#1f1f1f] hover:border-[#c9a96e]/20 transition-colors">
                  <p className="text-[#888888] text-sm leading-relaxed">
                    {proj.longDescription}
                  </p>

                  {/* Key metrics — simple inline */}
                  <div className="mt-5 pt-4 border-t border-[#1f1f1f] grid grid-cols-3 gap-4">
                    {proj.metrics.map((met, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[#c9a96e] font-mono text-xs font-medium">{met.value}</div>
                        <div className="text-[#888888]/60 text-[10px] mt-0.5">{met.label}</div>
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
