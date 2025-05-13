# Project structure (target)

Follow modern Next.js project structure practices. This is a target project structure as the application grows in complexity.

```txt
- node_modules/             # Dependencies installed by npm/yarn/pnpm
- public/                   # Static assets like images, fonts, and files
- app/(routes)              # Contains all route pages grouped together
- app/api/                  # Backend endpoints for data operations and external services
- app/layout.tsx            # Root layout component that wraps all pages
- app/page.tsx              # Homepage component (root page of the application)
- app/globals.css           # Project-wide CSS styles including Shadcn/ui variables
- components/ui/            # Reusable shadcn/ui components like buttons, inputs, etc.
- components/navigation/    # Complex custom components are arranged into folders
- store/                    # (Zustand)
- store/slices/             # (Zustand)
- store/initialData         # (Zustand)
- lib/                      # Config for external services like supabase.ts, stripe.ts
- lib/utils/                # Reusable functions for common tasks like parseDate.ts
- hooks/                    # Reusable React logic for state and effects
- types/                    # TypeScript type definitions and interfaces like user.ts
- tests/                    # Unit and integration tests (Zest, Cypress, etc.)
- .env.local                # Environment variables (local development)
- .env.example              # Example environment variables (for documentation)
- next.config.mjs           # Next.js configuration
- tailwind.config.ts        # Tailwind CSS configuration
- tsconfig.json             # TypeScript configuration
- .gitignore                # Files and directories to ignore in git
- README.md                 # Project documentation
```

## Example UI Components

```txt
components/
├── navigation/
│   ├── navigation-drawer.tsx (main container component)
│   ├── navigation-header.tsx (fixed header section)
│   ├── navigation-items.tsx (scrollable content)
│   ├── navigation-footer.tsx (user profile section)
│   └── index.ts (export all components)
```