import React from "react";

export default function Footer() {
  return (
    <footer className="bg-studio-bg text-neutral-500 border-t border-white/[0.04] py-20 px-6 relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <span className="text-2xl font-light tracking-tight text-white">
            OMNI AI
          </span>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Dự án thuộc chiến dịch <strong>"Smart AI-Learner"</strong> do nhóm Omni Artificial Intelligence – Sinh viên Đại học CMC thực hiện. Nhằm mục đích ứng dụng trí tuệ nhân tạo đúng mục tiêu và an toàn.
          </p>
        </div>

        {/* Cấp học */}
        <div>
          <h4 className="text-white font-medium text-[10px] uppercase tracking-widest mb-6">Các Cấp Học</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#journeys" className="hover:text-white transition-colors">Trung học cơ sở</a></li>
            <li><a href="#journeys" className="hover:text-white transition-colors">Trung học phổ thông</a></li>
            <li><a href="#journeys" className="hover:text-white transition-colors">Sinh viên đại học</a></li>
          </ul>
        </div>

        {/* Kỹ năng */}
        <div>
          <h4 className="text-white font-medium text-[10px] uppercase tracking-widest mb-6">Nhóm Kỹ Năng</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#prompts" className="hover:text-white transition-colors">Kỹ năng viết Prompt</a></li>
            <li><a href="#safety" className="hover:text-white transition-colors">Kiểm chứng thông tin</a></li>
            <li><a href="#safety" className="hover:text-white transition-colors">Đạo đức sử dụng AI</a></li>
          </ul>
        </div>

        {/* Bản quyền */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-medium text-[10px] uppercase tracking-widest">Thông điệp cốt lõi</h4>
          <p className="text-sm italic text-neutral-400 font-light leading-relaxed">
            “AI không thay thế con người, nhưng người biết sử dụng AI sẽ thay thế những người không biết dùng.”
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-medium">
        <span>© {new Date().getFullYear()} Nhóm OMNI AI (Đại học CMC) - Chiến dịch Smart AI-Learner.</span>
        <span>Thiết kế và phát triển bởi Sinh viên Đại học CMC</span>
      </div>
    </footer>
  );
}
