# Apply These Best Practices

## UI Theming Standards

### Use Tailwind Best Practices
- Utility-first: style with Tailwind utility classes
- Mobile-first: design first without breakpoint prefixes (e.g., `sm:`, `md:`, etc) then add responsive variants only where needed

### Implement Dynamic Theming (Tailwind 3.x)
- Define CSS variables in `globals.css` (e.g., colors, typography, etc.)
- Map CSS variables to utility classes in `tailwind.config.ts`

### Avoid custom styling whenever possible
- Style with Tailwind utility classes
- Use shadcn/ui component variants over custom css

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
├── slices/                 Logical state divisions
│   ├── userSlice.ts        User preferences
│   ├── documentsSlice.ts   Markdown documents
│   └── uiSlice.ts          UI state (active doc, sidebar open)
└── initialData/            Default state values
    ├── users.ts            Default user
    └── documents.ts        Sample documents
```