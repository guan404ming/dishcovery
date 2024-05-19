import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@uploadthing/react/styles.css";

import Header from "@/components/header";
import NextAuthProvider from "@/components/next-auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

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
        <body className={cn(inter.className, "flex justify-center")}>
          <Header />
          <main className="flex min-h-screen w-full max-w-[1200px] flex-col space-y-5 px-6 py-[84px]">
            {children}
          </main>
          <Toaster />
        </body>
      </NextAuthProvider>
    </html>
  );
}
