import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import NextAuthProvider from "@/components/next-auth-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dishcovery",
  description: "a community-driven platform dedicated to reducing food waste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <Header />
          <main className="flex min-h-screen w-full flex-col space-y-5 px-6 py-[84px]">
            {children}
          </main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
