"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";

// Fallback logic cho offline hoặc lỗi API
const isOffTopic = (text: string) => {
  const offTopicKeywords = ['nấu', 'game', 'tình cảm', 'yêu', 'phim', 'ca nhạc', 'giải trí', 'chơi'];
  return offTopicKeywords.some(keyword => text.toLowerCase().includes(keyword));
};

const isEduRelated = (text: string) => {
  const eduKeywords = ['học', 'ai', 'prompt', 'bảo mật', 'an toàn', 'giáo dục', 'lập trình', 'code', 'toán', 'văn', 'anh'];
  return eduKeywords.some(keyword => text.toLowerCase().includes(keyword));
};

const getMockAIResponse = (text: string) => {
  if (isOffTopic(text)) {
    return "Xin lỗi, mình là Trợ lý AI-Learner chuyên hỗ trợ học thuật và công nghệ. Mình không thể bàn luận về các chủ đề ngoài lề như giải trí hay nấu ăn. Bạn có câu hỏi nào về bài học không?";
  }
  if (isEduRelated(text)) {
    return "Đó là một chủ đề rất hay về học tập! Để làm chủ kiến thức này, bạn cần thực hành nhiều và đặt câu lệnh (prompt) thật rõ ràng. Bạn có muốn xem một ví dụ mẫu không?";
  }
  return "Mình đã ghi nhận. Hãy nhớ luôn kiểm chứng thông tin từ AI và sử dụng AI một cách có đạo đức nhé. Bạn cần hỗ trợ gì thêm không?";
};

// Parser Markdown siêu nhẹ (hỗ trợ in đậm và code block)
const parseMarkdown = (text: string) => {
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`(.*?)`/g, '<code class="bg-neutral-200/60 text-neutral-800 px-1.5 py-0.5 rounded-md text-[13px] font-mono">$1</code>');
  
  // Tách dòng thành các p hoặc li
  const lines = html.split('\n');
  let result = '';
  let inList = false;
  
  for (const line of lines) {
    if (line.trim() === '') {
      result += '<br/>';
      continue;
    }
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) { result += '<ul class="list-disc pl-4 space-y-1">'; inList = true; }
      result += `<li>${line.substring(2)}</li>`;
    } else {
      if (inList) { result += '</ul>'; inList = false; }
      result += `<p>${line}</p>`;
    }
  }
  if (inList) result += '</ul>';

  return <div dangerouslySetInnerHTML={{ __html: result }} className="space-y-1" />;
};

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Xin chào! Mình là **Smart AI-Learner**. Mình có thể giúp gì cho việc học của bạn hôm nay?" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userMsg = inputVal.trim();
    setInputVal("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: 'user', content: userMsg }
          ]
        }),
      });

      if (!response.ok) throw new Error("API Network Error");

      const data = await response.json();
      const aiReply = data.result;
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      setIsLoading(false);
    } catch (error) {
      console.warn("Gemini API failed, falling back to offline mode...", error);
      
      setTimeout(() => {
        const fallbackReply = getMockAIResponse(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackReply }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/50 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100/60 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800">AI-Learner</h3>
                  <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    Đang hoạt động
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-200">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0 mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div 
                    className={`px-4 py-2.5 max-w-[80%] text-[14px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-50 text-blue-900 rounded-2xl rounded-tr-sm border border-blue-100' 
                        : 'bg-white text-[#1f2124] rounded-2xl rounded-tl-sm border border-[#e8eaed]'
                    }`}
                  >
                    {msg.role === 'user' ? msg.content : parseMarkdown(msg.content)}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 bg-white text-neutral-700 rounded-2xl rounded-tl-sm border border-neutral-100 flex items-center gap-1 shadow-sm">
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="p-4 bg-white border-t border-neutral-100/60">
              <form 
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-neutral-100/80 rounded-full p-1.5 pr-2 focus-within:bg-neutral-100 focus-within:ring-2 focus-within:ring-neutral-200 transition-all"
              >
                <input
                  type="text"
                  placeholder="Hỏi AI về học tập..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-[14px] px-3 text-neutral-700 placeholder:text-neutral-400"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-[#1f2124] text-white flex items-center justify-center disabled:opacity-50 hover:bg-neutral-800 transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200/60 z-50 overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <Sparkles size={24} className="group-hover:text-blue-500 transition-colors" />
              <div className="absolute top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping opacity-75" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
