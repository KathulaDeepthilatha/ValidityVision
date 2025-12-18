import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import ScanProduct from './pages/ScanProduct';
import ScanResult from './pages/ScanResult';
import Settings from './pages/Settings';

// Context for Sidebar state
export interface SidebarContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}
export const SidebarContext = React.createContext<SidebarContextType>({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => { }
});

// A layout wrapper for authenticated pages
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <SidebarContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu }}>
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-300">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-colors duration-300 z-10">
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';

  // Theme initialization
  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route
        path="/*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/scan" element={<ScanProduct />} />
              <Route path="/scan-result" element={<ScanResult />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;