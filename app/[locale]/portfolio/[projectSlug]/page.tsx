import { ResolvingMetadata, Metadata } from "next";
import { hasLocale } from "next-intl";
import { PROJECTS } from "@/components/Portfolio/constants";
import SingleProject from "@/components/Portfolio/SingleProject";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type PropsType = {
    params: Promise<{
        locale: string;
        projectSlug: string;
    }>;
}

export async function generateMetadata({
    params
}: PropsType, parent: ResolvingMetadata): Promise<Metadata> {
    const paramsResolved = await params;
    const locale = hasLocale(routing.locales, paramsResolved.locale)
        ? paramsResolved.locale
        : routing.defaultLocale;
    const slug = paramsResolved.projectSlug;
    const projectData = PROJECTS[slug];
    const canonical = `/${locale}/portfolio/${slug}`;

    if (projectData) {
        const previousImages = (await parent).openGraph?.images || [];
        const projectName = projectData.name || 'Project';
        const industry = projectData.industry || 'Design & Development';
        const work = projectData.work || 'Web Design + Development';
        const description = `${projectName}: ${industry} project. Our work includes ${work}.`;

        return {
            title: `HippoSoft | Portfolio | ${projectName}`,
            description,
            alternates: {
                canonical,
                languages: {
                    "en-AU": `/en/portfolio/${slug}`,
                    "es-ES": `/es/portfolio/${slug}`,
                    "x-default": `/en/portfolio/${slug}`,
                },
            },
            openGraph: {
                title: `HippoSoft | Portfolio | ${projectName}`,
                description,
                type: 'article',
                url: canonical,
                images: [
                    projectData.mockBig || '/assets/hippo-icon.png',
                    ...previousImages,
                ],
                locale: locale === "es" ? "es_ES" : "en_AU",
                alternateLocale: [locale === "es" ? "en_AU" : "es_ES"],
            },
            twitter: {
                card: 'summary_large_image',
                title: `HippoSoft | Portfolio | ${projectName}`,
                description,
                images: [projectData.mockBig || '/assets/hippo-icon.png'],
            },
        };
    }

    return {
        title: `HippoSoft | Portfolio | No project found`,
        description: 'The requested project could not be found.',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function ProjectPage({
    params
}: PropsType) {
    const paramsResolved = await params;
    const slug = paramsResolved.projectSlug;
    const projectData = PROJECTS[slug];

    if (!projectData) {
        notFound();
    }

    return <SingleProject project={projectData} />;
}

