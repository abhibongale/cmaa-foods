import FaraalBoxBuilder from "./components/FaraalBoxBuilder";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Subscription from "./components/Subscription";
import FeaturedSpecial from "./components/FeaturedSpecial";
import WhyPuneri from "./components/WhyPuneri";
import Footer from "./components/Footer";
import ParallaxBackground from "./components/ParallaxBackground";
import InfoCardsSection from "./components/InfoCardsSection";
import IngredientPromiseSection from "./components/IngredientPromiseSection";

export default function Home() {
  return (
    <div className="relative">
      {/* Parallax Background - Behind everything */}
      <ParallaxBackground 
        imageSrc="/assets/chakali-homepage.png" 
        imageAlt="Chakli background"
        speed={0.3}
        opacity={0.2}
      />
      <main className="min-h-screen bg-white/85 relative z-10">
      
      <Banner />
      <Header />
      <Hero />
      
      {/* --- BENTO GRID LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* BUILD YOUR FARAAL BOX - Full Width */}
          <div className="md:col-span-12">
            <FaraalBoxBuilder />
          </div>

          {/* Ingredient Promise Section - Full Width in Bento Grid */}
          <IngredientPromiseSection />

          {/* Info Cards - Integrated into Bento Grid */}
          <InfoCardsSection />

          {/* THE PUNERI SNACK STASH - Left Column */}
          <Subscription />

          {/* FEATURED MONTHLY SPECIAL - Right Column */}
          <FeaturedSpecial />

          {/* WHY PUNERI? - Full Width Grid */}
          <WhyPuneri />
        </div>
      </div>

      <Footer />
      </main>
    </div>
  );
}
