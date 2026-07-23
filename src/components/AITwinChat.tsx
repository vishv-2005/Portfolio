import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, X, MessageCircle, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AITwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Vishv's AI twin. Ask me about his projects, skills, or experience — I keep it short!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Resize state
  const [size, setSize] = useState({ w: 380, h: 480 });
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isLoading]);

  // Resize handlers
  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      const dw = resizeStart.current.x - ev.clientX;
      const dh = resizeStart.current.y - ev.clientY;
      setSize({
        w: Math.max(320, Math.min(600, resizeStart.current.w + dw)),
        h: Math.max(400, Math.min(700, resizeStart.current.h + dh)),
      });
    };

    const onMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [size]);

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
      } catch (_e) { /* ignore */ }
      setError(displayError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const toggleExpand = () => {
    if (isExpanded) {
      setSize({ w: 380, h: 480 });
    } else {
      setSize({ w: 520, h: 620 });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="bg-[#111111] border border-[#1f1f1f] text-[#ededed] text-xs px-3 py-1.5 rounded-lg shadow-lg hidden sm:block"
            >
              Ask AI ✨
            </motion.span>

            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-[#c9a96e] text-black p-4 rounded-full shadow-lg shadow-[#c9a96e]/25 hover:shadow-[#c9a96e]/50 hover:scale-110 transition-all cursor-pointer"
              aria-label="Open AI chat"
            >
              <span className="absolute inset-0 rounded-full bg-[#c9a96e]/30 animate-ping" />
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
            className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#1f1f1f] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              width: `min(${size.w}px, calc(100vw - 3rem))`,
              height: `min(${size.h}px, calc(100vh - 6rem))`,
            }}
          >
            {/* Resize handle (top-left corner) */}
            <div
              onMouseDown={onResizeMouseDown}
              className="absolute top-0 left-0 w-5 h-5 cursor-nw-resize z-10 group"
              title="Drag to resize"
            >
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#888888]/30 group-hover:border-[#c9a96e]/60 transition-colors rounded-tl-sm" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#c9a96e]" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#ededed]">AI Assistant</span>
                  <span className="block text-[10px] text-[#888888]">Quick answers about Vishv</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleExpand}
                  className="text-[#888888] hover:text-[#ededed] p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title={isExpanded ? 'Shrink' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#888888] hover:text-[#ededed] p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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
                          ? 'bg-black text-[#ededed] border border-[#1f1f1f]'
                          : 'bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20'
                      }`}
                    >
                      <p className="text-[13px] whitespace-pre-line">{msg.content}</p>
                      <span className="text-[9px] text-[#888888]/60 mt-1 block text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black border border-[#1f1f1f] rounded-xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#c9a96e]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#c9a96e]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#c9a96e]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-3.5 py-2.5 text-xs">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-[#1f1f1f]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-black border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-sm text-[#ededed] placeholder-[#888888]/50 focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[#c9a96e]/10 text-[#c9a96e] p-2.5 rounded-lg hover:bg-[#c9a96e]/20 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-[#888888]/40 mt-1.5 text-center">
                Drag top-left corner to resize
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
