import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Portfolio',
  description: 'Discover our latest projects',
}

export default function PortfolioPage () {
    return(
        <div>
            <PortfolioGrid />
        </div>
    )
}