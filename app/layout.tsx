import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI trong học tập | Học tập thông minh, an toàn và hiệu quả",
  description: "Cẩm nang hướng dẫn sử dụng AI thông minh, an toàn, tối ưu câu lệnh dành cho học sinh THCS, THPT và Sinh viên.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${jakarta.variable}`}>
      <body className="antialiased">
        {children}
        <FloatingAIAssistant />
      </body>
    </html>
  );
}
