# Best Practices: Tailwind + shadcn/ui Implementation Standards

## 1. FOUNDATION PRINCIPLES

### a) Core Mandate for All Code Generation
**NEVER write custom CSS. ALWAYS use Tailwind utility classes directly in JSX/TSX.**

**ALWAYS implement mobile-first responsive design:**
- Default (unprefixed) utilities apply to all screen sizes
- Add responsive variants (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) only for larger breakpoints

**ALWAYS use centralized theming:**
- Use semantic color classes (`bg-primary`) instead of fixed colors (`bg-blue-500`)
- Leverage shadcn/ui's CSS variable system for consistent theming

**ALWAYS prefer shadcn/ui component variants:**
- Use built-in variants before custom styling (e.g., `<Button variant="outline">`)
- Extend components through composition rather than modification

## 2. IMPLEMENTATION PRIORITY & VERIFICATION SYSTEM

### Priority 1: NEVER VIOLATE (Breaking these fails the entire implementation)
- [ ] Mobile-first implementation (base styles, then sm:, md:, etc.)
- [ ] No custom CSS anywhere - only Tailwind utilities
- [ ] Semantic color classes used (never `bg-blue-500`)

### Priority 2: ALWAYS PREFER (Core quality standards)  
- [ ] shadcn/ui variants used before custom styling
- [ ] Typography scales responsively
- [ ] Container uses responsive max-width
- [ ] Consistent spacing scale applied (`space-y-4 md:space-y-6 lg:space-y-8`)

### Priority 3: OPTIMIZE WHEN POSSIBLE (Code quality improvements)
- [ ] Component extraction for distinct semantic meaning or complex patterns
- [ ] Component props have clear TypeScript interfaces
- [ ] Complex class combinations avoided (prefer component extraction)

## 3. CENTRALISED THEMING IMPLEMENTATION

### a) CSS Variable System Setup

**Step 1: Define CSS variables in `globals.css`**
```css
:root {
  /* Core semantic colors (illustrative subset - add more as needed) */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  
  /* Design tokens */
  --radius: 0.5rem;

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

.dark {
  /* Core semantic colors (same variables, different values) */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  
  /* Design tokens and typography inherit from :root */
}
```

**Step 2: Map CSS variables in `tailwind.config.ts`**
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        // Add additional semantic colors following the same pattern
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
}
```

**Note:** When using `next-themes`, these semantic colors automatically adapt between light/dark modes without additional code.

### b) Color Customization Decision Flow

**FIRST: Try modifying existing semantic colors**
- Can existing semantic color be adjusted? → Update values in `globals.css` `:root` and `.dark`
- Example: Change `--primary: 221.2 83.2% 53.3%;` to `--primary: 210 100% 50%;`

**ONLY if new semantic color is truly needed:**

1. **Define CSS variable in `globals.css`:**
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

2. **Map in `tailwind.config.ts`:**
   ```typescript
   brand: {
     DEFAULT: "hsl(var(--brand) / <alpha-value>)",
     foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
   }
   // Note: <alpha-value> enables opacity modifiers (e.g., bg-brand/50)
   ```

3. **Usage:**
   ```tsx
   <div className="bg-brand text-brand-foreground">
     Custom branded content
   </div>
   ```

### c) Dark Mode Integration
**shadcn/ui + next-themes handles dark mode automatically through CSS variables:**
```tsx
// ✅ CORRECT: Colors adapt automatically to light/dark mode using shadcn/ui components
<Card className="p-4 md:p-6">
  <CardHeader>
    <CardTitle className="text-primary">Adapts to theme</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Secondary text content</p>
  </CardContent>
</Card>
```


### d) Relative Unit System
**ALWAYS use Tailwind's relative unit system (rem-based):**
- Use `w-24` (6rem) instead of `style="width: 96px"`
- Use `text-lg` instead of `style="font-size: 18px"`
- Tailwind's spacing, sizing, and typography utilities use relative units by default

## 4. RESPONSIVE DESIGN PATTERNS

### a) Breakpoint System Reference
| Breakpoint | Prefix | Minimum Width | CSS |
|------------|--------|---------------|-----|
| Mobile | _(none)_ | 0px | Default |
| Small | `sm:` | 640px | `@media (min-width: 640px)` |
| Medium | `md:` | 768px | `@media (min-width: 768px)` |
| Large | `lg:` | 1024px | `@media (min-width: 1024px)` |
| X-Large | `xl:` | 1280px | `@media (min-width: 1280px)` |
| 2X-Large | `2xl:` | 1536px | `@media (min-width: 1536px)` |

### b) Layout Transformation Patterns

**Flexible Grid Systems:**
```tsx
// ✅ CORRECT: Mobile-first responsive grid with shadcn/ui Card components
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

**Container Strategies:**
```tsx
// ✅ CORRECT: Responsive container pattern
<div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="py-8 sm:py-12 lg:py-16">
      {/* Content */}
    </div>
  </div>
</div>
```

**Layout Direction Changes:**
```tsx
// ✅ CORRECT: Stack on mobile, row on larger screens
<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
  <div className="md:w-1/3">Sidebar</div>
  <div className="md:w-2/3">Main content</div>
</div>
```

### c) Typography Scaling Strategy
```tsx
// ✅ CORRECT: Responsive typography hierarchy
<h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
  Main Heading
</h1>
<h2 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
  Section Heading  
</h2>
<p className="text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl">
  Body text that scales appropriately across all devices
</p>
```

### d) Spacing and Sizing Systems
```tsx
// ✅ CORRECT: Consistent responsive spacing
<div className="space-y-4 p-4 md:space-y-6 md:p-6 lg:space-y-8 lg:p-8">
  <section className="mb-6 md:mb-8 lg:mb-12">
    {/* Section content with consistently scaled margins */}
  </section>
</div>
```

## 5. COMPONENT ARCHITECTURE GUIDELINES

### a) Always compose from shadcn/ui primitives
*Build complex components by combining shadcn/ui base components rather than creating from scratch.*

```tsx
// ❌ BAD: Building from scratch
const AlertBox = ({ message }) => (
  <div className="border border-red-200 bg-red-50 p-4 rounded">
    <p className="text-red-800">{message}</p>
  </div>
)

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// ✅ GOOD: Compose from shadcn/ui primitives  
const AlertBox = ({ message }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)
```

### b) Use proper class merging (cn utility)  
*Prevent class conflicts when components accept className props.*

```tsx
import { cn } from "@/lib/utils"

// ❌ BAD: Classes conflict, user overrides don't work
const BadWrapper = ({ children, className }) => (
  <div className={`p-4 bg-background ${className}`}>
    {children}
  </div>
)

// ✅ GOOD: Proper class merging with cn utility
const GoodWrapper = ({ children, className }) => (
  <div className={cn("p-4 bg-background", className)}>
    {children}
  </div>
)

// The difference:
<BadWrapper className="p-8">  {/* Still gets p-4 - conflict! */}
<GoodWrapper className="p-8"> {/* Gets p-8 - user wins! */}
```

### c) Keep UI components pure - no data fetching or state
*UI components should receive data as props and avoid internal state or data fetching.*

```tsx
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

// ❌ BAD: UI component fetches its own data
const BadUserCard = ({ userId }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(`/users/${userId}`).then(res => res.json()).then(setUser)
  }, [userId])
  
  return <Card><CardContent>{user?.name}</CardContent></Card>
}

// ✅ GOOD: Pure UI component receives data as props  
const UserCard = ({ user }) => (
  <Card>
    <CardContent>{user.name}</CardContent>
  </Card>
)
```

### d) Create reusable components with clear interfaces
*Extract components when they:*
- Represent distinct semantic meaning (ProjectCard, UserProfile)
- Have complex UI patterns (3+ elements, conditional logic)
*Use well-defined Typescript props and sensible defaults*

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  project: { name: string; description: string }
  showDescription?: boolean
}

// ❌ BAD: No defaults, poor structure
const BadProjectCard = ({ project, showDescription }: ProjectCardProps) => (
  <Card>
    {showDescription && <div>{project.description}</div>}
    <div>{project.name}</div>
  </Card>
)

// ✅ GOOD: Defaults + proper shadcn/ui structure
const ProjectCard = ({ project, showDescription = true }: ProjectCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      {showDescription && <p className="text-muted-foreground">{project.description}</p>}
    </CardContent>
  </Card>
)
```

## 6. PRACTICAL INTEGRATION EXAMPLE

### a) Comprehensive Example: All Concepts Applied
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectDashboard() {
  return (
    <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl">
      <div className="p-4 md:p-6 lg:p-8">
        
        {/* Typography scaling + semantic colors */}
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 lg:mb-8">
          Project Dashboard
        </h1>
        
        {/* Responsive grid with consistent spacing */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl">Active Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 lg:space-y-8">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm font-medium text-primary sm:text-base md:text-lg">
                  5 tasks remaining
                </span>
              </div>
              <Button variant="outline" className="w-full hover:bg-accent">
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl">Completion</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4 md:space-y-6">
              <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">85%</div>
              <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
                Project Progress
              </p>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  )
}
```

### b) Pattern-Specific Examples

**Responsive Image Handling:**
```tsx
// ✅ CORRECT: Responsive image with proper scaling
<div className="relative w-full h-48 sm:h-64 lg:h-80">
  <img 
    className="w-full h-full object-cover rounded-lg" 
    src="..." 
    alt="..."
  />
</div>
```