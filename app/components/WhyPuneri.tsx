import { ChefHat, Eye, BookOpen } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ChefHat,
  Eye,
  BookOpen,
};

export default function WhyPuneri() {
  const { whyPuneri } = siteConfig;

  return (
    <div className="md:col-span-12">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-12 md:mb-16 text-center">
        {whyPuneri.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {whyPuneri.features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || ChefHat;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

