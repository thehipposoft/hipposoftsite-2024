import type { Metadata } from 'next';
import HippoLabComp from './HippoLab';

export const metadata: Metadata = {
  title: 'HippoSoft | Hippo Lab',
  description: 'We design the logo and give your brand identity, aligning it with the values ​​you want to convey.',
}

const HippoLab = () => {
    return (
        <HippoLabComp />
    );
}

export default HippoLab;
