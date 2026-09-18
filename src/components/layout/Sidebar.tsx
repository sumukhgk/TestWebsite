import { Layers, Sparkles, Box, Activity, Grid } from "lucide-react";

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  totalCount,
}: SidebarProps) {
  const categories = [
    { name: "All", icon: Grid },
    { name: "Backgrounds", icon: Sparkles },
    { name: "Shaders", icon: Layers },
    { name: "Geometric", icon: Box },
    { name: "Audio & Grid", icon: Activity },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 light:border-slate-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-2">
          Categories
        </h3>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            const count = cat.name === "All" ? totalCount : categoryCounts[cat.name] || 0;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isSelected
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm shadow-sky-500/10 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 light:hover:bg-slate-100"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-sky-400" : "text-slate-500"}`} />
                  <span>{cat.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected
                  ? "bg-sky-500/20 text-sky-300"
                  : "bg-slate-800/60 light:bg-slate-200 text-slate-400"
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
