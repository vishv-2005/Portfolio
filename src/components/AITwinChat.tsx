import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AITwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Vishv's AI Twin. I've been trained on his full-stack products, mobile development, NLP pipelines, and AWS cloud engineering architecture. What would you like to ask me about his software engineering journey?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          // Extract only last 6 messages to keep context efficient and stay within rates
          history: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sync with Vishv\'s AI Core.');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during execution.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="bg-[#0b101c]/90 border border-blue-900/40 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col h-[520px] relative overflow-hidden">
      
      {/* Decorative backdrop gradients */}
      <div className="absolute top-0 left-0 w-44 h-44 bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-44 h-44 bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-500 p-[1px]">
            <div className="w-full h-full bg-[#050914] rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-100 flex items-center gap-1.5 leading-none">
              Vishv_AI_Twin
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            </h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
              Online Core Pipeline
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                role: 'assistant',
                content: "System refreshed. Ask me anything about Vishv's engineering work!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setError(null);
          }}
          className="text-gray-500 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scrolling Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none space-y-4 pr-1 mb-4">
        {messages.map((msg, index) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-[#101626]/80 border border-gray-800 text-gray-200'
                    : 'bg-blue-600/20 border border-blue-500/30 text-cyan-100'
                }`}
              >
                {/* Bot Icon Tag for Assist */}
                {isAssistant && (
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1.5 font-mono text-[10px]">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>AI RECRUITER ASSISTANT</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap select-text">{msg.content}</div>
                <div className="text-right text-[9px] text-gray-500 mt-1 font-mono">{msg.timestamp}</div>
              </div>
            </motion.div>
          );
        })}

        {/* Typing Loader Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#101626]/80 border border-gray-800 rounded-2xl p-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">System Connection Timeout</p>
              <p className="text-gray-400 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleFormSubmit} className="flex gap-2.5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Vishv's AI Twin anything..."
          disabled={isLoading}
          className="flex-1 bg-[#060a12]/80 border border-gray-800/80 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 py-3 flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
