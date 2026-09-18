import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Search, Sun, Moon, Github, Sparkles, SlidersHorizontal } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-sky-500/30 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[11px] flex items-center justify-center">
              <Box className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-white dark:to-slate-300 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent">
                ThreeUI
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                v1.0
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:inline">
              WebGL Component Showcase
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className={`relative flex items-center rounded-xl transition-all duration-200 ${
            isFocus 
              ? 'ring-2 ring-sky-500/50 bg-slate-900/90 light:bg-slate-100' 
              : 'bg-slate-900/60 light:bg-slate-100/80 hover:bg-slate-900/80'
          } border border-slate-800/80 light:border-slate-200`}>
            <Search className="w-4 h-4 ml-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 3D components, shaders, tags..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                navigate("/");
              }}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              className="w-full py-2 pl-3 pr-9 bg-transparent text-sm text-slate-200 light:text-slate-800 placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Component Count Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-pill text-xs font-medium text-slate-300 light:text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>4 Interactive Components</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* GitHub Repository */}
          <a
            href="https://github.com/MengTo/threeui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
