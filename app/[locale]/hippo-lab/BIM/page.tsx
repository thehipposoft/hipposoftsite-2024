import type { Metadata } from 'next';
import ViewerWrapper from './ViewerWrapper';

export const metadata: Metadata = {
  title: 'HippoSoft | Hippo Lab | BIM',
    description: 'Interactive BIM showcase with embeddable IFC viewers for client websites.',
}

const HippoLab = () => {
    return (
        <div>
            <ViewerWrapper />
        </div>
    );
}

export default HippoLab;
