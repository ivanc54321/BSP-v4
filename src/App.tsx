import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { 
  ArrowLeft, X, Home, FileText, User, Settings, 
  Info, Lightbulb, ShieldCheck, Minus, Plus, 
  ArrowRight, EyeOff, Shield, Sliders, Calendar, 
  Bookmark, Check, ChevronDown, LayoutGrid,
  Moon, Sun, Phone, MessageSquare
} from 'lucide-react';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [step, setStep] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [windowCount, setWindowCount] = useState(1);
  const [privacyLevel, setPrivacyLevel] = useState(50);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [designId, setDesignId] = useState('stripes');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const nextStep = () => setStep(s => Math.min(3, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-surface-bg text-text-main font-body pb-32 overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-bg/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between transition-colors duration-300">
        <button onClick={prevStep} className={`text-brand-dark hover:opacity-70 transition-opacity p-2 -ml-2 ${step === 0 ? 'invisible' : ''}`}>
          <ArrowLeft size={20} />
        </button>
        <div className="font-headline font-extrabold text-base flex items-center gap-2 text-text-main tracking-tight">
          <div className="w-6 h-6 bg-brand-lime rounded-tl-lg rounded-br-lg flex items-center justify-center text-black font-bold text-[10px]">
            b
          </div>
          Brightside
        </div>
        <div className="flex items-center gap-2 -mr-2">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="text-brand-dark hover:opacity-70 transition-opacity p-2"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-brand-dark hover:opacity-70 transition-opacity p-2">
            <div className="flex flex-col gap-1.5 w-6">
              <div className="h-0.5 w-full bg-current rounded-full"></div>
              <div className="h-0.5 w-full bg-current rounded-full"></div>
              <div className="h-0.5 w-full bg-current rounded-full"></div>
            </div>
          </button>
        </div>
      </header>
      
      {/* Subtle separator */}
      <div className="h-[1px] w-full bg-surface-highest/50"></div>

      <main className="max-w-2xl mx-auto px-6 pt-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step0 onNext={nextStep} onOpenChat={() => setIsChatOpen(true)} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step1 onNext={nextStep} windowCount={windowCount} setWindowCount={setWindowCount} privacyLevel={privacyLevel} setPrivacyLevel={setPrivacyLevel} width={width} setWidth={setWidth} height={height} setHeight={setHeight} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step2 onNext={(id) => { setDesignId(id); nextStep(); }} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <Step3 windowCount={windowCount} privacyLevel={privacyLevel} width={width} height={height} designId={designId} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-bg/80 backdrop-blur-2xl border-t border-surface-highest/50 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(46,47,44,0.03)] pb-8">
        <NavItem icon={<Home size={24} strokeWidth={1.5} />} label="Home" active={step === 0} onClick={() => setStep(0)} />
        <NavItem icon={<FileText size={24} strokeWidth={2} />} label="Quotes" active={step > 0} onClick={() => setStep(1)} />
        <NavItem icon={<User size={24} strokeWidth={1.5} />} label="Profile" />
        <NavItem icon={<Settings size={24} strokeWidth={1.5} />} label="Settings" />
      </nav>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-black scale-105' : 'text-text-muted hover:text-black'}`}>
      <div className={`transition-all duration-300 ${active ? 'bg-brand-lime p-3 rounded-2xl shadow-lg shadow-brand-lime/20' : 'p-2'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ProgressBar({ step, total, label }: { step: number, total: number, label: string }) {
  const percentage = (step / total) * 100;
  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-3">
        <span className="font-headline font-bold text-brand-dark text-[10px] tracking-widest uppercase">Step {step} of {total}</span>
        <span className="text-text-muted text-[10px] font-semibold">{label}</span>
      </div>
      <div className="h-2 w-full bg-surface-highest rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand-lime rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// --- STEPS ---

function Step0({ onNext, onOpenChat }: { onNext: () => void, onOpenChat: () => void }) {
  return (
    <div className="flex flex-col -mt-8 -mx-6">
      {/* Hero Section */}
      <div className="relative bg-brand-lime pt-16 pb-28 px-6 rounded-b-[2.5rem] overflow-hidden mb-8 shadow-lg min-h-[400px] flex flex-col justify-start">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-black">
          <motion.img
            src="https://i.ibb.co/LzcC6gVn/Green-tech-service-and-van-display.png"
            alt="Installation Background"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(30%) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-brand-lime/40"></div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="font-headline text-3xl font-black text-white tracking-tight leading-[1.05] mb-2 uppercase drop-shadow-md">
            Static Glazing<br/>
            <span className="text-brand-lime drop-shadow-sm">Installation</span>
          </h1>
          <h2 className="font-headline text-xs font-bold text-white/80 tracking-widest uppercase mb-2 drop-shadow-md">
            Window Privacy Film
          </h2>
        </motion.div>
      </div>

      {/* Floating Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="flex justify-center gap-3 -mt-12 relative z-20 mb-10 px-6"
      >
        <motion.button 
          onClick={onNext} 
          animate={{ 
            boxShadow: [
              "0px 8px 20px rgba(180,207,82,0.3)",
              "0px 12px 25px rgba(180,207,82,0.5)",
              "0px 8px 20px rgba(180,207,82,0.3)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="bg-brand-lime text-black font-headline font-extrabold text-sm py-3 px-6 rounded-xl hover:bg-[#b4cf52] border border-white/20 flex items-center justify-center gap-2 flex-1 shadow-lg"
        >
          Start Quote <ArrowRight size={18} />
        </motion.button>

        <motion.button 
          onClick={onOpenChat}
          className="bg-surface-bg text-text-main font-headline font-bold text-sm py-3 px-5 rounded-xl border border-surface-highest flex items-center justify-center gap-2 shadow-lg hover:bg-surface-highest transition-colors"
        >
          <MessageSquare size={18} className="text-brand-lime" /> CHAT WITH US
        </motion.button>
      </motion.div>

      <div className="px-6 pb-20">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-headline text-xl font-extrabold text-center mb-8 leading-tight text-white"
        >
          Simply Pick Your Style,<br/>
          <span className="text-brand-lime">We Take Care of the Rest.</span>
        </motion.h3>

        {/* How it Works Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-12 bg-surface-low p-6 rounded-3xl border border-surface-highest/50 shadow-sm"
        >
          <h4 className="font-headline text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} className="text-brand-lime" />
            How it Works
          </h4>
          <ul className="space-y-3 text-sm font-medium text-text-muted">
            <li className="flex items-start gap-3">
              <Check size={18} className="text-brand-lime shrink-0 mt-0.5" />
              <span><strong className="text-white">Static Tech™</strong> – Non-adhesive, non-residue suction</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={18} className="text-brand-lime shrink-0 mt-0.5" />
              <span>Perfect for renters & homeowners alike</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={18} className="text-brand-lime shrink-0 mt-0.5" />
              <span>Precision custom cut to your exact measurements</span>
            </li>
          </ul>
        </motion.div>

        {/* Numbered Timeline */}
        <div className="relative pl-2 space-y-8 mb-12">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
            className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-lime via-brand-lime/50 to-transparent origin-top"
          ></motion.div>

          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative z-10 flex items-start gap-5"
          >
            <div className="w-10 h-10 rounded-full bg-surface-high border-2 border-brand-lime flex items-center justify-center font-headline font-bold text-brand-lime shrink-0 shadow-[0_0_15px_rgba(180,207,82,0.15)]">1</div>
            <div className="pt-2">
              <p className="font-bold text-base text-white mb-1">MEASUREMENT</p>
              <p className="text-sm text-text-muted">Input Dimensions (W/H, cm)</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="relative z-10 flex items-start gap-5"
          >
            <div className="w-10 h-10 rounded-full bg-surface-high border-2 border-brand-lime flex items-center justify-center font-headline font-bold text-brand-lime shrink-0 shadow-[0_0_15px_rgba(180,207,82,0.15)]">2</div>
            <div className="pt-2 w-full">
              <p className="font-bold text-base text-white mb-3">SELECT DESIGN</p>
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-surface-highest rounded-xl border-2 border-surface-highest overflow-hidden hover:border-brand-lime transition-colors">
                  <img src="https://i.ibb.co/HLZCS7Zp/Chat-GPT-Image-Mar-17-2026-05-04-40-PM.png" alt="Stripes" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="w-14 h-14 bg-surface-highest rounded-xl border-2 border-surface-highest overflow-hidden hover:border-brand-lime transition-colors">
                  <img src="https://i.ibb.co/vvjtVcjV/stripe.png" alt="Frosted" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="w-14 h-14 bg-surface-highest rounded-xl border-2 border-surface-highest overflow-hidden hover:border-brand-lime transition-colors">
                  <img src="https://i.ibb.co/wNz9X34w/Untitled-3.png" alt="Brick" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="relative z-10 flex items-start gap-5"
          >
            <div className="w-10 h-10 rounded-full bg-brand-lime border-2 border-brand-lime flex items-center justify-center font-headline font-bold text-black shrink-0 shadow-[0_0_15px_rgba(180,207,82,0.3)]">3</div>
            <div className="pt-2">
              <p className="font-bold text-base text-white mb-1">CALCULATE PRICE</p>
              <p className="text-sm text-text-muted">Instant, Free Quote</p>
            </div>
          </motion.div>
        </div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          onClick={onNext} 
          className="w-full bg-brand-lime text-black font-headline font-extrabold text-lg py-5 rounded-2xl shadow-[0_10px_30px_rgba(180,207,82,0.25)] hover:bg-[#b4cf52] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          START YOUR PRECISION QUOTE <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function Step1({ onNext, windowCount, setWindowCount, privacyLevel, setPrivacyLevel, width, setWidth, height, setHeight }: { onNext: () => void, windowCount: number, setWindowCount: (c: number) => void, privacyLevel: number, setPrivacyLevel: (p: number) => void, width: string, setWidth: (w: string) => void, height: string, setHeight: (h: string) => void }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Enter the approximate measurements for your two-pane window replacement. Accuracy helps us provide a better estimate.",
    "Measure from the inside edge of the window frame for the most accurate dimensions.",
    "Don't worry if it's not perfect—our installers will do a final measure before production."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePrivacyFromPointer(e);
    // Prevent default to stop scrolling on touch devices while dragging
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePrivacyFromPointer(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const updatePrivacyFromPointer = (e: React.PointerEvent) => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = 100 - (y / rect.height) * 100;
    setPrivacyLevel(Math.max(0, Math.min(100, Math.round(percentage))));
  };

  return (
    <div className="flex flex-col">
      <ProgressBar step={1} total={3} label="33% Completed" />
      
      {/* Privacy Slider */}
      <div className="mb-8 bg-surface-low p-5 rounded-2xl border border-surface-highest/30 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <label className="font-bold text-xs text-text-main flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-lime"></div>
            Privacy Film Height
          </label>
          <span className="text-[10px] font-bold text-brand-dark bg-brand-lime/20 px-2 py-1 rounded-md">{privacyLevel}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={privacyLevel}
          onChange={(e) => setPrivacyLevel(Number(e.target.value))}
          className="w-full h-2 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-brand-lime"
        />
      </div>

      {/* Diagram Area */}
      <div className="bg-surface-low rounded-[2rem] p-8 mb-12 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 to-transparent"></div>
        
        <div className="relative w-64 h-64 z-10 my-4">
          {/* Window Frame Outer */}
          <div 
            ref={windowRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 border-[12px] border-[#ffffff] rounded-lg bg-[#e8e8e8] flex gap-2 shadow-[inset_0_4px_12px_rgba(0,0,0,0.15),0_15px_35px_rgba(0,0,0,0.2)] p-1 cursor-ns-resize touch-none"
          >
            {/* Left Pane Outer */}
            <div className="flex-[0.48] bg-[#f8f8f8] rounded-sm border-[4px] border-[#ffffff] relative shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none">
              {/* "Outside" Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-100">
                {/* Realistic Clouds */}
                <div className="absolute top-6 left-2 w-16 h-6 bg-white/90 rounded-full blur-[1px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute top-8 left-10 w-12 h-5 bg-white/80 rounded-full blur-[1px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute top-14 -left-4 w-20 h-6 bg-white/70 rounded-full blur-[2px]"></div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-emerald-800/60 via-emerald-600/30 to-transparent blur-[1px]"></div>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/40 pointer-events-none"></div>
                <div className="absolute -inset-full top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 transform translate-x-1/4 pointer-events-none"></div>
              </div>

              {/* Frosted Film */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t-[1.5px] border-white/80 flex items-center justify-center shadow-[0_-2px_10px_rgba(255,255,255,0.3)] overflow-hidden"
                animate={{ height: `${privacyLevel}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Film Texture */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                {/* Stripes */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, rgba(255,255,255,0.9) 8px, rgba(255,255,255,0.9) 16px)' }}></div>
                
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                />
                
                {/* Privacy Number Badge */}
                {privacyLevel > 15 && (
                  <div className="relative z-20 bg-brand-lime text-black text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md backdrop-blur-md border border-brand-lime/50 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/80 animate-pulse"></div>
                    {privacyLevel}%
                  </div>
                )}
              </motion.div>

              {/* Handle */}
              <div className="absolute top-1/2 -right-1.5 w-3 h-14 bg-gradient-to-b from-[#f0f0f0] via-[#d0d0d0] to-[#b0b0b0] rounded-l-md -translate-y-1/2 shadow-[-2px_0_5px_rgba(0,0,0,0.2)] z-10 border-y border-l border-[#a0a0a0]"></div>
            </div>

            {/* Right Pane Outer */}
            <div className="flex-[0.52] bg-[#f8f8f8] rounded-sm border-[4px] border-[#ffffff] relative shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none">
              {/* "Outside" Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-100">
                {/* Realistic Clouds */}
                <div className="absolute top-12 right-4 w-24 h-8 bg-white/90 rounded-full blur-[1px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute top-16 right-16 w-16 h-6 bg-white/80 rounded-full blur-[1px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-emerald-800/60 via-emerald-600/30 to-transparent blur-[1px]"></div>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/40 pointer-events-none"></div>
                <div className="absolute -inset-full top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 transform translate-x-1/4 pointer-events-none"></div>
              </div>

              {/* Frosted Film */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t-[1.5px] border-white/80 flex items-center justify-center shadow-[0_-2px_10px_rgba(255,255,255,0.3)] overflow-hidden"
                animate={{ height: `${privacyLevel}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Film Texture */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                {/* Stripes */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, rgba(255,255,255,0.9) 8px, rgba(255,255,255,0.9) 16px)' }}></div>
                
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2, delay: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Height Line */}
          <div className="absolute -right-5 top-0 bottom-0 flex flex-col items-center">
            <div className="w-px h-full bg-brand-lime relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-brand-lime rotate-45"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-brand-lime -rotate-45"></div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 bg-surface-bg px-1.5 py-1 rounded text-[8px] font-bold text-brand-dark shadow-sm whitespace-nowrap z-20">
              {height ? `${height} cm` : 'Height'}
            </div>
          </div>
          
          {/* Width Line */}
          <div className="absolute -bottom-8 left-0 right-0 flex items-center">
            <div className="h-px w-full bg-brand-lime relative">
              <div className="absolute -left-1 -top-1 w-2 h-2 border-b-2 border-l-2 border-brand-lime rotate-45"></div>
              <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-brand-lime rotate-45"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bg-surface-bg px-2 py-1 rounded text-[8px] font-bold text-brand-dark shadow-sm whitespace-nowrap">
              {width ? `${width} cm` : 'Width'}
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-text-main tracking-tight mb-1.5">
          Window <span className="text-brand-lime">Dimensions</span>
        </h1>
        <div className="relative h-[40px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-text-muted text-sm leading-snug max-w-md absolute inset-0"
            >
              {tips[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Inputs */}
      <div className="space-y-6 mb-10">
        <div>
          <label className="block font-bold text-xs mb-2 ml-1">Width (cm)</label>
          <input 
            type="number" 
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 120" 
            className="w-full bg-surface-highest/50 border-none rounded-2xl p-4 text-base focus:ring-2 focus:ring-brand-lime outline-none transition-shadow placeholder:text-text-muted/50 font-medium mb-3" 
          />
          <input
            type="range"
            min="0"
            max="300"
            value={width || 0}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full h-2 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-brand-lime"
          />
        </div>
        <div>
          <label className="block font-bold text-xs mb-2 ml-1">Height (cm)</label>
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 150" 
            className="w-full bg-surface-highest/50 border-none rounded-2xl p-4 text-base focus:ring-2 focus:ring-brand-lime outline-none transition-shadow placeholder:text-text-muted/50 font-medium mb-3" 
          />
          <input
            type="range"
            min="0"
            max="300"
            value={height || 0}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full h-2 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-brand-lime"
          />
        </div>
      </div>

      {/* Counter */}
      <div className="bg-surface-low p-6 rounded-[2rem] mb-10">
        <label className="block font-bold text-xs mb-4 text-center">Number of Windows</label>
        <div className="flex items-center justify-between bg-surface-bg rounded-full p-2 border border-surface-highest/50">
          <button onClick={() => setWindowCount(Math.max(1, windowCount - 1))} className="w-10 h-10 flex items-center justify-center bg-surface-high rounded-full hover:bg-surface-highest transition-colors active:scale-95">
            <Minus size={18} />
          </button>
          <span className="font-headline text-lg font-extrabold">{windowCount}</span>
          <button onClick={() => setWindowCount(windowCount + 1)} className="w-10 h-10 flex items-center justify-center bg-brand-lime rounded-full hover:bg-[#b4cf52] transition-colors active:scale-95 text-black">
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-brand-lime text-black font-headline font-extrabold text-sm py-4 rounded-full shadow-lg shadow-brand-lime/20 hover:bg-[#b4cf52] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 mb-12">
        Next <ArrowRight size={18} />
      </button>

      {/* Info Cards */}
      <div className="space-y-3">
        <InfoCard icon={<LayoutGrid size={18} />} title="Standard Sizing" desc="Most modern home windows range from 60cm to 180cm in width." />
        <InfoCard icon={<Lightbulb size={18} />} title="Brightside Tip" desc="Measure from the inside frame for the most accurate quote." />
        <InfoCard icon={<ShieldCheck size={18} />} title="Price Lock" desc="Quotes are valid for 30 days after measurements are confirmed." />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-surface-low p-4 rounded-2xl flex items-start gap-3 border-l-4 border-brand-lime">
      <div className="p-2 bg-brand-lime/10 rounded-xl text-brand-dark shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-xs mb-1">{title}</h4>
        <p className="text-[10px] text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Step2({ onNext }: { onNext: (id: string) => void }) {
  return (
    <div className="flex flex-col">
      <ProgressBar step={2} total={3} label="66% Completed" />
      
      <div className="mb-10">
        <div className="inline-block px-3 py-1 bg-brand-lime/10 rounded-lg mb-4">
          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-dark">Custom Designs</span>
        </div>
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
          Choose Your Design
        </h1>
        <p className="text-text-muted text-base leading-relaxed max-w-md">
          Select a window film pattern that complements your architectural style while meeting your privacy needs.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <DesignCard 
          title="Stripes" 
          desc="Classic linear pattern for privacy. Ideal for office dividers and modern residential entries."
          imgUrl="https://i.ibb.co/HLZCS7Zp/Chat-GPT-Image-Mar-17-2026-05-04-40-PM.png"
          popular
          onSelect={() => onNext('stripes')}
        />
        <DesignCard 
          title="Frosted" 
          desc="Maximum privacy with high light transmission. The architectural standard for bathrooms and storefronts."
          imgUrl="https://i.ibb.co/vvjtVcjV/stripe.png"
          onSelect={() => onNext('frosted')}
        />
        <DesignCard 
          title="Brick Style" 
          desc="Geometric staggered pattern providing a unique textured look and partial visibility."
          imgUrl="https://i.ibb.co/wNz9X34w/Untitled-3.png"
          onSelect={() => onNext('brick')}
        />
      </div>

      <button className="mx-auto flex items-center gap-2 px-6 py-3 text-sm bg-surface-bg border-2 border-brand-lime/30 text-text-main font-bold rounded-full hover:bg-brand-lime/10 transition-colors active:scale-95 mb-16">
        More designs <ChevronDown size={16} className="text-brand-lime" />
      </button>
    </div>
  );
}

function DesignCard({ title, desc, imgUrl, popular, onSelect }: { title: string, desc: string, imgUrl: string, popular?: boolean, onSelect: () => void }) {
  return (
    <div className="bg-surface-bg rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(46,47,44,0.04)] hover:shadow-[0_20px_40px_rgba(198,225,90,0.1)] transition-all duration-500 border-2 border-transparent hover:border-brand-lime/30 flex flex-col group">
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-highest">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
        {popular && (
          <div className="absolute top-4 right-4 bg-brand-lime text-black px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
            Popular
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-headline font-bold text-xl mb-3">{title}</h3>
        <p className="font-body text-xs text-text-muted mb-8 flex-grow leading-relaxed">{desc}</p>
        <button onClick={onSelect} className={`w-full py-3 text-sm font-bold rounded-xl transition-all active:scale-95 ${popular ? 'bg-brand-lime text-black hover:bg-[#b4cf52] shadow-md shadow-brand-lime/20' : 'bg-surface-high text-text-main hover:bg-brand-lime hover:text-black'}`}>
          Select Design
        </button>
      </div>
    </div>
  );
}

function Step3({ windowCount, privacyLevel, width, height, designId }: { windowCount: number, privacyLevel: number, width: string, height: string, designId: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const areaCm2 = w * h;
  const baseCost = areaCm2 * 0.05;
  const privacyMulti = 1 + (privacyLevel / 100) * 0.2;
  
  let designMulti = 1.0;
  let designName = "Stripes";
  let designDesc = "Classic linear pattern for privacy. Ideal for office dividers and modern residential entries.";
  
  if (designId === 'frosted') {
    designMulti = 1.1;
    designName = "Frosted";
    designDesc = "Maximum privacy with high light transmission. The architectural standard for bathrooms and storefronts.";
  } else if (designId === 'brick') {
    designMulti = 1.2;
    designName = "Brick Style";
    designDesc = "Geometric staggered pattern providing a unique textured look and partial visibility.";
  }
  
  let totalPrice = Math.round(baseCost * privacyMulti * designMulti * windowCount);
  if (totalPrice === 0) totalPrice = 30 * windowCount;

  useEffect(() => {
    const controls = animate(count, totalPrice, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [totalPrice, count]);

  return (
    <div className="flex flex-col -mt-8 -mx-6">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" alt="Interior" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        
        {/* Floating Card */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-surface-bg/90 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={18} className="text-brand-lime" />
              <span className="font-bold text-[8px] uppercase tracking-widest text-text-muted">Pattern Selected</span>
            </div>
            <h2 className="font-headline text-xl font-extrabold text-text-main mb-2">{designName}</h2>
            <p className="text-xs text-text-muted mb-4">{designDesc}</p>
            
            {/* Privacy Level Indicator */}
            <div className="flex items-center justify-between bg-surface-low rounded-lg p-3 border border-surface-highest/30">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Privacy Height</span>
              <span className="text-xs font-extrabold text-brand-lime bg-brand-lime/10 px-2 py-1 rounded">{privacyLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-10 pb-20">
        <div className="mb-8">
          <span className="font-bold text-brand-lime tracking-[0.2em] uppercase text-[8px] mb-2 block">Final Quote</span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="font-headline text-4xl font-extrabold tracking-tighter text-text-main mb-3"
          >
            Total Price: £<motion.span>{rounded}</motion.span>
          </motion.h1>
          <p className="text-sm text-text-muted flex items-start gap-2 leading-relaxed">
            <Info size={20} className="text-brand-lime shrink-0 mt-0.5" />
            Includes film and installation estimate
          </p>
        </div>

        <div className="grid gap-4 mb-10">
          <div className="bg-surface-low rounded-3xl p-6">
            <LayoutGrid size={24} className="text-brand-lime mb-4" />
            <h4 className="font-headline font-bold text-base mb-1">Dimensions</h4>
            <p className="text-xs text-text-muted leading-relaxed">{w && h ? `${w}cm x ${h}cm` : 'Standard Residential Fit'}<br/>{w && h ? 'Custom Precision Cut' : 'Standard Fit'}</p>
          </div>
          <div className="bg-surface-low rounded-3xl p-6">
            <Calendar size={24} className="text-brand-lime mb-4" />
            <h4 className="font-headline font-bold text-base mb-1">Availability</h4>
            <p className="text-xs text-text-muted leading-relaxed">Earliest installation:<br/>Tuesday, 24th Oct</p>
          </div>
        </div>

        <div className="bg-surface-bg border border-surface-highest rounded-3xl p-6 shadow-sm">
          <h4 className="font-headline font-bold text-lg mb-6">Ready to proceed?</h4>
          <div className="space-y-3 mb-6">
            <button className="w-full bg-brand-lime text-black font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#b4cf52] transition-transform active:scale-95 shadow-lg shadow-brand-lime/20">
              Place Order <ArrowRight size={18} />
            </button>
            <button className="w-full bg-surface-high text-text-main font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 hover:bg-surface-highest transition-transform active:scale-95">
              Save Quote <Bookmark size={18} />
            </button>
          </div>
          
          <div className="pt-6 border-t border-surface-highest flex items-start gap-4">
            <div className="bg-brand-lime/10 p-2.5 rounded-xl shrink-0">
              <Shield size={20} className="text-brand-dark" />
            </div>
            <div>
              <p className="font-bold text-xs text-text-main mb-1">Brightside Guarantee</p>
              <p className="text-[10px] text-text-muted leading-relaxed">Quotes are valid for 30 days. Professional installation included in the estimate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
