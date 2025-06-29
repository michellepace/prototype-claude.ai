# Best Practices: UI Development Guide

*For projects already configured with Next.js 15, TypeScript, Tailwind CSS 3.4.17, and shadcn/ui*

## Overview

This guide provides ongoing development guidance for projects using centralized theming. The architecture separates theme values from component implementation, enabling global theme changes through `globals.css` without modifying individual components.

**Key Benefits:**
- Change colors globally from one location
- Automatic light/dark mode support
- Consistent design system across all components
- Reduced custom CSS and improved maintainability

## Color Customization Process

### Step 1: Try Modifying Existing Colors
If you need a different shade of primary, change the values in `globals.css`:

```css
/* Change existing primary color */
:root {
  --primary: 210 100% 50%; /* New blue shade */
}
```

### Step 2: Add New Semantic Color (if truly needed)

1. **Define in globals.css:**
```css
:root {
  --brand: 210 100% 50%;
  --brand-foreground: 0 0% 100%;
}

.dark {
  --brand: 210 90% 35%;
  --brand-foreground: 0 0% 100%;
}
```

2. **Map in tailwind.config.ts:**
```typescript
colors: {
  brand: {
    DEFAULT: "hsl(var(--brand) / <alpha-value>)",
    foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
  }
}
```

3. **Use in components:**
```tsx
<div className="bg-brand text-brand-foreground">
  Brand content
</div>
```

## Implementation Rules

### Rule 1: Use Semantic Colors for Theming
```tsx
// ✅ CORRECT: Semantic colors that adapt to theme
<div className="bg-card text-card-foreground border-border">

// ❌ WRONG: Direct Tailwind colors
<div className="bg-slate-100 text-slate-900 border-slate-200">
```

### Rule 2: Use Standard Tailwind Utilities for Everything Else
```tsx
// ✅ CORRECT: Typography, spacing, layout use standard Tailwind
<div className="flex p-4 gap-2 rounded-lg">
  <h2 className="text-xl font-bold mb-2">Title</h2>
  <p className="text-sm leading-relaxed">Content</p>
</div>
```

### Rule 3: Prefer shadcn/ui Component Variants
```tsx
// ✅ CORRECT: Use built-in variants
<Button variant="destructive" size="sm">Delete</Button>

// ❌ WRONG: Custom styling
<Button className="bg-red-500 text-white px-2 py-1">Delete</Button>
```

### Rule 4: Mobile-First Responsive Design
```tsx
// ✅ CORRECT: Base styles first, then breakpoints
<div className="text-sm sm:text-base md:text-lg lg:text-xl">

// ❌ WRONG: Desktop-first approach
<div className="text-xl lg:text-lg md:text-base sm:text-sm">
```

### Rule 5: Minimize Custom CSS
Use Tailwind utilities first. Custom CSS is acceptable for:
- Complex animations beyond Tailwind's capabilities
- Third-party library overrides
- Special visual effects (complex gradients, filters)
- Global font setup with `@apply`

## Common Patterns

### Responsive Container
```tsx
<div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="py-8 sm:py-12 lg:py-16">
      {/* Content */}
    </div>
  </div>
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent className="pt-6">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Component with Proper Class Merging
The `cn()` utility combines clsx and tailwind-merge to handle class conflicts properly:

```tsx
import { cn } from "@/lib/utils"

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
}

const CardWrapper = ({ children, className }: CardWrapperProps) => (
  <div className={cn("p-4 bg-card rounded-lg", className)}>
    {children}
  </div>
)
```

### Complete Example Component
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    name: string
    description: string
    status: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          {project.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="bg-primary/10 p-3 rounded-md">
          <span className="text-sm font-medium">
            Status: {project.status}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Quick Reference

### Do's and Don'ts

| Category | ❌ Don't | ✅ Do |
|----------|----------|-------|
| Colors | `bg-blue-500` | `bg-primary` |
| Custom Styles | `style="width: 200px"` | `w-48` |
| Responsiveness | Desktop-first | Mobile-first |
| Components | Build from scratch | Use shadcn/ui |
| Theming | Hardcode colors | Use CSS variables |
| CSS | Write custom classes | Use Tailwind utilities |
| Typography | Inline font styles | Configure in Tailwind + globals.css |

### Breakpoint Reference

| Breakpoint | Prefix | Min Width | Usage |
|------------|--------|-----------|--------|
| Mobile | (none) | 0px | Default styles |
| Small | `sm:` | 640px | Tablets |
| Medium | `md:` | 768px | Small laptops |
| Large | `lg:` | 1024px | Desktops |
| X-Large | `xl:` | 1280px | Large screens |
| 2X-Large | `2xl:` | 1536px | Extra large |

### Decision Flow for Styling

1. **Need to style something?**
   - For colors → Use semantic color utilities (`bg-primary`, `text-muted-foreground`)
   - For layout/spacing/typography → Use standard Tailwind utilities
   
2. **Need a different color?**
   - First, try modifying existing color values in `globals.css`
   - Only add new semantic color if it serves a distinct purpose

3. **Building a component?**
   - Check if shadcn/ui has it → Use it with variants
   - If custom needed → Compose from shadcn/ui primitives
   - Use `cn()` utility for proper class merging

## Setup Checklist

- [ ] Install and configure `next-themes` for theme switching
- [ ] Set up `globals.css` with CSS variables for colors and radius
- [ ] Configure `tailwind.config.ts` to map CSS variables
- [ ] Set up custom fonts in Tailwind config and apply globally
- [ ] Install shadcn/ui components as needed
- [ ] Create theme provider and wrap app
- [ ] Use semantic color classes throughout components
- [ ] Implement mobile-first responsive design
- [ ] Avoid custom CSS except for allowed exceptions