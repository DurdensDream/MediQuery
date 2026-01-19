import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Inter, Righteous } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const righteous = Righteous({ weight: "400", subsets: ["latin"], variable: "--font-adventure" });

export const metadata: Metadata = {
  title: "MediQuery: Jungle Explorer's Medical Q&A Assistant",
  description: "A jungle-themed multimodal RAG assistant for medical queries.",
  metadataBase: new URL("https://localhost")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${righteous.variable}`}>
      <body className="font-body">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
