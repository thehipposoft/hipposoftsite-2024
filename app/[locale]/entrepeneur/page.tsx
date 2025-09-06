import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'HippoSoft | Entrepeneur',
  description: 'We support the development of your project from the beginning. Contact us to boost your brand and build together.',
}

export default function EntrepeneurPage () {
    return(
        <div className="h-screen relative flex flex-col gap-8 justify-center items-center">
            <Image src={'/assets/images/entrepeneur/entrepeneurBg.webp'} alt="Background with pen and paper" fill className="object-cover" />
            <div className="absolute h-full w-full bg-white/80" />
            <h1 className="relative z-10 text-black md:text-6xl text-5xl thin uppercase text-center">
                Coming soon...
            </h1>
            <Link href={'/'} className="relative z-10 text-black text-2xl hover:underline">
                Go back home &#8617;
            </Link>
        </div>
    )

}