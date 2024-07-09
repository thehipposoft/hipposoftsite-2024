import Banner from "@/components/Banner";
import BrandingDesing from "@/components/BrandingDesing";
import Menu from "@/components/Menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className='relative overflow-hidden'>
      <Banner />
      <Menu />
    </main>
  );
}
