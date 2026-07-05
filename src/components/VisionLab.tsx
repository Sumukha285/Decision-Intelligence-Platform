import React, { useState } from 'react';
import { DomainData, VisionPreset } from '../types';
import * as Icons from 'lucide-react';

interface VisionLabProps {
  domain: DomainData;
}

export default function VisionLab({ domain }: VisionLabProps) {
  const [selectedPreset, setSelectedPreset] = useState<VisionPreset | null>(domain.visionPresets[0] || null);
  const [customImage, setCustomImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);

  // Handle preset selection
  const handleSelectPreset = (preset: VisionPreset) => {
    setSelectedPreset(preset);
    setCustomImage(null);
    setAnalysisResult(null);
    setConfidence(null);
  };

  // Convert uploaded file to base64 for real multimodal processing
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, JPEG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomImage({
        data: reader.result as string,
        mimeType: file.type,
      });
      setSelectedPreset(null);
      setAnalysisResult(null);
      setConfidence(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Trigger real multimodal processing on Express Node backend
  const triggerVisionAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const payload: any = {
      prompt: selectedPreset ? selectedPreset.promptHint : 'Perform a complete structural planning audit of this city scene. Enumerate detected items, highlight municipal anomalies, and provide safety ratings.',
    };

    if (customImage) {
      payload.customImageBase64 = customImage.data;
      payload.customImageMimeType = customImage.mimeType;
    } else if (selectedPreset) {
      payload.presetPath = selectedPreset.imageUrl;
    }

    try {
      const response = await fetch('/api/gemini/vision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisResult(data.analysis);
        setConfidence(data.confidence);
      } else {
        setAnalysisResult(`Error: ${data.message || 'Vision sweep failed'}`);
      }
    } catch (err: any) {
      setAnalysisResult(`Connection failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="vision-analysis-lab" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Input Selection / Upload */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Icons.Camera className="w-4 h-4 text-indigo-500" />
            <span>Select Live Simulation Camera or Upload Frame</span>
          </h3>

          {/* Presets Grid */}
          <div className="space-y-2">
            <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live City CCTV Feeds</span>
            <div className="grid grid-cols-1 gap-2">
              {domain.visionPresets.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/40 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icons.Radio className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-sans text-xs font-bold leading-none mb-1">{preset.title}</h4>
                      <p className="font-sans text-[10px] text-slate-400 leading-normal">{preset.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drag & Drop File Upload */}
          <div className="space-y-2">
            <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload Custom Camera Capture</span>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
              }`}
            >
              <input
                type="file"
                id="camera-upload-input"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="camera-upload-input" className="cursor-pointer space-y-2 block">
                <Icons.Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-600">
                  Drag and drop screenshot or <span className="text-indigo-600 hover:underline">browse files</span>
                </div>
                <p className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG up to 5MB</p>
              </label>
            </div>
          </div>
        </div>

        {/* Display Frame Screen */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-900 shadow-md relative group aspect-video flex items-center justify-center">
          {customImage ? (
            <img
              src={customImage.data}
              alt="Custom municipal diagnostic upload"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : selectedPreset ? (
            <img
              src={selectedPreset.imageUrl}
              alt={selectedPreset.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-center text-slate-500 space-y-2">
              <Icons.VideoOff className="w-10 h-10 mx-auto text-slate-600" />
              <p className="font-sans text-xs font-medium">No live feed selected</p>
            </div>
          )}

          {/* CCTV Frame Indicator Overlays */}
          <div className="absolute top-4 left-4 bg-red-600/85 px-2.5 py-1 rounded text-[10px] text-white font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>REC // LIVE_SIM_NET_CAM</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-slate-900/80 px-2.5 py-1 rounded font-mono text-[10px] text-slate-300 tracking-wider">
            COORD: 47.6062° N, 122.3321° W
          </div>
        </div>

        <button
          onClick={triggerVisionAnalysis}
          disabled={isAnalyzing || (!selectedPreset && !customImage)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
        >
          {isAnalyzing ? (
            <>
              <Icons.Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning video buffer via Gemini...</span>
            </>
          ) : (
            <>
              <Icons.ShieldCheck className="w-4.5 h-4.5" />
              <span>Run Multimodal Intelligent Diagnostic Sweep</span>
            </>
          )}
        </button>
      </div>

      {/* Right: Vision Sweep Analytics & Outputs */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <Icons.BrainCircuit className="w-4.5 h-4.5 text-indigo-500" />
                <span>Diagnostic Report & Neural Predictions</span>
              </h3>
              {confidence !== null && (
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 rounded">
                  Confidence: {confidence}%
                </span>
              )}
            </div>

            {isAnalyzing ? (
              <div className="space-y-4 py-8 text-center text-slate-500">
                <Icons.Loader2 className="w-10 h-10 mx-auto text-indigo-500 animate-spin" />
                <div className="space-y-1">
                  <p className="font-sans text-xs font-bold text-slate-700">Decompressing image packets...</p>
                  <p className="font-sans text-[10px] text-slate-400">Tuning edge classification matrices via Gemini 3.5 Flash</p>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 overflow-y-auto max-h-[35rem] pr-2 scrollbar-thin">
                <div className="whitespace-pre-line text-slate-600 font-sans">
                  {analysisResult}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Icons.Binary className="w-12 h-12 mx-auto text-slate-200" />
                <div className="space-y-1">
                  <p className="font-sans text-xs font-bold text-slate-500">Neural Net Idle</p>
                  <p className="font-sans text-[10px] text-slate-400">Trigger a diagnostic sweep to analyze the active viewport.</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 mt-4 text-[10px] text-slate-400 flex items-center gap-2">
            <Icons.Eye className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Responsible CV checks: Personal license plates and human identities are zero-logged.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
