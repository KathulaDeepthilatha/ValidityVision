import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
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
            Sign In
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

        <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl mx-auto lg:mx-0 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <header className="mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Simplify Your Pantry.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Seamlessly connect your WhatsApp activity to your personal dashboard to get started.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div onClick={handleSignIn} className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="material-icons-round text-slate-300 dark:text-slate-600 text-4xl group-hover:scale-110 transition-transform">person_add</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">New Here?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">Create a new account using email or social login.</p>
              <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Create Account
              </button>
            </div>

            <div onClick={handleSignIn} className="group p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border-2 border-primary/30 dark:border-primary/20 shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer relative">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-icons-round text-primary text-4xl group-hover:scale-110 transition-transform">whatsapp</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                Have WhatsApp?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">Link your existing activity using your phone number.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Recommended
              </div>
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-8">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or quick link via phone</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="code">Code</label>
                <div className="relative">
                  <input className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-lg rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 text-center font-medium transition-shadow outline-none" id="code" type="text" defaultValue="+1" />
                </div>
              </div>
              <div className="col-span-9">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="phone">WhatsApp Number</label>
                <div className="relative group">
                  <input className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-lg rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 font-medium transition-shadow outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600" id="phone" placeholder="555-0123-4567" type="tel" />
                  <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within:text-primary transition-colors">smartphone</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
              <span className="material-icons-round text-base mt-0.5">info</span>
              <p>We will send a one-time verification code to your WhatsApp.</p>
            </div>
            <button className="w-full bg-primary hover:bg-primary-hover active:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex flex-col sm:flex-row items-center justify-center gap-2 group" type="submit">
              Send Verification Code
              <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <span className="material-icons-round text-primary text-lg">verified_user</span>
              Secure Data
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <span className="material-icons-round text-primary text-lg">bolt</span>
              Instant Sync
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
              <span className="material-icons-round text-primary text-lg">smart_toy</span>
              AI Analysis
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;