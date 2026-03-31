import type { Metadata } from "next";
import { Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EijiCode | 岐阜のシステム開発",
  description:
    "岐阜エリアの中小企業向けシステム開発・Web制作。最新技術で信頼性の高いソリューションを提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
