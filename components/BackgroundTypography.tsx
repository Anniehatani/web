"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface BackgroundTypographyProps {
  text: string;
  direction?: "left" | "right" | "up" | "down" | "diagonal-up-right" | "diagonal-down-right" | "diagonal-up-left" | "diagonal-down-left";
  speed?: number; // Main speed for X
  speedY?: number; // Speed for Y
  className?: string;
  opacity?: string;
}

export default function BackgroundTypography({
  text,
  direction = "left",
  speed = 200,
  speedY = 1000,
  className = "",
  opacity = "0.18",
}: BackgroundTypographyProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress when this container is in view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Tốc độ X tăng lên theo yêu cầu, tốc độ Y giữ nguyên mức cao.
  const currentSpeedX = speed * 1.5;
  const currentSpeedY = speedY;

  // Map scroll progress to X translations
  const x = useTransform(
    smoothProgress,
    [0, 1],
    direction === "left" || direction === "diagonal-up-left" || direction === "diagonal-down-left" ? [currentSpeedX, -currentSpeedX] :
      direction === "right" || direction === "diagonal-up-right" || direction === "diagonal-down-right" ? [-currentSpeedX, currentSpeedX] :
        [0, 0]
  );

  // Map scroll progress to Y translations
  const y = useTransform(
    smoothProgress,
    [0, 1],
    direction === "up" || direction === "diagonal-up-left" || direction === "diagonal-up-right" ? [currentSpeedY, -currentSpeedY] :
      direction === "down" || direction === "diagonal-down-left" || direction === "diagonal-down-right" ? [-currentSpeedY, currentSpeedY] :
        [0, 0]
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ x, y, willChange: "transform" }}
        className="whitespace-nowrap font-black tracking-tighter leading-none text-[5rem] sm:text-[8rem] md:text-[10vw] text-black"
        initial={{ opacity: parseFloat(opacity) }}
      >
        {`${text}\u00A0\u00A0\u00A0\u00A0\u00A0`.repeat(6)}
      </motion.div>
    </div>
  );
}
