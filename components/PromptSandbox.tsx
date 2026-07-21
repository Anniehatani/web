"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { promptComparisons } from "@/data/content";

export default function PromptSandbox() {
  const [customPrompt, setCustomPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Scroll Progress cho Parallax tổng thể
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const leftParallaxY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const rightParallaxY = useTransform(smoothProgress, [0, 1], [60, -60]);

  // Mouse Parallax cho cột phải
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bentoCards = [
    { num: "01", title: "Ngữ cảnh (Context)", desc: "Thiết lập bối cảnh doanh nghiệp, ngành nghề và mục tiêu cốt lõi.", preset: "Với tư cách là một công ty công nghệ đang mở rộng thị trường APAC..." },
    { num: "02", title: "Vai trò (Role)", desc: "Xác định chuyên môn như Chuyên gia Dữ liệu, Giám đốc Marketing...", preset: "Hãy đóng vai là một Giám đốc Marketing (CMO) có 15 năm kinh nghiệm..." },
    { num: "03", title: "Yêu cầu (Instruction)", desc: "Đưa ra chỉ thị rõ ràng, từng bước và các ràng buộc cụ thể.", preset: "Hãy phân tích rủi ro và đề xuất chiến lược tối ưu hóa chi phí..." },
    { num: "04", title: "Định dạng (Format)", desc: "Kết xuất dữ liệu dưới dạng bảng, JSON, hoặc báo cáo điều hành.", preset: "Trình bày kết quả dưới dạng bảng so sánh với số liệu cụ thể..." }
  ];

  const handleTestPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || isLoading) return;
    setIsLoading(true);
    setAiResponse("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: customPrompt }),
      });

      if (!response.ok) throw new Error("API Network Error");

      const data = await response.json();
      setAiResponse(data.result);
    } catch (error) {
      console.warn("Gemini API failed...", error);
      setAiResponse("⚠️ Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={containerRef} id="prompts" className="py-32 px-6 relative overflow-hidden google-grid border-t border-neutral-100">
      
      {/* Scroll-linked background shape */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] pointer-events-none opacity-[0.15]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(200,200,200,0.5) 0%, transparent 60%)",
          y: bgY
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* CỘT TRÁI: 4 THẺ BENTO KHỐI GẬP MỞ 3D */}
        <motion.div style={{ y: leftParallaxY }} className="lg:col-span-5 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase block">
              // SKILL_SET 02
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 tracking-tight leading-[1.1]">
              Kỹ Thuật <br />
              <span className="font-semibold text-neutral-700">Prompt Chuyên Nghiệp</span>
            </h2>
          </motion.div>

          {/* Grid bento bung tỏa 3D khi cuộn chuột chạm tới */}
          <div className="grid grid-cols-2 gap-4 perspective-[1200px]">
            {bentoCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  duration: 1.2, 
                  delay: idx * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setCustomPrompt(card.preset)}
                className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-[1.5rem] p-6 cursor-pointer hover:border-neutral-400 shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all text-left group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(20px)" }}>
                  <span className="text-xs font-mono text-neutral-400 block mb-3 group-hover:text-neutral-900 transition-colors">{card.num}</span>
                  <h4 className="text-base font-semibold text-neutral-800 mb-2">{card.title}</h4>
                  <p className="text-[13px] text-neutral-500 font-light leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CỘT PHẢI: Ô SANDBOX TRƯỢT XOAY CHIỀU SÂU (Slide Perspective Panel) */}
        <motion.div 
          style={{ y: rightParallaxY }}
          className="lg:col-span-7 perspective-[1500px]"
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.16)] transition-all relative"
          >
            {/* Lớp phủ highlight để tạo độ bóng mượt cho thẻ */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/80 via-white/20 to-transparent pointer-events-none" style={{ transform: "translateZ(1px)" }} />
            
            <div style={{ transform: "translateZ(30px)" }}>
              {/* Preset nhanh */}
              <div className="mb-8">
                <span className="text-[11px] font-mono text-neutral-400 tracking-widest block mb-3 uppercase">Chọn nhanh mẫu so sánh:</span>
                <div className="flex flex-col gap-3">
                  {promptComparisons.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setCustomPrompt(item.good)}
                      className="text-left text-sm bg-neutral-50/50 hover:bg-neutral-100 p-4 rounded-2xl border border-neutral-200/60 hover:border-neutral-300 transition-colors flex justify-between items-center group"
                    >
                      <span className="text-neutral-700 truncate max-w-[90%] font-medium">{item.category}: {item.good}</span>
                      <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">&rarr;</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleTestPrompt} className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-neutral-800 block mb-2">Thử nghiệm câu lệnh của bạn:</label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Nhập câu lệnh vào đây hoặc chọn thẻ gợi ý bên trên..."
                    rows={4}
                    className="w-full bg-white border border-neutral-200 rounded-2xl p-5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all resize-none font-sans shadow-sm"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-neutral-950 hover:bg-black text-white py-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-black/10"
                >
                  {isLoading ? "Đang phân tích cấu trúc..." : "Kiểm tra chất lượng Prompt"}
                </motion.button>
              </form>

              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 p-5 bg-neutral-50 rounded-2xl border border-neutral-200"
                >
                  <p className="text-sm text-neutral-700 font-sans leading-relaxed whitespace-pre-line">
                    {aiResponse}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
