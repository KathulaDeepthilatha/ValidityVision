import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500 z-10">
      <header className="w-full px-10 py-8 flex justify-between items-end shrink-0 z-20 relative animate-fade-in">
        <div className="flex flex-col gap-2">
            <h2 className="text-text-main-light dark:text-text-main-dark text-4xl font-black leading-tight tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Account Settings</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">Manage your preferences, profile details, and security settings.</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-secondary-light dark:text-text-secondary-dark border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">help</span>
                Help
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 rounded-xl px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="material-symbols-outlined text-[20px] relative z-10">save</span>
                <span className="relative z-10">Save Changes</span>
            </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-card relative overflow-hidden animate-fade-in group hover:shadow-hover transition-all duration-500" style={{ animationDelay: '100ms' }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent-orange rounded-full blur-md opacity-40 animate-pulse"></div>
                            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden relative z-10">
                                <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaJgw7RZUqVODu7alZtmmjrC5Q_VpUuwqO7XSEGk2gnFL84TExeG1RjPLQx8X1pSsju_lcY7dkAyonIH6Z747SZrCTi4q3EV4QxKp-9_jSJhSjKa_0r0U8VIYszpVZREuiobbF1s0bw9HdRgQrMJLivdzJW_zT4QylNjX_MBmDFv7jOOcFrydPumdv_MEz3mqH4eQoPQeiedNnLesbg2IlxqsmyzJd82PEtrnVO24Ab6WBm1RFN4lg3kcwxBQo8URrL5bsPGvw7lQ" />
                            </div>
                            <button className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg border-4 border-white dark:border-slate-800 hover:scale-110 hover:bg-primary-dark transition-all z-20 group/btn">
                                <span className="material-symbols-outlined text-[18px] group-hover/btn:rotate-90 transition-transform duration-300">edit</span>
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-1">Nani</h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">nani@validityvision.com</p>
                        <div className="w-full space-y-4">
                            <div className="input-group group text-left">
                                <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">Display Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </div>
                                    </div>
                                    <input className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white" placeholder="Enter your name" type="text" defaultValue="Nani" />
                                </div>
                            </div>
                            <div className="input-group group text-left">
                                <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">Bio</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                        <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                            <span className="material-symbols-outlined text-[20px]">description</span>
                                        </div>
                                    </div>
                                    <textarea className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white resize-none" placeholder="A brief description..." rows={3} defaultValue="Food enthusiast & sustainability advocate."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-indigo-900 dark:to-slate-900 rounded-3xl p-8 shadow-xl relative overflow-hidden animate-fade-in group hover:-translate-y-1 transition-transform duration-500" style={{ animationDelay: '200ms' }}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
                    <div className="relative z-10 text-white">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                <span className="material-symbols-outlined text-2xl text-accent-yellow">diamond</span>
                            </div>
                            <span className="px-3 py-1 bg-gradient-to-r from-accent-yellow to-orange-500 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">Premium</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-2">Pro Plan Active</h4>
                        <p className="text-slate-400 text-sm mb-6">Your subscription renews on <span className="text-white font-medium">Nov 24, 2023</span>.</p>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Unlimited Product Scans
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Advanced Analytics
                            </div>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-50 transition-colors shadow-lg active:scale-95">Manage Subscription</button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-card animate-fade-in relative overflow-hidden" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-2xl">
                            <span className="material-symbols-outlined text-2xl">tune</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">App Preferences</h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Customize your experience</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">Push Notifications</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Expiry alerts</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">Weekly Digest</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Summary via email</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">volume_up</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">Sound Effects</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">In-app sounds</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-card animate-fade-in relative overflow-hidden" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-2xl">
                            <span className="material-symbols-outlined text-2xl">lock</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Security & Login</h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Protect your account</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="input-group group text-left">
                            <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[20px]">key</span>
                                    </div>
                                </div>
                                <input className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white" placeholder="••••••••" type="password" />
                            </div>
                        </div>
                        <div className="input-group group text-left">
                            <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                    </div>
                                </div>
                                <input className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white" placeholder="••••••••" type="password" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-primary">
                                <span className="material-symbols-outlined">phonelink_lock</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Two-Factor Authentication</h4>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Add an extra layer of security</p>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">Enable</button>
                    </div>
                </div>

                <div className="bg-red-50/50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/30 shadow-sm animate-fade-in group hover:border-red-200 transition-colors" style={{ animationDelay: '500ms' }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-danger rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">warning</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Danger Zone</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-md">Once you delete your account, there is no going back. Please be certain.</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-danger border border-red-200 dark:border-red-900/50 hover:bg-red-500 hover:text-white transition-all text-sm font-bold shadow-sm hover:shadow-lg hover:shadow-red-500/30 whitespace-nowrap active:scale-95">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <footer className="mt-16 mb-8 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
            <p className="opacity-70 hover:opacity-100 transition-opacity">© 2025 ValidityVision Hackathon Project</p>
        </footer>
      </div>
    </div>
  );
};

export default Settings;