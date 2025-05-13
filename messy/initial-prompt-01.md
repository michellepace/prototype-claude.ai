#  Claude.ai Prototype Building Project

## Project Goal
Create a visually accurate, interactive prototype of Claude.ai that mimics the real application's look and feel without implementing actual AI functionality. The prototype will display "mock data" as shown in the referenced screenshots. The technical goal is to follow good "data practices" and use Zustand, specifically a store with middleware sessionStorage (for simplicity).

## Tech Stack
- Next.js (follow modern conventions)
- TypeScript, ESLint
- Tailwind CSS ("New York" style)
- Shadcn/ui components (Stone palette, CSS Variables)
- Zustand store with persist middleware using sessionStorage

## Design Requirements
- Use defaults for styling
   - Use Tailwind CSS "New York" style
   - Shadcn/ui component defaults adjusted with varients if required
- Color:
   - Use Shadcn/ui Stone color palette 
   - Support light/dark modes for all component
- Follow Tailwind CSS best practices:
  - Utility-first approach
  - Mobile-first design
- Follow theming best practices:
   - Style components with Tailwind utility classes only
   - Mimimise custom CSS by using shadcn/ui varients
   - Never hardcode in components: use utility classes

## Data Requirements
- Use Zustand middleware + sessionStorage
   - Maintain user session state with
   - Seed mock data into the prototype UI
- TypeScript interfaces for all data models

## Out of Scope
- No actual AI integration - all chat messages receive the response: "This is a prototype that feels like real, but isn't"
- No authentication required - assume users are always logged in

## User Interface
1. Chat page - main chat interface
2. Chats page - history/listing page of all Chats
3. Project page - a project has many chats, a name, a description
4. Projects page - history/listing page of all Projects
5. User settings page - UI settings for light/dark mode etc.
6. Shared modal navigation drawer
   - accessible from all pages
   - includes top fixed area (New Chat, Chats, Projects)
   - includes scrollable area (showing "Starred" chats/projects, and "Recents" chats)
   - includes bottom fixed area (User avatar / settings: light/dark mode)