import { PORTFOLIO_DATA, PROJECTS } from "@/components/Portfolio/constants";
import SingleProyect from "@/components/Portfolio/SingleProyect";

type Params = {
    params: {
        projectSlug: typeof PROJECTS,
        data: any,
    }
}

/* export async function generateMetadata({
    params
}: Params, parent: ResolvingMetadata): Promise<Metadata> {
    const project = params.ProjectId;
    const slug = params.Slug;


    if (project) {
      const previousImages = (await parent).openGraph?.images || [];

      return {
        title: `Conrad Architect | ${project.title} `,
        openGraph: {
          images: [
            project.main_image,
            ...previousImages,
          ],
        },
      };
    }

    return {
      title: "Conrad Architect | Specific Project",
    };
} */


export default async function ProjectPage({params}: Params) {
  const slug = params.projectSlug;

  const projectData = PROJECTS[slug];

  return (
       projectData ? <SingleProyect project={projectData} /> 
       : <p>No project for the selected slug</p>
  )
}

