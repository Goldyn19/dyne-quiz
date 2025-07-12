# Components Structure

This directory contains all the components for the Quiz Together application.

## 📁 Folder Structure

```
components/
├── ui/           # shadcn UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── separator.tsx
├── custom/       # Custom application components
│   ├── navigation.tsx
│   ├── hero-section.tsx
│   ├── feature-card.tsx
│   ├── stats-section.tsx
│   ├── cta-section.tsx
│   ├── icons.tsx
│   └── index.ts
└── README.md
```

## 🎯 Component Categories

### shadcn UI Components (`/ui`)
- **button.tsx** - Button component with variants
- **card.tsx** - Card component with header, content, etc.
- **badge.tsx** - Badge component for labels
- **separator.tsx** - Divider component

### Custom Components (`/custom`)
- **navigation.tsx** - Fixed navigation bar
- **hero-section.tsx** - Landing page hero section
- **feature-card.tsx** - Feature showcase cards
- **stats-section.tsx** - Statistics display section
- **cta-section.tsx** - Call-to-action section
- **icons.tsx** - Custom SVG icons
- **index.ts** - Barrel export for clean imports

## 🚀 Usage

### Importing shadcn UI Components
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

### Importing Custom Components
```tsx
// Individual imports
import { Navigation } from "@/components/custom/navigation";

// Or use the barrel export
import { Navigation, HeroSection } from "@/components/custom";
```

## 🎨 Design System

All components use the custom color scheme defined in `tailwind.config.js`:
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Cyan (#06B6D4) 
- **Accent**: Lime (#A3E635)
- **Background**: Light slate (#F8FAFC)
- **Surface**: White (#FFFFFF)

## 📝 Adding New Components

### For shadcn UI components:
1. Run: `npx shadcn@latest add [component-name]`
2. Components will be added to `/ui` folder

### For custom components:
1. Create new file in `/custom` folder
2. Add export to `/custom/index.ts`
3. Use proper TypeScript interfaces
4. Follow the existing naming conventions 