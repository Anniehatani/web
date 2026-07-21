"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lightbulb, CheckCircle2, AlertTriangle, Fingerprint, BrainCircuit } from "lucide-react";

export default function AILearningModule() {
  const [activeTab, setActiveTab] = useState<"usage" | "safety">("usage");

  return (
    <section className="pt-32 pb-16 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase block">
            // LÝ THUYẾT & THỰC HÀNH
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 tracking-tight leading-none">
            Kiến Thức <br />
            <span className="font-semibold text-neutral-700">Trí Tuệ Nhân Tạo</span>
          </h2>
          <p className="text-sm text-neutral-500 max-w-lg mx-auto mt-4">
            Trang bị kỹ năng làm chủ công nghệ và các nguyên tắc bảo mật tối quan trọng trước khi bước vào kỷ nguyên số.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 bg-neutral-100/80 rounded-2xl backdrop-blur-sm shadow-inner">
            <button
              onClick={() => setActiveTab("usage")}
              className={`relative px-6 md:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "usage" ? "text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {activeTab === "usage" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <BrainCircuit className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Sử Dụng AI Hiệu Quả</span>
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              className={`relative px-6 md:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "safety" ? "text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {activeTab === "safety" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <ShieldAlert className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Phòng Chống Lừa Đảo</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-[2rem] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.08)] min-h-[350px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {activeTab === "usage" ? (
              <motion.div
                key="usage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Thiết lập Vai trò (Role)</h3>
                  <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
                    <p className="text-sm text-neutral-600 font-mono">
                      "Bạn hãy đóng vai là [Chuyên gia XYZ] có [X] năm kinh nghiệm trong lĩnh vực [Y]. Hãy giúp tôi..."
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Giúp AI hiểu rõ lăng kính chuyên môn để đưa ra câu trả lời có chiều sâu và phù hợp với ngành nghề.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Cung cấp Ngữ cảnh (Context)</h3>
                  <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
                    <p className="text-sm text-neutral-600 font-mono">
                      "Dự án đang ở giai đoạn [A], đối tượng là [B]. Mục tiêu chính là [C]. Dựa vào đó, hãy..."
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Ngữ cảnh càng chi tiết, AI càng thu hẹp được phạm vi tìm kiếm, tránh trả lời chung chung, lan man.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Định dạng Đầu ra (Format)</h3>
                  <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
                    <p className="text-sm text-neutral-600 font-mono">
                      "Hãy trình bày kết quả dưới dạng [Bảng so sánh / Markdown] gồm các cột: [Cột 1, Cột 2]..."
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Tiết kiệm thời gian định dạng lại tài liệu bằng cách yêu cầu cấu trúc kết quả một cách rõ ràng.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Deepfake Âm thanh/Hình ảnh</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Kẻ gian có thể sao chép giọng nói hoặc khuôn mặt người thân qua AI để gọi video mượn tiền khẩn cấp. 
                    <br/><br/><strong className="text-neutral-700 font-medium">Phòng tránh:</strong> Bình tĩnh cúp máy, gọi lại bằng số điện thoại thông thường hoặc hỏi một câu hỏi bí mật.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Tiện ích AI giả mạo</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Các quảng cáo "Dùng GPT-4 miễn phí" thường yêu cầu cài tiện ích (Extension) độc hại để đánh cắp tài khoản trình duyệt.
                    <br/><br/><strong className="text-neutral-700 font-medium">Phòng tránh:</strong> Chỉ dùng AI từ trang chủ chính thức, kiểm tra kỹ quyền truy cập (Permissions).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-800 mb-6">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Phishing mức độ AI</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    AI được dùng để viết email lừa đảo hoàn hảo không sai lỗi chính tả, cá nhân hóa thông tin để nhắm vào bạn.
                    <br/><br/><strong className="text-neutral-700 font-medium">Phòng tránh:</strong> Luôn kiểm tra kỹ địa chỉ email người gửi và tuyệt đối không click đường link lạ.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
