"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { educationalLevels, EducationalLevel } from "@/data/content";

export default function AdminDashboard() {
  const [lessons, setLessons] = useState<EducationalLevel[]>(educationalLevels);
  const [activeTab, setActiveTab] = useState<"articles" | "stats">("stats");

  // State Form để Thêm/Sửa Bài Học
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("THCS");
  const [desc, setDesc] = useState("");

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;

    const newLesson: EducationalLevel = {
      id: Math.random().toString(),
      badge,
      title,
      subtitle: `Dành cho cấp độ ${badge}`,
      desc,
      giantBgText: "EXPLORE",
      textInstructions: ["Nội dung tự chọn 1", "Nội dung tự chọn 2"],
      promptExample: {
        title: "Ví dụ tùy biến",
        description: "Mô tả của quản trị viên",
        badPrompt: "Hỏi hời hợt",
        goodPrompt: "Hỏi chi tiết đầy đủ ngữ cảnh",
        simulatedResponse: "AI đã được tinh chỉnh"
      }
    };

    setLessons([...lessons, newLesson]);
    setTitle("");
    setDesc("");
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id));
  };
  return (
    <div className="bg-studio-bg border border-white/[0.04] rounded-2xl p-8 shadow-2xl max-w-7xl mx-auto my-16 relative z-30">
      
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/[0.04]">
        <div>
          <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest block mb-2">Hệ Thống Quản Trị Hệ Thống</span>
          <h2 className="text-3xl font-light tracking-tight text-white">SmartLearn Dashboard</h2>
        </div>

        <div className="flex gap-2 p-1 border border-white/[0.06] bg-studio-card">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-3 text-[10px] font-medium uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === "stats" ? "bg-white text-black" : "text-neutral-500 hover:text-white hover:bg-neutral-900"
            }`}
          >
            Thống kê truy cập
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-6 py-3 text-[10px] font-medium uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === "articles" ? "bg-white text-black" : "text-neutral-500 hover:text-white hover:bg-neutral-900"
            }`}
          >
            Quản lý bài viết ({lessons.length})
          </button>
        </div>
      </div>

      {/* Tab: Thống Kê Truy Cập */}
      {activeTab === "stats" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Tổng lượt xem (PV)", val: "142,504", trend: "+12.4% hôm nay" },
              { label: "Người dùng duy nhất (UV)", val: "38,912", trend: "+8.3% tháng này" },
              { label: "Thời lượng đọc trung bình", val: "4m 52s", trend: "Cải thiện 15%" },
              { label: "Tỷ lệ tương tác prompt", val: "84.2%", trend: "+5.1% tuần này" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-studio-card p-6 border border-white/[0.04]">
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest block mb-4">{stat.label}</span>
                <span className="text-3xl font-light tracking-tight text-white block mb-2">{stat.val}</span>
                <span className="text-[10px] text-neutral-400 font-mono">{stat.trend}</span>
              </div>
            ))}
          </div>

          {/* Biểu Đồ Trực Quan Bằng Tailwind (Mock Chart) - Monochrome */}
          <div className="bg-studio-card p-8 border border-white/[0.04]">
            <h4 className="text-[10px] font-medium text-neutral-500 mb-8 uppercase tracking-widest">// Tỷ lệ quan tâm theo cấp học (Tuần này)</h4>
            <div className="h-64 flex items-end gap-6 md:gap-12 pt-8 px-4 border-b border-l border-white/[0.1] relative">
              
              {/* Bar 1 */}
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full bg-neutral-800 relative group-hover:bg-neutral-700 transition-all" style={{ height: "45%" }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-400">45%</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">Cấp THCS</span>
              </div>

              {/* Bar 2 */}
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full bg-neutral-600 relative group-hover:bg-neutral-500 transition-all" style={{ height: "75%" }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">75%</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">Cấp THPT</span>
              </div>

              {/* Bar 3 */}
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full bg-white relative group-hover:bg-neutral-200 transition-all" style={{ height: "92%" }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">92%</span>
                </div>
                <span className="text-[10px] text-white font-medium uppercase tracking-widest">Sinh Viên</span>
              </div>

              {/* Bar 4 */}
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full bg-neutral-700 relative group-hover:bg-neutral-600 transition-all" style={{ height: "60%" }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-300">60%</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">An Toàn AI</span>
              </div>

            </div>
          </div>
        </motion.div>
      )}

      {/* Tab: Quản Lý Bài Viết */}
      {activeTab === "articles" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Thêm Bài Mới Form */}
          <form onSubmit={handleAddLesson} className="lg:col-span-4 bg-studio-card p-8 border border-white/[0.04] space-y-6">
            <h4 className="text-sm font-medium tracking-tight text-white mb-4 uppercase">Thêm nội dung bài học</h4>
            
            <div>
              <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest block mb-2">Chọn phân mục cấp học:</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-studio-bg border border-white/[0.06] p-4 text-sm focus:outline-none focus:border-white/[0.2] text-white cursor-pointer transition-colors appearance-none font-light"
              >
                <option value="THCS">Cấp THCS</option>
                <option value="THPT">Cấp THPT</option>
                <option value="Sinh Viên">Cấp Sinh Viên</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest block mb-2">Tiêu đề bài viết:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Cách đọc hiểu bài luận"
                className="w-full bg-studio-bg border border-white/[0.06] p-4 text-sm focus:outline-none focus:border-white/[0.2] text-white placeholder-neutral-700 transition-colors font-light"
              />
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest block mb-2">Mô tả ngắn:</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Nội dung tóm tắt chi tiết..."
                rows={4}
                className="w-full bg-studio-bg border border-white/[0.06] p-4 text-sm focus:outline-none focus:border-white/[0.2] text-white placeholder-neutral-700 resize-none transition-colors font-light"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-neutral-200 text-black font-medium py-4 text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
            >
              Phát hành bài mới
            </button>
          </form>

          {/* Danh Sách Bài Viết Hiện Tại */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-sm font-medium tracking-tight text-white mb-4 uppercase">Danh mục đang xuất bản</h4>
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-studio-bg p-6 border border-white/[0.04] flex justify-between items-center gap-6 hover:border-white/[0.15] transition-colors"
              >
                <div className="truncate">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-neutral-800 text-white text-[9px] font-medium tracking-widest uppercase">
                      {lesson.badge}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">ID: {lesson.id.slice(0, 5)}</span>
                  </div>
                  <h5 className="font-light text-base text-white truncate">{lesson.title}</h5>
                  <p className="text-xs text-neutral-400 truncate max-w-lg mt-1 font-light">{lesson.desc}</p>
                </div>

                <button
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="bg-transparent hover:bg-white text-neutral-500 hover:text-black text-[10px] font-medium tracking-widest uppercase px-5 py-3 transition-colors border border-white/[0.06] hover:border-white cursor-pointer shrink-0"
                >
                  Gỡ bài
                </button>
              </div>
            ))}
          </div>

        </motion.div>
      )}
    </div>
  );
}
