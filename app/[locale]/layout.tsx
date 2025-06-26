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
import Transitions from "@/components/commons/Transitions";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getMessages } from "next-intl/server";

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

export default async function RootLayout({
  children,
  params
}:{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }

    const messages = await getMessages()
    
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <SchemaOrg />
          <GoogleAnalytics />
          <SmoothScroll>
              <LoaderClient>
                <Transitions />
                  <Menu />
                  {children}
                <CustomCursor />
                <StickyContact />
              </LoaderClient>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
