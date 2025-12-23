import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

export default function FeaturedSpecial() {
  const { featuredSpecial } = siteConfig;

  // Don't render if not active
  if (!featuredSpecial.active) {
    return null;
  }

  return (
    <div className="md:col-span-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 border border-amber-200 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-amber-700 rounded-full">
          {featuredSpecial.badge}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
        {featuredSpecial.title}
      </h2>

      <div className="mt-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-white/50">
        <Image
          src={featuredSpecial.image}
          alt={featuredSpecial.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-xl font-serif font-semibold text-gray-900 mt-4">
        {featuredSpecial.name}
      </h3>
      <p className="text-gray-600 text-sm mt-2">{featuredSpecial.description}</p>
    </div>
  );
}

