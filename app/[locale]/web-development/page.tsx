import WebDevComponent from "@/components/WebDevelopment/WebDevComponent";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Web Development',
  description: 'Discover our wide range of designs when creating a website that suits your project.',
}

export default function WebDevelompentPage() {
    return(
        <div>
            <WebDevComponent />
        </div>
    )
}