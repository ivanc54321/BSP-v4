import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, X, Home, FileText, User, Settings, 
  Info, Lightbulb, ShieldCheck, Minus, Plus, 
  ArrowRight, EyeOff, Shield, Sliders, Calendar, 
  Bookmark, Check, ChevronDown, LayoutGrid
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-surface-bg text-text-main font-body pb-32 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-bg/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <button onClick={prevStep} className="text-brand-dark hover:opacity-70 transition-opacity p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
        <div className="font-headline font-extrabold text-xl flex items-center gap-2 text-text-main tracking-tight">
          <div className="w-6 h-6 bg-brand-lime rounded-tl-lg rounded-br-lg flex items-center justify-center text-black font-bold text-xs">
            b
          </div>
          Brightside
        </div>
        <button className="text-brand-dark hover:opacity-70 transition-opacity p-2 -mr-2">
          <X size={24} />
        </button>
      </header>
      
      {/* Subtle separator */}
      <div className="h-[1px] w-full bg-surface-highest/50"></div>

      <main className="max-w-2xl mx-auto px-6 pt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step1 onNext={nextStep} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step2 onNext={nextStep} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <Step3 onNext={nextStep} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <Step4 />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-bg/80 backdrop-blur-2xl border-t border-surface-highest/50 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(46,47,44,0.03)] pb-8">
        <NavItem icon={<Home size={24} strokeWidth={1.5} />} label="Home" />
        <NavItem icon={<FileText size={24} strokeWidth={2} />} label="Quotes" active />
        <NavItem icon={<User size={24} strokeWidth={1.5} />} label="Profile" />
        <NavItem icon={<Settings size={24} strokeWidth={1.5} />} label="Settings" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-black scale-105' : 'text-text-muted hover:text-black'}`}>
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
        <span className="font-headline font-bold text-brand-dark text-xs tracking-widest uppercase">Step {step} of {total}</span>
        <span className="text-text-muted text-xs font-semibold">{label}</span>
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

function Step1({ onNext }: { onNext: () => void }) {
  const [count, setCount] = useState(1);

  return (
    <div className="flex flex-col">
      <ProgressBar step={1} total={5} label="20% Completed" />
      
      <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
        Window<br/>Dimensions
      </h1>
      <p className="text-text-muted text-lg mb-10 leading-relaxed max-w-md">
        Enter the approximate measurements for your two-pane window replacement. Accuracy helps us provide a better estimate.
      </p>

      {/* Diagram Area */}
      <div className="bg-surface-low rounded-[2rem] p-8 mb-10 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 to-transparent"></div>
        
        <div className="relative w-48 h-64 border-4 border-surface-highest rounded-2xl p-1.5 flex gap-1.5 bg-surface-bg z-10 shadow-sm">
          <div className="flex-1 border-2 border-surface-highest/50 rounded-xl bg-surface-low/50"></div>
          <div className="flex-1 border-2 border-surface-highest/50 rounded-xl bg-surface-low/50"></div>
          
          {/* Height Line */}
          <div className="absolute -right-8 top-4 bottom-4 flex flex-col items-center">
            <div className="w-px h-full bg-brand-lime relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-brand-lime rotate-45"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-brand-lime -rotate-45"></div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 bg-surface-bg px-2 py-1 rounded text-[10px] font-bold text-brand-dark shadow-sm">Height</div>
          </div>
          
          {/* Width Line */}
          <div className="absolute -bottom-8 left-4 right-4 flex items-center">
            <div className="h-px w-full bg-brand-lime relative">
              <div className="absolute -left-1 -top-1 w-2 h-2 border-b-2 border-l-2 border-brand-lime rotate-45"></div>
              <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-brand-lime rotate-45"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bg-surface-bg px-2 py-1 rounded text-[10px] font-bold text-brand-dark shadow-sm">Width</div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-10">
        <div>
          <label className="block font-bold text-sm mb-2 ml-1">Width (cm)</label>
          <input type="number" placeholder="e.g. 120" className="w-full bg-surface-highest/50 border-none rounded-2xl p-5 text-lg focus:ring-2 focus:ring-brand-lime outline-none transition-shadow placeholder:text-text-muted/50 font-medium" />
        </div>
        <div>
          <label className="block font-bold text-sm mb-2 ml-1">Height (cm)</label>
          <input type="number" placeholder="e.g. 150" className="w-full bg-surface-highest/50 border-none rounded-2xl p-5 text-lg focus:ring-2 focus:ring-brand-lime outline-none transition-shadow placeholder:text-text-muted/50 font-medium" />
        </div>
      </div>

      {/* Counter */}
      <div className="bg-surface-low p-6 rounded-[2rem] mb-10">
        <label className="block font-bold text-sm mb-4 text-center">Number of Windows</label>
        <div className="flex items-center justify-between bg-surface-bg rounded-full p-2 border border-surface-highest/50">
          <button onClick={() => setCount(Math.max(1, count - 1))} className="w-12 h-12 flex items-center justify-center bg-surface-high rounded-full hover:bg-surface-highest transition-colors active:scale-95">
            <Minus size={20} />
          </button>
          <span className="font-headline text-2xl font-extrabold">{count}</span>
          <button onClick={() => setCount(count + 1)} className="w-12 h-12 flex items-center justify-center bg-brand-lime rounded-full hover:bg-[#b4cf52] transition-colors active:scale-95 text-black">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-brand-lime text-black font-headline font-extrabold text-lg py-5 rounded-full shadow-lg shadow-brand-lime/20 hover:bg-[#b4cf52] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 mb-12">
        Next <ArrowRight size={20} />
      </button>

      {/* Info Cards */}
      <div className="space-y-4">
        <InfoCard icon={<LayoutGrid size={20} />} title="Standard Sizing" desc="Most modern home windows range from 60cm to 180cm in width." />
        <InfoCard icon={<Lightbulb size={20} />} title="Brightside Tip" desc="Measure from the inside frame for the most accurate quote." />
        <InfoCard icon={<ShieldCheck size={20} />} title="Price Lock" desc="Quotes are valid for 30 days after measurements are confirmed." />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-surface-low p-5 rounded-2xl flex items-start gap-4 border-l-4 border-brand-lime">
      <div className="p-2.5 bg-brand-lime/10 rounded-xl text-brand-dark shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col">
      <ProgressBar step={2} total={5} label="Selection" />
      
      <div className="mb-10">
        <div className="inline-block px-3 py-1 bg-brand-lime/10 rounded-lg mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Custom Designs</span>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
          Choose Your Design
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-md">
          Select a window film pattern that complements your architectural style while meeting your privacy needs.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <DesignCard 
          title="Stripes" 
          desc="Classic linear pattern for privacy. Ideal for office dividers and modern residential entries."
          imgUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
          popular
          onSelect={onNext}
        />
        <DesignCard 
          title="Frosted" 
          desc="Maximum privacy with high light transmission. The architectural standard for bathrooms and storefronts."
          imgUrl="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
          onSelect={onNext}
        />
        <DesignCard 
          title="Brick Style" 
          desc="Geometric staggered pattern providing a unique textured look and partial visibility."
          imgUrl="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800"
          onSelect={onNext}
        />
      </div>

      <button className="mx-auto flex items-center gap-2 px-8 py-4 bg-surface-bg border-2 border-brand-lime/30 text-text-main font-bold rounded-full hover:bg-brand-lime/10 transition-colors active:scale-95 mb-16">
        More designs <ChevronDown size={20} className="text-brand-lime" />
      </button>
    </div>
  );
}

function DesignCard({ title, desc, imgUrl, popular, onSelect }: { title: string, desc: string, imgUrl: string, popular?: boolean, onSelect: () => void }) {
  return (
    <div className="bg-surface-bg rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(46,47,44,0.04)] hover:shadow-[0_20px_40px_rgba(198,225,90,0.1)] transition-all duration-500 border-2 border-transparent hover:border-brand-lime/30 flex flex-col group">
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-highest">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {popular && (
          <div className="absolute top-4 right-4 bg-brand-lime text-black px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
            Popular
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-headline font-bold text-2xl mb-3">{title}</h3>
        <p className="font-body text-sm text-text-muted mb-8 flex-grow leading-relaxed">{desc}</p>
        <button onClick={onSelect} className={`w-full py-4 font-bold rounded-xl transition-all active:scale-95 ${popular ? 'bg-brand-lime text-black hover:bg-[#b4cf52] shadow-md shadow-brand-lime/20' : 'bg-surface-high text-text-main hover:bg-brand-lime hover:text-black'}`}>
          Select Design
        </button>
      </div>
    </div>
  );
}

function Step3({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState('Full');

  return (
    <div className="flex flex-col">
      <ProgressBar step={3} total={5} label="60% Complete" />
      
      <div className="mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-6">
          Select Privacy Level
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-md border-l-4 border-brand-lime pl-5 py-1">
          Choose the architectural density that best fits your landscape and desired level of seclusion.
        </p>
      </div>

      <div className="space-y-5 mb-12">
        <PrivacyOption 
          id="Half" 
          title="Half" 
          desc="Spaced pickets for a breezy, open aesthetic that defines boundaries." 
          icon={<EyeOff size={28} strokeWidth={1.5} />} 
          selected={selected === 'Half'} 
          onClick={() => setSelected('Half')} 
        />
        <PrivacyOption 
          id="Full" 
          title="Full" 
          desc="Maximum seclusion with tongue-and-groove boards for total peace." 
          icon={<Shield size={28} strokeWidth={1.5} />} 
          selected={selected === 'Full'} 
          onClick={() => setSelected('Full')} 
        />
        <PrivacyOption 
          id="Custom" 
          title="Custom" 
          desc="Mixed heights and lattice top options for a bespoke architectural look." 
          icon={<Sliders size={28} strokeWidth={1.5} />} 
          selected={selected === 'Custom'} 
          onClick={() => setSelected('Custom')} 
        />
      </div>

      {/* Preview Image */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] bg-surface-highest mb-12 shadow-inner">
        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" alt="Preview" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
        <div className="absolute -bottom-2 right-4 md:right-8 p-6 bg-surface-bg/95 backdrop-blur-xl rounded-2xl shadow-xl max-w-[280px] border-r-4 border-b-4 border-brand-lime">
          <p className="text-[10px] font-bold text-brand-dark tracking-widest uppercase mb-2">Preview</p>
          <p className="text-sm text-text-main font-medium italic leading-relaxed">"Full privacy creates a modern sanctuary feel."</p>
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-brand-lime text-black font-headline font-extrabold text-lg py-5 rounded-full shadow-[0_12px_24px_-8px_rgba(198,225,90,0.6)] hover:bg-[#b4cf52] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 mb-16">
        Calculate Price <ArrowRight size={20} />
      </button>
    </div>
  );
}

function PrivacyOption({ id, title, desc, icon, selected, onClick }: { id: string, title: string, desc: string, icon: React.ReactNode, selected: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex flex-col items-start p-8 rounded-[2rem] text-left transition-all duration-300 relative overflow-hidden ${
        selected 
          ? 'bg-brand-lime ring-4 ring-brand-lime/30 shadow-xl shadow-brand-lime/20 scale-[1.02]' 
          : 'bg-surface-low hover:bg-surface-high'
      }`}
    >
      <div className={`mb-6 p-4 rounded-full ${selected ? 'bg-black/10 text-black' : 'bg-surface-bg text-brand-dark'}`}>
        {icon}
      </div>
      <h3 className={`font-headline text-2xl font-bold mb-2 ${selected ? 'text-black' : 'text-text-main'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed max-w-[85%] ${selected ? 'text-black/80' : 'text-text-muted'}`}>{desc}</p>
      
      <div className={`absolute top-8 right-8 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
        selected ? 'bg-black' : 'border-2 border-surface-highest'
      }`}>
        {selected && <Check size={14} className="text-brand-lime" strokeWidth={3} />}
      </div>
    </button>
  );
}

function Step4() {
  return (
    <div className="flex flex-col -mt-8 -mx-6">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" alt="Interior" className="w-full h-full object-cover" />
        
        {/* Floating Card */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-surface-bg/90 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={18} className="text-brand-lime" />
              <span className="font-bold text-[10px] uppercase tracking-widest text-text-muted">Pattern Selected</span>
            </div>
            <h2 className="font-headline text-2xl font-extrabold text-text-main mb-2">Geometric Frost</h2>
            <p className="text-sm text-text-muted">High-precision laser cut privacy film with 85% light transmission.</p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-10 pb-20">
        <div className="mb-10">
          <span className="font-bold text-brand-lime tracking-[0.2em] uppercase text-[10px] mb-3 block">Final Quote</span>
          <h1 className="font-headline text-6xl font-extrabold tracking-tighter text-text-main mb-4">Total Price: £30</h1>
          <p className="text-lg text-text-muted flex items-start gap-3 leading-relaxed">
            <Info size={24} className="text-brand-lime shrink-0 mt-0.5" />
            Includes film and installation estimate
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          <div className="bg-surface-low rounded-[2rem] p-8">
            <LayoutGrid size={28} className="text-brand-lime mb-5" />
            <h4 className="font-headline font-bold text-xl mb-2">Dimensions</h4>
            <p className="text-text-muted leading-relaxed">200cm x 150cm<br/>Standard Residential Fit</p>
          </div>
          <div className="bg-surface-low rounded-[2rem] p-8">
            <Calendar size={28} className="text-brand-lime mb-5" />
            <h4 className="font-headline font-bold text-xl mb-2">Availability</h4>
            <p className="text-text-muted leading-relaxed">Earliest installation:<br/>Tuesday, 24th Oct</p>
          </div>
        </div>

        <div className="bg-surface-bg border border-surface-highest rounded-[2rem] p-8 shadow-sm">
          <h4 className="font-headline font-bold text-2xl mb-8">Ready to proceed?</h4>
          <div className="space-y-4 mb-8">
            <button className="w-full bg-brand-lime text-black font-bold text-lg py-5 rounded-full flex items-center justify-center gap-3 hover:bg-[#b4cf52] transition-transform active:scale-95 shadow-lg shadow-brand-lime/20">
              Place Order <ArrowRight size={20} />
            </button>
            <button className="w-full bg-surface-high text-text-main font-bold text-lg py-5 rounded-full flex items-center justify-center gap-3 hover:bg-surface-highest transition-transform active:scale-95">
              Save Quote <Bookmark size={20} />
            </button>
          </div>
          
          <div className="pt-6 border-t border-surface-highest flex items-start gap-4">
            <div className="bg-brand-lime/10 p-2.5 rounded-xl shrink-0">
              <Shield size={20} className="text-brand-dark" />
            </div>
            <div>
              <p className="font-bold text-sm text-text-main mb-1">Brightside Guarantee</p>
              <p className="text-[11px] text-text-muted leading-relaxed">Quotes are valid for 30 days. Professional installation included in the estimate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
