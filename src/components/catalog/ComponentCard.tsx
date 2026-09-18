import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";
import type { ComponentEntry } from "../../types";
import ComponentRenderer from "../3d/ComponentRenderer";

interface ComponentCardProps {
  entry: ComponentEntry;
}

export default function ComponentCard({ entry }: ComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const defaultProps = entry.variants[0]?.props || {};

  return (
    <Link
      to={`/components/${entry.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl glass-panel border border-slate-800/80 light:border-slate-200 overflow-hidden hover:border-slate-700 light:hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1"
    >
      {/* 3D Canvas Preview Window */}
      <div className="relative w-full h-56 bg-slate-950/80 overflow-hidden flex items-center justify-center">
        {/* Glow backdrop behind preview */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${entry.thumbnailColor || '#38bdf8'} 0%, transparent 70%)`
          }}
        />

        {/* Live 3D Component */}
        <ComponentRenderer
          slug={entry.slug}
          props={defaultProps}
          interactive={false}
          className="w-full h-full"
        />

        {/* Floating Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold glass-pill text-slate-200 light:text-slate-800 border border-white/10 shadow-sm backdrop-blur-md">
            {entry.category}
          </span>
        </div>

        {/* View Component Button Hover Overlay */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 rounded-xl bg-sky-500 text-slate-950 shadow-lg font-bold flex items-center gap-1 text-xs">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-slate-900/40 light:bg-slate-50/50">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-lg font-bold text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors">
              {entry.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed">
            {entry.description}
          </p>
        </div>

        {/* Variants Count & Tags */}
        <div className="pt-2 border-t border-slate-800/60 light:border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>{entry.variants.length} visual variants</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {entry.tags[0] ? `#${entry.tags[0]}` : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}
