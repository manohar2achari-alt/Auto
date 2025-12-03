import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8 border-l-4 border-blue-600 pl-4">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-lg text-slate-500 mt-1">{subtitle}</p>
      </div>
      {children}
    </section>
  );
};