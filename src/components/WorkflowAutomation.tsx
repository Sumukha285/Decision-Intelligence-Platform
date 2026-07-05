import React, { useState, useEffect } from 'react';
import { DomainData, WorkflowTemplate } from '../types';
import * as Icons from 'lucide-react';

interface WorkflowAutomationProps {
  domain: DomainData;
  activeSliders: { [key: string]: number };
}

export default function WorkflowAutomation({ domain, activeSliders }: WorkflowAutomationProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(domain.workflowTemplates[0] || null);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledResult, setCompiledResult] = useState<any | null>(null);

  // Synchronize default form inputs when template switches
  useEffect(() => {
    if (selectedTemplate) {
      setInputs(selectedTemplate.defaultInputs);
      setCompiledResult(null);
    }
  }, [selectedTemplate]);

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Compile draft administrative document via Node server workflow API
  const handleCompileDocument = async () => {
    if (!selectedTemplate) return;

    setIsCompiling(true);
    setCompiledResult(null);

    try {
      const response = await fetch('/api/gemini/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainId: domain.id,
          domainName: domain.name,
          templateTitle: selectedTemplate.title,
          templateType: selectedTemplate.type,
          inputs: inputs,
          sliders: activeSliders
        })
      });

      const data = await response.json();
      if (response.ok) {
        setCompiledResult(data);
      } else {
        setCompiledResult({
          title: `Compilation Fault`,
          documentContent: `### Operational Failure\n\nCould not compile policy draft: ${data.message || 'Workflow API returned error.'}`,
          confidenceScore: 0,
          explainabilityNotes: ['API error occurred during inference.'],
          safetyCheck: 'Not verified due to system error.',
          biasMitigation: 'Not verified due to system error.'
        });
      }
    } catch (err: any) {
      setCompiledResult({
        title: `Operational Fault`,
        documentContent: `### Connection Error\n\nFailed to reach full-stack server: ${err.message}`,
        confidenceScore: 0,
        explainabilityNotes: ['Check terminal logs or network response.'],
        safetyCheck: 'Not verified due to connection failure.',
        biasMitigation: 'Not verified due to connection failure.'
      });
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div id="workflow-automation-workspace" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Input Selection and Template Parameters */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Icons.Wrench className="w-4 h-4 text-violet-500" />
            <span>Workflow Automation Templates</span>
          </h3>

          {/* Templates Selector */}
          <div className="space-y-2">
            <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available Draft Blueprints</span>
            <div className="flex flex-col gap-1.5">
              {domain.workflowTemplates.map((tmpl) => {
                const isSelected = selectedTemplate?.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50/40 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icons.FileSpreadsheet className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-violet-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-sans text-xs font-bold leading-none">{tmpl.title}</h4>
                        <span className="text-[8px] font-bold uppercase px-1.5 bg-violet-100 text-violet-700 rounded">
                          {tmpl.type}
                        </span>
                      </div>
                      <p className="font-sans text-[10px] text-slate-400 mt-1 leading-normal">{tmpl.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Template Parameters Fields */}
          {selectedTemplate && (
            <div className="space-y-3.5 pt-4 border-t border-slate-100">
              <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Configure Parameters</span>
              <div className="space-y-3">
                {Object.entries(selectedTemplate.defaultInputs).map(([key, value]) => (
                  <div key={key} className="space-y-1.5">
                    <label className="font-sans text-[11px] font-bold text-slate-500 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <input
                      type="text"
                      value={inputs[key] ?? ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-violet-500 focus:bg-white transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Sliders Injection Review Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1.5">
            <span className="font-bold text-slate-700 block">Active Simulator Multipliers Injected:</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              {domain.sliders.map((slider) => (
                <li key={slider.id}>
                  {slider.name}: <strong className="text-slate-700">{activeSliders[slider.id] ?? slider.value} {slider.unit}</strong>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleCompileDocument}
            disabled={isCompiling || !selectedTemplate}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isCompiling ? (
              <>
                <Icons.Loader2 className="w-4 h-4 animate-spin" />
                <span>Assembling administrative briefs...</span>
              </>
            ) : (
              <>
                <Icons.Sparkles className="w-4.5 h-4.5" />
                <span>Compile Document & Run Safety Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: Compiled Document & Safety Trust Board */}
      <div className="space-y-6">
        {isCompiling ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-3">
            <Icons.Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-slate-700 text-xs">Generating Legal Frameworks...</h4>
              <p className="font-sans text-[10px] text-slate-400">Verifying bias multipliers and public welfare coordinates</p>
            </div>
          </div>
        ) : compiledResult ? (
          <div className="space-y-6">
            {/* The Draft Document Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-violet-600">
                  <Icons.FileCheck className="w-5 h-5" />
                  <h3 className="font-sans font-bold text-slate-900 text-sm">{compiledResult.title}</h3>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Ready for Review
                </span>
              </div>
              <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 overflow-y-auto max-h-[22rem] pr-2 scrollbar-thin">
                <div className="whitespace-pre-line text-slate-600 font-sans">
                  {compiledResult.documentContent}
                </div>
              </div>
            </div>

            {/* Explainable AI safety trust card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-sans font-bold text-slate-900 text-xs flex items-center gap-2">
                  <Icons.ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Explainable AI Trust & Compliance Verification</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Confidence & Explainability */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Confidence Gauge:</span>
                    <span className="font-mono font-bold text-blue-600">{compiledResult.confidenceScore}%</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-slate-500 font-bold text-[10px] block">Traceable Slider Impacts:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-500 font-medium">
                      {compiledResult.explainabilityNotes?.map((note: string, i: number) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Safety & Equity Audit */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Public Safety Alignment:</span>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{compiledResult.safetyCheck}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Socio-Demographic Equity Audit:</span>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{compiledResult.biasMitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-3">
            <Icons.Lock className="w-12 h-12 text-slate-200" />
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-slate-500 text-xs">Draft Board Empty</h4>
              <p className="font-sans text-[10px] text-slate-400">Configure parameters and compile to trigger automation workflow.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
