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

const METADATA_BY_LOCALE = {
    en: {
        title: "HippoSoft | Create to Connect",
        description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
        ogLocale: "en_AU",
        ogAlternateLocale: "es_ES",
    },
    es: {
        title: "HippoSoft | Crear Para Conectar",
        description: "Creamos para conectar. Diseñamos y desarrollamos experiencias digitales para potenciar tu negocio.",
        ogLocale: "es_ES",
        ogAlternateLocale: "en_AU",
    },
} as const;

type LayoutProps = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { locale } = await params;
    const currentLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
    const localeMetadata = METADATA_BY_LOCALE[currentLocale as keyof typeof METADATA_BY_LOCALE];
    const canonical = `/${currentLocale}`;

    return {
        metadataBase: new URL("https://www.thehipposoft.com"),
        title: localeMetadata.title,
        description: localeMetadata.description,
        alternates: {
            canonical,
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
            title: localeMetadata.title,
            description: localeMetadata.description,
            type: "website",
            url: canonical,
            siteName: "HippoSoft",
            images: [
                {
                    url: "/assets/hippo-icon.png",
                    width: 1200,
                    height: 630,
                    alt: localeMetadata.title,
                },
            ],
            locale: localeMetadata.ogLocale,
            alternateLocale: [localeMetadata.ogAlternateLocale],
        },
        twitter: {
            card: "summary_large_image",
            title: localeMetadata.title,
            description: localeMetadata.description,
            images: ["/assets/hippo-icon.png"],
        },
    };
}

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
