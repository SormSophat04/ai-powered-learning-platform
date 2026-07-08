import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Cpu, Award, Brain, Check, Sun, Moon, Menu, X, Sparkles, BarChart3, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';
import { useFeatures } from '../hooks';
import type { FeatureData } from '../services/features';

function TypewriterText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    // eslint-disable-next-line
    setDisplayed('');
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        // eslint-disable-next-line
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayed}<span className="animate-pulse">▌</span></span>;
}

export default function Landing() {
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const { data: features, isLoading: featuresLoading } = useFeatures();

  const featureIconMap: Record<string, React.ReactNode> = {
    cpu: <Cpu size={20} />,
    award: <Award size={20} />,
    'bar-chart': <BarChart3 size={20} />,
    brain: <Brain size={20} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => setDemoStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EF] dark:bg-[#0F0B1E] text-[#4A4453] dark:text-[#D4CFE0] font-sans">
      {/* Navbar Header */}
      <header className="sticky top-0 z-50 border-b border-[#D2C8BE]/40 dark:border-[#7C3AED]/10 bg-[#F8F4EF]/80 dark:bg-[#0F0B1E]/80 backdrop-blur-glass">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[60px] md:h-[68px]">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#D97706] flex items-center justify-center text-white font-bold flex-shrink-0 insight-spark">
              <GraduationCap size={16} />
            </div>
            <span className="font-display font-extrabold text-[16px] md:text-[20px] bg-gradient-to-r from-[#7C3AED] to-[#D97706] bg-clip-text text-transparent">
              EduMind AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <a href="#features" className="text-xs font-semibold text-[#8B8589] hover:text-[#7C3AED] dark:hover:text-violet-400 transition-all">Features</a>
            <a href="#testimonials" className="text-xs font-semibold text-[#8B8589] hover:text-[#7C3AED] dark:hover:text-violet-400 transition-all">Testimonials</a>
            <a href="#pricing" className="text-xs font-semibold text-[#8B8589] hover:text-[#7C3AED] dark:hover:text-violet-400 transition-all">Pricing</a>
            <div className="flex items-center gap-2.5 ml-2">
              <button onClick={() => dispatch(toggleTheme())} className="h-[34px] w-[34px] rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 flex items-center justify-center text-[#8B8589] hover:bg-[#E7E0D6] dark:hover:bg-[#2D2646] transition-all cursor-pointer">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button onClick={() => navigate('/login')} className="h-[34px] px-4 rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 text-xs font-semibold text-[#4A4453] dark:text-[#D4CFE0] hover:bg-[#E7E0D6] dark:hover:bg-[#2D2646] transition-all cursor-pointer">Login</button>
              <button onClick={() => navigate('/register')} className="h-[34px] px-4 rounded-lg bg-[#7C3AED] hover:bg-violet-700 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all cursor-pointer">Register</button>
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-1.5">
            <button onClick={() => dispatch(toggleTheme())} className="w-[34px] h-[34px] rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 flex items-center justify-center text-[#8B8589] transition-all cursor-pointer">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-[34px] h-[34px] rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 flex items-center justify-center text-[#4A4453] dark:text-[#D4CFE0] transition-all cursor-pointer">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#D2C8BE]/40 dark:border-[#7C3AED]/10 bg-[#F8F4EF] dark:bg-[#0F0B1E] animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-1">
              <a href="#features" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-[#4A4453] dark:text-[#D4CFE0] hover:text-[#7C3AED] transition-all">Features</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-[#4A4453] dark:text-[#D4CFE0] hover:text-[#7C3AED] transition-all">Testimonials</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-[#4A4453] dark:text-[#D4CFE0] hover:text-[#7C3AED] transition-all">Pricing</a>
              <hr className="my-2 border-[#D2C8BE]/40 dark:border-[#7C3AED]/10" />
              <button onClick={() => { setMenuOpen(false); navigate('/login'); }} className="w-full py-2.5 rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 text-sm font-semibold text-[#4A4453] dark:text-[#D4CFE0] transition-all cursor-pointer">Login</button>
              <button onClick={() => { setMenuOpen(false); navigate('/register'); }} className="w-full py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-semibold shadow-md transition-all cursor-pointer">Register</button>
            </div>
          </div>
        )}
      </header>

      <div className="px-6 max-w-[1200px] mx-auto">

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20 lg:py-28 text-left">
        <div>
          <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[10px] font-bold text-[#7C3AED] bg-violet-500/10 border border-violet-500/20 rounded-full mb-5 uppercase tracking-wider">
            <Sparkles size={10} /> AI-Powered Learning
          </span>
          <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[60px] font-extrabold text-[#1C1828] dark:text-[#EDE9F4] leading-[1.05] tracking-tight mb-5">
            From confusion<br />
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#D97706] bg-clip-text text-transparent">to code</span>
            <br />in plain language.
          </h1>
          <p className="text-[15px] text-[#8B8589] leading-relaxed max-w-[460px] mb-8">
            An AI tutor that teaches CS your way. Get instant explanations, 
            personalized practice, and feedback that actually helps — not just another chatbot.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="relative px-6 py-3 rounded-lg bg-[#7C3AED] hover:bg-violet-700 text-white text-xs font-bold shadow-lg shadow-violet-500/25 flex items-center gap-2 transition-all cursor-pointer insight-spark"
            >
              Start Learning Free <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate('/dashboard/courses')} 
              className="px-6 py-3 rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 text-[#4A4453] dark:text-[#D4CFE0] text-xs font-bold hover:bg-[#E7E0D6] dark:hover:bg-[#2D2646] transition-all cursor-pointer"
            >
              Explore Courses
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          <div className="w-full max-w-[480px] min-h-[380px] relative">
            <div className="absolute top-8 left-16 w-[220px] h-[220px] bg-violet-500/20 blur-[80px] rounded-full z-0"></div>
            <div className="absolute bottom-8 right-8 w-[220px] h-[220px] bg-amber-500/15 blur-[80px] rounded-full z-0"></div>

            {/* Interactive AI Chat Demo */}
            <div className="relative z-10 bg-white dark:bg-[#1A1630] rounded-2xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 shadow-xl p-5 max-w-[400px] mx-auto insight-spark">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D2C8BE]/20 dark:border-[#7C3AED]/10">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#D97706] flex items-center justify-center text-white">
                  <Cpu size={14} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-[#1C1828] dark:text-[#EDE9F4]">EduMind AI Tutor</span>
                  <span className="text-[9px] text-[#8B8589] ml-2">Online</span>
                </div>
                <span className="text-[9px] text-[#8B8589] font-mono">violet 600</span>
              </div>

              <div className="space-y-3 min-h-[140px]">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 mt-0.5">
                    <GraduationCap size={10} />
                  </div>
                  <div className="bg-[#E7E0D6] dark:bg-[#2D2646] rounded-xl rounded-tl-none px-3.5 py-2.5 text-[12px] text-[#4A4453] dark:text-[#D4CFE0] leading-relaxed">
                    Can you explain how recursion works in Java?
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#D97706] flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 mt-0.5">
                    <Cpu size={10} />
                  </div>
                  <div className="bg-[#7C3AED] text-white rounded-xl rounded-tl-none px-3.5 py-2.5 text-[12px] leading-relaxed">
                    {demoStarted ? (
                      <TypewriterText
                        text="Recursion is when a method calls itself to solve a problem by breaking it into smaller versions of the same problem. Think of it like Russian nesting dolls — each doll contains a smaller copy of itself until you reach the smallest one."
                        speed={18}
                        onComplete={() => setShowAiResponse(true)}
                      />
                    ) : (
                      <span className="opacity-0">Loading...</span>
                    )}
                  </div>
                </div>

                {showAiResponse && (
                  <div className="flex items-start gap-2.5 animate-fade-in">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 mt-0.5">
                      <GraduationCap size={10} />
                    </div>
                    <div className="bg-[#E7E0D6] dark:bg-[#2D2646] rounded-xl rounded-tl-none px-3.5 py-2.5 text-[12px] text-[#4A4453] dark:text-[#D4CFE0] leading-relaxed">
                      Can you show me a code example?
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#D2C8BE]/20 dark:border-[#7C3AED]/10">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-9 rounded-lg bg-[#E7E0D6] dark:bg-[#2D2646] flex items-center px-3">
                    <span className="text-[11px] text-[#8B8589]">Ask anything about CS...</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-t border-[#D2C8BE]/30 dark:border-[#7C3AED]/8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 text-[10px] font-bold text-[#7C3AED] bg-violet-500/10 border border-violet-500/20 rounded-full mb-4 uppercase tracking-wider">
            <Sparkles size={10} /> Features
          </span>
          <h2 className="font-display text-[32px] font-extrabold text-[#1C1828] dark:text-[#EDE9F4] mb-3">Everything you need to master CS</h2>
          <p className="text-[14px] text-[#8B8589] max-w-[520px] mx-auto">Built by engineers who remember what it was like to struggle with pointers.</p>
        </div>

        {featuresLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-[#7C3AED]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(features ?? []).map((f: FeatureData, i: number) => (
              <div key={i} className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-6 text-left hover:border-[#7C3AED]/30 dark:hover:border-[#7C3AED]/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-[#7C3AED] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {featureIconMap[f.iconName] || <Cpu size={20} />}
                </div>
                <h3 className="font-display text-sm font-bold text-[#1C1828] dark:text-[#EDE9F4] mb-2">{f.title}</h3>
                <p className="text-[12px] text-[#8B8589] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 border-t border-[#D2C8BE]/30 dark:border-[#7C3AED]/8 text-left">
        <div className="text-center mb-12">
          <h2 className="font-display text-[32px] font-extrabold text-[#1C1828] dark:text-[#EDE9F4] mb-2">What learners say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-6">
            <p className="text-xs italic text-[#8B8589] leading-relaxed mb-4">"The AI caught three primary key violations in my SQL schema before I even hit submit. That alone saved my grade."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="Sarah" />
              <div>
                <h4 className="text-[12px] font-bold text-[#1C1828] dark:text-[#EDE9F4]">Sarah K.</h4>
                <span className="text-[10px] text-[#8B8589]">CS Student</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-6">
            <p className="text-xs italic text-[#8B8589] leading-relaxed mb-4">"The quiz generator made exam prep actually bearable. It adapts to what you keep getting wrong."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="David" />
              <div>
                <h4 className="text-[12px] font-bold text-[#1C1828] dark:text-[#EDE9F4]">David L.</h4>
                <span className="text-[10px] text-[#8B8589]">Software Eng Student</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-6">
            <p className="text-xs italic text-[#8B8589] leading-relaxed mb-4">"I can see exactly which concepts my students are struggling with. I redesigned my lectures around the data."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="Jane" />
              <div>
                <h4 className="text-[12px] font-bold text-[#1C1828] dark:text-[#EDE9F4]">Dr. Jane Foster</h4>
                <span className="text-[10px] text-[#8B8589]">Professor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 border-t border-[#D2C8BE]/30 dark:border-[#7C3AED]/8">
        <div className="text-center mb-12">
          <h2 className="font-display text-[32px] font-extrabold text-[#1C1828] dark:text-[#EDE9F4] mb-2">Simple plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          <div className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-8 flex flex-col justify-between h-full text-center">
            <div>
              <h3 className="font-display font-bold text-sm text-[#1C1828] dark:text-[#EDE9F4]">Basic Learner</h3>
              <div className="font-display text-3xl font-black text-[#1C1828] dark:text-[#EDE9F4] my-4">$0</div>
              <ul className="text-left text-xs text-[#8B8589] flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Access to default courses</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> 5 AI tutor messages daily</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 hover:bg-[#E7E0D6] dark:hover:bg-[#2D2646] text-xs font-semibold text-[#4A4453] dark:text-[#D4CFE0] cursor-pointer">Start Free</button>
          </div>

          <div className="bg-white dark:bg-[#1A1630] rounded-xl border-2 border-[#7C3AED] p-8 flex flex-col justify-between h-full text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider insight-spark">Popular</span>
            <div>
              <h3 className="font-display font-bold text-sm text-[#1C1828] dark:text-[#EDE9F4]">AI Pro Learner</h3>
              <div className="font-display text-3xl font-black text-[#1C1828] dark:text-[#EDE9F4] my-4">$15</div>
              <ul className="text-left text-xs text-[#8B8589] flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Unlimited AI tutor interactions</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Custom quiz generator</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Code review & feedback</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg bg-[#7C3AED] hover:bg-violet-700 text-white text-xs font-semibold shadow-md cursor-pointer">Upgrade Pro</button>
          </div>

          <div className="bg-white dark:bg-[#1A1630] rounded-xl border border-[#D2C8BE]/30 dark:border-[#7C3AED]/10 p-8 flex flex-col justify-between h-full text-center">
            <div>
              <h3 className="font-display font-bold text-sm text-[#1C1828] dark:text-[#EDE9F4]">University</h3>
              <div className="font-display text-3xl font-black text-[#1C1828] dark:text-[#EDE9F4] my-4">Custom</div>
              <ul className="text-left text-xs text-[#8B8589] flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Teacher panels + analytics</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Admin console + SSO</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg border border-[#D2C8BE]/40 dark:border-[#7C3AED]/20 hover:bg-[#E7E0D6] dark:hover:bg-[#2D2646] text-xs font-semibold text-[#4A4453] dark:text-[#D4CFE0] cursor-pointer">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D2C8BE]/30 dark:border-[#7C3AED]/8 py-8 flex justify-between flex-wrap gap-4 text-xs text-[#8B8589]">
        <span>© 2026 EduMind AI Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#7C3AED] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#7C3AED] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#7C3AED] transition-colors">Security</a>
        </div>
      </footer>
      </div>
    </div>
  );
}
