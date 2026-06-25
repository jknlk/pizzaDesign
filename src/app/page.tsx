import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import ArtistrySection from "@/components/ArtistrySection";
import MenuSection from "@/components/MenuSection";
import IngredientsSection from "@/components/IngredientsSection";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCanvas />
        <ArtistrySection />
        <MenuSection />
        <IngredientsSection />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
