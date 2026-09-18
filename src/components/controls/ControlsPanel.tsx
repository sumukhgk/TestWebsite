import { Sliders, RotateCcw } from "lucide-react";
import type { ControlSchema } from "../../types";

interface ControlsPanelProps {
  controls: ControlSchema[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}

export default function ControlsPanel({
  controls,
  values,
  onChange,
  onReset,
}: ControlsPanelProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 light:border-slate-200 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 light:border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 light:text-slate-800">
            Live Controls
          </h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800/50 light:hover:bg-slate-100"
          title="Reset controls to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4">
        {controls.map((control) => {
          const currentValue = values[control.key] ?? control.defaultValue;

          return (
            <div key={control.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-slate-300 light:text-slate-700">
                  {control.label}
                </label>
                {control.type === "slider" && (
                  <span className="font-mono text-[11px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                    {typeof currentValue === "number" ? currentValue.toFixed(control.step && control.step < 1 ? 2 : 0) : currentValue}
                  </span>
                )}
              </div>

              {/* Slider Input */}
              {control.type === "slider" && (
                <input
                  type="range"
                  min={control.min ?? 0}
                  max={control.max ?? 100}
                  step={control.step ?? 1}
                  value={currentValue as number}
                  onChange={(e) => onChange(control.key, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              )}

              {/* Color Picker Input */}
              {control.type === "color" && (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentValue as string}
                    onChange={(e) => onChange(control.key, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={currentValue as string}
                    onChange={(e) => onChange(control.key, e.target.value)}
                    className="flex-1 bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-lg px-3 py-1 text-xs font-mono text-slate-200 light:text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              )}

              {/* Toggle Input */}
              {control.type === "toggle" && (
                <button
                  type="button"
                  onClick={() => onChange(control.key, !currentValue)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                    currentValue
                      ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                      : "bg-slate-900/60 light:bg-slate-100 text-slate-400 border-slate-800 light:border-slate-200"
                  }`}
                >
                  <span>{currentValue ? "Enabled" : "Disabled"}</span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                    currentValue ? "bg-sky-500" : "bg-slate-700"
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      currentValue ? "translate-x-4" : "translate-x-0"
                    }`} />
                  </div>
                </button>
              )}

              {/* Select Input */}
              {control.type === "select" && (
                <select
                  value={currentValue as string}
                  onChange={(e) => onChange(control.key, e.target.value)}
                  className="w-full bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 light:text-slate-800 focus:outline-none focus:border-sky-500"
                >
                  {control.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
