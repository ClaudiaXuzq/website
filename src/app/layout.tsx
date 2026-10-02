import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono, Stoke } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const stoke = Stoke({
  variable: "--font-stoke",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claudia Xu — Quantitative Research & AI Engineering",
  description:
    "Claudia Xu 的个人学术与技术 Portfolio，记录量化研究、金融、AI Engineering 与软件开发方向的经历、研究、项目和写作。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${stoke.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
