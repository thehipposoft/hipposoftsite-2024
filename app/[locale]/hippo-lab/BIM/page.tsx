import type { Metadata } from 'next';
import ViewerWrapper from './ViewerWrapper';

export const metadata: Metadata = {
  title: 'HippoSoft | Hippo Lab | BIM',
  description: 'BIM Page for Hippo Lab section.',
}

const HippoLab = () => {
    return (
        <div>
            <ViewerWrapper />
        </div>
    );
}

export default HippoLab;
