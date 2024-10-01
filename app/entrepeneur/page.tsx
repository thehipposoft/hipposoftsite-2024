import Image from "next/image";

export default function EntrepeneurPage () {
    return(
        <div className="h-screen relative flex justify-center items-center">
            <Image src={'/assets/images/entrepeneur/entrepeneurBg.webp'} alt="Background" fill className="object-cover" />
            <h1 className="relative z-10 text-black text-6xl">
                Coming soon...
            </h1>
        </div>
    )

}