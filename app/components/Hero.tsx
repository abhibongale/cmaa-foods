import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {hero.headline}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {hero.description}
          </p>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

