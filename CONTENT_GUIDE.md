# Content Management Guide

This website is built with a component-based architecture and a centralized configuration file, making it easy to update content without touching code.

## Quick Updates

All website content is managed in **`app/data/siteConfig.ts`**. Simply edit this file to update:

- Banner messages and delivery areas
- Header navigation
- Hero section text and images
- Subscription options
- Featured specials
- Why Puneri features
- Footer information

## Dynamic Features

### Banner with Automatic Date
The banner automatically shows today's date. To customize:
- Edit `banner.showDate` in `siteConfig.ts` (set to `false` to hide date)
- Update `banner.location` and `banner.deliveryAreas` as needed

### Featured Special
To add or remove a featured special:
- Set `featuredSpecial.active` to `true` or `false` in `siteConfig.ts`
- Update the special details (name, description, image) in the same file

## Component Structure

```
app/
├── components/
│   ├── Banner.tsx          # Top banner with dynamic date
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── Subscription.tsx    # Subscription section
│   ├── FeaturedSpecial.tsx # Monthly special (can be hidden)
│   ├── WhyPuneri.tsx       # Features section
│   ├── Footer.tsx          # Footer with social links
│   └── FaraalBoxBuilder.tsx # Box builder (existing)
├── data/
│   └── siteConfig.ts       # ⭐ ALL CONTENT LIVES HERE
└── page.tsx                # Main page (uses components)
```

## Examples

### Update Banner
```typescript
banner: {
  location: "Kothrud",
  deliveryAreas: ["Wakad", "Baner", "Aundh", "Hinjewadi"], // Add new area
  showDate: true,
}
```

### Add New Navigation Item
```typescript
navItems: [
  { label: "Savoury (Tikhat)", href: "#", active: true },
  { label: "Sweet (God)", href: "#", active: false },
  { label: "Seasonal", href: "#", active: false },
  { label: "New Category", href: "#", active: false }, // Add here
],
```

### Update Featured Special
```typescript
featuredSpecial: {
  title: "FEATURED MONTHLY SPECIAL",
  badge: "Limited Time",
  name: "Diwali Special Mix",
  description: "Festive snack mix for Diwali celebrations.",
  image: "/assets/diwali-mix.jpg",
  imageAlt: "Diwali Special Mix",
  active: true, // Set to false to hide
}
```

### Add New Feature to Why Puneri
```typescript
features: [
  // ... existing features
  {
    icon: "Sparkles", // Must match icon name from lucide-react
    title: "New Feature",
    description: "Description of new feature.",
  },
]
```

## Notes

- All images should be placed in `public/assets/`
- Icon names must match lucide-react icon names (ChefHat, Eye, BookOpen, etc.)
- The banner date updates automatically every day
- Components are reusable and can be used on other pages

