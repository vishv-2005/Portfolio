import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, X, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AITwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Vishv's AI assistant. Ask me anything about his projects, skills, or experience.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response.');
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
      let displayError = err.message || 'Something went wrong.';
      try {
        const parsed = JSON.parse(displayError);
        if (parsed.error?.message) displayError = parsed.error.message;
      } catch (e) {}
      setError(displayError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating trigger button — prominent with pulse ring */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="bg-[#112240] border border-[#1d3461] text-[#ccd6f6] text-xs font-mono px-3 py-1.5 rounded-lg shadow-lg hidden sm:block"
            >
              Ask AI ✨
            </motion.span>

            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-[#64ffda] text-[#0a192f] p-4 rounded-full shadow-lg shadow-[#64ffda]/25 hover:shadow-[#64ffda]/50 hover:scale-110 transition-all cursor-pointer"
              aria-label="Open AI chat"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-[#64ffda]/30 animate-ping" />
              <MessageCircle className="w-6 h-6 relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-[#112240] border border-[#1d3461] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1d3461]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#64ffda]/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#64ffda]" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#ccd6f6]">AI Assistant</span>
                  <span className="block text-[10px] text-[#8892b0]">Ask about Vishv's work</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8892b0] hover:text-[#ccd6f6] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-[#0a192f] text-[#ccd6f6] border border-[#1d3461]'
                          : 'bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/20'
                      }`}
                    >
                      <p className="text-[13px]">{msg.content}</p>
                      <span className="text-[9px] text-[#8892b0]/60 mt-1 block text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0a192f] border border-[#1d3461] rounded-xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#64ffda]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#64ffda]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#64ffda]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-3.5 py-2.5 text-xs">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-[#1d3461]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#0a192f] border border-[#1d3461] rounded-lg px-3 py-2.5 text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda]/40 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[#64ffda]/10 text-[#64ffda] p-2.5 rounded-lg hover:bg-[#64ffda]/20 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-[#8892b0]/40 mt-1.5 text-center">
                AI demo — responses based on portfolio data
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
