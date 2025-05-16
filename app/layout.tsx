import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import SchemaOrg from "./SchemaOrg";
import GoogleAnalytics from "./GoogleAnalytics";
import StickyContact from "@/components/commons/StickyContact";
import Menu from "@/components/Menu";
import LoaderClient from "@/components/LoaderClient";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HippoSoft | Create to Connect",
  description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
  openGraph: {
    title: 'HippoSoft | Create to Connect',
    description: 'Create to connect. We create and build digital experiences to boost your business. We want to inspire you.',
    type: 'website',
    url: 'https://www.thehipposoft.com/',
    siteName: 'HippoSoft',
    images: [
      {
        url: 'https://www.thehipposoft.com/assets/hippo-icon.png',
        width: 512,
        height: 512,
        alt: 'HippoSoft | Create to Connect',
      }
    ],
    locale: 'en-AU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SchemaOrg />
          <GoogleAnalytics />
          <SmoothScroll>
              <Menu />
              {children}
            <CustomCursor />
            <StickyContact />
          </SmoothScroll>
      </body>
    </html>
  );
}
