export type DomainId =
  | 'mobility'
  | 'safety'
  | 'healthcare'
  | 'education'
  | 'environment'
  | 'waste'
  | 'energy'
  | 'engagement'
  | 'accessibility'
  | 'disaster'
  | 'tourism'
  | 'social';

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: string; // e.g. "+5.2%" or "-1.4%"
  trend: 'up' | 'down' | 'neutral';
  status: 'good' | 'warning' | 'critical' | 'neutral';
  description: string;
}

export interface SliderConfig {
  id: string;
  name: string;
  min: number;
  max: number;
  value: number;
  step: number;
  unit: string;
  description: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  sliders: { [key: string]: number };
  metricsDelta: { [key: string]: number }; // Multiplier or addends for forecasting
}

export interface VisionPreset {
  id: string;
  title: string;
  imageUrl: string; // Real or abstract visual representational URL
  description: string;
  promptHint: string;
  mimeType: string;
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  type: 'Policy Brief' | 'Public Notice' | 'Resource Dispatch' | 'Alert Circular';
  description: string;
  defaultInputs: { [key: string]: string };
}

export interface DomainData {
  id: DomainId;
  name: string;
  category: string;
  iconName: string; // For Lucide icons rendering
  summary: string;
  metrics: Metric[];
  sliders: SliderConfig[];
  scenarios: Scenario[];
  visionPresets: VisionPreset[];
  workflowTemplates: WorkflowTemplate[];
  knowledgeBase: string; // Domain text snippet for local context RAG
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  image?: string; // base64 encoded image if uploaded
  citations?: string[];
  explainability?: {
    confidence: number;
    dataQuality: 'high' | 'medium' | 'estimated';
    reasoningModel: string;
    biasRiskAssessment: string;
    ethicalCheck: string;
  };
}

export interface ForecastPoint {
  month: string;
  [metricId: string]: number | string; // Dynamic values based on slider states
}
