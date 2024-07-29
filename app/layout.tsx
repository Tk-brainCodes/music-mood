import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "music mood",
  description:
    "Get AI generated playlist from spotify based on how your mood is. Listen to songs dynamically curated for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={cn("bg-black", inter.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
