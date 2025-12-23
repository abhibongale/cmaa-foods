"use client";

import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  title: string;
  slogan?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right"; // Which side the image is on
  backgroundColor?: string;
  textColor?: string;
  href?: string; // Link to blog page or other page
  clickable?: boolean; // Whether the card should be clickable
  compact?: boolean; // Compact mode for bento grid (smaller padding/text)
}

export default function InfoCard({
  title,
  slogan,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  href,
  clickable = false,
  compact = false,
}: InfoCardProps) {
  const isImageLeft = imagePosition === "left";
  const isClickable = clickable && href;

  // Adjust sizes based on compact mode
  const paddingClass = compact ? "p-6 md:p-8" : "p-10 md:p-16";
  const sloganClass = compact ? "text-sm md:text-base" : "text-base md:text-lg";
  const titleClass = compact 
    ? "text-2xl md:text-3xl lg:text-4xl" 
    : "text-4xl md:text-5xl lg:text-6xl";
  const descClass = compact 
    ? "text-base md:text-lg" 
    : "text-xl md:text-2xl";
  const imageMinHeight = compact ? "md:min-h-[300px]" : "md:min-h-[500px]";

  const CardContent = (
    <div className={`${backgroundColor} rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-xl h-full ${isClickable ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : ''}`}>
      <div className={`grid md:grid-cols-2 gap-0 ${isImageLeft ? "" : "md:flex-row-reverse"} h-full`}>
        {/* Image Section */}
        <div className={`relative aspect-square md:aspect-auto ${imageMinHeight} ${isImageLeft ? "order-1" : "order-2"}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text Section */}
        <div className={`${isImageLeft ? "order-2" : "order-1"} flex flex-col justify-center ${paddingClass}`}>
          {slogan && (
            <p className={`${sloganClass} font-semibold text-amber-600 uppercase tracking-wider mb-3 ${compact ? "mb-2" : "mb-4"}`}>
              {slogan}
            </p>
          )}
          <h2 className={`${titleClass} font-serif font-bold ${textColor} ${compact ? "mb-3" : "mb-6"}`}>
            {title}
          </h2>
          <p className={`${descClass} ${textColor.replace("900", "600")} leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

