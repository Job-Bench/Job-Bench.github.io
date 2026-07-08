import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Lora,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JobBench — Aligning Agent Work with Human Will",
  description:
    "Measuring agents by GDP alone asks how much of a human's job can be taken away. JobBench asks how much can be given back — built on the work experts across 35 professions actually want delegated to AI.",
  openGraph: {
    title: "JobBench Benchmark",
    description:
      "Aligning agent work with human will — 35 professions, graded against 2,066 fact-anchored criteria, evaluated by what workers actually want automated.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
