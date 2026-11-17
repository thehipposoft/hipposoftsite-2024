import SmoothScroll from "@/components/SmoothScroll";
import StickyContact from "@/components/commons/StickyContact";
import Menu from "@/components/Menu";
import CustomCursor from "@/components/CustomCursor";
import Transitions from "@/components/commons/Transitions";
import LocaleSwitcherButton from "@/components/commons/LocaleSwitcherButton";

// Layout for the public marketing site: menu, cursor, transitions, smooth scroll.
// Pages that must render without the site chrome live in the (focus) group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <SmoothScroll>
            <Transitions />
            <LocaleSwitcherButton />
            <Menu />
            {children}
            <CustomCursor />
            <StickyContact />
        </SmoothScroll>
    );
}
