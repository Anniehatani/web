"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { safetyScenarios } from "@/data/content";

export default function SafetyInteractiveQuiz() {
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean; label: string } | null>(null);

  // Khởi tạo bài trắc nghiệm 10 câu ngẫu nhiên
  const initQuiz = () => {
    let arr = Array.from({ length: safetyScenarios.length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setQuestionOrder(arr.slice(0, 10)); // Lấy đúng 10 câu
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
    setSelectedOptionIdx(null);
    setFeedback(null);
  };

  useEffect(() => {
    initQuiz();
  }, []);

  if (questionOrder.length === 0) return null;

  const totalQuestions = questionOrder.length; // 10
  const activeIdx = questionOrder[currentIndex];
  const scenario = safetyScenarios[activeIdx] || safetyScenarios[0];

  const handleSelectOption = (idx: number) => {
    if (feedback || isCompleted) return;

    const opt = scenario.options[idx];
    setSelectedOptionIdx(idx);
    setFeedback({ text: opt.feedback, isCorrect: opt.isCorrect, label: opt.label });

    if (opt.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const advance = () => {
    setSelectedOptionIdx(null);
    setFeedback(null);
    if (currentIndex + 1 >= totalQuestions) {
      setIsCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Đánh giá kết quả cuối bài trắc nghiệm (Tối giản Đen - Trắng - Xám)
  const getResultBadge = () => {
    if (score === 10) return { title: "Chuyên Gia An Toàn AI 🛡️", color: "text-neutral-900 bg-neutral-100 border-neutral-300", desc: "Xuất sắc! Bạn đạt điểm tuyệt đối 10/10 với phản xạ phòng chống lừa đảo AI hoàn hảo." };
    if (score >= 7) return { title: "Cảnh Giác Cao 🌟", color: "text-neutral-900 bg-neutral-100 border-neutral-300", desc: "Rất tốt! Bạn nắm vững hầu hết các nguyên tắc an toàn thông tin số trong kỷ nguyên AI." };
    if (score >= 4) return { title: "Cần Thận Trọng Hơn ⚠️", color: "text-neutral-900 bg-neutral-100 border-neutral-300", desc: "Bạn đã nhận diện được một số nguy cơ, nhưng vẫn có thể mắc bẫy lừa đảo tinh vi." };
    return { title: "Mức Độ Rủi Ro Cao 🚨", color: "text-neutral-900 bg-neutral-100 border-neutral-300", desc: "Hãy thận trọng! Bạn dễ trở thành mục tiêu của các chiêu trò lừa đảo Deepfake & Voice Cloning." };
  };

  return (
    <section id="safety" className="py-24 px-4 md:px-6 w-full relative z-20 overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-20">
        
        {/* Tiêu đề phần trắc nghiệm */}
        <div className="text-center mb-8 space-y-3">
          <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase block">
            // INTERACTIVE QUIZ • 10 CÂU TRẮC NGHIỆM
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight text-neutral-900 tracking-tight leading-none">
            Trắc Nghiệm <br />
            <span className="font-semibold text-neutral-800">Phòng Chống Lừa Đảo AI</span>
          </h2>
          <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
            Bộ 10 câu hỏi trắc nghiệm A, B, C, D giúp kiểm tra phản xạ nhận diện bẫy lừa đảo công nghệ cao.
          </p>
        </div>

        {/* Thanh tiến trình trắc nghiệm */}
        {!isCompleted && (
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-2">
              <span>Câu hỏi {currentIndex + 1} / {totalQuestions}</span>
              <span className="text-neutral-900 font-bold">Đúng: {score}/{currentIndex + (feedback ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-neutral-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Màn hình kết quả sau 10 câu */}
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white border border-neutral-200 rounded-[32px] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.08)] text-center space-y-6"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">KẾT QUẢ TRẮC NGHIỆM</span>
            
            <div className="space-y-2">
              <div className="text-6xl font-extrabold text-neutral-900 font-mono tracking-tight">
                {score}<span className="text-2xl text-neutral-400">/{totalQuestions}</span>
              </div>
              <p className="text-xs text-neutral-400">câu trả lời chính xác</p>
            </div>

            <div className={`p-5 rounded-2xl border text-sm font-semibold ${getResultBadge().color}`}>
              <div className="text-base font-bold mb-1">{getResultBadge().title}</div>
              <div className="text-xs font-normal opacity-90 leading-relaxed">{getResultBadge().desc}</div>
            </div>

            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Kỷ nguyên AI mang lại nhiều tiện ích nhưng cũng kèm theo rủi ro lừa đảo tinh vi. Hãy luôn giữ tinh thần cảnh giác và kiểm chứng thông tin qua các kênh chính thống.
            </p>

            <button
              onClick={initQuiz}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
            >
              Làm lại bài trắc nghiệm (10 câu mới)
            </button>
          </motion.div>
        ) : (
          /* Thẻ hiển thị câu hỏi trắc nghiệm A, B, C, D */
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-neutral-200 rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6"
            >
              {/* Tiêu đề & Nội dung tình huống */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">TÌNH HUỐNG {currentIndex + 1}</span>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">Trắc nghiệm 4 lựa chọn</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-neutral-900 leading-snug mb-3">{scenario.title}</h3>
                <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              {/* Danh sách 4 lựa chọn A, B, C, D */}
              <div className="space-y-3 pt-2">
                {scenario.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  let btnStyle = "border-neutral-200 bg-white hover:border-neutral-900 hover:bg-neutral-50 text-neutral-800";
                  
                  if (feedback) {
                    if (opt.isCorrect) {
                      btnStyle = "border-neutral-900 bg-neutral-900 text-white font-semibold";
                    } else if (isSelected) {
                      btnStyle = "border-neutral-400 bg-neutral-100 text-neutral-500 line-through";
                    } else {
                      btnStyle = "border-neutral-100 bg-neutral-50 text-neutral-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.label}
                      disabled={feedback !== null}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${btnStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected && feedback?.isCorrect
                          ? "bg-white text-neutral-900"
                          : isSelected
                          ? "bg-neutral-300 text-neutral-800"
                          : feedback && opt.isCorrect
                          ? "bg-white text-neutral-900"
                          : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white"
                      }`}>
                        {opt.label}
                      </span>
                      <span className="text-xs md:text-sm pt-0.5 leading-relaxed font-normal">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Phản hồi lý giải kết quả */}
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className={`p-6 rounded-[24px] border text-center space-y-4 shadow-[0_15px_30px_rgba(0,0,0,0.05)] ${
                    feedback.isCorrect
                      ? "bg-neutral-900 text-white border-neutral-800"
                      : "bg-white text-neutral-900 border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      {feedback.isCorrect
                        ? `PHÂN TÍCH ĐÁP ÁN (${feedback.label}) • CHÍNH XÁC (+1 ĐIỂM)`
                        : `PHÂN TÍCH ĐÁP ÁN (${feedback.label}) • CHƯA CHÍNH XÁC`}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-light leading-relaxed opacity-90 max-w-xl mx-auto">
                    {feedback.text}
                  </p>

                  <button
                    onClick={advance}
                    className={`text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl ${
                      feedback.isCorrect
                        ? "bg-white text-neutral-900 hover:bg-neutral-100"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {currentIndex + 1 < totalQuestions ? "Câu tiếp theo &rarr;" : "Xem kết quả trắc nghiệm"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
