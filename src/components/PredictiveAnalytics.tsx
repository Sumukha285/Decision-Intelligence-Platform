import React, { useState, useEffect } from 'react';
import { DomainData, ForecastPoint, SliderConfig } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import * as Icons from 'lucide-react';

interface PredictiveAnalyticsProps {
  domain: DomainData;
  activeSliders: { [key: string]: number };
  onSliderChange: (sliderId: string, value: number) => void;
  onApplyScenario: (sliderValues: { [key: string]: number }) => void;
}

export default function PredictiveAnalytics({
  domain,
  activeSliders,
  onSliderChange,
  onApplyScenario
}: PredictiveAnalyticsProps) {
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);

  // Generate 12 months of forecast points based on active slider adjustments
  useEffect(() => {
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Compute slider displacement multipliers
    // Calculate deviation from original defaults
    let effectMultiplier = 1;
    domain.sliders.forEach((slider) => {
      const activeVal = activeSliders[slider.id] ?? slider.value;
      const defaultVal = slider.value;
      const range = slider.max - slider.min || 1;
      const displacement = (activeVal - defaultVal) / range;
      
      // Accumulate impacts
      effectMultiplier += displacement * 0.15; // Each slider can pivot results by 15%
    });

    const calculatedData: ForecastPoint[] = months.map((month, idx) => {
      const point: ForecastPoint = { month };
      
      domain.metrics.forEach((metric) => {
        // Build base value curve with seasonal noise
        const seasonalNoise = Math.sin((idx / 11) * Math.PI * 2) * (metric.value * 0.08);
        let calculatedValue = metric.value + seasonalNoise;
        
        // Apply slider impact
        if (metric.trend === 'down') {
          // If the goal is to reduce this metric (e.g. congestion or chronic illness)
          // sliders pulling effectMultiplier > 1 should depress the line
          calculatedValue = calculatedValue / Math.max(0.2, effectMultiplier);
        } else {
          // If the goal is to expand this metric (e.g. ridership or literacy)
          calculatedValue = calculatedValue * Math.max(0.2, effectMultiplier);
        }

        // Clamp values to prevent negative metrics
        calculatedValue = Math.max(0, parseFloat(calculatedValue.toFixed(1)));
        point[metric.id] = calculatedValue;
      });

      return point;
    });

    setForecastData(calculatedData);
  }, [domain, activeSliders]);

  // Handle resetting sliders back to original municipal baseline defaults
  const handleReset = () => {
    const defaults: { [key: string]: number } = {};
    domain.sliders.forEach((s) => {
      defaults[s.id] = s.value;
    });
    onApplyScenario(defaults);
  };

  // Color mapper for Recharts metrics lines
  const lineColors = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div id="predictive-sandbox" className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* 1. Policy Variable Sliders (Interactive Controls) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Icons.Sliders className="w-4 h-4 text-blue-500" />
            <span>Policy Input Parameters</span>
          </h3>
          <button
            onClick={handleReset}
            className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <Icons.RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Preset Operational Scenarios */}
        {domain.scenarios.length > 0 && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preset Scenarios</span>
            <div className="flex flex-wrap gap-2">
              {domain.scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => onApplyScenario(sc.sliders)}
                  className="text-xs font-semibold px-3 py-1.5 bg-white hover:bg-blue-50 hover:text-blue-600 rounded-lg border border-slate-200 transition-colors"
                >
                  {sc.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Sliders Stack */}
        <div className="space-y-5">
          {domain.sliders.map((slider) => {
            const currentVal = activeSliders[slider.id] ?? slider.value;
            return (
              <div key={slider.id} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-sans font-bold text-slate-700">{slider.name}</label>
                  <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {currentVal} {slider.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={currentVal}
                  onChange={(e) => onSliderChange(slider.id, parseFloat(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <p className="font-sans text-[10px] text-slate-400 leading-normal">{slider.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Charts (ML Predictive Sandbox) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm xl:col-span-2 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                <Icons.TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>12-Month Predictive Trends Sandbox</span>
              </h3>
              <p className="font-sans text-xs text-slate-400">Dynamic forecast adjusting to current parameter weightings.</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg font-bold">
              Inference Engine Calibrated
            </span>
          </div>

          {/* Recharts Container */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'sans-serif', paddingTop: '10px' }} />
                {domain.metrics.map((metric, idx) => (
                  <Line
                    key={metric.id}
                    type="monotone"
                    dataKey={metric.id}
                    name={metric.name}
                    stroke={lineColors[idx % lineColors.length]}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Predictive Metrics Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100">
          {domain.metrics.map((metric, idx) => {
            const currentVal = forecastData[forecastData.length - 1]?.[metric.id] ?? metric.value;
            const diff = parseFloat(currentVal.toString()) - metric.value;
            const trendUp = diff > 0;
            
            return (
              <div key={metric.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block truncate">
                    {metric.name}
                  </span>
                  <span className="font-mono text-base font-black text-slate-800">
                    {currentVal} {metric.unit}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px]">
                  {diff === 0 ? (
                    <span className="text-slate-500 font-semibold">No change from baseline</span>
                  ) : (
                    <span className={`font-semibold flex items-center gap-0.5 ${
                      metric.trend === 'down' ? (trendUp ? 'text-red-500' : 'text-emerald-500') : (trendUp ? 'text-emerald-500' : 'text-red-500')
                    }`}>
                      {trendUp ? <Icons.TrendingUp className="w-3 h-3" /> : <Icons.TrendingDown className="w-3 h-3" />}
                      <span>{trendUp ? '+' : ''}{diff.toFixed(1)}{metric.unit} vs baseline</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
