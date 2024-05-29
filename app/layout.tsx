import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import {Theme} from "@radix-ui/themes";
import {Inter, Playfair} from "next/font/google"
import { cn } from "@/lib/utils"
import '@radix-ui/themes/styles.css';
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});
const playfair = Playfair({
    subsets: ["latin"],
    variable: '--font-playfair',
});
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
            className={`${inter.variable} ${playfair.variable}`}

        >
          <body
              className={cn("min-h-screen")}
          >
              <Theme appearance="light" accentColor="indigo" panelBackground="translucent">
                  {children}
              </Theme>
          </body>
        </html>
      </ClerkProvider>
  );
}
