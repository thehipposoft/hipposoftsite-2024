import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import SchemaOrg from "./SchemaOrg";
import GoogleAnalytics from "./GoogleAnalytics";
import StickyContact from "@/components/commons/StickyContact";
import Menu from "@/components/Menu";
import CustomCursor from "@/components/CustomCursor";
import Transitions from "@/components/commons/Transitions";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getMessages } from "next-intl/server";
import LocaleSwitcherButton from "@/components/commons/LocaleSwitcherButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://www.thehipposoft.com"),
    title: "HippoSoft | Create to Connect",
    description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
    alternates: {
        canonical: "/",
        languages: {
            "en-AU": "/en",
            "es-ES": "/es",
            "x-default": "/en",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        title: 'HippoSoft | Create to Connect',
        description: 'Create to connect. We create and build digital experiences to boost your business. We want to inspire you.',
        type: 'website',
        url: '/',
        siteName: 'HippoSoft',
        images: [
        {
            url: '/assets/hippo-icon.png',
            width: 1200,
            height: 630,
            alt: 'HippoSoft | Create to Connect',
        }
        ],
        locale: 'en-AU',
    },
    twitter: {
        card: "summary_large_image",
        title: "HippoSoft | Create to Connect",
        description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
        images: ["/assets/hippo-icon.png"],
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
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                <SchemaOrg />
                <GoogleAnalytics />
                <SmoothScroll>
                    <Transitions />
                    <LocaleSwitcherButton />
                    <Menu />
                    {children}
                    <CustomCursor />
                    <StickyContact />
                </SmoothScroll>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
