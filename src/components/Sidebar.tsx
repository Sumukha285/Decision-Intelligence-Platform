import React from 'react';
import { DomainData, DomainId } from '../types';
import * as Icons from 'lucide-react';

interface SidebarProps {
  domains: DomainData[];
  selectedDomainId: DomainId | 'overview';
  onSelectDomain: (id: DomainId | 'overview') => void;
  cityHealthIndex: number;
}

export default function Sidebar({
  domains,
  selectedDomainId,
  onSelectDomain,
  cityHealthIndex,
}: SidebarProps) {
  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, className: string = 'w-4 h-4') => {
    const IconComponent = (Icons as any)[iconName] || (Icons as any)[iconName.replace(/Circle$/, '')] || (Icons as any)[`Circle${iconName}`];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    const Fallback = Icons.CircleHelp || Icons.HelpCircle || Icons.Activity;
    return Fallback ? <Fallback className={className} /> : <span className={className}>ℹ️</span>;
  };

  // Group domains by category
  const categories = Array.from(new Set(domains.map((d) => d.category)));

  // Simple status indicators based on domain average health
  const getDomainStatusColor = (domain: DomainData) => {
    const criticalCount = domain.metrics.filter((m) => m.status === 'critical').length;
    const warningCount = domain.metrics.filter((m) => m.status === 'warning').length;
    if (criticalCount > 0) return 'bg-red-500 animate-pulse';
    if (warningCount > 0) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <aside id="sidebar-panel" className="w-80 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 h-screen select-none shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
          <Icons.Brain className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-sans font-bold tracking-tight text-white text-lg">CivicMind</h1>
          <p className="font-sans text-[10px] text-slate-400 font-medium tracking-widest uppercase">Decision Intelligence</p>
        </div>
      </div>

      {/* Global Health Index Bar */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/40">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-sans text-xs text-slate-400 font-medium">City-Wide Health Score</span>
          <span className="font-mono text-sm font-bold text-blue-400">{cityHealthIndex}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-500"
            style={{ width: `${cityHealthIndex}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500">
          <Icons.Activity className="w-3.5 h-3.5 text-slate-400" />
          <span>Real-time predictive forecasting active</span>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {/* Core Control */}
        <div>
          <button
            id="nav-overview"
            onClick={() => onSelectDomain('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
              selectedDomainId === 'overview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Icons.LayoutDashboard className="w-5 h-5" />
            <span>Executive Command Center</span>
          </button>
        </div>

        {/* Categorized Domain Navigation */}
        {categories.map((category) => (
          <div key={category} className="space-y-1.5">
            <h3 className="px-4 font-sans text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {category}
            </h3>
            <div className="space-y-0.5">
              {domains
                .filter((d) => d.category === category)
                .map((domain) => {
                  const isActive = selectedDomainId === domain.id;
                  return (
                    <button
                      key={domain.id}
                      id={`nav-${domain.id}`}
                      onClick={() => onSelectDomain(domain.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-sans text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-slate-800 text-white border-l-4 border-blue-500 pl-3'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                          {renderIcon(domain.iconName, 'w-4.5 h-4.5')}
                        </span>
                        <span className="truncate max-w-[150px]">{domain.name}</span>
                      </div>
                      <span className={`w-1.5 h-1.5 rounded-full ${getDomainStatusColor(domain)}`} />
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-800 text-center bg-slate-950/20">
        <p className="font-sans text-[10px] text-slate-500">
          Responsible AI Certified Platform
        </p>
      </div>
    </aside>
  );
}
