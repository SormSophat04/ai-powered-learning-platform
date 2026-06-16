import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Cpu, Award, Activity, Brain, Check, Sun, Moon, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';

const sponsors = [
  { name: 'Apple', img: 'https://cdn.svgporn.com/logos/apple.svg' },
  { name: 'Google', img: 'https://cdn.svgporn.com/logos/google.svg' },
  { name: 'SpaceX', img: 'https://cdn.simpleicons.org/spacex' },
  { name: 'NASA', img: 'https://cdn.simpleicons.org/nasa' },
  { name: 'Lamborghini', img: 'https://cdn.simpleicons.org/lamborghini' },
  { name: 'Microsoft', img: 'https://cdn.svgporn.com/logos/microsoft.svg' },
  { name: 'Amazon', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Meta', img: 'https://cdn.svgporn.com/logos/meta.svg' },
  { name: 'Netflix', img: 'https://cdn.svgporn.com/logos/netflix.svg' },
  { name: 'Tesla', img: 'https://cdn.simpleicons.org/tesla' },
  { name: 'Samsung', img: 'https://cdn.svgporn.com/logos/samsung.svg' },
  { name: 'Intel', img: 'https://cdn.svgporn.com/logos/intel.svg' },
  { name: 'IBM', img: 'https://cdn.svgporn.com/logos/ibm.svg' },
  { name: 'Adobe', img: 'https://cdn.svgporn.com/logos/adobe.svg' },
  { name: 'Spotify', img: 'https://cdn.svgporn.com/logos/spotify.svg' },
  { name: 'Uber', img: 'https://cdn.simpleicons.org/uber' },
  { name: 'X', img: 'https://cdn.svgporn.com/logos/x.svg' },
  { name: 'LinkedIn', img: 'https://cdn.svgporn.com/logos/linkedin.svg' },
  { name: 'PayPal', img: 'https://cdn.svgporn.com/logos/paypal.svg' },
  { name: 'Toyota', img: 'https://cdn.simpleicons.org/toyota' },
];

export default function Landing() {
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D1A] text-slate-800 dark:text-slate-200 font-sans">
      {/* Navbar Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/40 bg-white/80 dark:bg-[#090D1A]/80 backdrop-blur-glass">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[60px] md:h-[68px]">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white font-bold flex-shrink-0">
              <GraduationCap size={16} />
            </div>
            <span className="font-heading font-extrabold text-[16px] md:text-[20px] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              EduMind AI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            <a href="#features" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all">Features</a>
            <a href="#testimonials" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all">Testimonials</a>
            <a href="#pricing" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all">Pricing</a>
            <div className="flex items-center gap-2.5 ml-2">
              <button onClick={() => dispatch(toggleTheme())} className="h-[34px] w-[34px] rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button onClick={() => navigate('/login')} className="h-[34px] px-4 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer">Login</button>
              <button onClick={() => navigate('/register')} className="h-[34px] px-4 rounded-lg bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-500/15 transition-all cursor-pointer">Register</button>
            </div>
          </nav>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-1.5">
            <button onClick={() => dispatch(toggleTheme())} className="w-[34px] h-[34px] rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all cursor-pointer">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-[34px] h-[34px] rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800/40 bg-white dark:bg-[#090D1A] animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-1">
              <a href="#features" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-all">Features</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-all">Testimonials</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-all">Pricing</a>
              <hr className="my-2 border-slate-200 dark:border-slate-800" />
              <button onClick={() => { setMenuOpen(false); navigate('/login'); }} className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer">Login</button>
              <button onClick={() => { setMenuOpen(false); navigate('/register'); }} className="w-full py-2.5 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold shadow-md transition-all cursor-pointer">Register</button>
            </div>
          </div>
        )}
      </header>

      <div className="px-6 max-w-[1200px] mx-auto">

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 text-left">
        <div>
          <span className="inline-block py-1 px-3 text-[10px] font-bold text-[#4F46E5] bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4 uppercase tracking-wider">
            V1.0 — Smart SaaS Learning
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight mb-4">
            Learn Smarter <br />
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">With EduMind AI</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[500px] mb-8">
            An advanced AI-powered learning workspace. Experience 24/7 intelligent tutoring, automated practice check generators, predictive grading, and instantaneous code feedback modules.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="px-6 py-3 rounded-md bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/15 flex items-center gap-2 transition-all cursor-pointer"
            >
              Get Started Free <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate('/dashboard/courses')} 
              className="px-6 py-3 rounded-md border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
            >
              Explore Courses
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          <div className="w-full max-w-[440px] h-[340px] relative">
            <div className="absolute top-10 left-20 w-[200px] h-[200px] bg-indigo-500/25 blur-[60px] rounded-full z-0"></div>
            <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-cyan-500/25 blur-[60px] rounded-full z-0"></div>
            
            {/* Interactive Chat bubble mockup */}
            <div className="glass-card absolute top-[15%] left-[5%] w-[290px] p-4 rotate-[-2deg] z-10 border border-slate-200 dark:border-white/5 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white"><Cpu size={12} /></div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">EduMind AI Tutor</span>
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-md text-[11px] text-slate-700 dark:text-slate-300 text-left mb-2 leading-normal">
                "Can you explain Polymorphism in Java?"
              </div>
              <div className="p-2 bg-[#4F46E5] text-white rounded-md text-[11px] text-left leading-normal">
                "Polymorphism lets objects behave differently based on their subclass overrides..."
              </div>
            </div>

            {/* Interactive stats chart mockup */}
            <div className="glass-card absolute bottom-[15%] right-[5%] w-[240px] p-4 rotate-[3deg] z-11 border border-slate-200 dark:border-white/5 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">Smart Analysis</span>
                <span className="badge badge-success text-[8px] px-1.5 py-0.5">GPA 3.8</span>
              </div>
              <div className="flex items-end h-[60px] gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <div className="h-[40%] w-full bg-cyan-500/60 rounded-t-sm"></div>
                <div className="h-[60%] w-full bg-cyan-500/60 rounded-t-sm"></div>
                <div className="h-[50%] w-full bg-cyan-500/60 rounded-t-sm"></div>
                <div className="h-[80%] w-full bg-[#4F46E5] rounded-t-sm"></div>
              </div>
              <div className="flex justify-between text-[8px] text-slate-400 mt-2">
                <span>Week 1</span>
                <span>Week 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-t border-slate-200 dark:border-slate-800/40">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">Empowering Features</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[500px] mx-auto">Unlock academic potential with advanced AI tools engineered for student success.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40 text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-[#4F46E5] flex items-center justify-center mb-4"><Cpu size={20} /></div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">AI Tutor Chat</h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Engage with localized tutor modules trained directly on your course materials.</p>
          </div>
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40 text-left">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-[#06B6D4] flex items-center justify-center mb-4"><Award size={20} /></div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">Quiz Generator</h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Generate instant multiple choice practices on custom syllabus topics.</p>
          </div>
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40 text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-[#4F46E5] flex items-center justify-center mb-4"><Activity size={20} /></div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">Smart Analytics</h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Examine visual workload metrics, subject efficiency rates, and predictions.</p>
          </div>
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40 text-left">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-[#06B6D4] flex items-center justify-center mb-4"><Brain size={20} /></div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">AI Learning Path</h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Walk through dynamically tailored timeline checkpoints mapped to your strengths.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 border-t border-slate-200 dark:border-slate-800/40 text-left">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">What Learners Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40">
            <p className="text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed mb-4">"The AI Feedback Panel analyzed my SQL Normalization draft and caught three primary key violations before I submitted. Outstanding!"</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="Sarah" />
              <div>
                <h4 className="text-[12px] font-bold text-slate-850 dark:text-slate-100">Sarah K.</h4>
                <span className="text-[10px] text-slate-400">CS Student</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40">
            <p className="text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed mb-4">"Preparing exams using the custom generated AI quiz modules saved me countless hours. Explanations clarify why choices are correct."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="David" />
              <div>
                <h4 className="text-[12px] font-bold text-slate-850 dark:text-slate-100">David L.</h4>
                <span className="text-[10px] text-slate-400">Software Eng Student</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 border border-slate-200/60 dark:border-slate-800/40">
            <p className="text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed mb-4">"AI Insights let me pinpoint precise concepts where students struggle, letting me reformulate lectures on recursion and memory structures."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" className="w-9 h-9 rounded-full object-cover" alt="Jane" />
              <div>
                <h4 className="text-[12px] font-bold text-slate-850 dark:text-slate-100">Dr. Jane Foster</h4>
                <span className="text-[10px] text-slate-400">Professor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 border-t border-slate-200 dark:border-slate-800/40">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">Simple Subscription Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          <div className="glass-card p-8 flex flex-col justify-between h-full border border-slate-200/60 dark:border-slate-800/40 text-center">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">Basic Learner</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white my-4">$0</div>
              <ul className="text-left text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Access to default courses</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> 5 AI Tutor messages daily</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg border border-slate-250 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer">Start Free</button>
          </div>
          
          <div className="glass-card p-8 flex flex-col justify-between h-full border-2 border-[#4F46E5] text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">AI Pro Learner</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white my-4">$15</div>
              <ul className="text-left text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Infinite AI Tutor interactions</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Customized quiz generators</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Instant code reviews & feedback</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg bg-[#4F46E5] hover:bg-indigo-750 text-white text-xs font-semibold shadow-md cursor-pointer">Upgrade Pro</button>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between h-full border border-slate-200/60 dark:border-slate-800/40 text-center">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">University</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white my-4">Custom</div>
              <ul className="text-left text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Dedicated teacher panels</li>
                <li className="flex gap-2 items-center"><Check size={12} className="text-emerald-500" /> Administrative server consoles</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-lg border border-slate-250 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800/40">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-10">
          Trusted by Industry Leaders
        </p>

        <div className="sponsors-scroll mx-auto">
          <div className="sponsors-track gap-16">
            {[...sponsors, ...sponsors].map((brand, i) => (
              <div
                key={i}
                className="h-12 px-6 rounded-xl bg-slate-100 dark:bg-slate-800/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_3px_-1px_rgba(0,0,0,0.04)] flex items-center justify-center"
                title={brand.name}
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="h-7 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sponsors-scroll mx-auto mt-4">
          <div className="sponsors-track-back gap-16">
            {[...sponsors, ...sponsors].map((brand, i) => (
              <div
                key={i}
                className="h-12 px-6 rounded-xl bg-slate-100 dark:bg-slate-800/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_3px_-1px_rgba(0,0,0,0.04)] flex items-center justify-center"
                title={brand.name}
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="h-7 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/40 py-8 flex justify-between flex-wrap gap-4 text-xs text-slate-400 dark:text-slate-500">
        <span>© 2026 EduMind AI Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Security</a>
        </div>
      </footer>
      </div>
    </div>
  );
}
