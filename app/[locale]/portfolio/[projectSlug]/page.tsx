import { ResolvingMetadata, Metadata } from "next";
import { PROJECTS } from "@/components/Portfolio/constants";
import SingleProject from "@/components/Portfolio/SingleProject";

type PropsType = {
    params: Promise<{
        projectSlug: string;
    }>;
}

export async function generateMetadata({
    params
}: PropsType, parent: ResolvingMetadata): Promise<Metadata> {
    const paramsResolved = await params;
    const project = paramsResolved.projectSlug;
    const slug = paramsResolved.projectSlug;
    const projectData = PROJECTS[slug];

    if (project) {
        const previousImages = (await parent).openGraph?.images || [];
        const projectName = projectData?.name || 'Project';
        const industry = projectData?.industry || 'Design & Development';
        const work = projectData?.work || 'Web Design + Development';

        return {
            title: `HippoSoft | Portfolio | ${projectName}`,
            description: `${projectName}: ${industry} project. Our work includes ${work}.`,
            alternates: {
                canonical: `/portfolio/${slug}`,
            },
            openGraph: {
                title: `HippoSoft | Portfolio | ${projectName}`,
                description: `${projectName}: ${industry} project. Our work includes ${work}.`,
                type: 'article',
                url: `/portfolio/${slug}`,
                images: [
                    projectData?.mockBig || '/assets/hippo-icon.png',
                    ...previousImages,
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: `HippoSoft | Portfolio | ${projectName}`,
                description: `${projectName}: ${industry} project. Our work includes ${work}.`,
                images: [projectData?.mockBig || '/assets/hippo-icon.png'],
            },
        };
    }

    return {
        title: `HippoSoft | Portfolio | No project found`,
        description: 'The requested project could not be found.',
    };
}

export default async function ProjectPage({
    params
}: PropsType) {
    const paramsResolved = await params;
    const slug = await paramsResolved.projectSlug;
    const projectData = PROJECTS[slug];

    return (
        projectData
            ? <SingleProject project={projectData} />
            : <p>No project for the selected slug</p>
    )
}

