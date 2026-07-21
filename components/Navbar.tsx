"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AppIcon from "@/app/icon.png";

interface NavbarProps {
  onAdminToggle?: () => void;
  isAdminOpen?: boolean;
}

const navItems = [
  { 
    id: "hero", 
    label: "Tổng Quan", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ) 
  },
  { 
    id: "path", 
    label: "Hành Trình", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ) 
  },
  { 
    id: "journeys", 
    label: "Cấp Học", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ) 
  },
  { 
    id: "prompts", 
    label: "Kỹ Năng", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14l5-5-5-5"/>
        <path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
      </svg>
    ) 
  },
  { 
    id: "news", 
    label: "Tin Tức", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
    ) 
  },
  { 
    id: "safety", 
    label: "An Toàn", 
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ) 
  },
];

export default function Navbar({ onAdminToggle, isAdminOpen }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // Observer setup for active sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    sections.forEach(sec => observer.observe(sec!));

    const handleTopScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleTopScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleTopScroll);
      sections.forEach(sec => observer.unobserve(sec!));
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-2 md:px-4">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between w-full md:w-auto gap-1.5 md:gap-3 px-2 py-1.5 md:py-2 rounded-full border border-white/60 transition-all duration-500 ${scrolled
            ? "bg-white/80 backdrop-blur-[40px] saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_20px_40px_rgba(0,0,0,0.12)]"
            : "bg-white/60 backdrop-blur-2xl saturate-[150%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.06)]"
          }`}
      >
        {/* Logo Icon */}
        <div
          onClick={() => scrollToSection("hero")}
          className="relative w-9 h-9 md:w-12 md:h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform bg-white/90 rounded-[12px] md:rounded-[14px] shadow-sm border border-white/80 p-0.5 md:p-1 shrink-0"
        >
          <Image src={AppIcon} alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Mobile quick-access menu icons (Dàn đều 6 icon trên thanh taskbar mobile) */}
        <div className="flex-1 flex md:hidden items-center justify-evenly px-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                title={item.label}
                className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-md scale-105"
                    : "bg-black/5 text-neutral-600 hover:bg-black/10 hover:text-black"
                }`}
              >
                {item.icon}
              </button>
            );
          })}
        </div>

        {/* Desktop Navigation Tabs (Hiển thị Icon bên cạnh Chữ trên PC) */}
        <div className="hidden md:flex items-center gap-1.5 text-sm font-bold text-neutral-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${
                activeSection === item.id 
                  ? "text-blue-700" 
                  : "hover:bg-black/5 hover:text-black"
              }`}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNavBg"
                  className="absolute inset-0 bg-blue-50 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className={`transition-colors ${
                  activeSection === item.id ? "text-blue-700" : "text-neutral-500"
                }`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Actions (Chỉ còn Hamburger trên Mobile, đã xóa chữ Bắt Đầu Ngay) */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 transition-colors gap-[3.5px] shrink-0"
          >
            <span className={`block w-3.5 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}></span>
            <span className={`block w-3.5 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-3.5 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[110%] left-3 right-3 bg-white/95 backdrop-blur-3xl shadow-2xl border border-white/60 rounded-3xl p-3 flex flex-col gap-1.5 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-2xl text-left font-bold transition-colors flex items-center gap-3 ${
                  activeSection === item.id 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-neutral-800 hover:bg-black/5"
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  activeSection === item.id ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-600"
                }`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
