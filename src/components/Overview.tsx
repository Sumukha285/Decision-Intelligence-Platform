import React from 'react';
import { DomainData, DomainId } from '../types';
import * as Icons from 'lucide-react';

interface OverviewProps {
  domains: DomainData[];
  onSelectDomain: (id: DomainId) => void;
  cityHealthIndex: number;
}

export default function Overview({ domains, onSelectDomain, cityHealthIndex }: OverviewProps) {
  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const IconComponent = (Icons as any)[iconName] || (Icons as any)[iconName.replace(/Circle$/, '')] || (Icons as any)[`Circle${iconName}`];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    const Fallback = Icons.CircleHelp || Icons.HelpCircle || Icons.Activity;
    return Fallback ? <Fallback className={className} /> : <span className={className}>ℹ️</span>;
  };

  // Compile urgent alerts based on metrics marked as 'critical'
  const urgentAlerts = domains.flatMap((domain) =>
    domain.metrics
      .filter((m) => m.status === 'critical')
      .map((m) => ({
        domainId: domain.id,
        domainName: domain.name,
        metricName: m.name,
        value: `${m.value}${m.unit}`,
        desc: m.description,
        icon: domain.iconName
      }))
  );

  return (
    <div id="overview-dashboard" className="p-8 space-y-8 bg-slate-50 min-h-screen overflow-y-auto w-full">
      {/* Top Welcome Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="font-sans font-bold text-2xl text-slate-900 tracking-tight">Executive Command Center</h2>
          <p className="font-sans text-sm text-slate-500">
            Real-time urban modeling, multi-modal computer vision anomalies, and automated decision drafting.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-semibold text-slate-600">Simulations Calibrated: 2026</span>
        </div>
      </div>

      {/* Hero Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric Card 1: City Health */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 select-none">
            <Icons.Brain className="w-56 h-56" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-sans text-xs text-slate-400 font-bold uppercase tracking-wider">Overall Well-being Index</span>
            <Icons.Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-sans font-black text-5xl tracking-tight">{cityHealthIndex}</span>
            <span className="font-sans text-lg text-slate-400">/ 100</span>
          </div>
          <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4">
            A weighted aggregation across environmental air quality indices, healthcare accessibility thresholds, transit capacities, and citizen feedback scores.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-emerald-400">
            <Icons.TrendingUp className="w-3.5 h-3.5" />
            <span>Optimal Range Calibrated (+1.4% change)</span>
          </div>
        </div>

        {/* Metric Card 2: AI Vision Surveillance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-sans text-xs text-slate-500 font-bold uppercase tracking-wider">Vision Lab Feeds</span>
              <Icons.Camera className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-sans font-bold text-3xl text-slate-900">4 Active</span>
              <span className="font-sans text-xs text-slate-500">Presites Loaded</span>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Live edge-surveillance cameras are deployed tracking pedestrian flows, recycle bins, structural seawalls, and solar configurations with zero privacy leaks.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold text-slate-400">Live Diagnostics</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg font-bold">100% Real Multimodal AI</span>
          </div>
        </div>

        {/* Metric Card 3: Automated Actions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-sans text-xs text-slate-500 font-bold uppercase tracking-wider">Workflow Output</span>
              <Icons.FileText className="w-5 h-5 text-violet-500" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-sans font-bold text-3xl text-slate-900">12 Scenarios</span>
              <span className="font-sans text-xs text-slate-500">Draft Templates</span>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Instant generation of policy circulars, warnings, and alerts with fully compliant, explainable Trust Cards mapping demographic equity and safety.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold text-slate-400">Responsible AI Compliance</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-bold">Bias Screened</span>
          </div>
        </div>
      </div>

      {/* Urgent Operational Alerts */}
      {urgentAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-red-800">
            {(() => {
              const AlertTriangleComponent = Icons.TriangleAlert || Icons.AlertTriangle || Icons.Info;
              return AlertTriangleComponent ? <AlertTriangleComponent className="w-5 h-5 animate-bounce" /> : null;
            })()}
            <h3 className="font-sans font-bold text-sm tracking-tight">Urgent Municipal Anomalies Requiring Attention</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentAlerts.map((alert, idx) => (
              <div
                key={idx}
                onClick={() => onSelectDomain(alert.domainId)}
                className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-start gap-3 cursor-pointer hover:border-red-300 transition-all"
              >
                <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
                  {renderIcon(alert.icon, 'w-4 h-4')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-sans text-xs font-bold text-slate-800">{alert.domainName}</span>
                    <span className="font-sans text-[10px] text-red-500 bg-red-50 px-1.5 py-0.2 rounded font-semibold uppercase">Critical</span>
                  </div>
                  <h4 className="font-sans text-xs text-slate-600 font-medium">
                    {alert.metricName} registered at <strong className="text-red-600">{alert.value}</strong>
                  </h4>
                  <p className="font-sans text-[10px] text-slate-400 mt-1 line-clamp-1">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Bento Grid of All 12 Domains */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-sans font-bold text-lg text-slate-900 tracking-tight">Municipal Operations & Infrastructure Bento Grid</h3>
          <span className="font-sans text-xs text-slate-500 font-semibold uppercase tracking-wider">Click card to open workspace</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {domains.map((domain) => {
            const warningCount = domain.metrics.filter((m) => m.status === 'warning').length;
            const criticalCount = domain.metrics.filter((m) => m.status === 'critical').length;
            
            let statusBadge = (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {(() => {
                  const CheckComponent = Icons.CircleCheck || Icons.CheckCircle || Icons.Activity;
                  return CheckComponent ? <CheckComponent className="w-3 h-3" /> : null;
                })()}
                <span>Stable</span>
              </span>
            );
            if (criticalCount > 0) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 animate-pulse">
                  {(() => {
                    const AlertComponent = Icons.TriangleAlert || Icons.AlertTriangle || Icons.Info;
                    return AlertComponent ? <AlertComponent className="w-3 h-3" /> : null;
                  })()}
                  <span>Anomalies</span>
                </span>
              );
            } else if (warningCount > 0) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Icons.Info className="w-3 h-3" />
                  <span>Review</span>
                </span>
              );
            }

            return (
              <div
                key={domain.id}
                id={`bento-card-${domain.id}`}
                onClick={() => onSelectDomain(domain.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl border border-slate-200 text-slate-700 transition-colors shrink-0">
                      {renderIcon(domain.iconName, 'w-5 h-5')}
                    </div>
                    {statusBadge}
                  </div>

                  {/* Info */}
                  <h4 className="font-sans font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">
                    {domain.name}
                  </h4>
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    {domain.category}
                  </span>
                  <p className="font-sans text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {domain.summary}
                  </p>
                </div>

                {/* Primary Spark Indicators */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
                  <div className="truncate max-w-[130px]">
                    <span className="text-slate-500">{domain.metrics[0].name}</span>
                  </div>
                  <span className={`font-mono font-bold ${
                    domain.metrics[0].status === 'critical' ? 'text-red-500' :
                    domain.metrics[0].status === 'warning' ? 'text-amber-500' : 'text-slate-700'
                  }`}>
                    {domain.metrics[0].value}{domain.metrics[0].unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Platform Tutorial & Quick Start Walkthrough */}
      <div id="platform-tutorial-guide" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Icons.BookOpen className="w-5 h-5" />
            <h3 className="font-sans font-bold text-lg text-slate-900 tracking-tight">Platform Guide & Decision Walkthrough</h3>
          </div>
          <p className="font-sans text-xs text-slate-500">
            Welcome to the Decision Intelligence Platform. Follow this step-by-step tutorial to run predictions, audit computer vision streams, and draft policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-mono text-xs font-bold border border-blue-100">
                1
              </span>
              <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Select a Domain</h4>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Browse the <strong>Municipal Bento Grid</strong> above. Domains highlighted with red or amber badges indicate operational warnings or critical anomalies (e.g., Transit Congestion, Flood Risk). Click any card to launch its dedicated workspace.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono text-xs font-bold border border-indigo-100">
                2
              </span>
              <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Run Predictions</h4>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              In the <strong>Predictive & Forecasting Tab</strong>, adjust the policy input parameters using sliders. Observe how the 12-month trend forecasts update in real-time, simulating how policy weights impact municipal outcomes over the year.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono text-xs font-bold border border-emerald-100">
                3
              </span>
              <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Audit CCTV Vision</h4>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Switch to the <strong>Computer Vision Lab</strong>. Select a live municipal camera preset or drag-and-drop a scene screenshot. Hit the <strong>Multimodal Intelligent Diagnostic Sweep</strong> to run a live analysis for safety anomalies.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center font-mono text-xs font-bold border border-violet-100">
                4
              </span>
              <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Draft & Consult</h4>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Use the <strong>Conversational Advisor</strong> to query reference data, or go to the <strong>Workflow Automation</strong> tab to generate policy circulars. Review the AI Trust Card to audit reasoning models, safety compliance, and demographic equity.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3 items-start">
            <Icons.HeartHandshake className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-sans text-xs font-bold text-slate-800 block">Responsible AI & Demographic Equity Notice</span>
              <p className="font-sans text-[11px] text-slate-500">
                Every AI output displays transparency scores and demographic checks. No user personal identifiers are logged.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectDomain('mobility')}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all shrink-0"
          >
            Launch Mobility Sandbox &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
