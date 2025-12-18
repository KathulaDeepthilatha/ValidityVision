import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScanProduct: React.FC = () => {
    const navigate = useNavigate();

    const handleScan = () => {
        // Simulate scan processing
        setTimeout(() => {
            navigate('/scan-result');
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative">
            <header className="w-full px-10 py-8 flex justify-between items-end shrink-0 z-20 relative animate-fade-in">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl text-primary relative">
                            <span className="material-symbols-outlined">center_focus_strong</span>
                        </div>
                        <h2 className="text-text-main-light dark:text-text-main-dark text-3xl font-black leading-tight tracking-[-0.03em]">Scan New Product</h2>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">
                        Point your camera at a barcode, ingredients list, or product label.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-card-dark rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
                        <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">System Ready</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full max-h-[800px]">
                    <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {/* Front Picture Scanner */}
                            <div className="relative bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group cursor-pointer flex flex-col aspect-[4/5] md:aspect-auto" onClick={handleScan}>
                                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1z3S20VnCZNSwqt57IEiCZu3bOtkrHSfL82zsE4w_26K5yQZF_ImoJsVSrJvdz2eStVpX45tLV4YoGAh71J6IXkQHWWseS1QUPuPrY5U02cKKjqCFYZLo1ZFdZceWiEqPKw2qAU4jRfhCvrOudjktNdzfGWa4FyEhnoVeCB3YetCcRKpZaoouQHxK3NvT7fxhY0EQy34Ft2DNc_zZns5u9dEeYaABF3-KRztZi9a7Yg4DvnJB8cSpERgMRQmgJejFUGYTx2fLqK4")', filter: 'blur(4px)', transform: 'scale(1.1)' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                                <div className="absolute inset-8 scanner-overlay opacity-50 z-10 pointer-events-none transition-all duration-500 group-hover:opacity-80 group-hover:inset-6"></div>
                                <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(99,102,241,1)] z-20 animate-scan pointer-events-none"></div>

                                <div className="absolute top-6 left-6 z-30">
                                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <span className="material-symbols-outlined text-white text-sm">photo_camera_front</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Front Picture</span>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rounded-2xl flex items-center justify-center z-10">
                                    <div className="w-full h-full relative">
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary"></div>
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary"></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>
                                    </div>
                                    <span className="absolute -bottom-6 text-white/70 text-[10px] font-medium tracking-wide whitespace-nowrap">Tap to Capture</span>
                                </div>
                            </div>

                            {/* Back Picture Scanner */}
                            <div className="relative bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group cursor-pointer flex flex-col aspect-[4/5] md:aspect-auto" onClick={handleScan}>
                                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_P1louIyjYkuCJSWSvtVEvGzgQfqGehYvbzmHKDQvq75RhP86YnQh8Bx6LilAMUkAohGCx8Eu7IvgQ3dyOhmVcOoiOxAijdcvUwPqVBQVI722ToIJBPSu-Jg_X0OeFYKwddkkdz2m1RWnVr486VWDCqRL7XokOSTv9h6Lwu1UN7u3FAhZjam0EwB1w2iysfaox2Z-bdEAgXfZbU6BobezhkvVWzV5HxoeKl-c4wqTrbxNCot40SGWZVtp51K-S6X3VWBesvvtJ_g")', filter: 'blur(4px)', transform: 'scale(1.1)' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                                <div className="absolute inset-8 scanner-overlay opacity-50 z-10 pointer-events-none transition-all duration-500 group-hover:opacity-80 group-hover:inset-6"></div>
                                <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(96,165,250,1)] z-20 animate-scan pointer-events-none"></div>

                                <div className="absolute top-6 left-6 z-30">
                                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <span className="material-symbols-outlined text-white text-sm">photo_camera_back</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Back Picture</span>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rounded-2xl flex items-center justify-center z-10">
                                    <div className="w-full h-full relative">
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
                                    </div>
                                    <span className="absolute -bottom-6 text-white/70 text-[10px] font-medium tracking-wide whitespace-nowrap">Tap to Capture</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            <button className="group relative flex items-center justify-center gap-3 py-4 px-12 rounded-full bg-white dark:bg-surface-card-dark border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden w-full md:w-auto min-w-[280px]">
                                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                <span className="material-symbols-outlined text-2xl text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">add_photo_alternate</span>
                                <div className="flex flex-col items-start">
                                    <span className="text-text-main-light dark:text-text-main-dark font-bold text-base">Upload Image</span>
                                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-[10px] uppercase tracking-wider">From Gallery</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 animate-slide-in" style={{ animationDelay: '400ms' }}>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20">
                            <div className="absolute -right-10 -bottom-10 opacity-20">
                                <span className="material-symbols-outlined text-[150px]">auto_awesome</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1 relative z-10">AI Recognition</h3>
                            <p className="text-indigo-100 text-sm mb-4 relative z-10">Our enhanced model now detects wider ranges of products instantly.</p>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">nutrition</span> Food
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">face</span> Cosmetics
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">medication</span> Meds
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Recent Scans</h3>
                                <button className="text-xs text-primary font-semibold hover:underline">View All</button>
                            </div>
                            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 -mr-2">
                                <div className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <div className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtUGd_KdY_7bpP9Cmz8Q8n16PXuLNeabjqYkuBYrDjfhyT5u8T0D4XvqweU2TVCpum0ukJRVbvYuYZZwlP270LnmlceABE5igrS2AsHUBbDCCMPCwCJu3OdNtnPTZB-Ck5NFSoB-KiQ_ULlw_jjX1w8aEyOhDud63g0VcHztqF6kYNf9ZvmJ4jtMR_D26fGapYdIxBMnUK8BBN1isdttB8B8jbLofemm0uNXN0qpEH_7QdtZRqJSXMOUBCLj2wiYFb5H4M9sVb1sA")' }}></div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark truncate group-hover:text-primary transition-colors">Greek Yogurt</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Scanned 2m ago</p>
                                    </div>
                                    <div className="ml-auto w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <div className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm group-hover:scale-105 transition-transform relative overflow-hidden">
                                        <div className="absolute inset-0 bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-pink-500 text-xl">face</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark truncate group-hover:text-primary transition-colors">Face Moisturizer</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Scanned 15m ago</p>
                                    </div>
                                    <div className="ml-auto w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <div className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_P1louIyjYkuCJSWSvtVEvGzgQfqGehYvbzmHKDQvq75RhP86YnQh8Bx6LilAMUkAohGCx8Eu7IvgQ3dyOhmVcOoiOxAijdcvUwPqVBQVI722ToIJBPSu-Jg_X0OeFYKwddkkdz2m1RWnVr486VWDCqRL7XokOSTv9h6Lwu1UN7u3FAhZjam0EwB1w2iysfaox2Z-bdEAgXfZbU6BobezhkvVWzV5HxoeKl-c4wqTrbxNCot40SGWZVtp51K-S6X3VWBesvvtJ_g")' }}></div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark truncate group-hover:text-primary transition-colors">Organic Milk</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Scanned 1h ago</p>
                                    </div>
                                    <div className="ml-auto w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
                    <p className="opacity-70 hover:opacity-100 transition-opacity">© 2025 ValidityVision Hackathon Project</p>
                </footer>
            </div>
        </div>
    );
};

export default ScanProduct;