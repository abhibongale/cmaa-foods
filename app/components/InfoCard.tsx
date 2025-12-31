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

  // Adjust sizes based on compact mode - Made larger
  const paddingClass = compact ? "p-10 md:p-12 lg:p-16" : "p-12 md:p-16 lg:p-20";
  const sloganClass = compact ? "text-base md:text-lg" : "text-lg md:text-xl lg:text-2xl";
  const titleClass = compact 
    ? "text-3xl md:text-4xl lg:text-5xl" 
    : "text-5xl md:text-6xl lg:text-7xl";
  const descClass = compact 
    ? "text-lg md:text-xl" 
    : "text-xl md:text-2xl lg:text-3xl";
  const imageMinHeight = compact ? "md:min-h-[400px]" : "md:min-h-[600px]";

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

