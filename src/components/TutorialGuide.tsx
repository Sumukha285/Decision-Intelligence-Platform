import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface TutorialGuideProps {
  onLaunchDomain: (domainId: 'mobility' | 'safety' | 'healthcare') => void;
}

export default function TutorialGuide({ onLaunchDomain }: TutorialGuideProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Interactive mock simulation state for the step-by-step tutorial
  const [practiceSlider, setPracticeSlider] = useState<number>(5);
  const [visionAnalyzed, setVisionAnalyzed] = useState<boolean>(false);
  const [visionScanning, setVisionScanning] = useState<boolean>(false);
  const [trustRevealed, setTrustRevealed] = useState<boolean>(false);

  // Computed practice metrics based on practice slider
  const computedPracticeDelay = Math.max(12, 45 - practiceSlider * 4.5);
  const computedPracticeSatisfaction = Math.min(98, 62 + practiceSlider * 3.5);

  const steps = [
    {
      title: "1. The Predictive Analytics Engine",
      icon: "TrendingUp",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "text-blue-500",
      description: "Learn how the Policy Input parameters shape 12-month future trajectories."
    },
    {
      title: "2. The Computer Vision Lab",
      icon: "Camera",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      iconColor: "text-indigo-500",
      description: "Perform real-time safety sweeps on live municipal streams with privacy guards."
    },
    {
      title: "3. Conversational AI Grounding",
      icon: "Brain",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconColor: "text-emerald-500",
      description: "Engage with statutory RAG (Retrieval-Augmented) municipal reference manuals."
    },
    {
      title: "4. The AI Trust Card & Audits",
      icon: "ShieldCheck",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      iconColor: "text-violet-500",
      description: "Verify confidence indexes, reasoning models, and demographic equity."
    }
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const runPracticeSweep = () => {
    setVisionScanning(true);
    setTimeout(() => {
      setVisionScanning(false);
      setVisionAnalyzed(true);
    }, 1500);
  };

  const renderStepIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div id="interactive-academy-container" className="max-w-5xl mx-auto space-y-8">
      {/* Academy Jumbotron Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute left-1/3 bottom-0 w-80 h-48 bg-indigo-500/5 rounded-full blur-2xl" />

        <div className="relative space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider">
            <Icons.GraduationCap className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Academy</span>
          </span>
          <h2 className="font-sans font-extrabold text-3xl tracking-tight leading-none text-white">
            CivicMind Platform Masterclass
          </h2>
          <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-2xl">
            This step-by-step interactive walkthrough trains public administrators and analysts in the core intelligence loops of the CivicMind platform. Practice making decisions below to unlock full competence.
          </p>
        </div>
      </div>

      {/* Grid of Steps Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((st, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveStep(idx);
                // Reset practice sub-states on step swap
                setVisionAnalyzed(false);
                setTrustRevealed(false);
              }}
              className={`p-4 text-left rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'border-blue-600 bg-white shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20 text-slate-900'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-slate-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`p-2 rounded-xl bg-slate-100 ${isActive ? st.iconColor : 'text-slate-400'}`}>
                  {renderStepIcon(st.icon, "w-4.5 h-4.5")}
                </span>
                <span className="font-mono text-xs font-black text-slate-300">0{idx + 1}</span>
              </div>
              <h3 className="font-sans font-bold text-xs leading-snug">{st.title}</h3>
              <p className="font-sans text-[10px] text-slate-400 mt-1 leading-normal truncate">{st.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Sandbox Interactive Stage */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-5 min-h-[460px]">
        {/* Left Side: Step Narrative & Walkthrough Checklist */}
        <div className="lg:col-span-2 bg-slate-50/50 border-r border-slate-200 p-6 md:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <span className={`inline-block font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${steps[activeStep].badgeColor}`}>
              Active Lesson Guide
            </span>

            {activeStep === 0 && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-slate-900 text-lg tracking-tight">The Forecasting Principle</h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  CivicMind models city conditions as a set of interconnected policy dials. Adjusting variables (like <strong>Congestion Toll Pricing</strong>) recalculates future municipal indices across a 12-month seasonal curve.
                </p>
                <div className="space-y-2">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Learning Objectives</span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Learn to isolate variable impacts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Configure custom scenario presets</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-slate-900 text-lg tracking-tight">CCTV Privacy & Computer Vision</h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  The platform processes visual sensor matrices (like road conditions or pedestrian density). Gemini classifies structural hazards or flooding alerts. <strong>Strict compliance guidelines ensure zero-log storage of facial profiles or license plates.</strong>
                </p>
                <div className="space-y-2">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Learning Objectives</span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Select active simulation viewpoints</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Trigger safe diagnostic neural sweeps</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-slate-900 text-lg tracking-tight">Grounded Chat Advisory</h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  Queries on legal or structural circulars are processed through a <strong>grounded RAG database</strong>. This forces Gemini to quote exact reference manuals rather than hallucinating local administrative policies.
                </p>
                <div className="space-y-2">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Learning Objectives</span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Utilize multi-modal grounding attachments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Analyze policy citations and references</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-slate-900 text-lg tracking-tight">AI Explainability & Trust</h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  Every decision brief generated features an embedded <strong>Trust Card</strong>. This acts as an audit trail displaying the underlying confidence level, reasoning model, and a thorough demographic equity assessment to avoid biased resource allocation.
                </p>
                <div className="space-y-2">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Learning Objectives</span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Audit resource allocation decisions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Ensure civil liberties compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <button
              onClick={handlePrevStep}
              disabled={activeStep === 0}
              className="text-xs font-semibold px-3.5 py-2 border border-slate-200 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 rounded-xl bg-white transition-all flex items-center gap-1"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="font-sans text-xs text-slate-400 font-bold">
              {activeStep + 1} / {steps.length}
            </span>
            <button
              onClick={handleNextStep}
              disabled={activeStep === steps.length - 1}
              className="text-xs font-semibold px-3.5 py-2 border border-slate-200 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 rounded-xl bg-white transition-all flex items-center gap-1"
            >
              <span>Next</span>
              <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Immersive Interactive Demonstration Playground */}
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-between bg-slate-950 text-white relative">
          <div className="absolute top-4 right-4 bg-blue-500/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-blue-400 border border-blue-500/20 uppercase">
            Interactive Simulator
          </div>

          {/* STEP 1 PLAYGROUND: PREDICTIVE SLIDER */}
          {activeStep === 0 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-wider block">PRACTICE INTERACTION</span>
                <h4 className="font-sans font-bold text-sm tracking-tight text-slate-100">Adjust Congestion Pricing Levy</h4>
                <p className="font-sans text-xs text-slate-400">
                  Slide the controller to observe how travel times compress while public satisfaction adapts.
                </p>
              </div>

              {/* Slider Input widget */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans font-semibold text-slate-300">Congestion Fee Levy</span>
                  <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    ${practiceSlider}.00 / hr
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={practiceSlider}
                  onChange={(e) => setPracticeSlider(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Dynamic Live Calculations Chart Simulation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block">Avg Commute Delay</span>
                  <span className="font-mono text-xl font-bold text-red-400 block mt-1">
                    {computedPracticeDelay.toFixed(1)} mins
                  </span>
                  <span className="font-sans text-[9px] text-slate-500">Commuters optimized</span>
                </div>

                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block">Rider Satisfaction</span>
                  <span className="font-mono text-xl font-bold text-emerald-400 block mt-1">
                    {computedPracticeSatisfaction}%
                  </span>
                  <span className="font-sans text-[9px] text-slate-500">Public welfare factor</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 PLAYGROUND: CCTV VISION CHECK */}
          {activeStep === 1 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-wider block">PRACTICE INTERACTION</span>
                <h4 className="font-sans font-bold text-sm tracking-tight text-slate-100">Run CCTV Neural Scan</h4>
                <p className="font-sans text-xs text-slate-400">
                  Select a live feed representation and check how hazards are safely flagged.
                </p>
              </div>

              {/* Video representer box */}
              <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=600"
                  alt="City camera"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details */}
                <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                  <span>SIM_CAM // 12A</span>
                </div>

                {visionScanning && (
                  <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center space-y-2">
                    <Icons.Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    <span className="font-sans text-xs text-slate-300">Decrypting streams & checking anomalies...</span>
                  </div>
                )}

                {visionAnalyzed && !visionScanning && (
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 p-3 rounded-xl border border-indigo-500/30 text-xs space-y-1.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                      <Icons.CheckSquare className="w-3.5 h-3.5" />
                      <span>Anomalies Detected</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      - Major drainage flood hazard flagged at Grid quadrant B4.<br />
                      - <strong>Compliance report:</strong> 15 faces and 4 vehicle registrations redacted. Zero raw streams logged.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={runPracticeSweep}
                disabled={visionScanning}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
              >
                {visionScanning ? "Scanning..." : "Simulate Interactive Vision Sweep"}
              </button>
            </div>
          )}

          {/* STEP 3 PLAYGROUND: GROUNDING EXPLANATORY BOX */}
          {activeStep === 2 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">CONCEPT PREVIEW</span>
                <h4 className="font-sans font-bold text-sm tracking-tight text-slate-100">Citations & Grounding Verified</h4>
                <p className="font-sans text-xs text-slate-400">
                  Every conversational reply includes standard references. Experience how responses trace directly back to verified codes.
                </p>
              </div>

              {/* Chat representation panel */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icons.Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      Under Section 4.1 of the Emergency Management Plan, emergency vehicle routes must maintain an active congestion factor of less than 2.0.
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-medium">
                      <span className="font-bold">Grounding Citations:</span>
                      <ul className="list-disc pl-4 space-y-0.5 mt-1 text-slate-400">
                        <li>Wash. Rev. Code (Emergency Vehicles § 46.61)</li>
                        <li>Municipal Storm Flood Preparedness Index (Vol. 3)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 text-[10px] text-slate-300 flex items-start gap-2 leading-relaxed">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>The system avoids hallucinations by embedding statutory references before analyzing recommendations.</span>
              </div>
            </div>
          )}

          {/* STEP 4 PLAYGROUND: THE AI TRUST CARD AUDIT DEMYSTIFIED */}
          {activeStep === 3 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-violet-400 font-bold uppercase tracking-wider block">PRACTICE INTERACTION</span>
                <h4 className="font-sans font-bold text-sm tracking-tight text-slate-100">Audit the Trust Card</h4>
                <p className="font-sans text-xs text-slate-400">
                  Every decision or document drafted contains full compliance audits. Flip the switch below to preview the audit trail.
                </p>
              </div>

              {/* Interactive trust card representation */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans font-bold text-slate-300 flex items-center gap-1.5">
                    <Icons.ShieldAlert className="w-4 h-4 text-violet-400" />
                    <span>Resource Allocation Audit</span>
                  </span>
                  <span className="font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                    Passed Safety Audit
                  </span>
                </div>

                {trustRevealed ? (
                  <div className="space-y-3.5 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[9px] uppercase text-slate-500 font-bold">Confidence Rate:</span>
                      <p className="font-mono text-xs font-bold text-blue-400 mt-0.5">94% Confidence</p>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[9px] uppercase text-slate-500 font-bold">Demographic Equity Assessment:</span>
                      <p className="font-sans text-[10px] text-slate-300 mt-0.5 leading-normal">
                        Checked for parity. The suggested routes do not prioritize high-income grid blocks. Distributes resources equitably based on traffic density.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-500 space-y-1">
                    <Icons.Lock className="w-8 h-8 mx-auto text-slate-700" />
                    <p className="font-sans text-[10px]">Trust Card and audit data locked.</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setTrustRevealed(!trustRevealed)}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all"
              >
                {trustRevealed ? "Lock Audit Details" : "Reveal Safe Audit Details"}
              </button>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="text-[10px] text-slate-500 mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center">
            <span>Decision Intelligence Platform Academy</span>
            <span>CivicMind v1.2</span>
          </div>
        </div>
      </div>

      {/* Recommended Practice Tracks */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-2">
          <Icons.Wrench className="w-4 h-4 text-slate-500" />
          <span>Launch Recommended Sandbox Tracks</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onLaunchDomain('mobility')}
            className="p-4 bg-white hover:bg-blue-50/50 rounded-xl border border-slate-200 text-left transition-all hover:border-blue-300 space-y-2 group"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <Icons.Bike className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs">A: Transit Congestion</span>
            </div>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Track commuter times, pricing, and draft bike-share infrastructure guidelines.
            </p>
          </button>

          <button
            onClick={() => onLaunchDomain('safety')}
            className="p-4 bg-white hover:bg-indigo-50/50 rounded-xl border border-slate-200 text-left transition-all hover:border-indigo-300 space-y-2 group"
          >
            <div className="flex items-center gap-2 text-indigo-600">
              <Icons.ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs">B: Climate & Flood Risk</span>
            </div>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Scan simulated storm-water catchments, monitor sensor grids, and deploy drills.
            </p>
          </button>

          <button
            onClick={() => onLaunchDomain('healthcare')}
            className="p-4 bg-white hover:bg-emerald-50/50 rounded-xl border border-slate-200 text-left transition-all hover:border-emerald-300 space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <Icons.HeartPulse className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs">C: Public Healthcare</span>
            </div>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Deploy mobile health clinics, subsidy levels, and draft localized meal distribution.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
