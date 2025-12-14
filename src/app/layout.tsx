import "~/styles/globals.css";
import "realgrid/dist/realgrid-style.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";

import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "~/components/Sidebar";
import { Header } from "~/components/Header";

export const metadata: Metadata = {
  title: "AI Factory Lab",
  description: "AI 기반 자동 화면 생성 시스템",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${geist.variable}`}>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-neutral-gray-10">
        <TRPCReactProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 mt-14">
                {children}
              </main>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
