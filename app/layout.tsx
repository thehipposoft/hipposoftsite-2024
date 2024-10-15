import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HippoSoft | Create to Connect",
  description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
      </body>
    </html>
  );
}
