import ContactComponent from '@/components/Contact';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Contact',
  description: "Get in touch with the HippoSoft team and let's build your brand, design or website together right away.",
}

export default function Contact() {
    return (
        <ContactComponent />
    );
}
