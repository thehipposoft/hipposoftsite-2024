import Banner from "@/components/Banner";
import Menu from "@/components/Menu";
import BackButton from "@/components/commons/BackButton";

export default function Home() {
  return (
    <main className='relative overflow-hidden'>
      <Banner />
      <Menu />
    </main>
  );
}
