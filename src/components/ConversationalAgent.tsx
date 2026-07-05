import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DomainData } from '../types';
import * as Icons from 'lucide-react';

interface ConversationalAgentProps {
  domain: DomainData;
}

export default function ConversationalAgent({ domain }: ConversationalAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; data: string; mimeType: string } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcoming greeting from the domain's dedicated AI Advisor
  useEffect(() => {
    setMessages([
      {
        id: 'system-init',
        role: 'assistant',
        text: `Hello! I am your Civic Planning and Decision Advisor for **${domain.name}**. I am fully calibrated with our statutory municipal datasets and urban reference manual.
        
How can I assist you with modeling our city parameters, analyzing infrastructure investments, or planning our community programs today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        explainability: {
          confidence: 100,
          dataQuality: 'high',
          reasoningModel: 'System Initialization Prompt',
          biasRiskAssessment: 'None. Grounded on neutral starting templates.',
          ethicalCheck: 'Verified public service compliant.'
        }
      }
    ]);
    setUploadedFile(null);
  }, [domain]);

  // Scroll to bottom of message logs
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Preset quick prompt suggestions
  const suggestionsMap: { [key: string]: string[] } = {
    mobility: [
      'How does congestion pricing affect downtown commuting indices?',
      'What happens if we double public transit subsidies?',
      'Explain the relationship between micromobility lanes and commute times.'
    ],
    safety: [
      'Propose a storm flood sensor grid roadmap.',
      'How do community patrol programs reduce residential emergency times?',
      'Draft an outline for neighborhood storm preparedness exercises.'
    ],
    healthcare: [
      'Where should we route our new mobile health clinic vans?',
      'How do telehealth access subsidies offset emergency room budgets?',
      'Draft a meal-distribution nutrition program for food deserts.'
    ]
  };

  const domainSuggestions = suggestionsMap[domain.id] || [
    `How can we improve parameters for ${domain.name}?`,
    `Draft an advisory policy circular based on our ${domain.name} metrics.`,
    `Analyze potential socio-demographic inequalities in ${domain.name}.`
  ];

  // Convert uploaded document or image to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile({
          name: file.name,
          data: reader.result as string,
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit chat advisory query to server RAG API
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() && !uploadedFile) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: uploadedFile?.data
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setUploadedFile(null);
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainName: domain.name,
          knowledgeBase: domain.knowledgeBase,
          message: textToSend,
          uploadedImage: uploadedFile ? { data: uploadedFile.data, mimeType: uploadedFile.mimeType } : null,
          chatHistory: messages.filter((m) => m.id !== 'system-init') // Avoid initialization noise
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            role: 'assistant',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            citations: data.citations,
            explainability: data.explainability
          }
        ]);
      } else {
        throw new Error(data.message || 'Advisory stream disconnected');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-err-${Date.now()}`,
          role: 'assistant',
          text: `I encountered an operational barrier: ${err.message}. Please verify the full-stack server is responsive.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="conversational-agent-workspace" className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left: Chat Pane */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm xl:col-span-2 flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-sans font-bold text-slate-800 text-sm">Conversational Planning Advisor</h3>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">RAG Mode Active</span>
        </div>

        {/* Messages Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/10'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}
              >
                {/* Uploaded File/Image inside chat */}
                {msg.image && (
                  <div className="mb-2 max-h-32 rounded overflow-hidden">
                    <img src={msg.image} alt="Uploaded attachment" className="w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="whitespace-pre-line font-sans">{msg.text}</div>

                {/* Grounding Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200/50 text-[10px] text-slate-500 font-medium">
                    <span className="font-bold">Data Grounding Sources:</span>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1">
                      {msg.citations.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Suggestions Bar */}
        {messages.length === 1 && (
          <div className="my-3 space-y-1.5">
            <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Suggested Queries</span>
            <div className="flex flex-col gap-1">
              {domainSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  className="text-left text-[11px] font-medium p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-200 transition-colors truncate"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Controls */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          {/* File Attachment Status */}
          {uploadedFile && (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Icons.Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate max-w-[200px] font-medium">{uploadedFile.name}</span>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* File Upload Trigger */}
            <input
              type="file"
              id="chat-doc-upload"
              accept="image/*,text/plain,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="chat-doc-upload"
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-xl cursor-pointer transition-colors shrink-0"
            >
              <Icons.Paperclip className="w-5 h-5" />
            </label>

            {/* Input Box */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask Advisor... (e.g. 'How do smart grids reduce energy demand?')"
              className="flex-1 bg-slate-100 text-slate-800 rounded-xl py-3 px-4 text-xs border border-slate-200 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isTyping || (!inputText.trim() && !uploadedFile)}
              className="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-xl shadow-md transition-all shrink-0"
            >
              <Icons.Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Responsible AI Trust Check Panel */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
              <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Explainability & Trust Card</span>
            </h3>
            <p className="font-sans text-[11px] text-slate-400 leading-normal">
              Audit trails and demographic compliance metrics computed for the last generated advice.
            </p>
          </div>

          {/* Active Trust Parameters */}
          {messages.length > 1 && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.explainability ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">AI Confidence Index:</span>
                  <span className="font-mono font-bold text-blue-600">
                    {messages[messages.length - 1].explainability?.confidence}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${messages[messages.length - 1].explainability?.confidence}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div>
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Reasoning Model:</span>
                  <span className="font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700 block truncate">
                    {messages[messages.length - 1].explainability?.reasoningModel}
                  </span>
                </div>

                <div>
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Demographic Equity & Bias Risk:</span>
                  <p className="font-sans text-[11px] leading-relaxed text-slate-500">
                    {messages[messages.length - 1].explainability?.biasRiskAssessment}
                  </p>
                </div>

                <div>
                  <span className="font-sans text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Ethical & Policy Check:</span>
                  <div className="flex items-start gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                    {(() => {
                      const CheckComponent = Icons.CircleCheck || Icons.CheckCircle || Icons.Activity;
                      return CheckComponent ? <CheckComponent className="w-4.5 h-4.5 shrink-0 mt-0.5 text-emerald-500" /> : null;
                    })()}
                    <span>{messages[messages.length - 1].explainability?.ethicalCheck}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Icons.Lock className="w-10 h-10 mx-auto text-slate-200" />
              <div className="space-y-1">
                <p className="font-sans text-xs font-bold text-slate-500">Trust Card Locked</p>
                <p className="font-sans text-[10px] text-slate-400">Trigger a conversation to view underlying reasoning audits.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
