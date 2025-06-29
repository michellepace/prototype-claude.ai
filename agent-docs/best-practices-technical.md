# Apply These Best Practices

## UI Rules and Theming (may delete and use `best-practices-ui.md`)

**Core Principle:** Separate theme values from styling implementation for maintainable, consistent UI in Tailwind 3.x + shadcn/ui projects.

**Key Benefit:** Global theme changes via `globals.css` without touching individual components.

### Core Rules

**Utility-first approach:** Compose designs directly in markup using atomic utility classes
- Prefer `<div class="p-4 text-center bg-primary text-primary-foreground">` over custom CSS classes
- Build complex components by combining small, single-purpose utilities

**Prefer shadcn/ui component variants:**
- Use built-in variants before custom styling (e.g., `<Button variant="outline">`)
- Extend components through composition rather than modification

**Implement Dynamic Theming (Tailwind 3.x)**
- Define CSS variables in `globals.css` (e.g., colors, radius, font family)
- Map CSS variables to utility classes in `tailwind.config.ts`
- Use theme-based colors (`bg-primary`) instead of fixed colors (`bg-blue-500`)

### Responsive Rules

**Use Tailwind's relative unit system:**
- Tailwind's spacing, sizing, and typography utilities use relative units (rem) by default
- Avoid custom pixel values (`style="width: 200px"`) in favor of Tailwind's scaled utilities
- Example: Use `w-24` (6rem) instead of inline `width: 96px`

**Mobile-first responsive design:** 
- Default (unprefixed) utilities apply to all screen sizes
- Add responsive variants (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) only for larger breakpoints
- Example: `<div class="text-sm sm:text-base lg:text-lg">` (small by default, base at 640px+, large at 1024px+)

**Consistent responsive patterns:**
- Layout: `flex-col sm:flex-row`, `grid-cols-1 md:grid-cols-3`
- Spacing: `p-3 sm:p-4 lg:p-6`, `gap-2 md:gap-4`
- Typography: `text-base md:text-lg xl:text-xl`

### Example: Theme Colours Decision Flow

**First, try modifying existing colors:**
- Can existing semantic color be adjusted? → Update values in `globals.css` `:root` and `.dark`
- Example: Change `--primary: 221.2 83.2% 53.3%;` to `--primary: 210 100% 50%;`

**Only if new semantic color is truly needed:**

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
   ```

3. **Usage example:**

   ```tsx
   <div className="bg-brand text-brand-foreground p-3 sm:p-4 rounded-md">
     <Button className="bg-brand/90 hover:bg-brand w-full sm:w-auto">
       Brand Action
     </Button>
   </div>
   ```

### Example: All Concepts Applied

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardDemo() {
  return (
    <div className="p-4 sm:p-6">
      <Card className="w-full max-w-md bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Project Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <p className="text-sm text-muted-foreground">
            Track your progress with semantic colors and responsive design.
          </p>
          <div className="bg-accent/10 p-3 rounded-md">
            <span className="text-sm font-medium">Status: Active</span>
          </div>
        </CardContent>
        <div className="p-4 sm:p-6 pt-0 flex gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </div>
      </Card>
    </div>
  )
}
```

---

## Code Architecture

### Apply Modern Next.js practices
- Structure with Next.js App Router - use `(routes)` folder for page organization
- Implement Server Components by default, Client Components only when necessary
- Follow strict file naming conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

### UI Components
- Create reusable components with clear prop interfaces and sensible defaults
- Maintain separation between UI components and data fetching/state logic
- Keep UI component structure clean and modular
- Always implement complex UI components using a modular composition pattern for better maintainability, testing, and reuse. 

For example:

```txt
components/
├── navigation/
│   ├── navigation-drawer.tsx (main container component)
│   ├── navigation-header.tsx (fixed header section)
│   ├── navigation-items.tsx (scrollable content)
│   ├── navigation-footer.tsx (user profile section)
│   └── index.ts (export all components)
```

### Use Zustand for State Management
When asked to implement Zustand, the goal is to:
- Make the prototype application "feel very real" from a user perspective without implementing a database
- Make a possible future migration to a database easier (if or when required)

#### Implementing Zustand
- Implement a single store with persist middleware using sessionStorage that resets on browser/tab close
- Structure with logical slices for separation of concerns
- Maintain entity relationships through IDs (e.g., a document references its userId)
- Store initial state (aka "Mock Data") separately to ensure consistent reset behaviour
- Structure actions to mirror future API endpoints (e.g., createUser, fetchDocuments) to simplify database migration

#### Best practices
- Use TypeScript interfaces for type safety (define in types.ts or alongside slices)
- Define actions within each slice (e.g., addDocument, updateUser)
- Handle date serialization (store as ISO strings to avoid JSON issues)
- Use Immer middleware for more intuitive state updates when needed

Access pattern:
- Create custom hooks for components to access only needed state (e.g., useDocuments)

Exemplary Project Structure:

```
store/
├── index.ts                Main store creation with persist middleware
├── types.ts/               Shared types as needed
├── utils.ts/               Additional utilities as needed
├── hooks.ts/               Custom hooks for components to access state
├── slices/                 Logical state divisions
│   ├── userSlice.ts        User preferences
│   ├── documentsSlice.ts   Markdown documents
│   └── uiSlice.ts          UI state (active doc, sidebar open)
└── initialData/            Default state values
    ├── users.ts            Default user
    └── documents.ts        Sample documents
```