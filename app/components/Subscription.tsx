"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useState } from "react";

export default function Subscription() {
  const { subscription } = siteConfig;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="md:col-span-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
        {subscription.title}
      </h2>
      <p className="text-gray-600 mb-6">{subscription.description}</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {subscription.options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedOption(option.value)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border transition-all group ${
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

      <button className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
        {subscription.ctaText}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

