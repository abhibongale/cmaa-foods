import IngredientPromise from "./IngredientPromise";
import { siteConfig } from "../data/siteConfig";

export default function IngredientPromiseSection() {
  const { ingredientPromise } = siteConfig;

  if (!ingredientPromise || !ingredientPromise.active) {
    return null;
  }

  return (
    <div className="md:col-span-12">
      {/* Title Outside Component */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#8B4513] mb-3">
          {ingredientPromise.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          {ingredientPromise.subtitle}
        </p>
      </div>

      <IngredientPromise
        title={ingredientPromise.title}
        subtitle={ingredientPromise.subtitle}
        imageSrc={ingredientPromise.imageSrc}
        imageAlt={ingredientPromise.imageAlt}
        hotspots={ingredientPromise.hotspots}
      />
    </div>
  );
}

