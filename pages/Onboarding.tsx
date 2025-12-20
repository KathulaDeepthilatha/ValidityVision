import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🚀 Sending Login Request to backend...');
      console.log('Payload:', JSON.stringify(formData, null, 2));

      const response = await fetch('http://10.10.23.28:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('✅ Response status:', response.status);
    } catch (e) {
      console.warn("⚠️ Backend request failed (this is expected if no server is running on port 3000).");
      console.warn("Error details:", e);
    }

    localStorage.setItem('username', formData.username);
    setIsLoading(false);
    setShowModal(false);
    navigate('/home');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col transition-colors duration-300">
      <nav className="w-full px-6 py-4 flex items-center justify-between z-50 animate-fade-in">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <span className="material-icons-round text-primary text-3xl transition-transform group-hover:rotate-12 duration-300">auto_awesome</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">ValidityVision</span>
        </div>
        <div className="flex items-center gap-6">
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Help</a>
          <button onClick={handleSignIn} className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5">
            Register
          </button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 lg:px-8 py-4 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="hidden lg:block lg:col-span-5 h-[calc(100vh-140px)] min-h-[600px] relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-black/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <img alt="Hand scanning groceries with smartphone" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] hover:scale-110 ease-linear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLop_icuqrVLDxqtGlnBMYaLMY8c-eGCTEe5y7e6alJ9QQAtSx7Rfuw1787Ub6fa23eMXar6s55h4VVzVOLL64SzGwVvSLlYMy57gn8RvFEbg3uVFpEeSfDUG8gZPTtVZ2E3DZzS7HEM1r-KWlaCaHQuvh34FM2vEujlHobSx8Paut8rcvfsNQ3kORKZDELu9B0rE24oyRA1uuSkEQAYwQIKhkKbhOEI8IgfN2Z9ivrKvASdoQmOJ2WlQXrmJsvnBDQAg-JVfPIA8" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-indigo-900/50 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons-round text-indigo-300 animate-pulse-slow">qr_code_scanner</span>
              <span className="text-xs font-bold tracking-widest text-indigo-200 uppercase">AI Powered Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Scan. Track.<br />Relax.
            </h1>
            <p className="text-indigo-100/90 text-lg font-medium leading-relaxed max-w-sm">
              Your smart pantry assistant is ready to help you reduce waste and eat safer.
            </p>
          </div>
        </div>


        <div className="lg:col-span-7 flex flex-col justify-center items-start lg:pl-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">AI Powered Pantry Tracker</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 dark:from-indigo-400 dark:to-primary">ValidityVision</span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-lg">
            Join thousands of users who are saving money and reducing waste. Sign in to sync your inventory across devices.
          </p>

          <button
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:border-primary dark:hover:border-primary transition-all duration-300 flex items-center justify-center gap-4 group mb-12"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Sign in with Google</span>
          </button>

          {/* Feature Tabs/Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors group cursor-default">
              <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-primary">
                <span className="material-icons-round text-xl">verified_user</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Safety First</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Instant ingredient analysis</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-accent-orange/50 dark:hover:border-accent-orange/50 transition-colors group cursor-default">
              <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-accent-orange">
                <span className="material-icons-round text-xl">timer</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Expiry Tracker</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Smart notifications</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-colors group cursor-default">
              <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-green-500">
                <span className="material-icons-round text-xl">devices</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Sync</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Access everywhere</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sign In Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-slate-200 dark:border-slate-700 scale-100 animate-scale-in relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <span className="material-icons-round text-slate-500">close</span>
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-icons-round text-3xl">person_add</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h3>
              <p className="text-slate-500 dark:text-slate-400">Sign up to access inventory</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium dark:text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium dark:text-white"
                  placeholder="hello@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Register</span>
                    <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;