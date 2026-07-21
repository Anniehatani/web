"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface BackgroundMarqueeProps {
  text: string;
  speed?: number; 
  className?: string;
  opacity?: string;
  lines?: number;
}

export default function BackgroundMarquee({
  text,
  speed = 1000,
  className = "",
  opacity = "0.04",
  lines = 7, // Giảm từ 11 xuống 7 dòng đủ phủ màn hình mà tiết kiệm DOM
}: BackgroundMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress when this container is in view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 35,
    restDelta: 0.001
  });

  // Tốc độ di chuyển xen kẽ: Dòng chẵn sang trái, dòng lẻ sang phải
  const xLeft = useTransform(smoothProgress, [0, 1], [speed, -speed]);
  const xRight = useTransform(smoothProgress, [0, 1], [-speed, speed]);

  // Chuỗi lặp lại đủ dài cho viewport
  const repeatedText = `${text}\u00A0\u00A0\u00A0\u00A0\u00A0`.repeat(10);

  return (
    <div 
      ref={ref} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex flex-col items-center justify-center select-none"
      aria-hidden="true"
    >
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          style={{ 
            x: i % 2 === 0 ? xLeft : xRight,
            willChange: "transform" 
          }}
          className={`whitespace-nowrap font-black tracking-tighter leading-[0.9] text-[4rem] sm:text-[6rem] md:text-[8vw] text-black ${className}`}
          initial={{ opacity: parseFloat(opacity) }}
        >
          {repeatedText}
        </motion.div>
      ))}
    </div>
  );
}
