import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type LocaleContent = {
    title: string;
    description: string;
    socialDescription?: string;
};

type LocalizedMetadataInput = {
    locale: string;
    path: string;
    image?: string;
    imageAlt: string;
    type?: "website" | "article";
    content: {
        en: LocaleContent;
        es: LocaleContent;
    };
};

const OG_LOCALE = {
    en: "en_AU",
    es: "es_ES",
} as const;

export function buildLocalizedMetadata({
    locale,
    path,
    image = "/assets/hippo-icon.png",
    imageAlt,
    type = "website",
    content,
}: LocalizedMetadataInput): Metadata {
    const currentLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
    const fallbackLocale = currentLocale === "es" ? "en" : "es";
    const current = content[currentLocale as keyof typeof content];

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const canonical = `/${currentLocale}${normalizedPath}`;

    return {
        title: current.title,
        description: current.description,
        alternates: {
            canonical,
            languages: {
                "en-AU": `/en${normalizedPath}`,
                "es-ES": `/es${normalizedPath}`,
                "x-default": `/en${normalizedPath}`,
            },
        },
        openGraph: {
            title: current.title,
            description: current.socialDescription || current.description,
            type,
            url: canonical,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: imageAlt,
                },
            ],
            locale: OG_LOCALE[currentLocale as keyof typeof OG_LOCALE],
            alternateLocale: [OG_LOCALE[fallbackLocale as keyof typeof OG_LOCALE]],
        },
        twitter: {
            card: "summary_large_image",
            title: current.title,
            description: current.socialDescription || current.description,
            images: [image],
        },
    };
}
