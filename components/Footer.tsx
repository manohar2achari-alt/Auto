import React from 'react';
import { Mail, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h5 className="text-white font-bold text-lg mb-2">Azure Secret Automator</h5>
            <p className="text-sm max-w-sm">
              Helping DevOps engineers sleep better at night by removing manual credential management toil.
            </p>
          </div>
          <div className="flex md:justify-end gap-6">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail size={18} />
              <span>contact@example.com</span>
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Azure Secret Automator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};