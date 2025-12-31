"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../data/siteConfig";

export default function ThirdPartyLinks() {
  const { thirdPartyLinks } = siteConfig;

  if (!thirdPartyLinks || !thirdPartyLinks.active || thirdPartyLinks.links.length === 0) {
    return null;
  }

  return (
    <div className="md:col-span-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden h-full">
        <div className="p-10 md:p-12 lg:p-16">
          {thirdPartyLinks.title && (
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#8B4513] mb-3">
                {thirdPartyLinks.title}
              </h2>
              {thirdPartyLinks.subtitle && (
                <p className="text-gray-600 text-lg md:text-xl">
                  {thirdPartyLinks.subtitle}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-12">
            {thirdPartyLinks.links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl border-2 border-gray-200 hover:border-[#8B4513] hover:shadow-2xl transition-all duration-300 bg-white min-w-[160px] md:min-w-[200px] lg:min-w-[240px]"
                aria-label={`Visit ${link.name}`}
              >
                {link.image && (
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={link.image}
                      alt={link.name}
                      fill
                      className="object-contain"
                      unoptimized={link.unoptimized}
                    />
                  </div>
                )}
                {link.name && (
                  <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-700 group-hover:text-[#8B4513] transition-colors duration-300 text-center">
                    {link.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

