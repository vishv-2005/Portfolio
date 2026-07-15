import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ArrowUp,
  Download,
  Send,
  RefreshCw,
  Award,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Layout,
  Database,
  Globe
} from 'lucide-react';

import { PERSONAL_INFO, SKILLS_DATA } from './data';

import BackgroundCanvas from './components/BackgroundCanvas';
import LoadingScreen from './components/LoadingScreen';
import ProjectShowcase from './components/ProjectShowcase';
import CertCardStack from './components/CertCardStack';
import AITwinChat from './components/AITwinChat';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Force scroll to top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contact form handler
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;
    setFormStatus('sending');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (!accessKey) {
        window.location.href = `mailto:vishvpatel7005@gmail.com?subject=Portfolio Contact from ${formName}&body=${encodeURIComponent(formMsg)}%0A%0AFrom: ${formName} (${formEmail})`;
        setFormStatus('success');
        setFormName(''); setFormEmail(''); setFormMsg('');
        setTimeout(() => setFormStatus('idle'), 4000);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formName,
          email: formEmail,
          message: formMsg,
          subject: `Portfolio Contact: ${formName}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        setFormName(''); setFormEmail(''); setFormMsg('');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      window.location.href = `mailto:vishvpatel7005@gmail.com?subject=Portfolio Contact from ${formName}&body=${encodeURIComponent(formMsg)}`;
      setFormStatus('success');
      setFormName(''); setFormEmail(''); setFormMsg('');
    }
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  // Group skills by category for the resume-style display
  const skillsByCategory = SKILLS_DATA.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof SKILLS_DATA>);

  const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#0a192f] text-[#ccd6f6] overflow-x-hidden">
        <BackgroundCanvas />

        {/* ─── NAVIGATION ─── */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a192f]/80 backdrop-blur-lg border-b border-[#64ffda]/5">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="text-xl font-semibold text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
              vishv<span className="text-[#64ffda]">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors"
                >
                  <span className="text-[#64ffda] font-mono text-xs mr-1">0{i + 1}.</span>
                  {link.label}
                </a>
              ))}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="text-sm text-[#64ffda] border border-[#64ffda]/40 px-4 py-1.5 rounded hover:bg-[#64ffda]/10 transition-colors"
              >
                Resume
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden text-[#64ffda] p-2 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden bg-[#112240] border-t border-[#1d3461]/30 overflow-hidden"
              >
                <div className="px-6 py-4 space-y-3">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    download
                    className="block text-sm text-[#64ffda] border border-[#64ffda]/40 px-4 py-2 rounded text-center hover:bg-[#64ffda]/10 transition-colors mt-2"
                  >
                    Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>


        {/* ─── HERO ─── */}
        <section className="min-h-screen flex items-center relative z-10 px-6">
          <div className="max-w-5xl mx-auto w-full pt-10 sm:pt-0">

            {/* Intro */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#64ffda] font-mono text-sm mb-5"
              >
                Hi, I am
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ccd6f6] mb-3 tracking-tight"
              >
                Vishv Patel.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-14 sm:h-16 overflow-hidden mb-6"
              >
                <h2
                  key={activeRoleIdx}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8892b0]/70 tracking-tight"
                >
                  {PERSONAL_INFO.taglines[activeRoleIdx]}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-[#8892b0] max-w-lg text-base leading-relaxed"
              >
                Computer Science Engineering student at Navrachana University, building
                production-grade full-stack applications, AI-powered systems, and cross-platform mobile experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-[#64ffda] border border-[#64ffda]/40 px-6 py-3 rounded text-sm font-mono hover:bg-[#64ffda]/10 transition-colors"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 text-[#8892b0] border border-[#8892b0]/20 px-6 py-3 rounded text-sm font-mono hover:text-[#64ffda] hover:border-[#64ffda]/30 transition-colors"
                >
                  <Download className="w-4 h-4" /> Resume
                </a>
              </motion.div>
            </div>


          </div>
        </section>


        {/* ─── ABOUT ─── */}
        <section id="about" className="relative z-10 py-20 sm:py-28 px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ccd6f6] flex items-center gap-3">
                <span className="text-[#64ffda] font-mono text-lg">01.</span>
                About Me
                <span className="hidden sm:block h-px bg-[#1d3461] flex-1 ml-4" />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Left — narrative */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-5 space-y-5"
              >
                <p className="text-[#8892b0] leading-relaxed">
                  I'm a B.Tech Computer Science Engineering student at Navrachana University (2023–2027)
                  with a minor in Mechatronics — bridging hardware automation with modern software systems.
                </p>
                <p className="text-[#8892b0] leading-relaxed">
                  My work spans full-stack web applications, cross-platform mobile development with Flutter,
                  and AI/ML pipelines for processing real-world data — from training NLP models to building responsive admin dashboards.
                </p>

                {/* Full profile card integrated into About section */}
                <div className="bg-[#112240]/60 border border-[#1d3461]/40 rounded-xl p-6 mt-8 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-[#1d3461]/30">
                    <div className="w-10 h-10 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/15 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-[#64ffda]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#ccd6f6]">B.Tech Computer Science & Engineering</p>
                      <p className="text-xs text-[#8892b0]">Navrachana University • 2023–2027 • CGPA: 7.62</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-[#1d3461]/30">
                    <div className="w-10 h-10 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/15 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-[#64ffda]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#ccd6f6]">Minor in Mechatronics</p>
                      <p className="text-xs text-[#8892b0]">Bridging hardware automation with software</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-[#1d3461]/30">
                    <div className="w-10 h-10 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/15 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-[#64ffda]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#ccd6f6]">3× AWS Academy Certified</p>
                      <p className="text-xs text-[#8892b0]">Cloud Foundations • ML Foundations • Data Engineering</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#64ffda]/10 border border-[#64ffda]/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#64ffda]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#ccd6f6]">Vadodara, India</p>
                      <p className="text-xs text-[#8892b0]">Open to opportunities</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right — certifications card stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-7"
              >
                <CertCardStack />
              </motion.div>
            </div>
          </div>
        </section>


        {/* ─── SKILLS (Resume-style inline format) ─── */}
        <section id="skills" className="relative z-10 py-20 sm:py-28 px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ccd6f6] flex items-center gap-3">
                <span className="text-[#64ffda] font-mono text-lg">02.</span>
                Technical Skills
                <span className="hidden sm:block h-px bg-[#1d3461] flex-1 ml-4" />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(([category, skills], catIdx) => {
                let CatIcon = Code;
                if (category === "Frameworks & Libraries") CatIcon = Layout;
                if (category === "Databases & Tools") CatIcon = Database;
                if (category === "APIs & Platforms") CatIcon = Globe;
                if (category === "Soft Skills") CatIcon = Sparkles;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                    className="bg-[#112240]/60 border border-[#1d3461]/40 rounded-xl p-6 hover:border-[#64ffda]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-[#64ffda]/10 flex items-center justify-center">
                        <CatIcon className="w-5 h-5 text-[#64ffda]" />
                      </div>
                      <h3 className="text-[#ccd6f6] font-medium">{category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <div
                          key={skill.name}
                          className="px-3 py-1.5 bg-[#0a192f] border border-[#1d3461] rounded text-xs text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda]/40 transition-colors"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ─── PROJECTS ─── */}
        <section id="projects" className="relative z-10 py-20 sm:py-28 px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ccd6f6] flex items-center gap-3">
                <span className="text-[#64ffda] font-mono text-lg">03.</span>
                Featured Projects
                <span className="hidden sm:block h-px bg-[#1d3461] flex-1 ml-4" />
              </h2>
            </motion.div>

            <ProjectShowcase />
          </div>
        </section>


        {/* ─── CONTACT ─── */}
        <section id="contact" className="relative z-10 py-20 sm:py-28 px-6 scroll-mt-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#64ffda] font-mono text-sm">04. What's Next?</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#ccd6f6] mt-4 mb-5">
                Get In Touch
              </h2>
              <p className="text-[#8892b0] leading-relaxed mb-10 max-w-lg mx-auto">
                Have an interesting project, a technical role, or just want to say hi?
                My inbox is always open — let's build something together.
              </p>
            </motion.div>

            {/* Contact form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleContactSubmit}
              className="space-y-4 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#112240] border border-[#1d3461] rounded-lg px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/40 focus:outline-none focus:border-[#64ffda]/40 transition-colors"
                />
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-[#112240] border border-[#1d3461] rounded-lg px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/40 focus:outline-none focus:border-[#64ffda]/40 transition-colors"
                />
              </div>

              <textarea
                required
                rows={4}
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                placeholder="Your Message"
                className="w-full bg-[#112240] border border-[#1d3461] rounded-lg px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/40 focus:outline-none focus:border-[#64ffda]/40 transition-colors resize-none"
              />

              {formStatus === 'success' && (
                <p className="text-[#64ffda] text-sm text-center">
                  ✓ Message sent! I'll get back to you soon.
                </p>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="inline-flex items-center gap-2 text-[#64ffda] border border-[#64ffda]/40 px-8 py-3 rounded text-sm font-mono hover:bg-[#64ffda]/10 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {formStatus === 'sending' ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </div>
            </motion.form>

            {/* Social links — prominent in contact section */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex flex-col items-center gap-2 text-[#8892b0] hover:text-[#64ffda] transition-colors group" aria-label="Email">
                <div className="w-12 h-12 rounded-full border border-[#1d3461] flex items-center justify-center group-hover:border-[#64ffda]/40 group-hover:bg-[#64ffda]/5 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono">Email</span>
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-[#8892b0] hover:text-[#64ffda] transition-colors group" aria-label="GitHub">
                <div className="w-12 h-12 rounded-full border border-[#1d3461] flex items-center justify-center group-hover:border-[#64ffda]/40 group-hover:bg-[#64ffda]/5 transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono">GitHub</span>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-[#8892b0] hover:text-[#64ffda] transition-colors group" aria-label="LinkedIn">
                <div className="w-12 h-12 rounded-full border border-[#1d3461] flex items-center justify-center group-hover:border-[#64ffda]/40 group-hover:bg-[#64ffda]/5 transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>


        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 py-8 px-6 border-t border-[#1d3461]/20">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8892b0]/50 font-mono">
              Designed & Built by Vishv Patel
            </p>
            <div className="flex gap-6 text-xs text-[#8892b0]/40">
              <a href="#about" className="hover:text-[#64ffda] transition-colors">About</a>
              <a href="#projects" className="hover:text-[#64ffda] transition-colors">Projects</a>
              <a href="#contact" className="hover:text-[#64ffda] transition-colors">Contact</a>
            </div>
          </div>
        </footer>


        {/* ─── FLOATING ELEMENTS ─── */}
        <AITwinChat />

        {/* Back to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 left-6 z-40 bg-[#112240] border border-[#1d3461] p-2.5 rounded-full text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda]/30 transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Decorative side social links — more visible with labels (desktop only) */}
        <div className="fixed bottom-0 left-8 z-30 hidden lg:flex flex-col items-center gap-5">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-[#8892b0] hover:text-[#64ffda] hover:-translate-y-1 transition-all" title="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#8892b0] hover:text-[#64ffda] hover:-translate-y-1 transition-all" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#8892b0] hover:text-[#64ffda] hover:-translate-y-1 transition-all" title="Email">
            <Mail className="w-5 h-5" />
          </a>
          <div className="w-px h-20 bg-[#8892b0]/30" />
        </div>

        <div className="fixed bottom-0 right-8 z-30 hidden lg:flex flex-col items-center gap-5">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-xs tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            {PERSONAL_INFO.email}
          </a>
          <div className="w-px h-20 bg-[#8892b0]/30" />
        </div>
      </div>
    </>
  );
}
