import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 via-primary/5 to-transparent pointer-events-none z-0"></div>
      
      <header className="w-full px-8 py-8 flex justify-between items-center shrink-0 z-10 relative">
        <h2 className="text-text-main-light dark:text-text-main-dark text-3xl font-black leading-tight tracking-[-0.033em]">Inventory</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-surface-card-dark p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <input className="bg-transparent border-none text-sm text-text-main-light dark:text-text-main-dark placeholder-slate-400 focus:ring-0 w-48 pl-3" placeholder="Search pantry..." type="text" />
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
          <button className="bg-white dark:bg-surface-card-dark hover:bg-slate-50 dark:hover:bg-slate-700 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary border border-slate-200 dark:border-slate-700 shadow-sm rounded-full p-2.5 relative transition-colors">
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full animate-pulse border border-white dark:border-slate-800"></span>
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Items', value: '42', icon: 'inventory_2', color: 'text-accent-orange', bg: 'bg-orange-50 dark:bg-orange-900/20', sub: '+4 added today', ring: 'ring-accent-orange/10' },
            { label: 'Expiring Soon', value: '3', icon: 'warning', color: 'text-accent-yellow', bg: 'bg-amber-50 dark:bg-amber-900/20', sub: 'Action Needed', ring: 'ring-accent-yellow/10', isAlert: true },
            { label: 'Safety Score', value: '94%', icon: 'verified_user', color: 'text-primary', bg: 'bg-purple-50 dark:bg-purple-900/20', sub: 'Pantry is healthy', ring: 'ring-primary/10', isProgress: true }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-2xl p-6 bg-surface-card-light dark:bg-surface-card-dark border border-slate-100 dark:border-slate-800 shadow-card dark:shadow-none relative overflow-hidden group hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="absolute right-0 top-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500 rotate-12">
                <span className={`material-symbols-outlined text-9xl ${stat.isProgress ? 'text-primary' : 'text-text-main-light dark:text-white'}`}>{stat.icon}</span>
              </div>
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} ring-1 ${stat.ring}`}>
                  <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
              <div className={`flex ${stat.isAlert ? 'items-baseline gap-3' : 'items-center gap-4'} mt-2`}>
                <p className="text-text-main-light dark:text-text-main-dark text-4xl font-extrabold leading-tight">{stat.value}</p>
                {stat.isAlert && <span className="text-amber-700 dark:text-amber-400 text-[10px] uppercase font-bold bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800/50">{stat.sub}</span>}
                {stat.isProgress && (
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-dark w-[94%] shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                  </div>
                )}
              </div>
              {!stat.isAlert && !stat.isProgress && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
                </div>
              )}
               {stat.isProgress && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
                </div>
              )}
               {stat.isAlert && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Review to reduce waste</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2 p-1.5 bg-white dark:bg-surface-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto max-w-full">
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary text-white pl-4 pr-4 transition-transform active:scale-95 shadow-md shadow-primary/30">
              <p className="text-sm font-bold">All</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 pl-4 pr-4 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-accent-yellow shadow-sm"></span>
              <p className="text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-main-light dark:group-hover:text-white text-sm font-medium">Expiring Soon</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 pl-4 pr-4 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-danger shadow-sm"></span>
              <p className="text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-main-light dark:group-hover:text-white text-sm font-medium">Unsafe</p>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 pl-4 pr-4 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-primary-dark shadow-sm"></span>
              <p className="text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-main-light dark:group-hover:text-white text-sm font-medium">Fresh</p>
            </button>
          </div>
          <button onClick={() => navigate('/scan')} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 border border-primary/20">
            <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            Scan Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="group relative flex flex-col rounded-2xl bg-surface-card-light dark:bg-surface-card-dark border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqVtsOUP9y7cuNVE6WT8eT6-Isy1Dc14mG6eKXf7188ZtZBs0v-luCFBYnuUDtblQn1WxngbGwdcyhpPew_2AzFjnuo26fUXM3q2gVpnwAy-9nW_k7jAr-XZERArHz93FMAYTTmPvIqRdH7h43md-LYv1rVeQBVnuBngIfyT8qVSQdj-CcJa_sc3pDUezkBL0pKuOPRs-bhFcIot5Y9L_Ag0MVgyq3yYlgZO2_QtFeqDwUSagByEjcjCG5gZHLXdQjnuT0T_7F83w")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Fresh</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                    <div>
                        <h3 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight">Fresh Spinach</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Vegetables</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Expires in</span>
                            <span className="text-primary-dark dark:text-primary-soft text-sm font-bold bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">5 days</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                            <div className="h-full bg-primary w-3/4 rounded-full"></div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-text-main-light dark:text-white text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500">
                            Eat Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex flex-col rounded-2xl bg-surface-card-light dark:bg-surface-card-dark border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_P1louIyjYkuCJSWSvtVEvGzgQfqGehYvbzmHKDQvq75RhP86YnQh8Bx6LilAMUkAohGCx8Eu7IvgQ3dyOhmVcOoiOxAijdcvUwPqVBQVI722ToIJBPSu-Jg_X0OeFYKwddkkdz2m1RWnVr486VWDCqRL7XokOSTv9h6Lwu1UN7u3FAhZjam0EwB1w2iysfaox2Z-bdEAgXfZbU6BobezhkvVWzV5HxoeKl-c4wqTrbxNCot40SGWZVtp51K-S6X3VWBesvvtJ_g")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-accent-yellow shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Expiring</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                    <div>
                        <h3 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight">Organic Milk</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Dairy</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Expires in</span>
                            <span className="text-accent-yellow text-sm font-bold bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">2 days</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                            <div className="h-full bg-accent-yellow w-1/4 rounded-full"></div>
                        </div>
                        <button className="flex-1 w-full py-2.5 rounded-xl bg-primary dark:bg-primary-dark text-white text-sm font-bold hover:bg-primary-dark dark:hover:bg-primary shadow-lg shadow-primary/20 transition-all">
                            Use
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Card 3 */}
            <div className="group relative flex flex-col rounded-2xl bg-surface-card-light dark:bg-surface-card-dark border border-red-100 dark:border-red-900/50 shadow-card hover:shadow-red-100/50 dark:hover:shadow-none transition-all duration-300 overflow-hidden grayscale hover:grayscale-0">
                <div className="w-full aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtUGd_KdY_7bpP9Cmz8Q8n16PXuLNeabjqYkuBYrDjfhyT5u8T0D4XvqweU2TVCpum0ukJRVbvYuYZZwlP270LnmlceABE5igrS2AsHUBbDCCMPCwCJu3OdNtnPTZB-Ck5NFSoB-KiQ_ULlw_jjX1w8aEyOhDud63g0VcHztqF6kYNf9ZvmJ4jtMR_D26fGapYdIxBMnUK8BBN1isdttB8B8jbLofemm0uNXN0qpEH_7QdtZRqJSXMOUBCLj2wiYFb5H4M9sVb1sA")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-red-500/30">
                        <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Unsafe</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                    <div>
                        <h3 className="text-text-main-light/80 dark:text-text-main-dark/80 text-lg font-bold leading-tight decoration-red-300 line-through decoration-2">Greek Yogurt</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Dairy</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Status</span>
                            <span className="text-danger text-sm font-bold bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">Expired</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                            <div className="h-full bg-danger w-full rounded-full"></div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-white dark:bg-surface-card-dark border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-danger text-sm font-medium transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-base">delete</span>
                            Discard
                        </button>
                    </div>
                </div>
            </div>

            {/* Card 4 */}
            <div className="group relative flex flex-col rounded-2xl bg-surface-card-light dark:bg-surface-card-dark border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1z3S20VnCZNSwqt57IEiCZu3bOtkrHSfL82zsE4w_26K5yQZF_ImoJsVSrJvdz2eStVpX45tLV4YoGAh71J6IXkQHWWseS1QUPuPrY5U02cKKjqCFYZLo1ZFdZceWiEqPKw2qAU4jRfhCvrOudjktNdzfGWa4FyEhnoVeCB3YetCcRKpZaoouQHxK3NvT7fxhY0EQy34Ft2DNc_zZns5u9dEeYaABF3-KRztZi9a7Yg4DvnJB8cSpERgMRQmgJejFUGYTx2fLqK4")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Fresh</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                    <div>
                        <h3 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight">Avocados (3)</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Produce</p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Expires in</span>
                            <span className="text-primary-dark dark:text-primary-soft text-sm font-bold bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">4 days</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                            <div className="h-full bg-primary w-2/3 rounded-full"></div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-text-main-light dark:text-white text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500">
                            View Recipes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <footer className="mt-16 mb-8 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium gap-2">
            <div className="h-px w-12 bg-slate-300 dark:bg-slate-700"></div>
            <p>© 2025 ValidityVision Hackathon Project</p>
        </footer>
      </div>
    </div>
  );
};

export default Inventory;