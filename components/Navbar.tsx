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
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: "path",
    label: "Hành Trình",
    icon: (
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    id: "journeys",
    label: "Cấp Học",
    icon: (
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  {
    id: "prompts",
    label: "Kỹ Năng",
    icon: (
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14l5-5-5-5" />
        <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
      </svg>
    )
  },
  {
    id: "news",
    label: "Tin Tức",
    icon: (
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    )
  },
  {
    id: "safety",
    label: "An Toàn",
    icon: (
      <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
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
        className={`flex items-center justify-between w-full md:w-auto gap-2 md:gap-2.5 px-2.5 py-1.5 md:py-2 rounded-full bg-white transition-all duration-500 ${scrolled
          ? "shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          : "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          }`}
      >
        {/* Logo App Icon Badge - CHỈ ĐỔ BÓNG, KHÔNG VIỀN */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection("hero")}
          className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center cursor-pointer bg-white rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] p-1 shrink-0 transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)]"
        >
          <Image src={AppIcon} alt="Logo" className="w-full h-full object-contain rounded-[10px]" />
        </motion.div>

        {/* Mobile Quick Nav Bar - CHỈ ĐỔ BÓNG, KHÔNG VIỀN */}
        <div className="flex-1 flex md:hidden items-center justify-evenly px-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                title={item.label}
                className={`relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full transition-all duration-300 ${isActive
                  ? "bg-blue-600 text-white shadow-[0_4px_14px_rgba(0,122,255,0.4)] scale-105"
                  : "bg-white text-neutral-700 shadow-[0_3px_8px_rgba(0,0,0,0.08)] hover:bg-neutral-50 hover:text-black"
                  }`}
              >
                {item.icon}
              </button>
            );
          })}
        </div>

        {/* Desktop Navigation Tabs - CHỈ ĐỔ BÓNG, BỎ TOÀN BỘ VIỀN (NO BORDER) */}
        <div className="hidden md:flex items-center gap-2 text-sm font-bold">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${isActive
                  ? "bg-blue-600 text-white shadow-[0_4px_14px_rgba(0,122,255,0.4)] font-extrabold"
                  : "bg-white text-neutral-800 shadow-[0_3px_10px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)] hover:text-black font-bold"
                  }`}
              >
                <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-500"}`}>
                  {item.icon}
                </span>
                <span className="tracking-tight">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Actions - Hamburger Mobile CHỈ ĐỔ BÓNG, KHÔNG VIỀN */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.08)] hover:bg-neutral-50 transition-all gap-[3.5px] shrink-0"
          >
            <span className={`block w-4 h-[2px] bg-neutral-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}></span>
            <span className={`block w-4 h-[2px] bg-neutral-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-4 h-[2px] bg-neutral-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown - CHỈ ĐỔ BÓNG, KHÔNG VIỀN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-[110%] left-3 right-3 bg-white shadow-2xl rounded-3xl p-3 flex flex-col gap-1.5 md:hidden z-50"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-2xl text-left font-bold transition-all flex items-center gap-3 ${isActive
                    ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(0,122,255,0.3)]"
                    : "bg-white text-neutral-800 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:bg-neutral-50"
                    }`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center ${isActive ? "bg-white text-blue-600 shadow-sm" : "bg-neutral-100 text-neutral-600"
                    }`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
