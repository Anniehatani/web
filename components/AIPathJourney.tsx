"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";

const stages = [
  {
    id: "stage-1",
    title: "Khám phá Lộ trình AI",
    desc: "Bắt đầu hành trình từ những khái niệm cơ bản nhất đến các kỹ năng ứng dụng AI nâng cao cho từng cấp học.",
    align: "left",
  },
  {
    id: "stage-2",
    title: "Thử nghiệm Prompt",
    desc: "Trực tiếp thực hành kỹ năng đặt câu hỏi, tương tác với AI để nhận được câu trả lời chất lượng nhất.",
    align: "right",
  },
  {
    id: "stage-3",
    title: "Cập nhật Xu hướng",
    desc: "Theo dõi các tin tức, bài viết chuyên sâu về sự phát triển không ngừng của trí tuệ nhân tạo trên toàn cầu.",
    align: "left",
  },
  {
    id: "stage-4",
    title: "Bảo mật & Đạo đức",
    desc: "Hiểu rõ các rủi ro, nguyên tắc sử dụng AI an toàn và trách nhiệm của người dùng trong kỷ nguyên số.",
    align: "right",
  },
];

export default function AIPathJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theo dõi tiến trình cuộn dọc
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    restDelta: 0.001
  });

  // pathLength để vẽ SVG path dần dần từ 0 đến 1
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div id="path" ref={containerRef} className="relative w-full py-32 overflow-hidden">

      {/* Tiêu đề giới thiệu */}
      <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-6">
          Hành trình Khám phá AI
        </h2>
        <p className="text-neutral-500 font-medium md:text-lg">
          Cuộn chuột để trải nghiệm những giai đoạn quan trọng nhất giúp bạn làm chủ trí tuệ nhân tạo.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto w-full min-h-[1200px] md:min-h-[1600px]">
        {/* Nền cực quang uốn lượn (Ẩn trên Mobile để tiết kiệm GPU) */}
        <div className="hidden md:flex absolute inset-0 justify-center pointer-events-none z-0 overflow-visible">
          <svg
            viewBox="0 0 200 1000"
            fill="none"
            preserveAspectRatio="none"
            className="w-[200px] md:w-[400px] h-full"
            style={{ filter: "blur(40px)", opacity: 0.85 }}
          >
            <defs>
              <linearGradient id="aurora1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff0080" />
                <stop offset="50%" stopColor="#7928ca" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
              <linearGradient id="aurora2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00dfd8" />
                <stop offset="50%" stopColor="#007cf0" />
                <stop offset="100%" stopColor="#00dfd8" />
              </linearGradient>
              <linearGradient id="aurora3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="50%" stopColor="#f9cb28" />
                <stop offset="100%" stopColor="#ff4d4d" />
              </linearGradient>
            </defs>

            {/* Lớp Aurora 1 (Tím/Hồng) */}
            <motion.path
              d="M 100 0 C 160 150, 40 250, 100 333 C 160 416, 40 583, 100 666 C 160 750, 40 850, 100 1000"
              stroke="url(#aurora1)"
              strokeWidth="60"
              strokeLinecap="round"
              style={{ pathLength, opacity: 0.8 }}
            />
            {/* Lớp Aurora 2 (Xanh dương/Xanh ngọc - lệch sang trái một chút) */}
            <motion.path
              d="M 80 0 C 140 150, 20 250, 80 333 C 140 416, 20 583, 80 666 C 140 750, 20 850, 80 1000"
              stroke="url(#aurora2)"
              strokeWidth="50"
              strokeLinecap="round"
              style={{ pathLength, opacity: 0.8 }}
            />
            {/* Lớp Aurora 3 (Cam/Vàng - lệch sang phải một chút) */}
            <motion.path
              d="M 120 0 C 180 150, 60 250, 120 333 C 180 416, 60 583, 120 666 C 180 750, 60 850, 120 1000"
              stroke="url(#aurora3)"
              strokeWidth="40"
              strokeLinecap="round"
              style={{ pathLength, opacity: 0.8 }}
            />
          </svg>
        </div>

        {/* Lõi sáng mỏng ở giữa tấm lụa để tạo độ sắc nét */}
        <div className="absolute inset-0 flex justify-center pointer-events-none z-10">
          <svg
            viewBox="0 0 200 1000"
            fill="none"
            preserveAspectRatio="none"
            className="w-[200px] md:w-[400px] h-full"
          >
            <defs>
              <linearGradient id="coreLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="20%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="80%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 100 0 C 160 150, 40 250, 100 333 C 160 416, 40 583, 100 666 C 160 750, 40 850, 100 1000"
              stroke="url(#coreLight)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Các chặng nội dung */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {stages.map((stage, index) => {
            return (
              <StageItem
                key={stage.id}
                stage={stage}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StageItem({
  stage,
  index,
}: {
  stage: any,
  index: number,
}) {
  const isLeft = stage.align === "left";
  const topPercent = (index * 22) + 10;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={cardVariants}
      style={{
        top: `${topPercent}%`,
      }}
      className={`absolute w-[85%] md:w-[38%] pointer-events-auto group
        ${isLeft ? 'left-6 md:left-[8%]' : 'right-6 md:right-[8%]'}
      `}
    >
      <div className="relative bg-white/70 backdrop-blur-3xl border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] rounded-2xl md:rounded-[2rem] p-5 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden">

        {/* Lớp nền ảo diệu khi hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-3 lg:gap-5 mb-3 lg:mb-5">
          <motion.div variants={childVariants} className="relative">
            <div className="absolute inset-0 bg-black blur-xl opacity-20 rounded-full group-hover:opacity-50 transition-opacity duration-500" />
            <span className="relative flex items-center justify-center shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-neutral-800 to-black text-white text-lg font-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
              0{index + 1}
            </span>
          </motion.div>

          <motion.div variants={childVariants}>
            <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-700 to-neutral-500 tracking-tight leading-tight">
              {stage.title}
            </h3>
          </motion.div>
        </div>

        <motion.p variants={childVariants} className="relative z-10 text-base md:text-lg text-neutral-600 leading-relaxed font-medium">
          {stage.desc}
        </motion.p>

        {/* Decorative inner glow (Premium feel) */}
        <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] border-2 border-white/80 pointer-events-none mix-blend-overlay"></div>
      </div>
    </motion.div>
  );
}
