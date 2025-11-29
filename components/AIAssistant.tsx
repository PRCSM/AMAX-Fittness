import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am your AMAX Fit AI coach. Need a workout suggestion or nutrition advice?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: inputValue,
        config: {
          systemInstruction: "You are an elite fitness trainer for AMAX Fit. You provide short, motivating, and scientifically backed advice on workouts, nutrition, and recovery. Keep responses concise (under 100 words) and energetic.",
        }
      });

      const text = response.text || "I'm having trouble connecting to the fitness database right now. Try again later!";
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I couldn't process that. Please check your connection.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    // Optional: Auto send
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-surface/90 backdrop-blur-md p-4 border-b border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <div>
          <h1 className="text-lg font-bold">AI Coach</h1>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="block h-2 w-2 rounded-full bg-success animate-pulse"></span>
            Online
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-black rounded-tr-none' 
                  : 'bg-surfaceHighlight text-white rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surfaceHighlight rounded-2xl rounded-tl-none p-4 flex gap-1">
              <span className="h-2 w-2 bg-secondary rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-white/10 p-4">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {['Suggest a workout', 'Nutrition for fat loss', 'How to squat?'].map(action => (
              <button 
                key={action}
                onClick={() => handleQuickAction(action)}
                className="whitespace-nowrap rounded-full bg-surfaceHighlight px-4 py-2 text-xs font-medium text-secondary hover:bg-primary/20 hover:text-primary transition-colors border border-white/5"
              >
                {action}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything..."
            className="flex-1 bg-surfaceHighlight text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm placeholder-secondary"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-black disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
