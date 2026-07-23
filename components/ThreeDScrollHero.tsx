"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ThreeDScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const totalFrames = 240;

  // 1. TẢI TRƯỚC HÌNH ẢNH 3D NÂNG CAO (2 GIAI ĐOẠN + THROTTLED STATE UPDATES)
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    let lastReportedPercent = 0;

    const updateProgress = () => {
      loaded++;
      const percent = Math.floor((loaded / totalFrames) * 100);
      // Chỉ update React state khi tăng >= 5% hoặc hoàn thành để tránh 240 lần re-render
      if (percent - lastReportedPercent >= 5 || loaded === totalFrames) {
        lastReportedPercent = percent;
        setLoadedCount(loaded);
      }
      // Khung hình ban đầu (20 frames) nạp xong là có thể hiển thị tức thì cho người dùng
      if (loaded >= 20 && !isPreloaded) {
        setIsPreloaded(true);
      }
    };

    // Phase 1: Nạp 20 ảnh đầu tiên để hiển thị tức thì
    const initialPromises = [];
    for (let i = 1; i <= Math.min(20, totalFrames); i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/web3d/ezgif-frame-${frameNum}.jpg`;
      loadedImages[i - 1] = img;
      initialPromises.push(
        new Promise<void>((resolve) => {
          img.onload = () => {
            if (!isCancelled) updateProgress();
            resolve();
          };
          img.onerror = () => resolve();
        })
      );
    }

    setImages(loadedImages);

    // Phase 2: Nạp ngầm các ảnh còn lại theo batch 15 ảnh mỗi đợt
    Promise.all(initialPromises).then(() => {
      if (isCancelled) return;
      setIsPreloaded(true);

      let currentFrame = 21;
      const loadNextBatch = () => {
        if (isCancelled || currentFrame > totalFrames) return;
        const batchEnd = Math.min(currentFrame + 15, totalFrames + 1);
        
        for (let i = currentFrame; i < batchEnd; i++) {
          const img = new Image();
          const frameNum = String(i).padStart(3, "0");
          img.src = `/web3d/ezgif-frame-${frameNum}.jpg`;
          loadedImages[i - 1] = img;
          img.onload = () => {
            if (!isCancelled) updateProgress();
          };
        }

        currentFrame = batchEnd;
        if (currentFrame <= totalFrames) {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadNextBatch, { timeout: 200 });
          } else {
            setTimeout(loadNextBatch, 50);
          }
        }
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. LOGIC CUỘN
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 40, 
    stiffness: 80, 
    restDelta: 0.001 
  });

  // --- MÀN 1: 3D HERO BÊN PHẢI ---
  const canvasOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);
  const canvasScale = useTransform(smoothProgress, [0.15, 0.25], [1, 0.9]);
  const canvasX = useTransform(smoothProgress, [0.15, 0.25], ["0%", "-10%"]);

  // --- MÀN 1: TEXT CHÍNH BÊN TRÁI ---
  const heroTextOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0.15, 0.25], ["0%", "-20%"]);

  // --- MÀN 2: BÊN PHẢI (VIDEO) ---
  const videoY = useTransform(smoothProgress, [0.25, 0.3], [100, 0]);
  const videoOpacity = useTransform(smoothProgress, [0.25, 0.3], [0, 1]);

  // --- MÀN 2: BÊN TRÁI (THÔNG TIN CHẠY TUẦN TỰ) ---
  const block1Y = useTransform(smoothProgress, [0.3, 0.35, 0.45, 0.5], [40, 0, 0, -40]);
  const block1Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  
  const block2Y = useTransform(smoothProgress, [0.5, 0.55, 0.65, 0.7], [40, 0, 0, -40]);
  const block2Opacity = useTransform(smoothProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);

  const block3Y = useTransform(smoothProgress, [0.7, 0.75, 0.85, 0.9], [40, 0, 0, -40]);
  const block3Opacity = useTransform(smoothProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);

  // --- MÀN 2: WATERMARK VÒNG XOÁY CHỮ CHO TỔNG QUAN ---
  const spiralScale = useTransform(smoothProgress, [0.25, 0.92], [0, 4.0]);
  const spiralRotate = useTransform(smoothProgress, [0.25, 0.92], [0, 360]);
  const spiralOpacity = useTransform(smoothProgress, [0.25, 0.32, 0.85, 0.92], [0, 0.1, 0.1, 0]);

  // Ref lưu frame vừa vẽ gần nhất để tránh redraw trùng lắp
  const lastDrawnFrameRef = useRef<number>(-1);

  // 3. ĐIỀU KHIỂN RENDER 3D CANVAS THEO SCROLL (GIỚI HẠN DPR + OPTIMIZED DRAW)
  useEffect(() => {
    if (!isPreloaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const draw = (latest: number) => {
      let frameProgress = latest / 0.20;
      frameProgress = Math.min(1, Math.max(0, frameProgress));
      
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(frameProgress * totalFrames))
      );

      // Nếu frameIndex giống frame vừa vẽ thì bỏ qua để tiết kiệm GPU
      if (frameIndex === lastDrawnFrameRef.current) return;

      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        lastDrawnFrameRef.current = frameIndex;

        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
    };

    let resizeRafId: number;
    const resizeCanvas = () => {
      // Giới hạn DPR ở mức tối đa 1.5x giúp mượt gấp 2-3 lần trên màn hình Retina / 4K
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      lastDrawnFrameRef.current = -1; // Reset để bắt buộc vẽ lại sau resize
      draw(smoothProgress.get());
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();

    const unsubscribe = smoothProgress.on("change", draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(resizeRafId);
      unsubscribe();
    };
  }, [isPreloaded, images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-white">
      {/* KHÓA TRỤC SCREEN */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-10 bg-white google-grid">
        
        {/* Loading Overlay */}
        {!isPreloaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="w-64 sm:w-80 flex flex-col items-center gap-5">
              <div className="relative w-full h-[4px] bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-neutral-900 to-neutral-600 transition-all duration-300 ease-out rounded-full" 
                  style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse mix-blend-overlay" />
                </div>
              </div>
              <span className="text-[10px] font-semibold text-neutral-400 tracking-[0.3em] uppercase tabular-nums">
                {Math.round((loadedCount / totalFrames) * 100)}%
              </span>
            </div>
          </div>
        )}

        {isPreloaded && (
          <>
            {/* 3D CANVAS (BÊN PHẢI) */}
            <motion.div 
              style={{ opacity: canvasOpacity, scale: canvasScale, x: canvasX }}
              className="absolute inset-0 w-full h-full pointer-events-none mix-blend-darken flex justify-end"
            >
              <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full object-cover mix-blend-darken pointer-events-none opacity-90" />
            </motion.div>

            {/* SPINDLE WATERMARK (MÀN 2 - 01 TỔNG QUAN) */}
            <motion.div
              style={{ 
                opacity: spiralOpacity, 
                scale: spiralScale, 
                rotate: spiralRotate,
                willChange: "transform",
                transform: "translateZ(0)"
              }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center overflow-hidden"
            >
              <svg
                viewBox="0 0 1000 1000"
                className="w-[90vw] h-[90vw] max-w-[850px] max-h-[850px] text-neutral-400"
              >
                <defs>
                  <path
                    id="circle-path"
                    d="M 500 500 m -250 0 a 250 250 0 1 1 500 0 a 250 250 0 1 1 -500 0"
                    fill="none"
                    stroke="none"
                  />
                </defs>
                <text className="fill-black font-black tracking-[0.12em] text-[26px] uppercase">
                  <textPath href="#circle-path" startOffset="0%">
                    {"OMNI AI • FUTURE LEARNING • CORE TECHNOLOGY • INNOVATION • SECURITY • ".repeat(2)}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="absolute inset-0 w-full h-full z-20 flex pointer-events-none items-center">
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 px-5 md:px-16 items-center">
                
                {/* CỘT TRÁI: TEXT HERO & TEXT TUẦN TỰ */}
                <div className="relative h-[220px] md:h-[400px] flex items-center">
                  
                  {/* Text Hero (Màn 1) */}
                  <motion.div 
                    style={{ opacity: heroTextOpacity, y: heroTextY }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                  >
                    {/* Lớp phủ radial-gradient sau lưng khối chữ để đảm bảo độ tương phản */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_left_center,_rgba(0,0,0,0.5)_0%,_transparent_70%)] -z-10 blur-2xl" />

                    <span className="text-[10px] font-mono text-neutral-300 tracking-[0.3em] uppercase block mb-6 drop-shadow-md">
                      // Chiến dịch Smart AI-Learner
                    </span>
                    <h1 
                      className="text-[2.5rem] leading-[1.1] md:text-[5.5rem] font-medium tracking-tight text-white md:leading-[1.05]"
                      style={{ textShadow: "0 10px 40px rgba(0,0,0,0.4)" }}
                    >
                      Học tập <br />
                      <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">
                        thông minh hơn
                      </span>
                      <br />
                      bằng AI
                    </h1>
                    <p className="text-sm md:text-lg text-white/80 font-light mt-4 md:mt-8 max-w-xl leading-relaxed drop-shadow-lg">
                      Một dự án của Nhóm Omni Artificial Intelligence (Sinh viên Đại học CMC). Cuộn chuột để bắt đầu hành trình học tập cá nhân hóa chuẩn Google.
                    </p>
                  </motion.div>

                  {/* Text Tuần Tự (Màn 2) */}
                  {/* Khối 1 */}
                  <motion.div 
                    style={{ y: block1Y, opacity: block1Opacity }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase mb-4">
                      01 // Tổng Quan
                    </span>
                    <h2 className="text-[2rem] md:text-5xl font-light text-[#1f2124] mb-3 md:mb-6 leading-tight">
                      Công nghệ lõi <br/>
                      <span className="font-medium text-blue-600">
                        Định hình tương lai
                      </span>
                    </h2>
                    <p className="text-sm md:text-lg text-neutral-500 leading-relaxed max-w-md font-light">
                      Sức mạnh của trí tuệ nhân tạo giờ đây được thiết kế riêng biệt để hỗ trợ trải nghiệm học tập, giúp việc tiếp thu kiến thức trở nên trực quan, sinh động hơn bao giờ hết.
                    </p>
                  </motion.div>

                  {/* Khối 2 */}
                  <motion.div 
                    style={{ y: block2Y, opacity: block2Opacity }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase mb-4">
                      02 // Lợi ích
                    </span>
                    <h2 className="text-[2rem] md:text-5xl font-light text-[#1f2124] mb-3 md:mb-6 leading-tight">
                      Chủ động <br/>
                      <span className="font-medium text-emerald-600">
                        Cá nhân hóa
                      </span>
                    </h2>
                    <p className="text-sm md:text-lg text-neutral-500 leading-relaxed max-w-md font-light">
                      Hệ thống sẽ tự động phân tích và đưa ra lộ trình học tập tối ưu, theo sát tốc độ, khả năng tiếp thu và sở thích của từng cá nhân để đạt được hiệu quả vượt trội.
                    </p>
                  </motion.div>

                  {/* Khối 3 */}
                  <motion.div 
                    style={{ y: block3Y, opacity: block3Opacity }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase mb-4">
                      03 // Phát triển
                    </span>
                    <h2 className="text-[2rem] md:text-5xl font-light text-[#1f2124] mb-3 md:mb-6 leading-tight">
                      Nâng tầm <br/>
                      <span className="font-medium text-purple-600">
                        Tư duy phản biện
                      </span>
                    </h2>
                    <p className="text-sm md:text-lg text-neutral-500 leading-relaxed max-w-md font-light">
                      AI không chỉ cung cấp đáp án mà còn gợi mở hướng giải quyết vấn đề, rèn luyện tư duy logic, phản biện đa chiều và định hướng kỹ năng mềm quan trọng.
                    </p>
                  </motion.div>

                </div>

                {/* CỘT PHẢI: VIDEO */}
                <div className="relative h-[220px] md:h-[600px] w-full flex items-center justify-center lg:justify-end">
                  <motion.div 
                    style={{ y: videoY, opacity: videoOpacity }}
                    className="relative w-full max-w-lg aspect-video rounded-2xl md:rounded-[24px] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-[#e8eaed] bg-white pointer-events-auto"
                  >
                    <video
                      src="/intro.mp4"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      controlsList="nodownload"
                      data-idm-members="disabled"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white transition-all hover:bg-white group"
                      aria-label="Toggle sound"
                    >
                      <div className="flex items-end justify-center gap-[3px] h-4">
                        <motion.div animate={{ height: isMuted ? 4 : [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className={`w-[2px] rounded-full transition-colors ${isMuted ? 'bg-neutral-800/50' : 'bg-neutral-800'}`} />
                        <motion.div animate={{ height: isMuted ? 4 : [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.1 }} className={`w-[2px] rounded-full transition-colors ${isMuted ? 'bg-neutral-800/50' : 'bg-neutral-800'}`} />
                        <motion.div animate={{ height: isMuted ? 4 : [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.2 }} className={`w-[2px] rounded-full transition-colors ${isMuted ? 'bg-neutral-800/50' : 'bg-neutral-800'}`} />
                      </div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
