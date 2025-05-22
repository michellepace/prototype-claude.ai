# Modern Next.js Base Project

This project provides a solid foundation for developers to use as a base for new Next.js applications. It implements modern best practices and architectural patterns that provide a consistent structure LLM coding agents can easily build upon.

It showcases:
- Clean, modular code architecture with separation of concerns
- Modern Next.js project structure using the App Router (no `src/`. Uses "(route_folders)")
- Zustand state management with Immer, with proper slices, hooks, and session persistence via a practical todo example
- Component-driven UI development with proper composition patterns

Centralises theming for maintainability:
- A consistent colour theme that's easy to change (via `globals.css`)
- The full flexibility of Tailwind's utility system for everything else
- Perfect compatibility with shadcn/ui components

Minimises custom CSS to provide:
- Design system consistency: enforced by Tailwind utility classes
- Design system maintainability: make changes only in `globals.css` and tailwind.config.ts`
- Simplified refactoring: Component styling changes can be made directly in the component
- Efficient responsive design: Built-in responsive prefixes (`sm:`, `md:`, etc.) provide a consistent pattern



<temp>
The project enforces centralised theming for maintainability:
- Uses the default Tailwind CSS 3 theme
- Configures shadcn/ui for `CSS variables`
- Avoids custom css when ever possible:
   - For `layouts.tsx`, `pages.tsx` etc.: uses a Tailwind utility-first approach
   - For shadcn/ui components uses defaults and/or inbuilt variants
- Makes it easy to change theme colors later:
   - Defines all color variables in `globals.css` using https://ui.shadcn.com/registry/colors/stone.json
   - Ensures variables are mapped from the beginning in `tailwind.config.ts`
   - For a colour change, you simply change the value of the variable in `globas.css`
</temp>


## Tech Stack

- Next.js with:
   - App Router
   - TypeScript support
   - ESLint configuration
   - Tailwind CSS 3
   - No `src/` directory
- shadcn/ui with `CSS variables`
- Zustand with Immer

## Design Guide

Colours:
- 

Styling:
- Use Tailwind default theme (do not extend or override)

## State Management

Set up Zustand with Immer for state management:

- Install both packages
- Create a proper store architecture with:

- A store directory at the root level
- Subdirectories for slices, hooks, and initialData
- Session persistence middleware configuration

## Application Structure

Create the following routes and components:

### Navigation

Implement a shared Modal Navigation Drawer (using shadcn/ui Sheet component) that appears on all pages with links to:
- Home (/)
- Zustand Demo (/zustand)

### Home Page (/)

Create a home page that:
- Describes the project's tech stack (Next.js, shadcn/ui, Zustand, Immer, etc.)
- Demonstrates shadcn/ui button variants (all available variants)
- Showcases at least 3 other unique shadcn/ui components of your choice

### Zustand Demo Page (/zustand)

Create a todo list page that demonstrates Zustand with proper architecture:

#### Store Structure Setup:

- Create `store/index.ts` with the main Zustand store using persist middleware with sessionStorage
- Implement `store/types.ts` with the Todo interface (id, text, completed)
- Implement the three-layer architecture where:
  - Slices in `store/slices/` define state and actions using Immer
  - Custom hooks in `store/hooks/` select and transform data from the store
  - Components consume hooks without direct store access
  - Initial data is stored in `store/initialData/`

#### Implementation Details:

**Initial Data** (`store/initialData/todos.ts`):
- Define 3 default todo items that will load when the session resets
  
**Slice Implementation** (`store/slices/todoSlice.ts`):
- Create a slice using Immer middleware
- Implement actions: addTodo, deleteTodo, toggleTodo
- Export the slice creator function to be combined in the main store
  
**Custom Hook** (`store/hooks/useTodos.ts`):
- Create a hook that selects todos from the store
- Return both data and actions in a single object
  
**Component Usage**:
- Create a TodoList component that uses the useTodos hook
- Separate presentation from state management
- Demonstrate proper component decomposition

#### UI Features:

- Display the list of todos with completion status
- Form to add new todos (shadcn/ui Input and Button)
- Delete button for each todo item
- Checkbox to toggle completion status
- Counter showing total and completed todos ("3/5 completed")
- Style completed todos differently

#### Technical Requirements:

- Use Immer for all state updates
- Implement sessionStorage persistence (keep todos during session, reset on session close)
- Follow TypeScript best practices with proper interfaces
- Use shadcn/ui components for the interface

## Design Guidelines

- Design for mobile-first only (no breakpoint prefixes like sm:, md:, etc.)
- Use Tailwind defaults (don't extend or override tailwind.config.js)
- Use shadcn/ui component defaults with their standard Tailwind utility classes
- Minimize custom CSS - use Tailwind utility classes and shadcn/ui components whenever possible

## Important Notes

- Do NOT include a shared header or footer
- Ensure the navigation drawer is accessible from all pages
- Follow best practices for Zustand state management
- Use Immer for immutable state updates in Zustand
- Implement proper TypeScript typing throughout the project

Please generate this complete project with all the specified features and configurations.

## BEST PRACTICES: Code Architecture

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