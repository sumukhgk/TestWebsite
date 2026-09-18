import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Layers, Maximize2, Minimize2, Sparkles, AlertCircle } from "lucide-react";
import { componentCatalog } from "../data/componentCatalog";
import ComponentRenderer from "../components/3d/ComponentRenderer";
import ControlsPanel from "../components/controls/ControlsPanel";
import SourceViewer from "../components/viewer/SourceViewer";

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const entry = componentCatalog.find((item) => item.slug === slug);

  // Selected variant ID state
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  // Current active live prop values state
  const [controlValues, setControlValues] = useState<Record<string, any>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (entry) {
      const defaultVariant = entry.variants[0];
      if (defaultVariant) {
        setSelectedVariantId(defaultVariant.id);
        // Initialize control values from default variant props or control default values
        const initialProps: Record<string, any> = {};
        entry.controls.forEach((ctrl) => {
          initialProps[ctrl.key] = defaultVariant.props[ctrl.key] ?? ctrl.defaultValue;
        });
        setControlValues(initialProps);
      }
    }
  }, [entry, slug]);

  if (!entry) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Component Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested 3D component with slug "{slug}" does not exist in the catalog.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-semibold hover:bg-sky-500/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  // Handle variant change
  const handleVariantSelect = (variantId: string) => {
    const variant = entry.variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariantId(variantId);
      const newProps: Record<string, any> = { ...controlValues };
      Object.keys(variant.props).forEach((key) => {
        newProps[key] = variant.props[key];
      });
      setControlValues(newProps);
    }
  };

  // Handle individual control input change
  const handleControlChange = (key: string, value: any) => {
    setControlValues((prev) => ({ ...prev, [key]: value }));
  };

  // Reset controls to entry default values
  const handleReset = () => {
    const initialProps: Record<string, any> = {};
    entry.controls.forEach((ctrl) => {
      initialProps[ctrl.key] = ctrl.defaultValue;
    });
    setControlValues(initialProps);
    if (entry.variants[0]) {
      setSelectedVariantId(entry.variants[0].id);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb Navigation & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors px-3 py-1.5 rounded-xl glass-pill"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Catalog</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20">
            {entry.category}
          </span>
          <span className="text-slate-500 font-mono">/components/{entry.slug}</span>
        </div>
      </div>

      {/* Component Title & Variant Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{entry.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {entry.description}
          </p>
        </div>

        {/* Visual Variant Picker */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 light:bg-slate-100 p-1.5 rounded-2xl border border-slate-800/80 light:border-slate-200">
          <span className="text-xs font-medium text-slate-400 px-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Variants:</span>
          </span>
          {entry.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleVariantSelect(variant.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedVariantId === variant.id
                  ? "bg-sky-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-200"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Live Canvas & Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Live 3D Viewport (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`relative rounded-3xl glass-panel border border-slate-800/80 overflow-hidden bg-slate-950 transition-all ${
            isFullscreen ? "fixed inset-4 z-50 rounded-2xl" : "h-[450px] sm:h-[500px]"
          }`}>
            {/* Ambient Background Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${entry.thumbnailColor || '#38bdf8'} 0%, transparent 70%)`
              }}
            />

            {/* Canvas Action Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-medium text-slate-300">
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>Drag to rotate • Scroll to zoom</span>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Component Renderer */}
            <ComponentRenderer
              slug={entry.slug}
              props={controlValues}
              interactive={true}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Sidebar Controls Panel (1 Column) */}
        <div className="lg:col-span-1">
          <ControlsPanel
            controls={entry.controls}
            values={controlValues}
            onChange={handleControlChange}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Tabbed Source Code & Usage Guide */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-200">Implementation & Source Code</h2>
        <SourceViewer
          sourceFiles={entry.sourceFiles}
          controls={entry.controls}
          slug={entry.slug}
          name={entry.name}
        />
      </div>
    </div>
  );
}
