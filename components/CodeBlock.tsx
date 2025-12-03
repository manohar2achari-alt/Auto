import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-[#1e1e1e] shadow-md group">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded bg-white/10 hover:bg-white/20 text-white/80 transition-colors backdrop-blur-sm border border-white/10"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono text-slate-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};