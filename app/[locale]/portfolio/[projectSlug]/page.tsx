import { ResolvingMetadata, Metadata } from "next";
import { PROJECTS } from "@/components/Portfolio/constants";
import SingleProyect from "@/components/Portfolio/SingleProyect";

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

        return {
            title: `HippoSoft | Projects | ${projectData.name} `,
            openGraph: {
                images: [
                    projectData.mockBig,
                    ...previousImages,
                ],
            },
        };
    }

    return {
        title: `HippoSoft | Projects | No project found`,
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
            ? <SingleProyect project={projectData} />
            : <p>No project for the selected slug</p>
    )
}

