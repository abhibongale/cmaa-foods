import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

export default function FeaturedSpecial() {
  const { featuredSpecial } = siteConfig;

  // Don't render if not active
  if (!featuredSpecial.active) {
    return null;
  }

  return (
    <div className="md:col-span-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-10 md:p-12 lg:p-16 border border-amber-200 relative overflow-hidden shadow-xl">
      <div className="absolute top-6 right-6">
        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm md:text-base font-semibold text-amber-700 rounded-full">
          {featuredSpecial.badge}
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6">
        {featuredSpecial.title}
      </h2>

      <div className="mt-8 md:mt-10 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/50">
        <Image
          src={featuredSpecial.image}
          alt={featuredSpecial.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-gray-900 mt-6 md:mt-8">
        {featuredSpecial.name}
      </h3>
      <p className="text-gray-600 text-base md:text-lg lg:text-xl mt-4">{featuredSpecial.description}</p>
    </div>
  );
}

