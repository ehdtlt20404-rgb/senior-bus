import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "쉬운 고속버스 예약 | 누구나 쉽게",
  description: "어르신과 처음 이용하시는 분들도 쉽게 고속버스를 예약할 수 있는 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Noto Sans KR', 'Malgun Gothic', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
