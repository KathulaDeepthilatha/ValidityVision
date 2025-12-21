import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInventoryPage = location.pathname === '/inventory';
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const menuItems = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/scan', icon: 'barcode_scanner', label: 'Scan Product' },
    { path: '/inventory', icon: 'inventory_2', label: 'Pantry' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate('/');
    }
    setIsProfileMenuOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/settings');
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button - Hidden on Inventory Page */}
      {!isInventoryPage && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-6 right-6 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-slate-200 text-text-main-light transition-transform active:scale-95"
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
        bg-surface-light/90 backdrop-blur-xl 
        flex flex-col border-r border-slate-200 
        shadow-xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 flex items-center gap-4 animate-slide-in">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl size-11 shadow-lg shadow-primary/30 flex items-center justify-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="material-symbols-outlined relative z-10 text-[26px]">dataset</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-main-light text-xl font-bold leading-tight tracking-tight">ValidityVision</h1>
            <p className="text-text-secondary-light text-xs font-medium uppercase tracking-widest mt-0.5">Pantry Manager</p>
          </div>
        </div>

        <div className="px-6 py-2 flex-1">
          <p className="text-xs font-bold text-text-secondary-light/60 uppercase tracking-wider mb-4 px-4 animate-slide-in" style={{ animationDelay: '100ms' }}>Main Menu</p>
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
                      ? 'bg-primary/10 text-primary-dark font-semibold shadow-sm'
                      : 'text-text-secondary-light hover:bg-slate-100 hover:text-text-main-light'
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

        <div className="mt-auto p-6 border-t border-slate-200 bg-white/50 backdrop-blur-md animate-fade-in">
          <div className="relative">
            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileMenuOpen(false)}
                ></div>
                <div className="absolute bottom-full right-0 mb-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-20 animate-scale-in origin-bottom-right">
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-sm font-medium text-text-main-light"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">person</span>
                    Profile
                  </button>
                  <div className="h-px bg-slate-100"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-sm font-medium text-red-500"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Logout
                  </button>
                </div>
              </>
            )}

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-white transition-all hover:scale-[1.02] border border-slate-200 shadow-sm group relative z-10">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-slate-100 shadow-sm group-hover:ring-primary/50 transition-all"
                style={{ backgroundImage: `url("${localStorage.getItem('avatarType') === 'girl' ? '/assets/girl_avatar.png' : '/assets/boy_avatar.png'}")` }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <p className="text-text-main-light text-sm font-bold leading-none truncate group-hover:text-primary transition-colors">{localStorage.getItem('username') || 'User'}</p>
                <p className="text-text-secondary-light text-xs mt-1 truncate">{localStorage.getItem('userEmail') || 'nani@validityvision.com'}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
                className="ml-auto p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-text-secondary-light text-lg group-hover:text-primary transition-colors">more_vert</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;