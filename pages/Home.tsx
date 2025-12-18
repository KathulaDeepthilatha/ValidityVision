import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar z-10 relative">
      <div className="relative w-full min-h-[500px] flex items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-background-dark pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm mb-6 animate-slide-up shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
            </span>
            <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">ValidityVision 2.0 is Live</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-main-light dark:text-text-main-dark leading-tight tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Know Your Pantry,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark dark:from-primary-soft dark:to-primary" style={{ textShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>Trust Your Safety.</span>
          </h1>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '400ms' }}>
            Effortless product management for everything in your home. From organic spinach to luxury cosmetics, track expiration dates and analyze ingredients instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up w-full justify-center" style={{ animationDelay: '500ms' }}>
            <button onClick={() => navigate('/scan')} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform duration-300 relative z-10">barcode_scanner</span>
              <span className="relative z-10">Scan New Product</span>
            </button>
            <button onClick={() => navigate('/inventory')} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-text-main-light dark:text-white font-bold text-lg shadow-md border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group">
              <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors duration-300">inventory_2</span>
              <span>View My Pantry</span>
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-[10%] w-24 h-24 bg-surface-card-light dark:bg-surface-card-dark rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-center animate-float opacity-80 rotate-12 pointer-events-none z-0">
          <span className="material-symbols-outlined text-4xl text-green-500">eco</span>
        </div>
        <div className="absolute bottom-32 left-[10%] w-20 h-20 bg-surface-card-light dark:bg-surface-card-dark rounded-3xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-center animate-float-delayed opacity-80 -rotate-12 pointer-events-none z-0">
          <span className="material-symbols-outlined text-4xl text-accent-orange">warning</span>
        </div>
        <div className="absolute top-40 left-[15%] w-16 h-16 bg-surface-card-light dark:bg-surface-card-dark rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-center animate-float opacity-70 rotate-6 pointer-events-none z-0 blur-[1px]">
          <span className="material-symbols-outlined text-3xl text-primary">science</span>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-[2rem] bg-surface-card-light dark:bg-surface-card-dark border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[4rem] transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Safety Analysis</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
              Instant ingredient breakdown for food and cosmetics. Know what's safe for your family with a simple scan.
            </p>
            <a className="inline-flex items-center gap-1 text-primary text-sm font-bold mt-6 group-hover:translate-x-1 transition-transform" href="#">
              Analyze now <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          <div className="group p-8 rounded-[2rem] bg-surface-card-light dark:bg-surface-card-dark border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-orange/10 to-transparent rounded-bl-[4rem] transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">timer</span>
            </div>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Expiry Tracking</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
              Never let good products go to waste. Get smart notifications before your groceries or serums expire.
            </p>
            <a className="inline-flex items-center gap-1 text-accent-orange text-sm font-bold mt-6 group-hover:translate-x-1 transition-transform" href="#">
              Check timeline <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          <div className="group p-8 rounded-[2rem] bg-surface-card-light dark:bg-surface-card-dark border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-[4rem] transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">category</span>
            </div>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Universal Support</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
              From pantry staples to bathroom luxuries. Organize your entire household inventory in one beautiful place.
            </p>
            <a className="inline-flex items-center gap-1 text-green-500 text-sm font-bold mt-6 group-hover:translate-x-1 transition-transform" href="#">
              Browse categories <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-16 max-w-7xl mx-auto w-full animate-slide-up" style={{ animationDelay: '500ms' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Quick Stats</h2>
          <button onClick={() => navigate('/inventory')} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">View Inventory</button>
        </div>
        <div className="bg-surface-card-light dark:bg-surface-card-dark rounded-[2.5rem] p-8 shadow-card border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none"></div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="w-24 h-24 rounded-full border-[6px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
              <svg className="absolute inset-0 -rotate-90" height="100%" viewBox="0 0 36 36" width="100%">
                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeWidth="3"></path>
              </svg>
              <div className="text-center">
                <span className="block text-2xl font-bold text-text-main-light dark:text-text-main-dark">85%</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Pantry Health</h4>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Your inventory is fresh.</p>
            </div>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">42 Total Products</h4>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Well stocked pantry.</p>
            </div>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-500">
              <span className="material-symbols-outlined">savings</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Waste Avoided</h4>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">$45 saved this month.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-8 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
        <p className="opacity-70 hover:opacity-100 transition-opacity">© 2025 ValidityVision Hackathon Project</p>
      </footer>
    </div>
  );
};

export default Home;