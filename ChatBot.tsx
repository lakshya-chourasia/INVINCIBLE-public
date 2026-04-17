
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, Zap, BrainCircuit, Terminal } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Synchronization complete. I am the Collective Intelligence node. I can guide you through our projects, the developer forum, or assist with complex architectural logic. What is your query?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const apiKey = (window as any).process?.env?.API_KEY || '';
    if (!input.trim() || isLoading || !apiKey) {
      if (!apiKey) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(36),
          role: 'assistant',
          content: 'Error: API Key not found in environment. Please check your configuration.',
          timestamp: Date.now()
        }]);
      }
      return;
    }

    const userMessage: Message = {
      id: Math.random().toString(36),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const modelName = isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userMessage.content,
        config: {
          systemInstruction: `You are the Invincible Collective AI Assistant, the primary intelligence node for the 'Invincible_Collective' platform.
          
          SITE KNOWLEDGE & USER GUIDANCE:
          1. Home: The central hub for node initialization.
          2. Dev Forum: A real-time stream for repository telemetry and deep technical discussions.
          3. Source Projects: The 'src' repository containing deployed legacy code.
          4. Resources: The 'bin' directory for engineering assets.
          5. Members: Active 'usr' nodes currently synchronized with the collective.
          6. Dashboard: The 'etc' control panel for deployment management.
          
          STATS: 45,200 active nodes, 8,420 deployed projects, 12.5k core functions.
          
          TONE & STYLE:
          - Futuristic, technical, high-performance, and binary-themed.
          - Use engineer-slang: 'pushing to prod', 'merging intelligence', 'node sync', 'latency optimization'.
          - Current Mode: ${isPro ? 'Pro (Complex Reasoning)' : 'Flash (Low Latency)'}.`
        }
      });

      const responseText = response.text || 'Error: Connection lost in the subnet.';

      setMessages(prev => [...prev, {
        id: Math.random().toString(36),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      }]);
    } catch (error: unknown) {
      console.error('Gemini error:', error);
      setMessages(prev => [...prev, {
        id: Math.random().toString(36),
        role: 'assistant',
        content: 'Error: Module failed to synchronize. Subnet 0x404 is unreachable.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[500] font-mono">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full liquid-glass purple-liquid-glass flex items-center justify-center text-white shadow-2xl"
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            className="w-[calc(100vw-32px)] md:w-[450px] h-[75vh] md:h-[650px] rounded-[32px] md:rounded-[40px] liquid-glass border-white/20 flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5227FF]/20 border border-[#5227FF]/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-6 md:h-6 text-[#5227FF]" />
                </div>
                <div>
                  <h3 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Collective_AI</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[7px] md:text-[8px] text-zinc-400 uppercase tracking-widest font-bold">Node_Status: Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPro(!isPro)}
                  className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border transition-all duration-300 ${isPro ? 'bg-[#5227FF]/20 border-[#5227FF]/50 text-white' : 'bg-white/5 border-white/10 text-zinc-500'}`}
                >
                  {isPro ? <BrainCircuit className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <Zap className="w-2.5 h-2.5 md:w-3 md:h-3" />}
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{isPro ? 'Pro' : 'Flash'}</span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide bg-black/20"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl md:rounded-3xl text-[11px] md:text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#5227FF]/80 text-white shadow-xl rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-none'
                  }`}>
                    {m.content}
                    <div className={`text-[7px] md:text-[8px] mt-2 font-bold opacity-40 uppercase tracking-widest ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-2xl md:rounded-3xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#5227FF] animate-bounce" />
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#5227FF] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#5227FF] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Execute command..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 md:py-4 pl-5 md:pl-6 pr-14 md:pr-16 text-[11px] md:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#5227FF]/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5227FF] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4 text-[7px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] justify-center opacity-50">
                <Terminal className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span>Protocol: {isPro ? 'Gemini_3_Pro' : 'Gemini_3_Flash'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
