import React, { useState, useEffect } from 'react';
import { DOMAINS } from './data/domains';
import { DomainId } from './types';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import VisionLab from './components/VisionLab';
import ConversationalAgent from './components/ConversationalAgent';
import WorkflowAutomation from './components/WorkflowAutomation';
import * as Icons from 'lucide-react';

export default function App() {
  const [selectedDomainId, setSelectedDomainId] = useState<DomainId | 'overview'>('overview');
  const [geminiActive, setGeminiActive] = useState<boolean | null>(null);

  // Fetch Gemini connection status from the backend
  useEffect(() => {
    fetch('/api/gemini/status')
      .then((res) => res.json())
      .then((data) => setGeminiActive(data.active))
      .catch(() => setGeminiActive(false));
  }, []);
  
  // Maintain a nested dictionary of slider values per domain, initialized with defaults from DOMAINS catalog
  const [sliderState, setSliderState] = useState<{ [domainId: string]: { [sliderId: string]: number } }>(() => {
    const initial: { [domainId: string]: { [sliderId: string]: number } } = {};
    DOMAINS.forEach((domain) => {
      initial[domain.id] = {};
      domain.sliders.forEach((slider) => {
        initial[domain.id][slider.id] = slider.value;
      });
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<'forecast' | 'vision' | 'chat' | 'workflow'>('forecast');
  const [cityHealthIndex, setCityHealthIndex] = useState(74);

  // Compute overall City Health Index based on active slider positions relative to optimal targets
  useEffect(() => {
    let baseScore = 74; // Starting baseline health index
    
    DOMAINS.forEach((domain) => {
      let domainImpact = 0;
      domain.sliders.forEach((slider) => {
        const activeVal = sliderState[domain.id]?.[slider.id] ?? slider.value;
        const defaultVal = slider.value;
        const range = slider.max - slider.min || 1;
        const offset = (activeVal - defaultVal) / range;
        
        // Positive offset generally improves city well-being except for restrictive limits (handled simply)
        domainImpact += offset * 1.5; 
      });
      baseScore += domainImpact;
    });

    // Clamp score strictly between 10 and 100
    const finalScore = Math.min(100, Math.max(10, Math.round(baseScore)));
    setCityHealthIndex(finalScore);
  }, [sliderState]);

  // Handler for adjusting individual sliders in predictive modeling
  const handleSliderChange = (domainId: string, sliderId: string, value: number) => {
    setSliderState((prev) => ({
      ...prev,
      [domainId]: {
        ...prev[domainId],
        [sliderId]: value,
      },
    }));
  };

  // Handler for applying complete scenario presets
  const handleApplyScenario = (domainId: string, sliderValues: { [key: string]: number }) => {
    setSliderState((prev) => ({
      ...prev,
      [domainId]: {
        ...prev[domainId],
        ...sliderValues,
      },
    }));
  };

  const selectedDomain = DOMAINS.find((d) => d.id === selectedDomainId);

  // Helper to dynamically render Lucide icons in headers
  const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const IconComponent = (Icons as any)[iconName] || (Icons as any)[iconName.replace(/Circle$/, '')] || (Icons as any)[`Circle${iconName}`];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    const Fallback = Icons.CircleHelp || Icons.HelpCircle || Icons.Activity;
    return Fallback ? <Fallback className={className} /> : <span className={className}>ℹ️</span>;
  };

  return (
    <div id="application-container" className="flex h-screen w-screen overflow-hidden bg-slate-50 select-none">
      {/* 1. Sidebar Nav & Categorized Groups */}
      <Sidebar
        domains={DOMAINS}
        selectedDomainId={selectedDomainId}
        onSelectDomain={(id) => {
          setSelectedDomainId(id);
          setActiveTab('forecast'); // Reset tabs back to forecasting when switching domains
        }}
        cityHealthIndex={cityHealthIndex}
      />

      {/* 2. Primary Layout Space */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {selectedDomainId === 'overview' ? (
          /* EXECUTIVE COMMAND CENTER VIEW */
          <Overview
            domains={DOMAINS}
            onSelectDomain={(id) => setSelectedDomainId(id)}
            cityHealthIndex={cityHealthIndex}
          />
        ) : (
          /* WORKSPACE PLATFORM FOR SELECTED ADMIN DOMAIN */
          selectedDomain && (
            <div id={`workspace-${selectedDomain.id}`} className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Workspace Top Header (Status Gauges and Category) */}
              <div className="p-6 bg-white border-b border-slate-200 shadow-sm shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 p-1.5 bg-slate-100 rounded-lg">
                        {renderIcon(selectedDomain.iconName, 'w-5 h-5 text-blue-600')}
                      </span>
                      <h2 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight">
                        {selectedDomain.name} Workspace
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                        {selectedDomain.category}
                      </span>
                      {geminiActive === true && (
                        <span className="font-sans text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Gemini Active
                        </span>
                      )}
                      {geminiActive === false && (
                        <span className="font-sans text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Gemini Offline
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="font-sans text-xs text-slate-500 max-w-2xl leading-normal">
                    {selectedDomain.summary}
                  </p>
                </div>

                {/* Primary Metric Gauges */}
                <div className="flex items-center gap-3 shrink-0">
                  {selectedDomain.metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]"
                    >
                      <span className="font-sans text-[9px] text-slate-400 font-bold uppercase block">
                        {metric.name}
                      </span>
                      <span className={`font-mono text-xs font-bold ${
                        metric.status === 'critical' ? 'text-red-600' :
                        metric.status === 'warning' ? 'text-amber-500' : 'text-slate-700'
                      }`}>
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offline Warning Alert Banner */}
              {geminiActive === false && (
                <div className="bg-amber-50/70 border-b border-amber-100 px-6 py-2.5 flex items-start gap-2.5 text-amber-800 text-[11px] font-sans shrink-0">
                  {(() => {
                    const AlertComponent = Icons.CircleAlert || Icons.AlertCircle || Icons.Info;
                    return AlertComponent ? <AlertComponent className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> : null;
                  })()}
                  <div className="space-y-0.5">
                    <span className="font-bold">Gemini API is running in mock fallback mode.</span>
                    <p className="text-amber-700 leading-normal">
                      To activate live computer vision audits, real conversational reasoning, and custom policy drafting, please configure your <strong className="font-mono">GEMINI_API_KEY</strong> in the <strong>Settings &gt; Secrets</strong> menu (top right of your workspace).
                    </p>
                  </div>
                </div>
              )}

              {/* Workspace Navigation Tabs (4 Core Modules) */}
              <div className="bg-white border-b border-slate-200 px-6 py-1.5 shrink-0 flex items-center gap-1">
                <button
                  id="tab-forecast"
                  onClick={() => setActiveTab('forecast')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'forecast'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icons.TrendingUp className="w-4 h-4" />
                  <span>Predictive & Forecasting</span>
                </button>

                <button
                  id="tab-vision"
                  onClick={() => setActiveTab('vision')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'vision'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icons.Camera className="w-4 h-4" />
                  <span>Computer Vision Lab</span>
                </button>

                <button
                  id="tab-chat"
                  onClick={() => setActiveTab('chat')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'chat'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icons.Brain className="w-4 h-4" />
                  <span>Conversational Advisor</span>
                </button>

                <button
                  id="tab-workflow"
                  onClick={() => setActiveTab('workflow')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'workflow'
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icons.FileText className="w-4 h-4" />
                  <span>Workflow Automation</span>
                </button>
              </div>

              {/* Render Selected Module inside scrolling region */}
              <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                {activeTab === 'forecast' && (
                  <PredictiveAnalytics
                    domain={selectedDomain}
                    activeSliders={sliderState[selectedDomain.id] || {}}
                    onSliderChange={(sliderId, val) => handleSliderChange(selectedDomain.id, sliderId, val)}
                    onApplyScenario={(sliderVals) => handleApplyScenario(selectedDomain.id, sliderVals)}
                  />
                )}
                {activeTab === 'vision' && <VisionLab domain={selectedDomain} />}
                {activeTab === 'chat' && <ConversationalAgent domain={selectedDomain} />}
                {activeTab === 'workflow' && (
                  <WorkflowAutomation
                    domain={selectedDomain}
                    activeSliders={sliderState[selectedDomain.id] || {}}
                  />
                )}
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
