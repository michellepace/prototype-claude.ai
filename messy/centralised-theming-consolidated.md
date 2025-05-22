## Centralised Theming (UI Theming Standards)

This approach solves the problem of inconsistent styling and difficult theme changes in Tailwind 3.x + shadcn/ui projects. This enables theme changes without touching individual components, while preserving Tailwind's utility-first benefits and shadcn/ui's component patterns.

### Core Decision Rule

- **Use CSS variables** (in `globals.css`) for theme-related values that need global consistency (colors, radius, font family). Map these to Tailwind utility classes in `tailwind.config.ts`.
- **Use Tailwind utility-first approach** style with Tailwind utility classes application wide
- **Avoid custom CSS** use Tailwind utilities and/or shadcn/ui variants instead whenever possible

### Implementation Rules

1. **Use semantic color utilities** for all color styling:
   ```tsx
   // ✅ Use semantic color utilities (reference CSS variables)
   <div className="bg-card text-card-foreground border-border">
   
   // ❌ Avoid direct Tailwind colors
   <div className="bg-slate-100 text-slate-900 border-slate-200">
   ```

2. **Use standard Tailwind utilities** for typography, spacing, and layout:
   ```tsx
   // Typography, spacing, layout
   <div className="flex p-4 gap-2 rounded-lg">
     <h2 className="text-xl font-bold mb-2">Title</h2>
     <p className="text-sm leading-relaxed">Content</p>
   </div>
   ```

3. **Use shadcn/ui component variants** when available:
   ```tsx
   // ✅ Use built-in variants
   <Button variant="destructive" size="sm">Delete</Button>
   
   // ❌ Avoid custom styling
   <Button className="bg-red-500 text-white px-2 py-1">Delete</Button>
   ```

4. **Keep theming centralized** in two files only:
   - `globals.css`: Color variables, radius, and app-wide fonts
   - `tailwind.config.ts`: Variable mappings and font family definitions

#### Implementation Example

Complete component showing semantic colors, standard utilities, and component variants working together.

```tsx
<div className="flex flex-col p-4 bg-card text-card-foreground rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Card Title</h2>
  <p className="text-sm text-muted-foreground mt-2">Description text</p>
  <div className="mt-4 flex justify-end gap-2">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button>Submit</Button>
  </div>
</div>
```

### Code Templates

#### Custom Color Addition

If requested to add new semantic colors:

```css
/* In `globals.css` */
:root {
  /* existing variables */
  --brand: 210 100% 50%;
  --brand-foreground: 0 0% 100%;
}
```

```typescript
/* In tailwind.config.ts */
colors: {
  // existing colors
  brand: "hsl(var(--brand) / <alpha-value>)",
  "brand-foreground": "hsl(var(--brand-foreground) / <alpha-value>)",
}
```

#### Font Family Setup (app-wide)

If requested to set up app-wide font family:

```typescript
/* In tailwind.config.ts */
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
}
```

```css
/* In `globals.css` - apply app-wide */
@layer base {
  body {
    @apply font-sans;
  }
}
```

Example usage:

```tsx
<div className="font-sans">
  <code className="font-mono">console.log('example')</code>
</div>
```

### Boundaries (Avoid)

- **Don't** create new shadcn semantic colors unnecessarily - consider modifying existing color variables in `globals.css` first
- **Don't** add colors to `tailwind.config.ts` - define CSS variables in `globals.css` and then map in `tailwind.config.ts`
- **Don't** use direct Tailwind colors (`bg-blue-500`) - use semantic colors (`bg-primary`)
- **Don't** write custom CSS classes - use Tailwind utility compositions
- **Don't** extend CSS variables beyond colors, radius, and fonts - use standard Tailwind utilities