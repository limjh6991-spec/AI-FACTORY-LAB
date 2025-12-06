import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

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
      <body className="bg-neutral-gray-10">
        <TRPCReactProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 mt-14">
                <div className="mx-auto max-w-[1440px]">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
