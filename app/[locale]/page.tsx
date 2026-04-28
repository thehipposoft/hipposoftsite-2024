import Banner from "@/components/Banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HippoSoft | Create to Connect",
    description: "Create to connect. We create and build digital experiences to boost your business. We want to inspire you.",
};

export default function Home() {
    return (
        <main className='relative overflow-hidden bg-[#221b35]'>
            <Banner />
        </main>
    );
}
