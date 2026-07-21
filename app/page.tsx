"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ThreeDScrollHero from "@/components/ThreeDScrollHero";
import AIPathJourney from "@/components/AIPathJourney";
import BackgroundTypography from "@/components/BackgroundTypography";
import BackgroundMarquee from "@/components/BackgroundMarquee";
import BackgroundCrossedMarquee from "@/components/BackgroundCrossedMarquee";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";

// Lazy load các component dưới màn hình đầu tiên (Below-the-fold) để tối ưu thời gian nạp ban đầu
const EducationalScrollJourney = dynamic(() => import("@/components/EducationalScrollJourney"), { ssr: false });
const PromptSandbox = dynamic(() => import("@/components/PromptSandbox"), { ssr: false });
const NewsSection = dynamic(() => import("@/components/NewsSection"), { ssr: false });
const SafetyInteractiveQuiz = dynamic(() => import("@/components/SafetyInteractiveQuiz"), { ssr: false });
const AILearningModule = dynamic(() => import("@/components/AILearningModule"), { ssr: false });
const AdminDashboard = dynamic(() => import("@/components/AdminDashboard"), { ssr: false });

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleAdminToggle = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-neutral-900 font-sans selection:bg-neutral-200 selection:text-black">
      {/* Navigation bar */}
      <Navbar onAdminToggle={handleAdminToggle} isAdminOpen={isAdminOpen} />

      {/* Hero Section with Bento Grid (3D Scroll + Intro Video) */}
      <ThreeDScrollHero />

      {/* Main content layout */}
      <main className="relative z-20 bg-white">

        {/* Toggle Admin Dashboard section */}
        <AnimatePresence>
          {isAdminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden bg-neutral-50 border-b border-neutral-100"
            >
              <div className="px-6 py-8">
                <AdminDashboard />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Features Path Journey */}
        <div className="relative overflow-hidden">
          <BackgroundCrossedMarquee text="EXPLORE" opacity="0.09" />
          <AIPathJourney />
        </div>

        {/* Educational Level Scroll Journey */}
        <div id="journeys">
          <EducationalScrollJourney />
        </div>

        {/* Prompt Crafting Sandbox */}
        <div id="prompts" className="relative overflow-hidden">
          <BackgroundMarquee text="PROMPTS" speed={500} opacity="0.09" />
          <PromptSandbox />
        </div>

        {/* News Section */}
        <div id="news">
          <NewsSection />
        </div>

        <div id="safety" className="relative overflow-hidden google-grid">
          <BackgroundTypography text="SAFETY" direction="diagonal-down-left" speed={3000} opacity="0.09" />
          <AILearningModule />
          <SafetyInteractiveQuiz />
        </div>

      </main>

      {/* Footer message */}
      <Footer />
    </div>
  );
}
