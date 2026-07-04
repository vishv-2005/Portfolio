import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  ArrowRight, 
  Code2, 
  Cpu, 
  Database, 
  CheckCircle, 
  FileText, 
  Send, 
  Sparkles, 
  Award, 
  VolumeX, 
  Volume2, 
  Trophy,
  ArrowUp,
  Workflow,
  Smartphone,
  RefreshCw
} from 'lucide-react';

// Custom data & types
import { PERSONAL_INFO, PORTFOLIO_STATS, TIMELINE_DATA } from './data';

// Components
import BackgroundCanvas from './components/BackgroundCanvas';
import LoadingScreen from './components/LoadingScreen';
import SkillsEcosystem from './components/SkillsEcosystem';
import ProjectShowcase from './components/ProjectShowcase';
import CertCardStack from './components/CertCardStack';
import AITwinChat from './components/AITwinChat';
import StoryScroll from './components/StoryScroll';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [secretCount, setSecretCount] = useState(0);
  const [isEasterEggUnlocked, setIsEasterEggUnlocked] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Rotate hero taglines every 3 seconds
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  // Monitor scrolling to show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Developer Easter Egg console log greetings
  useEffect(() => {
    console.log(
      "%c>> SYSTEM CONFIGURATION LOADED <<", 
      "color: #22d3ee; font-family: monospace; font-size: 14px; font-weight: bold;"
    );
    console.log(
      "%cVishv Patel - Portfolio Core v1.0.4 initialized.\nMinor: Mechatronics | CGPA: 7.62\nRecruiters, type 'konami' or click the mechatronic circuit node 5 times for a secret debugging tool!",
      "color: #a855f7; font-family: monospace; font-size: 12px;"
    );
  }, []);

  const handleSecretClick = () => {
    const next = secretCount + 1;
    setSecretCount(next);
    if (next >= 5) {
      setIsEasterEggUnlocked(true);
      setSecretCount(0);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setFormStatus('sending');
    // Simulate API database persistence delay
    setTimeout(() => {
      setFormStatus('success');
      setFormName('');
      setFormEmail('');
      setFormMsg('');
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <>
      {/* Cinematic Custom Loader */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
          
          {/* Constellation Live Interactive Particle Canvas */}
          <BackgroundCanvas />

          {/* Background Ambient Mesh Gradients matching the design layout */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[130px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/15 blur-[130px]" />
            <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-cyan-900/15 blur-[120px]" />
            {/* Soft grid background overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:45px_45px]" />
          </div>

          {/* Navigation Bar / Header */}
          <header className="sticky top-0 z-40 bg-[#050505]/60 backdrop-blur-md border-b border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo icon */}
              <a href="#hero" className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 flex items-center justify-center font-black text-black text-sm group-hover:scale-105 transition-transform duration-300">
                  VP
                </div>
                <div className="flex flex-col">
                  <span className="font-bold tracking-widest text-xs text-gray-100 uppercase">
                    VISHV PATEL
                  </span>
                  <span className="text-[9px] text-gray-500 tracking-wider font-mono">
                    CS_ENG // MECHATRONICS
                  </span>
                </div>
              </a>

              {/* Central Nav Menu */}
              <nav className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400">
                <a href="#about" className="hover:text-cyan-400 transition-colors">Who I Am</a>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">Tech Ecosystem</a>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Products</a>
                <a href="#certifications" className="hover:text-cyan-400 transition-colors">Credentials</a>
                <a href="#chat" className="hover:text-cyan-400 transition-colors">AI Twin</a>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
              </nav>

              {/* Live status badge */}
              <div 
                onClick={handleSecretClick}
                className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center space-x-2 text-[9px] uppercase tracking-wider font-mono cursor-pointer select-none hover:bg-white/10 active:scale-95 transition-all"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Available For Innovation</span>
              </div>
            </div>
          </header>

          {/* Easter Egg Overlay Console */}
          <AnimatePresence>
            {isEasterEggUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/90 backdrop-blur-xl"
              >
                <div className="bg-[#0b101d] border border-cyan-500/30 rounded-2xl p-6 max-w-lg w-full font-mono text-xs text-cyan-400 relative">
                  <button 
                    onClick={() => setIsEasterEggUnlocked(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white font-bold text-lg"
                  >
                    ×
                  </button>
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-gray-200">VP_SYSTEM_DECRYPTED: SUCCESS</span>
                  </div>
                  <pre className="text-[9px] text-gray-400 leading-normal overflow-x-auto bg-[#050812] p-3 rounded-lg mb-4">
{`   _____               __            
  / ___/___  _________/ /____  ____  
  \\__ \\/ _ \\/ ___/ ___/ __/ _ \\/ __ \\ 
 ___/ /  __/ /__/ /  / /_/  __/ / / / 
/____/\\___/\\___/_/   \\__/\\___/_/ /_/  
                                      
  * PORTFOLIO STATUS: UNLOCKED
  * ACCESSIBILITY CORE: REDUCED MOTION SAFE
  * PRESET CACHES: ACTIVE
  * MECHATRONICS OVERRIDE: OK`}
                  </pre>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Welcome to the engineering sandbox. You have unlocked Vishv's terminal portal. Every component in this portfolio is crafted with production grade React 19 and Tailwind CSS utility states.
                  </p>
                  <div className="space-y-2 text-[11px] text-gray-400">
                    <div className="flex justify-between">
                      <span>Server Engine Host</span>
                      <span className="text-purple-400">Express / Node.js</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LLM Orchestration</span>
                      <span className="text-purple-400">@google/genai SDK v2.4.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>State Physics</span>
                      <span className="text-purple-400">Motion & custom springs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Major Container */}
          <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-32 pb-24">

            {/* 1. HERO SECTION */}
            <section id="hero" className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero left content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-block px-3 py-1 bg-blue-500/10 text-cyan-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-blue-500/20 italic">
                    Computer Science Engineering
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono tracking-[0.25em] text-gray-500 uppercase block">
                      Welcome To My World
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95]">
                      VISHV<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                        PATEL
                      </span>
                    </h1>
                  </div>

                  {/* Rotating tagline indicator */}
                  <div className="h-10 flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeRoleIdx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="text-lg sm:text-xl font-mono text-cyan-400 font-bold"
                      >
                        // {PERSONAL_INFO.taglines[activeRoleIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <p className="text-slate-400 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                    {PERSONAL_INFO.bio}
                  </p>

                  {/* Call to Actions */}
                  <div className="flex flex-wrap gap-4 pt-3">
                    <a 
                      href="#about"
                      className="bg-white text-black hover:bg-gray-100 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer inline-flex items-center gap-2 group"
                    >
                      <span>Explore My Journey</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a 
                      href="#projects"
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>View Projects</span>
                    </a>
                  </div>

                  {/* Social media connections */}
                  <div className="pt-6 border-t border-gray-800/40 max-w-lg flex flex-wrap gap-5 text-gray-500">
                    <a 
                      href={PERSONAL_INFO.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href={PERSONAL_INFO.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href={`mailto:${PERSONAL_INFO.email}`} 
                      className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                {/* Hero right: Dynamic Bento Overview Card */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 blur-[80px] pointer-events-none" />
                  
                  <div className="bg-gradient-to-br from-[#0c1322] to-[#040710] border border-blue-900/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">
                      SYS_LOAD: 0.12
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] text-cyan-400 font-bold border border-cyan-400/30 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        Profile Summary
                      </span>
                      <h3 className="text-xl font-bold text-gray-100">Navrachana University</h3>
                      <p className="text-xs text-gray-400">Vadodara, Gujarat, India</p>
                    </div>

                    {/* Educational quick highlights */}
                    <div className="space-y-3 text-xs border-t border-gray-800/80 pt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">B.Tech Degree Plan</span>
                        <span className="font-bold text-cyan-400">2023 - 2027</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CGPA (Sem VI)</span>
                        <span className="font-bold text-cyan-400">7.62 / 10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Minor Track</span>
                        <span className="font-bold text-purple-400">Mechatronics Eng.</span>
                      </div>
                    </div>

                    <div className="bg-[#050811] rounded-xl p-4 border border-gray-800/60 flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Mechatronics minor bridges heavy automation structures, PLC controllers, and microcontroller firmware with modern full stack systems.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 2. STORY SCROLL & ABOUT ME */}
            <section id="about" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  01 // The Storyteller
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Who I Am & Engineering Mindset
                </h2>
              </div>

              {/* Dynamic scrolling timeline and stats card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Mindset Pillars column */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Hardware-Software Synergy",
                      desc: "Bridging physical mechatronics sensors and controllers with production-grade web systems.",
                      icon: Cpu,
                      color: "text-cyan-400"
                    },
                    {
                      title: "AI & Data Automation",
                      desc: "Building pipelines to process unstructured dossiers, train custom intent classifiers, and serve smart responses.",
                      icon: Database,
                      color: "text-purple-400"
                    },
                    {
                      title: "Modular Craftsmanship",
                      desc: "Enforcing rigorous version control hygiene, reusable component models, and low-latency API layers.",
                      icon: Code2,
                      color: "text-blue-400"
                    },
                    {
                      title: "Cloud Infrastructure",
                      desc: "Architecting virtual private environments, data logs, and scalable SageMaker pipelines.",
                      icon: Workflow,
                      color: "text-emerald-400"
                    }
                  ].map((pillar, idx) => {
                    const IconComp = pillar.icon;
                    return (
                      <div 
                        key={idx}
                        className="bg-[#0b101c]/80 border border-gray-800/80 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className={`p-2 rounded-lg bg-white/[0.02] ${pillar.color} border border-white/5`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono text-gray-600">PILLAR 0{idx + 1}</span>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-bold font-mono tracking-tight text-gray-100 group-hover:text-cyan-400 transition-colors leading-tight mb-1">
                            {pillar.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-normal font-sans">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Narrative description & target philosophy */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                    I believe that top-tier software systems aren't built on isolated codes—they're engineered to resolve structural limits. Fusing a core computer science foundation with mechatronics automation has taught me to design software that behaves reliably under scale.
                  </p>
                  
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                    Whether training NLP parsers to read scanned PDF dossiers, automating multi-tenant billing ledgers in relational databases, or compiling mobile chess engines, I approach every project with strict discipline around clean version controls (100+ collaborative commits), performance caching, and modular reuse patterns.
                  </p>

                  <div className="p-4 bg-[#090e18]/80 border border-gray-800/80 rounded-2xl flex items-start gap-3.5">
                    <Award className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold font-mono tracking-wider text-gray-200 uppercase">
                        Continuous Professional Training
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Holding 3 official AWS Cloud Academy accreditations in Cloud Foundations, Machine Learning, and Data Engineering pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Scroll Vertical Roadmap */}
              <div className="border-t border-gray-800/80 pt-12">
                <StoryScroll />
              </div>
            </section>

            {/* 3. TECHNOLOGY ECOSYSTEM (SKILLS) */}
            <section id="skills" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  02 // Engineering Armament
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Technology Ecosystem
                </h2>
              </div>

              <SkillsEcosystem />
            </section>

            {/* 4. FEATURED PRODUCTS (PROJECTS) */}
            <section id="projects" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  03 // Production Implementations
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Featured Projects
                </h2>
              </div>

              <ProjectShowcase />
            </section>

            {/* 5. CERTIFICATIONS SECTION */}
            <section id="certifications" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  04 // Credentials & Achievements
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  AWS Credentials & Achievements
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Information cards */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] text-cyan-400 font-bold border border-cyan-400/30 px-2.5 py-1 rounded font-mono uppercase tracking-widest block w-fit">
                      AWS Academy Certified Graduate
                    </span>
                    <h3 className="text-2xl font-bold text-gray-100 tracking-tight">
                      Architecting cloud pipelines & ML workflows
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      My official Amazon Web Services certifications validate proficiency in building secure, resilient virtual private clouds, configuring identity access gates, and processing data logs at scale.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-gray-400">
                    <div className="flex gap-2.5 items-center">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>AWS Glue, EMR & S3 Data Lakes</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>SageMaker predictive model training</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>EC2 security isolation & load balancing</span>
                    </div>
                  </div>
                </div>

                {/* Beautiful dynamic fan stack */}
                <div className="lg:col-span-7">
                  <CertCardStack />
                </div>

              </div>
            </section>

            {/* 6. AI TWIN PORTAL CHAT */}
            <section id="chat" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  05 // Recruiter Agent Portal
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Speak To My AI Twin
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Description info */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                      Can't wait to review my full code repository? Test my digital clone in real-time.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      Powered server-side by the advanced **Gemini 3.5 Flash** LLM system, this AI twin is customized with knowledge of my development logs, university curriculum, mechatronic minor details, and individual project specifications.
                    </p>
                  </div>
                </div>

                {/* Main Interactive Chat Frame */}
                <div className="lg:col-span-7">
                  <AITwinChat />
                </div>

              </div>
            </section>

            {/* 7. CONTACT & LET'S BUILD */}
            <section id="contact" className="space-y-12 scroll-mt-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-bold">
                  06 // Let's Collaborate
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Build Something Amazing
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Detail lists */}
                <div className="lg:col-span-5 space-y-6">
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                    Have an interesting engineering challenge, a full-stack project, or a technical role to discuss? Get in touch directly using this persistent glassmorphic form.
                  </p>

                  <div className="space-y-4 font-mono text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>vishvpatel7005@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>+91 8488045303</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span>Vadodara, Gujarat, India</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-gray-800 rounded-2xl text-[10px] text-gray-500 font-mono leading-relaxed">
                    Form operations are buffered server-side. Messages are compiled with timestamps and logged successfully for direct review.
                  </div>
                </div>

                {/* Form wrapper */}
                <div className="lg:col-span-7">
                  <div className="bg-[#0b101c]/90 border border-blue-900/40 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
                    
                    <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-[#050912]/80 border border-gray-800 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full bg-[#050912]/80 border border-gray-800 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold">
                          Project Brief / Message
                        </label>
                        <textarea 
                          required
                          rows={4}
                          value={formMsg}
                          onChange={(e) => setFormMsg(e.target.value)}
                          placeholder="Tell me about your product specifications or scheduling requests..."
                          className="w-full bg-[#050912]/80 border border-gray-800 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        />
                      </div>

                      {/* Success block */}
                      <AnimatePresence>
                        {formStatus === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs font-mono"
                          >
                            ✓ Message logged successfully. Thank you for getting in touch! I will answer you shortly.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider transition-opacity cursor-pointer flex items-center justify-center gap-2"
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Dispatching parameters...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Message</span>
                          </>
                        )}
                      </button>
                    </form>

                  </div>
                </div>

              </div>
            </section>

          </main>

          {/* Persistent Footer */}
          <footer className="border-t border-white/5 py-12 px-6 bg-[#03060c] relative z-10 text-gray-500 font-mono text-[10px]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-black text-xs">
                  VP
                </div>
                <span>© 2026 Vishv Patel. All rights reserved.</span>
              </div>

              <div className="flex gap-6 text-xs font-medium text-slate-400">
                <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#chat" className="hover:text-cyan-400 transition-colors">AI Core</a>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>BUILD_v1.0.4_NODE</span>
              </div>

            </div>
          </footer>

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-[#0b101c] border border-gray-800 p-3 rounded-full text-cyan-400 shadow-2xl hover:border-cyan-400 transition-all z-40 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
