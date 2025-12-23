"use client";

import { siteConfig } from "../data/siteConfig";

export default function Banner() {
  const { banner } = siteConfig;
  
  // Get today's date in a readable format
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "long", 
      day: "numeric" 
    });
  };

  const deliveryAreasText = banner.deliveryAreas.join(", ");
  const dateText = banner.showDate ? ` on ${getTodayDate()}` : "";

  return (
    <div className="bg-gray-900 text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto text-center text-xs md:text-sm">
        <span>
          Fresh batch fried this morning{dateText} in {banner.location} • Delivering to {deliveryAreasText}
        </span>
      </div>
    </div>
  );
}

