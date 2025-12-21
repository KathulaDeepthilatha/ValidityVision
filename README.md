<div align="center">

  # ValidityVision
  
  **Smart AI Expiry tracking and safety consultant**
  
  <p>
    Scan product, track expiration dates, and analyze ingredients instantly.
    <br />
    <em>"Know Your Pantry, Trust Your Safety."</em>
  </p>

  <a href="#key-features">Key Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a>
</div>

<br />

## 📖 About The Project

**ValidityVision** is a modern web application designed to help households reduce food waste and ensure product safety. Built for the **2025 ValidityVision Hackathon**, this application acts as a smart digital pantry.

By leveraging simulated AI recognition, it allows users to scan product labels to get instant insights into shelf life, ingredient safety (allergens, vegan status), and nutritional value.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **📸 Smart Scanning** | Interface for scanning product labels to instantly identify items. |
| **🥦 Inventory Management** | Visual dashboard to track what you have, organized by Fresh, Expiring, and Unsafe statuses. |
| **⚠️ Safety Analysis** | Detailed breakdown of ingredients, flagging harmful additives or allergens based on user profile. |
| **⏰ Expiry Tracking** | Automatic calculation of expiration dates with visual progress bars and alerts. |
| **🌗 Dark Mode** | Fully responsive interface with a system-aware Dark Mode. |
| **📱 Responsive Design** | Optimized for both desktop, tab and mobile web experiences. |

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** (comes with Node.js)

### Installation

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/ramii17/Agentathon_ValidityVision
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    npm install react-router-dom
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Click the link shown in the terminal (usually `http://localhost:5173`).

---

## 🛠️ Tech Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Icons:** [Google Material Symbols](https://fonts.google.com/icons)

---

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