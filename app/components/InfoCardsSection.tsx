import InfoCard from "./InfoCard";
import { siteConfig } from "../data/siteConfig";

export default function InfoCardsSection() {
  const { infoCards } = siteConfig;

  if (!infoCards || infoCards.length === 0) {
    return null;
  }

  return (
    <>
      {infoCards.map((card, index) => {
        // Alternate between full width and split layouts for bento grid
        const isFullWidth = index % 2 === 0;
        const gridSpan = isFullWidth ? "md:col-span-12" : "md:col-span-6";
        
        return (
          <div key={index} className={gridSpan}>
            <InfoCard
              title={card.title}
              slogan={card.slogan}
              description={card.description}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              imagePosition={card.imagePosition as "left" | "right" | undefined}
              backgroundColor={card.backgroundColor}
              href={card.href}
              clickable={card.clickable}
              compact={!isFullWidth}
            />
          </div>
        );
      })}
    </>
  );
}

