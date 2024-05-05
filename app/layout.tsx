import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mood by Moonfleet",
  description: "AI mood tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <html
            lang="en"
            data-theme="light"
        >
          <body
              className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  fontSans.variable
              )}
          >
              {children}
          </body>
        </html>
      </ClerkProvider>
  );
}
