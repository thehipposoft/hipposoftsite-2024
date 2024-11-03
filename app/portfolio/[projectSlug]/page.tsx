import { useParams } from 'next/navigation'
import { PORTFOLIO_DATA } from "@/components/Portfolio/constants";
import SingleProyect from "@/components/Portfolio/SingleProyect";

type Params = {
    params: {
        Slug: string,
        ProjectId: number,
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

export default async function ProjectPage({ params: {Slug}}: Params) {
    return(
        <div>
          <SingleProyect project={PORTFOLIO_DATA[0].data} />
        </div>
    )
}