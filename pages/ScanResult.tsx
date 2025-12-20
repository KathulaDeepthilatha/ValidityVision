import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ScanResult: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { frontImage, backImage, product } = location.state || {}; // Retrieve images or product from state
    const [activeView, setActiveView] = useState<'front' | 'back'>('front');

    // Determine the image to show. Default to dynamic frontImage, fallback to product image, then static if missing.
    const displayImage = activeView === 'front'
        ? (frontImage || product?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBNFXHO5f6c8EtrXHfQPE0BQszR5UlL0HQEcqQdZtxAs-bW6Ikwr2DIR9uynLlpznJ0TKjOPF8XEroQK0GBEyZmCSOFZGZvzAjZSZ6WaRdXYZYgBjCbcPqb7Q5ub_8SvU2ovEL4jz_MqZWz8S1RjYI8eplc8eWTtRXd5Chf89cBYLyeoOWJLi3r18T-swZLAkLaUdsMxVXq_eAa6MJl8_kvqVPFzB_3P0hgRHRUGxWZyPvKtH0TMdzH2KGVSbNKWIEHZ8dI3T_sh3s")
        : (backImage || frontImage || product?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBNFXHO5f6c8EtrXHfQPE0BQszR5UlL0HQEcqQdZtxAs-bW6Ikwr2DIR9uynLlpznJ0TKjOPF8XEroQK0GBEyZmCSOFZGZvzAjZSZ6WaRdXYZYgBjCbcPqb7Q5ub_8SvU2ovEL4jz_MqZWz8S1RjYI8eplc8eWTtRXd5Chf89cBYLyeoOWJLi3r18T-swZLAkLaUdsMxVXq_eAa6MJl8_kvqVPFzB_3P0hgRHRUGxWZyPvKtH0TMdzH2KGVSbNKWIEHZ8dI3T_sh3s");

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-light relative overflow-y-auto">
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px]"></div>
            </div>

            <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="w-full max-w-[1200px] flex flex-col gap-6">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="glass-panel rounded-2xl overflow-hidden shadow-glow border border-slate-200 group relative transition-transform duration-500 hover:scale-[1.01]">
                                <div className="aspect-square w-full bg-cover bg-center relative" style={{ backgroundImage: `url("${displayImage}")` }}>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>

                                    {/* Image Toggle Controls - Only show if we actually have images or are testing */}
                                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveView('front'); }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md transition-all ${activeView === 'front' ? 'bg-primary text-white shadow-lg' : 'bg-white/20 text-white/80 hover:bg-white/30'}`}
                                        >
                                            Front
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveView('back'); }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md transition-all ${activeView === 'back' ? 'bg-primary text-white shadow-lg' : 'bg-white/20 text-white/80 hover:bg-white/30'}`}
                                        >
                                            Back
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <p className="text-accent-purple text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <span className="size-1.5 bg-accent-purple rounded-full animate-pulse"></span>
                                            {product?.category || "Dairy Alternatives"}
                                        </p>
                                        <h1 className="text-white text-3xl font-display font-bold leading-tight mb-1 drop-shadow-lg">{product?.name || "Organic Almond Milk"}</h1>
                                        <p className="text-white/80 text-sm font-medium">Nature's Best</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel rounded-2xl p-6 border border-slate-200 shadow-card bg-white">
                                <h3 className="text-text-main-light text-lg font-display font-bold mb-5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    Key Dates
                                </h3>
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-center p-4 bg-background-light rounded-xl border border-slate-200 hover:border-primary/30 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-text-secondary-light text-[11px] uppercase tracking-wider font-semibold">Expiry Date</span>
                                            <span className="text-text-main-light font-mono font-medium text-xl tracking-tight">Oct 24, 2024</span>
                                        </div>
                                        <div className="text-right">
                                            {product?.daysLeft !== undefined ? (
                                                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border shadow-[0_0_10px_rgba(0,0,0,0.1)] ${product.daysLeft <= 2 ? "text-red-600 bg-red-100 border-red-200" : "text-accent-purple bg-purple-100/50 border-purple-200"}`}>
                                                    {product.daysLeft} Days Left
                                                </span>
                                            ) : (
                                                <span className="inline-block text-accent-purple text-xs font-bold bg-purple-100/50 border border-purple-200 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.1)]">14 Days Left</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-text-secondary-light text-sm font-medium">Manufactured</span>
                                        <span className="text-text-main-light text-sm font-mono opacity-90">Oct 01, 2024</span>
                                    </div>
                                    <hr className="border-slate-200" />
                                    <button className="w-full flex items-center justify-center gap-2 bg-text-main-light hover:bg-slate-800 border border-transparent text-white py-3 rounded-xl transition-all duration-300 text-sm font-medium group shadow-md hover:shadow-lg">
                                        <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">notifications_active</span>
                                        Set Expiry Reminder
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-background-light text-text-secondary-light hover:text-text-main-light py-2.5 rounded-xl transition-all text-sm font-medium group">
                                            <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">edit</span>
                                            Edit Details
                                        </button>
                                        <button onClick={() => navigate('/scan')} className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-background-light text-text-secondary-light hover:text-text-main-light py-2.5 rounded-xl transition-all text-sm font-medium group">
                                            <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">qr_code_scanner</span>
                                            Rescan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-primary/20 shadow-glow relative overflow-hidden group bg-white">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-accent-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"></div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                            </span>
                                            <span className="text-primary text-xs font-bold tracking-widest uppercase">Analysis Complete</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main-light tracking-tight drop-shadow-sm">Safe to Consume</h2>
                                        <p className="text-text-secondary-light text-base leading-relaxed max-w-lg">
                                            No harmful ingredients or allergens detected based on your profile settings. This {product ? product.name.toLowerCase() : 'product'} is a <span className="text-text-main-light font-semibold">perfect match</span> for your diet.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="relative size-32 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_4px_8px_rgba(99,102,241,0.2)]">
                                                <circle cx="50%" cy="50%" fill="transparent" r="42%" stroke="#e2e8f0" strokeWidth="6"></circle>
                                                <circle cx="50%" cy="50%" fill="transparent" r="42%" stroke="#6366f1" strokeDasharray="264" strokeDashoffset="10" strokeLinecap="round" strokeWidth="6"></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-display font-bold text-text-main-light tracking-tight">98</span>
                                                <span className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">Score</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-white text-text-secondary-light text-xs border border-slate-200 flex items-center gap-2 transition-colors hover:border-primary/30 hover:text-text-main-light cursor-default font-medium">
                                            <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> No Allergens
                                        </span>
                                        <span className="px-4 py-1.5 rounded-full bg-white text-text-secondary-light text-xs border border-slate-200 flex items-center gap-2 transition-colors hover:border-primary/30 hover:text-text-main-light cursor-default font-medium">
                                            <span className="material-symbols-outlined text-[16px] text-primary">spa</span> Vegan Friendly
                                        </span>
                                    </div>
                                    <button className="flex-1 md:flex-none md:min-w-[200px] h-12 bg-gradient-to-r from-primary to-primary-dark hover:to-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                        <span className="material-symbols-outlined">inventory_2</span>
                                        Add to Pantry
                                    </button>
                                </div>
                            </div>

                            <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden flex flex-col bg-white">
                                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
                                    <h3 className="text-text-main-light text-lg font-display font-bold flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-accent-purple">science</span>
                                        Ingredient Analysis
                                    </h3>
                                    <button className="text-xs text-primary font-medium hover:text-accent-purple transition-colors flex items-center gap-1 group">
                                        View Full Label
                                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary mt-1 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                                                <span className="material-symbols-outlined">health_and_safety</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-text-main-light font-medium text-lg mb-1">Safe Ingredients</h4>
                                                <p className="text-text-secondary-light text-sm mb-4">Core components verified as safe and nutritious.</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        'Almond Base', 'Filtered Water', 'Vitamin D2', 'Calcium Carbonate'
                                                    ].map((ing, i) => (
                                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 font-medium">
                                                            {ing} <span className="size-1.5 rounded-full bg-primary shadow-[0_0_5px_#818cf8]"></span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500 mt-1 shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                                                <span className="material-symbols-outlined">info</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="text-text-main-light font-medium text-lg">Additives & Stabilizers</h4>
                                                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded tracking-wide">Review</span>
                                                </div>
                                                <p className="text-text-secondary-light text-sm mb-4">Generally safe, but may cause sensitivity in large quantities.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500/30 transition-colors">
                                                        <span className="text-sm text-slate-700 font-medium">Gellan Gum</span>
                                                        <span className="material-symbols-outlined text-text-secondary-light text-[18px] cursor-help hover:text-text-main-light" title="Thickening agent">help</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500/30 transition-colors">
                                                        <span className="text-sm text-slate-700 font-medium">Sunflower Lecithin</span>
                                                        <span className="material-symbols-outlined text-text-secondary-light text-[18px] cursor-help hover:text-text-main-light" title="Emulsifier">help</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-center">
                                    <div className="flex items-center gap-3 opacity-90">
                                        <span className="material-symbols-outlined text-primary">verified_user</span>
                                        <p className="text-sm text-primary-dark font-medium">No flagged allergens or harmful additives detected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-sm py-8 mt-auto z-10">
                <div className="px-10 text-center flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-text-secondary-light opacity-80">
                        <span className="size-1.5 rounded-full bg-primary"></span>
                        <span className="text-xs font-medium uppercase tracking-widest">System Operational</span>
                    </div>
                    <p className="text-text-secondary-light text-sm">© 2025 ValidityVision Hackathon Project</p>
                </div>
            </footer>
        </div>
    );
};

export default ScanResult;