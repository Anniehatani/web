"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface BackgroundCrossedMarqueeProps {
  text: string;
  className?: string;
  opacity?: string;
}

export default function BackgroundCrossedMarquee({
  text,
  className = "",
  opacity = "0.18",
}: BackgroundCrossedMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 35,
    restDelta: 0.001,
  });

  // Khôi phục chính xác logic cuộn chữ chạy trên đường cong gốc
  const startOffset1 = useTransform(smoothProgress, [0, 1], ["-120%", "40%"]);
  const startOffset2 = useTransform(smoothProgress, [0, 1], ["60%", "-100%"]);

  // Translate dọc theo cuộn chuột
  const yTranslate = useTransform(smoothProgress, [0, 1], [-300, 400]);

  // Tối ưu số lần lặp chữ (18 lần là đủ phủ kín đường cong mà không dư thừa DOM)
  const repeatedText = `${text}\u00A0\u00A0`.repeat(18);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full object-cover"
        style={{ 
          opacity: parseFloat(opacity),
          willChange: "transform",
          transform: "translateZ(0)"
        }}
      >
        <defs>
          {/* Đường cong uốn lượn xuống ở giữa (Cấu trúc gốc) */}
          <path
            id="curve-1"
            d="M -100 100 Q 500 500 1100 100"
            fill="transparent"
          />
          {/* Đường cong uốn lượn lên ở giữa (Cấu trúc gốc) */}
          <path
            id="curve-2"
            d="M -100 700 Q 500 200 1100 700"
            fill="transparent"
          />
        </defs>

        {/* Text 1: Chạy dọc đường cong curve-1 và trượt xuống */}
        <motion.text 
          style={{ y: yTranslate, willChange: "transform" }}
          className="fill-black font-black tracking-[0.12em] text-[75px] uppercase"
        >
          <motion.textPath href="#curve-1" startOffset={startOffset1}>
            {repeatedText}
          </motion.textPath>
        </motion.text>

        {/* Text 2: Chạy dọc đường cong curve-2 và trượt xuống */}
        <motion.text 
          style={{ y: yTranslate, willChange: "transform" }}
          className="fill-black font-black tracking-[0.12em] text-[75px] uppercase"
        >
          <motion.textPath href="#curve-2" startOffset={startOffset2}>
            {repeatedText}
          </motion.textPath>
        </motion.text>
      </svg>
    </div>
  );
}
