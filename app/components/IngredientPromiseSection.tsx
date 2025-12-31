import IngredientPromise from "./IngredientPromise";
import { siteConfig } from "../data/siteConfig";

export default function IngredientPromiseSection() {
  const { ingredientPromise } = siteConfig;

  if (!ingredientPromise || !ingredientPromise.active || !ingredientPromise.products || ingredientPromise.products.length === 0) {
    return null;
  }

  return (
    <div className="md:col-span-12 mb-8 md:mb-12 lg:mb-16 xl:mb-20">
      {/* Title Outside Component */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#8B4513] mb-2 md:mb-3">
          {ingredientPromise.title}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-600">
          {ingredientPromise.subtitle}
        </p>
      </div>

      <IngredientPromise
        products={ingredientPromise.products}
        defaultProductId={ingredientPromise.defaultProductId}
      />
    </div>
  );
}

