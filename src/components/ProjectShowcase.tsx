import { useState, FormEvent } from 'react';
import { PROJECTS_DATA } from '../data';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  Globe, 
  ArrowUpRight, 
  MessageSquare, 
  Cpu, 
  Trophy, 
  Sparkles, 
  Send,
  Workflow,
  CheckCircle2,
  Database
} from 'lucide-react';
import ChessBoardDemo from './ChessBoardDemo';

export default function ProjectShowcase() {
  // WhatsApp simulation states
  const [waMessages, setWaMessages] = useState([
    { text: "Hello! I want to order 2 Custom Mechatronic Boards please.", sender: "user", category: "order" },
    { text: "Understood! Forwarding order parameters to the inventory ledger.", sender: "bot", category: "order" }
  ]);
  const [waInput, setWaInput] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);

  const triggerWaSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!waInput.trim() || isClassifying) return;

    const msg = { text: waInput, sender: "user", category: "pending" };
    setWaMessages(prev => [...prev, msg]);
    setWaInput("");
    setIsClassifying(true);

    // Simulate AI categorizer model prediction
    setTimeout(() => {
      // Predict category based on keywords
      const textLower = msg.text.toLowerCase();
      let category = "general";
      if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("order") || textLower.includes("buy")) {
        category = "order";
      } else if (textLower.includes("help") || textLower.includes("error") || textLower.includes("broken") || textLower.includes("fail")) {
        category = "support";
      }

      setWaMessages(prev => {
        const next = [...prev];
        next[next.length - 1].category = category;
        return next;
      });

      // Answer message
      setTimeout(() => {
        let answer = "Thanks! I've received your inquiry and categorized it appropriately.";
        if (category === "sales") {
          answer = "Gemini copy generator auto-reply: Prompting localized campaigns and price catalogs directly to you!";
        } else if (category === "support") {
          answer = "AI assistance dispatch: A mechatronics developer will be alerted immediately.";
        }
        setWaMessages(prev => [...prev, { text: answer, sender: "bot", category }]);
        setIsClassifying(false);
      }, 700);

    }, 850);
  };

  // HireFlow ranking states
  const [resumePool, setResumePool] = useState([
    { name: "Suresh Sharma", score: 91, match: "High Match", tag: "Java / AWS Pipelines", ranked: true },
    { name: "Pooja Mehta", score: 87, match: "High Match", tag: "Flutter / Node.js Backend", ranked: true },
    { name: "Amit Shah", score: 62, match: "Potential Match", tag: "Flask / Machine Learning", ranked: true },
    { name: "Riya Patel", score: 41, match: "Low Match", tag: "Basic HTML / Python", ranked: true },
  ]);

  const colorMap: Record<string, { border: string, bg: string, text: string, glow: string }> = {
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-500/60",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]"
    },
    cyan: {
      border: "border-cyan-500/30 hover:border-cyan-500/60",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.08)]"
    },
    indigo: {
      border: "border-indigo-500/30 hover:border-indigo-500/60",
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.08)]"
    },
    amber: {
      border: "border-amber-500/30 hover:border-amber-500/60",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.08)]"
    }
  };

  return (
    <div className="space-y-16 select-none">
      
      {/* Informative Grid Header */}
      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 border-b border-gray-800/80 pb-4">
        <span>STACK_ARRAY: {PROJECTS_DATA.length} SYSTEM DEPLOYMENTS RENDERED</span>
        <span className="animate-pulse text-cyan-400 font-bold uppercase tracking-widest">
          Scroll & test live sandboxes
        </span>
      </div>

      {/* Vertical Continuous Stack of Projects */}
      <div className="space-y-16">
        {PROJECTS_DATA.map((proj, idx) => {
          const colors = colorMap[proj.accentColor] || colorMap.cyan;

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`
                bg-[#070b14]/80 border ${colors.border} rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 relative overflow-hidden group ${colors.glow}
              `}
            >
              {/* Corner decorative accent gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Left Side: Technical Info & Scope */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                  
                  <div className="space-y-4.5">
                    {/* Index & Category tag */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold bg-white/[0.03] text-slate-400 px-3 py-1 rounded-full border border-white/5">
                        PROJECT 0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono font-bold border ${colors.border} px-2.5 py-1 rounded uppercase tracking-wider ${colors.text}`}>
                        {proj.subtitle}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>

                    {/* Detailed Long description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                      {proj.longDescription}
                    </p>
                  </div>

                  {/* Render Key Performance stats */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {proj.metrics.map((met, mIdx) => (
                      <div 
                        key={mIdx} 
                        className="bg-white/[0.02] border border-gray-800/80 p-3 rounded-xl text-center flex flex-col justify-between"
                      >
                        <span className="text-xs sm:text-sm font-black text-cyan-400 font-mono leading-none">{met.value}</span>
                        <span className="text-[8px] uppercase tracking-tight text-slate-500 font-bold mt-1.5 leading-tight">{met.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>Key Engineering Achievements</span>
                    </h4>
                    <ul className="space-y-2">
                      {proj.highlights.map((high, hIdx) => (
                        <li key={hIdx} className="flex gap-2.5 text-[11px] sm:text-xs text-gray-300 font-sans leading-relaxed">
                          <span className={`${colors.text} font-bold mt-0.5 select-none`}>✓</span>
                          <span>{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Built with Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/80">
                    {proj.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[9px] bg-[#0c1322] text-slate-300 border border-slate-800/80 px-2.5 py-1 rounded-md font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800/40">
                    <a 
                      href={proj.githubUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] active:scale-98 border border-white/10 hover:border-cyan-500/30 text-white font-mono text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <GitBranch className="w-4 h-4 text-cyan-400" />
                      <span>GitHub Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400" />
                    </a>
                  </div>

                </div>

                {/* Right Side: Fully dynamic interactive sandbox! */}
                <div className="lg:col-span-7 w-full h-full">
                  <div className="bg-black/40 border border-gray-900/60 p-4 sm:p-5 rounded-2xl relative">
                    
                    {/* Sandbox active marker tag */}
                    <div className="absolute top-2.5 left-4 flex items-center gap-1.5 pointer-events-none z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                        Interactive Sandboxed Simulation
                      </span>
                    </div>

                    <div className="pt-5.5">
                      {/* Project 1: WhatsApp CRM Mockup */}
                      {proj.id === "whatsapp-crm" && (
                        <div className="space-y-4">
                          <div className="bg-[#0b1220] border border-green-900/30 rounded-2xl overflow-hidden shadow-2xl">
                            {/* CRM Header */}
                            <div className="bg-[#070b14] border-b border-gray-800 p-4 flex justify-between items-center">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                  <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-gray-200">WhatsApp AI Agent Dashboard</h4>
                                  <span className="text-[9px] uppercase font-mono text-emerald-400">Sync Active // Dataset: 55,000+</span>
                                </div>
                              </div>
                              <span className="text-[10px] bg-green-500/15 text-green-400 font-mono px-2 py-0.5 rounded border border-green-500/20">
                                Meta Cloud API
                              </span>
                            </div>

                            {/* Chat view area */}
                            <div className="p-4 h-[210px] overflow-y-auto space-y-3 scrollbar-none font-sans text-xs bg-[#050912]/80">
                              {waMessages.map((msg, mIdx) => {
                                const isUser = msg.sender === 'user';
                                const colorClass = {
                                  sales: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
                                  support: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20',
                                  pending: 'text-yellow-400 border-yellow-500/30 bg-yellow-950/20',
                                  general: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20'
                                }[msg.category] || 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';

                                return (
                                  <div key={mIdx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-xl p-3 border ${
                                      isUser 
                                        ? 'bg-green-600/15 border-green-500/20 text-green-100' 
                                        : 'bg-gray-800/40 border-gray-700/50 text-gray-200'
                                    }`}>
                                      {!isUser && (
                                        <div className="flex items-center gap-1.5 mb-1.5 font-mono text-[9px] font-bold">
                                          <span className={`px-1.5 py-0.5 rounded border ${colorClass}`}>
                                            {msg.category.toUpperCase()}
                                          </span>
                                          <span className="text-gray-500">Predicted Intent</span>
                                        </div>
                                      )}
                                      <p className="leading-relaxed">{msg.text}</p>
                                    </div>
                                  </div>
                                );
                              })}
                              {isClassifying && (
                                <div className="flex justify-start">
                                  <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-3 flex items-center gap-1.5 text-xs text-gray-400 animate-pulse font-mono">
                                    <Sparkles className="w-3.5 h-3.5 text-green-400 animate-spin" />
                                    <span>Python classifier evaluating intent...</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Input interaction bar */}
                            <form onSubmit={triggerWaSendMessage} className="bg-[#070b14] p-3 flex gap-2">
                              <input
                                type="text"
                                value={waInput}
                                onChange={(e) => setWaInput(e.target.value)}
                                placeholder="E.g. 'How much does this board cost?' or 'Help, my sensor is failing!'"
                                className="flex-1 bg-[#0c101c] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none"
                              />
                              <button
                                type="submit"
                                className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-lg px-3 flex items-center justify-center cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </form>
                          </div>
                          
                          <div className="bg-emerald-950/5 border border-emerald-900/10 p-3 rounded-xl flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>60% automated response loops active. Ask about pricing or support errors!</span>
                          </div>
                        </div>
                      )}

                      {/* Project 2: HireFlow Mockup */}
                      {proj.id === "hireflow" && (
                        <div className="space-y-4">
                          <div className="bg-[#0b1220] border border-cyan-900/30 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-5 space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-800/80 pb-3">
                              <div>
                                <h4 className="text-xs font-bold text-gray-200">JobBERT + TF-IDF Parsing Sandbox</h4>
                                <span className="text-[9px] uppercase font-mono text-cyan-400">Recruiter scoring console</span>
                              </div>
                              <span className="text-[10px] bg-cyan-500/15 text-cyan-400 font-mono px-2 py-0.5 rounded border border-cyan-500/20">
                                89% Test Accuracy
                              </span>
                            </div>

                            {/* Resumes table list */}
                            <div className="space-y-2.5 font-sans text-xs">
                              {resumePool.map((resItem, rIdx) => {
                                const isHigh = resItem.score >= 80;
                                const scoreColor = isHigh ? 'text-cyan-400' : 'text-gray-400';

                                return (
                                  <div 
                                    key={rIdx}
                                    className="bg-[#050912]/80 border border-gray-800 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:border-gray-700 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-bold font-mono text-gray-400 text-xs">
                                        PDF
                                      </div>
                                      <div>
                                        <p className="font-bold text-gray-200">{resItem.name}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{resItem.tag}</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                        isHigh 
                                          ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                                          : 'bg-gray-800 border-gray-700 text-gray-400'
                                      }`}>
                                        {resItem.match}
                                      </span>
                                      <div className="text-right">
                                        <span className={`font-mono font-black text-sm ${scoreColor}`}>{resItem.score}%</span>
                                        <span className="text-[8px] uppercase text-gray-500 block">Matched Fit</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Actions summary */}
                            <div className="border-t border-gray-800/80 pt-3 flex justify-between items-center text-[10px] font-mono text-gray-500">
                              <span>Database index: 500+ Ranked candidate profiles</span>
                              <button 
                                onClick={() => {
                                  setResumePool(prev => prev.map(p => ({
                                    ...p,
                                    score: Math.floor(Math.random() * 55) + 40
                                  })).sort((a,b) => b.score - a.score));
                                }}
                                className="text-cyan-400 hover:underline font-bold cursor-pointer"
                              >
                                Recalculate AI Score
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Project 3: Flutter Chess Board Demo */}
                      {proj.id === "flutter-chess" && (
                        <div className="space-y-4">
                          <ChessBoardDemo />
                          <div className="bg-[#0b101c]/80 border border-gray-800 rounded-xl p-3 flex items-center justify-between font-mono text-[10px]">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-indigo-400" />
                              <span className="text-gray-400">Move state tracking & checkmate evaluations fully active.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Project 4: SocietEase Dashboard Mockup */}
                      {proj.id === "societease" && (
                        <div className="space-y-4">
                          <div className="bg-[#0b1220] border border-amber-900/30 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-800/80 pb-3">
                              <div>
                                <h4 className="text-xs font-bold text-gray-200">SocietEase Administrative Panel</h4>
                                <span className="text-[9px] uppercase font-mono text-amber-400">Glassfish Web Server logs</span>
                              </div>
                              <span className="text-[10px] bg-amber-500/15 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-500/20">
                                JSP & MySQL Sync
                              </span>
                            </div>

                            {/* Active Complaints boards */}
                            <div className="space-y-2.5 font-sans text-xs">
                              <div className="bg-[#050912]/80 border border-gray-800 rounded-xl p-3.5">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[10px] font-bold text-amber-400 font-mono">COMPLAINT #401</span>
                                  <span className="text-[9px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded font-mono">PENDING ACTION</span>
                                </div>
                                <p className="font-bold text-gray-200 text-xs">Elevator B Mechanical Cable Slippage</p>
                                <p className="text-[10px] text-gray-400 mt-1">Mechatronics diagnostics suggested tension calibration inside the main motor housing.</p>
                              </div>

                              <div className="bg-[#050912]/80 border border-gray-800 rounded-xl p-3.5">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[10px] font-bold text-amber-400 font-mono">MAINTENANCE BILLING</span>
                                  <span className="text-[9px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded font-mono">VERIFIED</span>
                                </div>
                                <p className="font-bold text-gray-200 text-xs">Wing-A Quarterly Generator Servicing</p>
                                <p className="text-[10px] text-gray-400 mt-1">Database invoice logged successfully in MySQL schemas.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
