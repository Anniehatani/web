"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Nền tảng kết hợp trí tuệ nhân tạo, game đoạt giải AI cho học sinh",
    source: "VNExpress",
    date: "VnExpress AI",
    image: "/images/news/news1.png",
    link: "https://vnexpress.net/nen-tang-ket-hop-tri-tue-nhan-tao-game-doat-giai-ai-cho-hoc-sinh-5067867.html",
    tag: "Phân tích"
  },
  {
    id: 2,
    title: "Người Việt học cùng AI Gemini nhiều nhất Đông Nam Á",
    source: "Tuổi Trẻ",
    date: "Tuổi Trẻ Công Nghệ",
    image: "/images/news/news2.png",
    link: "https://tuoitre.vn/nguoi-viet-hoc-cung-ai-gemini-nhieu-nhat-dong-nam-a-100260714210044722.htm",
    tag: "Xu hướng"
  },
  {
    id: 3,
    title: "Việt Nam giành 3 huy chương tại Olympic Trí tuệ nhân tạo quốc tế",
    source: "VTV News",
    date: "VTV Giáo Dục",
    image: "/images/news/news3.png",
    link: "https://vtv.vn/viet-nam-gianh-3-huy-chuong-tai-olympic-tri-tue-nhan-tao-quoc-te-2026-100260301000441964.htm",
    tag: "Góc nhìn"
  },
  {
    id: 4,
    title: "Nam sinh Đà Nẵng giành huy chương vàng Trí tuệ nhân tạo quốc tế",
    source: "Dân Trí",
    date: "Dân Trí Giáo Dục",
    image: "/images/news/news4.png",
    link: "https://dantri.com.vn/giao-duc/nam-sinh-da-nang-gianh-huy-chuong-vang-tri-tue-nhan-tao-quoc-te-20260627122515481.htm",
    tag: "Chính sách"
  }
];

export default function NewsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <>
      {/* MOBILE NEWS SECTION (Giao diện cuộn ngang vuốt nhẹ trên mobile, 0 bẫy cuộn 300vh, 0 trễ xuất hiện) */}
      <div id="news-mobile" className="block md:hidden bg-white py-12 px-5 border-t border-neutral-100">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase block">
              // BÁO CHÍ NÓI GÌ
            </span>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
              Góc Nhìn Từ <span className="font-semibold text-blue-600">Báo Chí Uy Tín</span>
            </h2>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed max-w-xs mx-auto">
              Sự bùng nổ của AI đang thay đổi cách tiếp cận giáo dục.
            </p>
          </div>

          {/* Dải bài viết vuốt ngang mượt cho Mobile */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory no-scrollbar">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group w-[260px] shrink-0 snap-center active:scale-98 transition-all"
              >
                <div className="relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[3/4] shadow-md border border-neutral-200/80">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-10"></div>
                  
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  <div className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 z-20 space-y-2">
                    <div className="flex items-center gap-2 text-[9px] text-white/90 font-mono">
                      <span className="font-bold text-white uppercase tracking-wider px-2 py-0.5 bg-blue-600 rounded-full">{article.source}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-3">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP NEWS SECTION (Giữ nguyên 100% cuộn ngang 300vh sticky + hiệu ứng phóng to hover) */}
      <section ref={targetRef} className="hidden md:block relative h-[300vh] bg-white text-neutral-900 border-t border-neutral-100">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
          
          {/* Horizontally scrolling track */}
          <motion.div style={{ x }} className="flex items-center gap-6 md:gap-12 pl-6 md:pl-24 pr-[50vw]">
            
            {/* Intro Text */}
            <div className="w-[85vw] md:w-[450px] shrink-0 mr-4 md:mr-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase block mb-4">
                  // BÁO CHÍ NÓI GÌ
                </span>
                <h2 className="text-4xl md:text-6xl font-extralight text-neutral-900 tracking-tight leading-[1.1]">
                  Góc Nhìn Từ <br />
                  <span className="font-semibold text-blue-600">Báo Chí Uy Tín</span>
                </h2>
                <p className="mt-6 text-neutral-500 text-sm md:text-base font-light leading-relaxed max-w-sm">
                  Sự bùng nổ của AI đang thay đổi hoàn toàn cách chúng ta tiếp cận giáo dục. Cùng xem các chuyên gia và các trang báo lớn tại Việt Nam nhận định thế nào về xu hướng này.
                </p>
              </motion.div>
            </div>

            {/* Cards */}
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}

          </motion.div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article, index }: { article: any, index: number }) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="block group w-[280px] md:w-[420px] shrink-0"
    >
      <div className="relative rounded-3xl overflow-hidden bg-neutral-100 aspect-[3/4] md:aspect-[3/4] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-neutral-200/60">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 z-10 transition-colors duration-500 group-hover:to-black/95"></div>
        
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100"
        />
        
        <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <ArrowUpRight size={20} className="text-white" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
           <div className="flex items-center gap-3 text-[10px] text-white/90 font-mono mb-4">
            <span className="font-semibold text-white uppercase tracking-wider px-2.5 py-1 bg-blue-600 rounded-full shadow-sm">{article.source}</span>
            <span className="drop-shadow-md">{article.date}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-white leading-snug drop-shadow-md">
            {article.title}
          </h3>
          <div className="w-0 h-[2px] bg-blue-500 mt-5 group-hover:w-full transition-all duration-700 ease-out"></div>
        </div>
      </div>
    </motion.a>
  );
}
