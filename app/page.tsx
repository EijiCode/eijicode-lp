import { Header, Hero, Services, Flow, Contact, Footer } from "@/components/sections";
import { TargetCursor } from "@/components/effects";

export default function Home() {
  return (
    <main>
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />
      <Header />
      <Hero />
      <Services />
      <Flow />
      <Contact />
      <Footer />
    </main>
  );
}
