import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { CodeBlock } from './components/CodeBlock';
import { 
  ShieldAlert, 
  Clock, 
  RefreshCw, 
  Server, 
  Key, 
  Workflow, 
  CheckCircle2, 
  Terminal,
  Mail,
  ExternalLink
} from 'lucide-react';
import { SCRIPTS } from './utils/constants';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // Simple scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'how-it-works', 'steps', 'scripts'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} />
      
      <main className="flex-grow pt-16">
        <Hero />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
          
          {/* Overview Section */}
          <Section id="overview" title="Overview" subtitle="Why automate secret rotation?">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 text-red-600">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">The Problem</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Client secrets in Azure App Registrations have a fixed expiration. When they expire, applications relying on them immediately fail, causing production outages that are often hard to diagnose quickly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                  <Clock size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Manual Risk</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tracking hundreds of secrets in spreadsheets or calendars is error-prone. One missed reminder can lead to critical service downtime and emergency fire-drills for operations teams.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <RefreshCw size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">The Solution</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Leverage Azure Automation to proactively scan for expiring secrets, automatically generate new ones, update Key Vaults, and notify administrators before impact occurs.
                </p>
              </div>
            </div>
          </Section>

          {/* How It Works Section */}
          <Section id="how-it-works" title="How It Works" subtitle="Architecture & Workflow">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 space-y-8 bg-slate-50 border-r border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200 text-blue-600 mt-1">
                      <Server size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">1. Azure Automation Account</h4>
                      <p className="text-sm text-slate-600 mt-1">Acts as the orchestrator. It uses a System Managed Identity to authenticate securely against Microsoft Graph without storing its own credentials.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200 text-purple-600 mt-1">
                      <Key size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">2. Managed Identity Permissions</h4>
                      <p className="text-sm text-slate-600 mt-1">The identity is granted <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">Application.ReadWrite.All</code> permissions, allowing it to read expiration dates and add new secrets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200 text-emerald-600 mt-1">
                      <Workflow size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">3. Runbook Logic</h4>
                      <p className="text-sm text-slate-600 mt-1">A PowerShell script runs daily. It checks all apps. If a secret expires in &lt;14 days, it creates a new one and optionally pushes it to Azure Key Vault.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex items-center justify-center bg-white">
                  {/* Simplified Diagram Representation */}
                  <div className="relative w-full max-w-sm">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2 hidden md:block"></div>
                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Trigger</span>
                        <div className="font-semibold text-slate-800">Daily Schedule</div>
                      </div>
                      <div className="flex justify-center text-slate-400">↓</div>
                      <div className="bg-slate-800 text-white p-4 rounded-lg text-center shadow-lg">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Runbook</span>
                        <div className="font-semibold">Check & Renew Script</div>
                      </div>
                      <div className="flex justify-center text-slate-400">↓</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center">
                          <div className="font-semibold text-emerald-800 text-sm">New Secret</div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
                          <div className="font-semibold text-amber-800 text-sm">Email Alert</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Steps Section */}
          <Section id="steps" title="Step-by-Step Guide" subtitle="Implementation Details">
            <div className="space-y-4">
              {[
                {
                  title: "Create Azure Automation Account",
                  desc: "Provision a new Automation Account in your management subscription. Enable 'System Assigned Managed Identity' during creation.",
                  icon: <Server size={18} />
                },
                {
                  title: "Assign Graph API Permissions",
                  desc: "The Managed Identity needs 'Application.ReadWrite.All' to manage secrets. This must be assigned via PowerShell or CLI as the Portal does not support assigning Graph permissions to Managed Identities directly.",
                  icon: <Terminal size={18} />
                },
                {
                  title: "Import Modules",
                  desc: "In the Automation Account, go to 'Modules' and import 'Microsoft.Graph.Authentication' and 'Microsoft.Graph.Applications'.",
                  icon: <ExternalLink size={18} />
                },
                {
                  title: "Create Runbook",
                  desc: "Create a new PowerShell 5.1 Runbook. Paste the detection/renewal script provided in the Scripts section below.",
                  icon: <Workflow size={18} />
                },
                {
                  title: "Schedule & Monitor",
                  desc: "Link the Runbook to a Schedule (e.g., Daily at 6 AM). Use the Kusto query to monitor the automation jobs.",
                  icon: <CheckCircle2 size={18} />
                }
              ].map((step, idx) => (
                <div key={idx} className="group flex gap-4 bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      {step.title}
                      <span className="text-slate-400 group-hover:text-blue-500 transition-colors">{step.icon}</span>
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Scripts Section */}
          <Section id="scripts" title="Scripts" subtitle="PowerShell & Kusto Resources">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Terminal size={18} className="text-blue-600"/>
                    PowerShell Runbook: Detect & Renew
                  </h4>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">PowerShell 5.1</span>
                </div>
                <CodeBlock code={SCRIPTS.powershell} language="powershell" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Terminal size={18} className="text-purple-600"/>
                    Kusto Query: Monitor Expiration
                  </h4>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">KQL</span>
                </div>
                <CodeBlock code={SCRIPTS.kusto} language="kusto" />
              </div>
            </div>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}