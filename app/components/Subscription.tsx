"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useState } from "react";

export default function Subscription() {
  const { subscription } = siteConfig;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="md:col-span-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 md:p-12 lg:p-16 border border-amber-100 shadow-xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6">
        {subscription.title}
      </h2>
      <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-10">{subscription.description}</p>

      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-8 md:mb-10">
        {subscription.options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedOption(option.value)}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-6 rounded-2xl border-2 transition-all group ${
              selectedOption === option.value
                ? "bg-amber-100 border-amber-300"
                : "bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50"
            }`}
          >
            <Calendar
              className={`w-5 h-5 ${
                selectedOption === option.value
                  ? "text-amber-600"
                  : "text-gray-600 group-hover:text-amber-600"
              }`}
            />
            <span className="font-medium text-gray-900">{option.label}</span>
          </button>
        ))}
      </div>

      <button className="w-full py-6 md:py-8 bg-gray-900 text-white font-semibold text-lg md:text-xl rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-3">
        {subscription.ctaText}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

