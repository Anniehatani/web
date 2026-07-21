"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Khai báo cấu trúc dữ liệu chuẩn học thuật
interface EducationalLevel {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  giantBgText: string;
  textInstructions: string[];
  promptExample: {
    title: string;
    description: string;
    badPrompt: string;
    goodPrompt: string;
    simulatedResponse: string;
  };
}

// Kho dữ liệu chi tiết, chuẩn tiếng Việt cho 3 cấp học
const educationalLevels: EducationalLevel[] = [
  {
    id: "thcs",
    badge: "STAGE 01 — THCS",
    title: "Làm quen với AI học tập",
    subtitle: "Khám phá thế giới AI an toàn (Lớp 6 – Lớp 9)",
    desc: "Bước đầu tiên để biến trí tuệ nhân tạo thành người bạn đồng hành thú vị. Học cách đặt những câu hỏi đơn giản để giải thích công thức khó hiểu, gợi ý ý tưởng viết văn mà vẫn giữ vững tư duy tự lập, không phụ thuộc hoàn toàn.",
    giantBgText: "EXPLORE",
    textInstructions: [
      "Hiểu đúng bản chất: AI là trợ lý hỗ trợ gợi ý ý tưởng, không phải công cụ làm hộ bài tập.",
      "Kỹ năng đặt câu hỏi 5W1H đơn giản để AI không trả lời lan man, lạc đề.",
      "Ứng dụng thực tế: Giải thích thuật ngữ khoa học, tạo thẻ ghi nhớ (flashcard) để học từ vựng tiếng Anh.",
      "Nguyên tắc vàng: Luôn nghi ngờ và đối chiếu câu trả lời của AI với sách giáo khoa chuẩn."
    ],
    promptExample: {
      title: "Phương pháp hỏi giải thích Định lý Pythagore",
      description: "Thay vì yêu cầu AI giải hộ bài tập về nhà để đối phó, hãy biến AI thành một người thầy giảng bài vui tính sử dụng các hình ảnh ẩn dụ dễ nhớ.",
      badPrompt: "Giải bài tập toán hình lớp 8 trang 45 cho tôi.",
      goodPrompt: "Hãy đóng vai là một thầy giáo dạy Toán vui vẻ. Giải thích định lý Pythagore bằng ngôn ngữ cực kỳ dễ hiểu cho học sinh lớp 8, sử dụng một ví dụ thực tế liên quan đến chiếc bánh sandwich hoặc lát pizza hình tam giác vuông.",
      simulatedResponse: "Thầy chào em! Đừng lo lắng, hình học thực ra rất thú vị nếu em tưởng tượng đúng cách. Hãy nghĩ về một lát pizza hình tam giác vuông. Định lý Pythagore nói rằng: Bình phương độ dài cạnh dài nhất (cạnh huyền - phần viền bánh ngon lành) sẽ luôn bằng tổng bình phương của hai cạnh góc vuông còn lại. Công thức toán học là: a² + b² = c²."
    }
  },
  {
    id: "thpt",
    badge: "STAGE 02 — THPT",
    title: "Hỗ trợ ôn thi & Tư duy phản biện",
    subtitle: "Lập lộ trình và học sâu (Lớp 10 – Lớp 12)",
    desc: "Tối ưu hóa thời gian tự học trước áp lực thi cử cực kỳ lớn. Học sinh cấp 3 sẽ học cách dùng AI để tóm tắt các tài liệu ngữ văn dài dằng dặc, đồng thời tập luyện khả năng phản biện bằng cách tranh biện trực tiếp với AI.",
    giantBgText: "ANALYZE",
    textInstructions: [
      "Kỹ năng viết Prompt cấu trúc: Xác định rõ [Vai trò] + [Ngữ cảnh] + [Nhiệm vụ] + [Định dạng đầu ra].",
      "Xây dựng lộ trình ôn thi cá nhân hóa dựa trên học lực hiện tại và mục tiêu điểm số.",
      "Sử dụng AI như đối thủ tranh biện để phát triển tư duy phản biện đa chiều.",
      "Nhận biết ranh giới đạo đức: Tuyệt đối không copy nguyên văn văn bản do AI viết vào bài thi."
    ],
    promptExample: {
      title: "Lập kế hoạch ôn tập môn Toán 30 ngày",
      description: "Biến AI thành cố vấn học tập riêng để sắp xếp lịch trình ôn luyện khoa học, tập trung vào phần kiến thức đang yếu nhất.",
      badPrompt: "Lên kế hoạch ôn thi toán THPT Quốc gia hộ cái.",
      goodPrompt: "Tôi là học sinh lớp 12 đang chuẩn bị thi THPT Quốc gia, học lực môn Toán ở mức Khá. Hãy lập cho tôi một kế hoạch ôn tập chi tiết trong 30 ngày, mỗi ngày dành 2 giờ tự học, tập trung trọng tâm vào chuyên đề Hình học không gian (tính thể tích và góc). Định dạng câu trả lời dưới dạng bảng biểu phân chia theo từng tuần.",
      simulatedResponse: "Chào bạn, dưới đây là lộ trình 30 ngày Hình học không gian:\n- Tuần 1: Củng cố lý thuyết và công thức tính thể tích khối chóp, khối lăng trụ.\n- Tuần 2: Chinh phục chuyên đề Góc và Khoảng cách.\n- Tuần 3: Bài toán thực tế ứng dụng cao.\n- Tuần 4: Giải đề tổng hợp và nhờ AI sửa lỗi chi tiết."
    }
  },
  {
    id: "sinhvien",
    badge: "STAGE 03 — SINH VIÊN",
    title: "Nghiên cứu khoa học & Đạo đức học thuật",
    subtitle: "Công cụ tối ưu hiệu suất nghiên cứu (Đại học)",
    desc: "Làm chủ công nghệ để dẫn đầu trong môi trường học thuật chuyên nghiệp. Sinh viên sẽ học cách sử dụng AI để tóm tắt các bài báo khoa học quốc tế, viết các đoạn mã lập trình thử nghiệm và tránh lỗi đạo văn.",
    giantBgText: "RESEARCH",
    textInstructions: [
      "Ứng dụng AI để đọc hiểu nhanh, phân loại và tóm tắt tài liệu nghiên cứu học thuật tiếng Anh.",
      "Sử dụng AI hỗ trợ viết code, phân tích dữ liệu nghiên cứu sơ bộ và gỡ lỗi (Debugging).",
      "Đạo đức học thuật: Kỹ năng trích dẫn nguồn khi sử dụng ý tưởng gợi ý bởi AI.",
      "Kiểm chứng chuyên sâu: Sử dụng Google Scholar đối chiếu nguồn tài liệu AI tự sinh ra."
    ],
    promptExample: {
      title: "Tóm tắt bài báo khoa học chuẩn quốc tế",
      description: "Tiết kiệm hàng giờ đọc tài liệu dài bằng cách yêu cầu AI trích lọc cấu trúc cốt lõi bài nghiên cứu.",
      badPrompt: "Dịch và tóm tắt bài báo này.",
      goodPrompt: "Hãy đóng vai là một chuyên gia nghiên cứu khoa học. Hãy phân tích tài liệu sau và tóm tắt thành 5 luận điểm chính: Mục tiêu, Phương pháp, Kết quả, Hạn chế và Đề xuất. Giải thích thuật ngữ bằng ngôn ngữ dễ hiểu cho sinh viên năm nhất.",
      simulatedResponse: "Chào bạn đồng nghiệp trẻ, đây là bản tóm tắt học thuật tinh gọn:\n1. Mục tiêu: Đánh giá ảnh hưởng của LLM tới tốc độ tự học của sinh viên.\n2. Phương pháp: Thử nghiệm ngẫu nhiên có kiểm soát trên 200 sinh viên.\n3. Kết quả: Tốc độ hoàn thành bài tập nhanh hơn 42%, điểm thi tăng trung bình 1.5 điểm.\n4. Hạn chế: Sinh viên có xu hướng lười suy nghĩ thuật toán nếu thiếu giám sát.\n5. Đạo đức: Khai báo đầy đủ việc sử dụng AI trong phần phụ lục khóa luận."
    }
  }
];

export default function EducationalScrollJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theo dõi tiến trình cuộn dọc tổng thể (0 đến 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sử dụng Spring physics tạo quán tính mượt mà cho trải nghiệm cuộn
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 45,
    stiffness: 75,
    restDelta: 0.001
  });

  // 1. Quỹ đạo trượt ngang (X) của các thẻ Card
  const cardX1 = useTransform(smoothProgress, [0, 0.28, 0.38], ["0vw", "0vw", "-105vw"]);
  const cardX2 = useTransform(smoothProgress, [0.22, 0.36, 0.62, 0.72], ["105vw", "0vw", "0vw", "-105vw"]);
  const cardX3 = useTransform(smoothProgress, [0.55, 0.68, 1], ["105vw", "0vw", "0vw"]);

  // Độ xoay nhẹ khi lướt thẻ
  const cardRotate1 = useTransform(smoothProgress, [0, 0.28, 0.38], [0, 0, -6]);
  const cardRotate2 = useTransform(smoothProgress, [0.22, 0.36, 0.62, 0.72], [6, 0, 0, -6]);
  const cardRotate3 = useTransform(smoothProgress, [0.55, 0.68, 1], [6, 0, 0]);

  // 2. Chữ nền Parallax đồng bộ hoàn hảo từng Stage (Opacity chạy mượt, không đè lấn nhau)
  const bgTextX1 = useTransform(smoothProgress, [0, 0.38], ["0%", "-30%"]);
  const bgOpacity1 = useTransform(smoothProgress, [0, 0.28, 0.35], [0.06, 0.06, 0]);

  const bgTextX2 = useTransform(smoothProgress, [0.22, 0.72], ["15%", "-15%"]);
  const bgOpacity2 = useTransform(smoothProgress, [0.25, 0.35, 0.62, 0.68], [0, 0.06, 0.06, 0]);

  const bgTextX3 = useTransform(smoothProgress, [0.55, 1], ["20%", "-10%"]);
  const bgOpacity3 = useTransform(smoothProgress, [0.58, 0.68, 1], [0, 0.06, 0.06]);

  // Hàm sinh dải chữ nối đuôi nhau liên tục
  const renderLoopingText = (text: string) => {
    return Array(6).fill(text).join("  •  ");
  };

  // 3. Vòng xoay chữ điều hướng dọc bên trái
  const level1Scale = useTransform(smoothProgress, [0, 0.28, 0.38], [1.25, 1, 0.85]);
  const level1Opacity = useTransform(smoothProgress, [0, 0.28, 0.38], [1, 1, 0.2]);

  const level2Scale = useTransform(smoothProgress, [0.22, 0.36, 0.62, 0.72], [0.85, 1.25, 1.25, 0.85]);
  const level2Opacity = useTransform(smoothProgress, [0.22, 0.36, 0.62, 0.72], [0.2, 1, 1, 0.2]);

  const level3Scale = useTransform(smoothProgress, [0.55, 0.68, 1], [0.85, 1.25, 1.25]);
  const level3Opacity = useTransform(smoothProgress, [0.55, 0.68, 1], [0.2, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white">

      {/* KHUNG STICKY GHIM TOÀN BỘ TRẢI NGHIỆM TRÊN MÀN HÌNH */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">

        {/* 12 đường kẻ dọc tĩnh làm nền */}
        <div className="absolute inset-0 grid grid-cols-12 gap-6 px-12 md:px-24 pointer-events-none z-0">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="h-full border-r border-black/[0.03]" />
          ))}
        </div>

        {/* CHỮ NỀN PARALLAX ĐÃ ĐƯỢC ĐƯA VÀO TRONG STICKY - CHẠY NỐI ĐUÔI NHAU VÔ TẬN */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0 select-none"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {/* Stage 1: EXPLORE */}
          <motion.h2
            style={{ x: bgTextX1, opacity: bgOpacity1, willChange: "transform" }}
            className="absolute text-[15vw] font-black tracking-tighter text-black whitespace-nowrap"
          >
            {renderLoopingText(educationalLevels[0].giantBgText)}
          </motion.h2>

          {/* Stage 2: ANALYZE */}
          <motion.h2
            style={{ x: bgTextX2, opacity: bgOpacity2, willChange: "transform" }}
            className="absolute text-[15vw] font-black tracking-tighter text-black whitespace-nowrap"
          >
            {renderLoopingText(educationalLevels[1].giantBgText)}
          </motion.h2>

          {/* Stage 3: RESEARCH */}
          <motion.h2
            style={{ x: bgTextX3, opacity: bgOpacity3, willChange: "transform" }}
            className="absolute text-[15vw] font-black tracking-tighter text-black whitespace-nowrap"
          >
            {renderLoopingText(educationalLevels[2].giantBgText)}
          </motion.h2>
        </div>

        {/* NỘI DUNG CHÍNH (GRID TRÁI - PHẢI) */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* CỘT TRÁI: ĐIỀU HƯỚNG DỌC (Sắc nét, thuần đen) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 justify-center select-none border-l border-black/10 pl-8">
            <span className="text-[10px] font-mono text-black opacity-30 tracking-[0.3em] uppercase block mb-4">
              // LỰA CHỌN CẤP ĐỘ
            </span>

            <motion.div style={{ scale: level1Scale, opacity: level1Opacity }} className="origin-left transition-all duration-300">
              <span className="text-xs font-mono text-black opacity-40 block mb-1">Stage 01</span>
              <span className="text-xl md:text-2xl font-bold text-black tracking-tight">Stage 01 – Trung Học Cơ Sở</span>
            </motion.div>

            <motion.div style={{ scale: level2Scale, opacity: level2Opacity }} className="origin-left transition-all duration-300">
              <span className="text-xs font-mono text-black opacity-40 block mb-1">Stage 02</span>
              <span className="text-xl md:text-2xl font-bold text-black tracking-tight">Stage 02 – Trung Học Phổ Thông</span>
            </motion.div>

            <motion.div style={{ scale: level3Scale, opacity: level3Opacity }} className="origin-left transition-all duration-300">
              <span className="text-xs font-mono text-black opacity-40 block mb-1">Stage 03</span>
              <span className="text-xl md:text-2xl font-bold text-black tracking-tight">Stage 03 – Sinh Viên Đại Học</span>
            </motion.div>
          </div>

          {/* CỘT PHẢI: KHU VỰC THẺ SLIDE TRƯỢT */}
          <div className="lg:col-span-9 relative w-full h-[75vh] flex items-center justify-center">

            {/* STAGE 1 CARD */}
            <motion.div
              style={{ x: cardX1, rotate: cardRotate1, transformOrigin: "bottom center" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center bg-white/85 backdrop-blur-2xl border border-white/40 rounded-2xl lg:rounded-[32px] p-5 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-y-auto lg:overflow-visible"
            >
              <div className="lg:col-span-5 space-y-4 lg:space-y-6">
                <span className="px-3 py-1 bg-black text-white rounded-full text-[9px] font-bold tracking-widest w-max block">
                  {educationalLevels[0].badge}
                </span>
                <h3 className="text-[1.75rem] md:text-4xl font-bold text-black tracking-tight leading-tight">
                  {educationalLevels[0].title}
                </h3>
                <p className="text-xs text-black font-bold tracking-tight uppercase opacity-80">
                  {educationalLevels[0].subtitle}
                </p>
                <p className="text-xs text-black font-medium leading-relaxed opacity-90">
                  {educationalLevels[0].desc}
                </p>
                <div className="space-y-3.5 pt-6 border-t border-black/5">
                  {educationalLevels[0].textInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3.5 text-xs text-black font-semibold">
                      <span className="text-black font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Giao diện ví dụ Prompt của Stage 1 */}
              <div className="lg:col-span-7 bg-white/40 border border-black/[0.03] rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-6 h-full flex flex-col justify-between mt-2 lg:mt-0">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">{educationalLevels[0].promptExample.title}</h4>
                  <p className="text-[11px] text-black opacity-60 font-medium">{educationalLevels[0].promptExample.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                      <span className="text-[10px] font-bold text-black opacity-55 uppercase tracking-wider">PROMPT CHƯA TỐI ƯU</span>
                    </div>
                    <div className="bg-white border border-black/[0.05] rounded-xl p-3 text-xs text-black font-medium italic opacity-70">
                      “{educationalLevels[0].promptExample.badPrompt}”
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span className="text-[10px] font-bold text-black uppercase tracking-wider">PROMPT TIÊU CHUẨN</span>
                    </div>
                    <div className="bg-white border border-black/[0.08] rounded-xl p-3 text-xs text-black font-bold">
                      “{educationalLevels[0].promptExample.goodPrompt}”
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/[0.05] rounded-xl p-4 text-[11px] text-black font-mono leading-relaxed max-h-36 overflow-y-auto">
                  {educationalLevels[0].promptExample.simulatedResponse}
                </div>
              </div>
            </motion.div>

            {/* STAGE 2 CARD */}
            <motion.div
              style={{ x: cardX2, rotate: cardRotate2, transformOrigin: "bottom center" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center bg-white/85 backdrop-blur-2xl border border-white/40 rounded-2xl lg:rounded-[32px] p-5 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-y-auto lg:overflow-visible"
            >
              <div className="lg:col-span-5 space-y-4 lg:space-y-6">
                <span className="px-3 py-1 bg-black text-white rounded-full text-[9px] font-bold tracking-widest w-max block">
                  {educationalLevels[1].badge}
                </span>
                <h3 className="text-[1.75rem] md:text-4xl font-bold text-black tracking-tight leading-tight">
                  {educationalLevels[1].title}
                </h3>
                <p className="text-xs text-black font-bold tracking-tight uppercase opacity-80">
                  {educationalLevels[1].subtitle}
                </p>
                <p className="text-xs text-black font-medium leading-relaxed opacity-90">
                  {educationalLevels[1].desc}
                </p>
                <div className="space-y-3.5 pt-6 border-t border-black/5">
                  {educationalLevels[1].textInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3.5 text-xs text-black font-semibold">
                      <span className="text-black font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Giao diện ví dụ Prompt của Stage 2 */}
              <div className="lg:col-span-7 bg-white/40 border border-black/[0.03] rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-6 h-full flex flex-col justify-between mt-2 lg:mt-0">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">{educationalLevels[1].promptExample.title}</h4>
                  <p className="text-[11px] text-black opacity-60 font-medium">{educationalLevels[1].promptExample.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                      <span className="text-[10px] font-bold text-black opacity-55 uppercase tracking-wider">PROMPT CHƯA TỐI ƯU</span>
                    </div>
                    <div className="bg-white border border-black/[0.05] rounded-xl p-3 text-xs text-black font-medium italic opacity-70">
                      “{educationalLevels[1].promptExample.badPrompt}”
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span className="text-[10px] font-bold text-black uppercase tracking-wider">PROMPT TIÊU CHUẨN</span>
                    </div>
                    <div className="bg-white border border-black/[0.08] rounded-xl p-3 text-xs text-black font-bold">
                      “{educationalLevels[1].promptExample.goodPrompt}”
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/[0.05] rounded-xl p-4 text-[11px] text-black font-mono leading-relaxed max-h-36 overflow-y-auto">
                  {educationalLevels[1].promptExample.simulatedResponse}
                </div>
              </div>
            </motion.div>

            {/* STAGE 3 CARD */}
            <motion.div
              style={{ x: cardX3, rotate: cardRotate3, transformOrigin: "bottom center" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center bg-white/85 backdrop-blur-2xl border border-white/40 rounded-2xl lg:rounded-[32px] p-5 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-y-auto lg:overflow-visible"
            >
              <div className="lg:col-span-5 space-y-4 lg:space-y-6">
                <span className="px-3 py-1 bg-black text-white rounded-full text-[9px] font-bold tracking-widest w-max block">
                  {educationalLevels[2].badge}
                </span>
                <h3 className="text-[1.75rem] md:text-4xl font-bold text-black tracking-tight leading-tight">
                  {educationalLevels[2].title}
                </h3>
                <p className="text-xs text-black font-bold tracking-tight uppercase opacity-80">
                  {educationalLevels[2].subtitle}
                </p>
                <p className="text-xs text-black font-medium leading-relaxed opacity-90">
                  {educationalLevels[2].desc}
                </p>
                <div className="space-y-3.5 pt-6 border-t border-black/5">
                  {educationalLevels[2].textInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3.5 text-xs text-black font-semibold">
                      <span className="text-black font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Giao diện ví dụ Prompt của Stage 3 */}
              <div className="lg:col-span-7 bg-white/40 border border-black/[0.03] rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-6 h-full flex flex-col justify-between mt-2 lg:mt-0">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">{educationalLevels[2].promptExample.title}</h4>
                  <p className="text-[11px] text-black opacity-60 font-medium">{educationalLevels[2].promptExample.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black opacity-30" />
                      <span className="text-[10px] font-bold text-black opacity-55 uppercase tracking-wider">PROMPT CHƯA TỐI ƯU</span>
                    </div>
                    <div className="bg-white border border-black/[0.05] rounded-xl p-3 text-xs text-black font-medium italic opacity-70">
                      “{educationalLevels[2].promptExample.badPrompt}”
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span className="text-[10px] font-bold text-black uppercase tracking-wider">PROMPT TIÊU CHUẨN</span>
                    </div>
                    <div className="bg-white border border-black/[0.08] rounded-xl p-3 text-xs text-black font-bold">
                      “{educationalLevels[2].promptExample.goodPrompt}”
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/[0.05] rounded-xl p-4 text-[11px] text-black font-mono leading-relaxed max-h-36 overflow-y-auto">
                  {educationalLevels[2].promptExample.simulatedResponse}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}