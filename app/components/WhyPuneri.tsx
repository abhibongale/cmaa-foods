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
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        {whyPuneri.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {whyPuneri.features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || ChefHat;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

