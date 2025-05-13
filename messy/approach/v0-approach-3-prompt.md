```
DO NOT CODE - I need advice and for you to answer my questions. Consider the below:

# Claude.ai Prototype Building Project

## Project Goal
Create a visually accurate, interactive prototype of Claude.ai that mimics the real application's look and feel without implementing actual AI functionality.

## Tech Stack
- Next.js
- TypeScript
- shadcn/ui components
- Tailwind CSS
- Zustand (for state management)

## Design Requirements
- Use shadcn "New York" theme style
- Apply Stone color palette as the base
- Follow Tailwind best practices:
  - Utility-first approach
  - Mobile-first responsive design
  - Map shadcn CSS variables to Tailwind utility classes

## Functional Requirements
- No actual AI integration - all chat messages receive the response: "This is a prototype that feels like real, but isn't"
- Maintain user session state with Zustand + session storage (preparing for potential Supabase integration later)
- No authentication required - assume users are always logged in
- TypeScript interfaces for all data models

## Pages to Implement
1. Main chat interface
2. Chat history/listing page
3. Projects page
4. Project detail page 
5. User settings page
6. Shared modal navigation drawer (accessible from all pages)

## Development Strategy Options
I need guidance on which approach would be most effective:

### Option 1: Start with minimal core features
- Begin with just the main chat interface
- Set up proper project structure and styling foundations
- Add state management and additional pages incrementally

### Option 2: Full UI implementation first
- Build all UI components and pages in the initial prompt
- Include TypeScript interfaces
- Implement state management afterward

### Option 3: Feature-based implementation
- Create a "docs/" folder with:
  - One file per feature with user stories
  - "project-overview.md" with architecture details
  - "good-practices.md" for coding standards
- Implement features incrementally based on priority

## Questions
1. Which development strategy would you recommend?
2. How much context should I provide in the initial prompt to v0.dev?
3. What's the optimal way to structure this work to maintain clarity while building iteratively?
```