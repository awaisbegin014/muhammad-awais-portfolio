import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050a14] text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
