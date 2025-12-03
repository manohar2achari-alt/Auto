import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSteps = () => {
    const element = document.getElementById('steps');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Never miss an expiry date again
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Automate Azure App Registration <br />
            <span className="text-blue-600">Secret Rotation</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            A comprehensive guide to implementing a "set and forget" strategy for managing Azure App Registration credentials using Azure Automation and Managed Identities.
          </p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={scrollToSteps}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-blue-200 flex items-center gap-2"
            >
              Start Tutorial <ArrowRight size={18} />
            </button>
            <a 
              href="#scripts"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              Get Scripts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};