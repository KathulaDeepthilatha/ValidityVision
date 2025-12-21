import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    // State for profile
    const [displayName, setDisplayName] = useState(localStorage.getItem('username') || "User");
    const [avatarType, setAvatarType] = useState<'boy' | 'girl'>(localStorage.getItem('avatarType') as 'boy' | 'girl' || 'boy');

    // State for preferences
    const [preferences, setPreferences] = useState({
        pushNotifications: true,
        weeklyDigest: false,
        soundEffects: true
    });

    // State for security
    const [passwords, setPasswords] = useState({
        new: "",
        confirm: ""
    });

    // Handlers
    const handlePreferenceChange = (key: keyof typeof preferences) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handlePasswordChange = (key: keyof typeof passwords, value: string) => {
        setPasswords(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        if (passwords.new || passwords.confirm) {
            if (passwords.new !== passwords.confirm) {
                alert("Passwords do not match!");
                return;
            }
            if (passwords.new.length < 8) {
                alert("Password must be at least 8 characters.");
                return;
            }
        }

        // Save profile changes
        localStorage.setItem('username', displayName);
        localStorage.setItem('avatarType', avatarType);

        // Simulate API call
        console.log("Saving settings:", { displayName, avatarType, preferences, passwordUpdated: !!passwords.new });

        // Check and send notifications if enabled (Simulated)
        if (preferences.pushNotifications) {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                // This logic was in previous version, keeping it simple for restoration
                console.log(`Checking expiry notifications for ${userEmail}`);
            }
        }

        alert("Settings saved successfully!");
        setPasswords({ new: "", confirm: "" });
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            alert("Account deletion scheduled. We're sad to see you go!");
            // In a real app, this would trigger a deletion API call and logout
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            navigate('/');
        }
    };

    const avatarUrl = avatarType === 'boy' ? '/assets/boy_avatar.png' : '/assets/girl_avatar.png';

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500 z-10">
            <header className="w-full px-4 md:px-10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 z-20 relative animate-fade-in gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-text-main-light dark:text-text-main-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Account Settings</h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm md:text-base font-normal">Manage your preferences, profile details, and security settings.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleLogout}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-text-secondary-light dark:text-text-secondary-dark border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">logout</span>
                        Logout
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 rounded-xl px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="material-symbols-outlined text-[20px] relative z-10">save</span>
                        <span className="relative z-10">Save Changes</span>
                    </button>
                </div>
            </header>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 scrollbar-hide z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-8">
                        <div className="bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-card relative overflow-hidden animate-fade-in group hover:shadow-hover transition-all duration-500" style={{ animationDelay: '100ms' }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent-orange rounded-full blur-md opacity-40 animate-pulse"></div>
                                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-700">
                                        <img alt="Profile" className="w-full h-full object-cover" src={avatarUrl} />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 flex gap-2 z-20 scale-90">
                                        <button
                                            onClick={() => setAvatarType('boy')}
                                            className={`w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-lg overflow-hidden transition-all bg-white dark:bg-slate-800 ${avatarType === 'boy' ? 'ring-2 ring-primary scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'}`}
                                            title="Select Boy Avatar"
                                        >
                                            <img src="/assets/boy_avatar.png" alt="Boy" className="w-full h-full object-cover" />
                                        </button>
                                        <button
                                            onClick={() => setAvatarType('girl')}
                                            className={`w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-lg overflow-hidden transition-all bg-white dark:bg-slate-800 ${avatarType === 'girl' ? 'ring-2 ring-pink-500 scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'}`}
                                            title="Select Girl Avatar"
                                        >
                                            <img src="/assets/girl_avatar.png" alt="Girl" className="w-full h-full object-cover" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-1">{displayName || 'User'}</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">{localStorage.getItem('userEmail') || 'nani@validityvision.com'}</p>
                                <div className="w-full space-y-4">
                                    <div className="input-group group text-left">
                                        <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">Display Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                                    <span className="material-symbols-outlined text-[20px]">badge</span>
                                                </div>
                                            </div>
                                            <input
                                                className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white"
                                                placeholder="Enter your name"
                                                type="text"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                <button
                                    onClick={handleDeleteAccount}
                                    className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-danger border border-red-200 dark:border-red-900/50 hover:bg-red-500 hover:text-white transition-all text-sm font-bold shadow-sm hover:shadow-lg hover:shadow-red-500/30 whitespace-nowrap active:scale-95"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-col gap-8">
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
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.pushNotifications}
                                            onChange={() => handlePreferenceChange('pushNotifications')}
                                        />
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
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.weeklyDigest}
                                            onChange={() => handlePreferenceChange('weeklyDigest')}
                                        />
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
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.soundEffects}
                                            onChange={() => handlePreferenceChange('soundEffects')}
                                        />
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
                                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Change Password</h3>
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
                                        <input
                                            className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white"
                                            placeholder="Min 8 chars"
                                            type="password"
                                            value={passwords.new}
                                            onChange={(e) => handlePasswordChange('new', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-group group text-left">
                                    <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide mb-2 transition-colors">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <div className="icon-box p-1.5 rounded-lg text-slate-400 transition-colors duration-300">
                                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                            </div>
                                        </div>
                                        <input
                                            className="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-inner-glow dark:text-white"
                                            placeholder="Repeat password"
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                        />
                                    </div>
                                </div>
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