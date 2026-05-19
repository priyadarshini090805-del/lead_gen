import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Hanexis — AI Lead Generation",
  description: "AI-driven social media lead generation platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
