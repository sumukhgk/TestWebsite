import { useState, useMemo } from "react";
import { Sparkles, Search, Layers, Box } from "lucide-react";
import { componentCatalog } from "../data/componentCatalog";
import ComponentCard from "../components/catalog/ComponentCard";
import Sidebar from "../components/layout/Sidebar";

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function HomePage({ searchQuery, setSearchQuery }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    componentCatalog.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter catalog items by search query and category
  const filteredCatalog = useMemo(() => {
    return componentCatalog.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800/80 p-8 sm:p-12">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-0 w-96 h-96 glow-gradient-cyan pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 glow-gradient-violet pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-sky-500/30 text-sky-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Source WebGL & React Three Fiber Library</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Production-Ready <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
              Interactive 3D Components
            </span>
          </h1>

          <p className="text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed">
            Copy-paste high performance shaders, particle fields, geometric objects, and audio visualizers. Built with React Three Fiber, Three.js, and Tailwind CSS.
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-sky-400" />
              <span className="font-semibold text-white">{componentCatalog.length} Components</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-white">12 Visual Variants</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white">Live Controls Panel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Browse Layout (Sidebar + Grid) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          totalCount={componentCatalog.length}
        />

        <main className="flex-1 w-full space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>{selectedCategory === "All" ? "All Components" : selectedCategory}</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {filteredCatalog.length}
              </span>
            </h2>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-sky-400"
              >
                Clear search query "{searchQuery}"
              </button>
            )}
          </div>

          {/* Grid View */}
          {filteredCatalog.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCatalog.map((entry) => (
                <ComponentCard key={entry.slug} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">No components found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No 3D component matches your search query or filter. Try searching for "particles", "shader", or "geometric".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-semibold hover:bg-sky-500/30 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
