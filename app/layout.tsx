import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinnacle Bank",
  description: "Created with v0",
  generator: "v0.app",
  openGraph: {
    title: "Pinnacle Bank",
    description: "Personal Banking Made Simple",
    url: "https://www.pinnaclebank.com/",
    siteName: "Pinnacle Bank",
    images: [
      {
        url: "https://www.pinnaclebank.com/wp-content/uploads/2021/02/NewLogo-1-e1613617097688.png",
        width: 1200,
        height: 630,
        alt: "Pinnacle Bank Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster position="top-right" className="z-[100000]" />
      </body>
    </html>
  );
}
