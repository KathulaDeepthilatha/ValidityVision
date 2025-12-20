import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const isInventoryPage = location.pathname === '/inventory';

  // Initialize theme state based on DOM or localStorage
  const [isDark, setIsDark] = React.useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const setTheme = (theme: 'light' | 'dark') => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    }
  };

  const menuItems = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/scan', icon: 'barcode_scanner', label: 'Scan Product' },
    { path: '/inventory', icon: 'inventory_2', label: 'Pantry' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button - Hidden on Inventory Page */}
      {!isInventoryPage && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-6 right-6 z-50 p-2.5 bg-white dark:bg-surface-card-dark rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-text-main-light dark:text-text-main-dark transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        ></div>
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 h-full w-72 
        bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-xl 
        flex flex-col border-r border-slate-200 dark:border-slate-800 
        shadow-xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 flex items-center gap-4 animate-slide-in">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl size-11 shadow-lg shadow-primary/30 flex items-center justify-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="material-symbols-outlined relative z-10 text-[26px]">dataset</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-main-light dark:text-text-main-dark text-xl font-bold leading-tight tracking-tight">ValidityVision</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium uppercase tracking-widest mt-0.5">Pantry Manager</p>
          </div>
        </div>

        <div className="px-6 py-2 flex-1">
          <p className="text-xs font-bold text-text-secondary-light/60 dark:text-text-secondary-dark/60 uppercase tracking-wider mb-4 px-4 animate-slide-in" style={{ animationDelay: '100ms' }}>Main Menu</p>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive: linkActive }) => `
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group animate-slide-in relative overflow-hidden
                    ${isActive || linkActive
                      ? 'bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-soft font-semibold shadow-sm'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-text-main-light dark:hover:text-text-main-dark'
                    }
                  `}
                  style={{ animationDelay: `${200 + index * 50}ms` }}
                >
                  {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
                  <span className={`material-symbols-outlined ${isActive ? 'filled' : ''} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium">{item.label}</p>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20 backdrop-blur-md animate-fade-in">
          <div className="flex items-center justify-between mb-6 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full relative">
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold z-10 relative transition-all duration-300 cursor-pointer ${!isDark ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              onClick={() => setTheme('light')}
            >
              <span className="material-symbols-outlined text-[18px]">light_mode</span>
              <span className="hidden lg:inline">Light</span>
            </div>
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold z-10 relative transition-all duration-300 cursor-pointer ${isDark ? 'bg-slate-800 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              onClick={() => setTheme('dark')}
            >
              <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              <span className="hidden lg:inline">Dark</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:scale-[1.02] border border-slate-200 dark:border-slate-700 shadow-sm group">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-slate-100 dark:ring-slate-700 shadow-sm group-hover:ring-primary/50 transition-all"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaJgw7RZUqVODu7alZtmmjrC5Q_VpUuwqO7XSEGk2gnFL84TExeG1RjPLQx8X1pSsju_lcY7dkAyonIH6Z747SZrCTi4q3EV4QxKp-9_jSJhSjKa_0r0U8VIYszpVZREuiobbF1s0bw9HdRgQrMJLivdzJW_zT4QylNjX_MBmDFv7jOOcFrydPumdv_MEz3mqH4eQoPQeiedNnLesbg2IlxqsmyzJd82PEtrnVO24Ab6WBm1RFN4lg3kcwxBQo8URrL5bsPGvw7lQ")' }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-text-main-light dark:text-text-main-dark text-sm font-bold leading-none truncate group-hover:text-primary transition-colors">Nani</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-1 truncate">Premium Plan</p>
            </div>
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark ml-auto text-lg group-hover:text-primary transition-colors">more_vert</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;