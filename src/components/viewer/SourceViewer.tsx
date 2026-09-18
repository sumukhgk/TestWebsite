import { useState } from "react";
import { Code2, Check, Copy, Terminal, FileCode } from "lucide-react";
import type { SourceFile, ControlSchema } from "../../types";

interface SourceViewerProps {
  sourceFiles: SourceFile[];
  controls: ControlSchema[];
  slug: string;
  name: string;
}

export default function SourceViewer({
  sourceFiles,
  controls,
  slug,
  name,
}: SourceViewerProps) {
  const [activeTab, setActiveTab] = useState<"code" | "props" | "usage">("code");
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = sourceFiles[selectedFileIdx] || sourceFiles[0];

  const usageSnippet = `import { Canvas } from "@react-three/fiber";
import { ${name.replace(/\s+/g, "")} } from "./components/3d/${activeFile?.filename || "Component"}.tsx";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <${name.replace(/\s+/g, "")} />
      </Canvas>
    </div>
  );
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveCodeText = () => {
    if (activeTab === "code") return activeFile?.code || "";
    if (activeTab === "usage") return usageSnippet;
    if (activeTab === "props") return JSON.stringify(controls, null, 2);
    return "";
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 light:border-slate-200">
      {/* Header Bar with Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/80 light:bg-slate-100 border-b border-slate-800/80 light:border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "code"
                ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
          <button
            onClick={() => setActiveTab("props")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "props"
                ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Props Schema</span>
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "usage"
                ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Usage Guide</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={() => copyToClipboard(getActiveCodeText())}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 light:bg-slate-200 text-slate-200 light:text-slate-800 hover:bg-slate-700 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-96">
        <pre>
          <code>{getActiveCodeText()}</code>
        </pre>
      </div>
    </div>
  );
}
