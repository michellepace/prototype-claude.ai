Hello v0,

**Your task** is to create an exemplary Next.js App Router foundation project. This project will serve as a high-quality base for developers, incorporating modern web development best practices, robust theming, efficient state management, and responsive design. Please follow these instructions meticulously.

# Tech Stack

- **Framework:** Next.js 14 with the App Router.
- **TypeScript:** Yes
- **Linting/Formatting:** Default Next.js setup (ESLint, Prettier)
- **Styling:** Tailwind CSS, integrating with shadcn/ui components
- **shadcn/ui Configuration:** CSS Variables enabled, baseColor: stone
- **Light/Dark mode:** next-themes
- **State Management:** Zustand with Immer.

## shadcn/ui Setup Requirements

Initialise shadcn/ui with these specific settings:
- **CSS Variables:** Yes (`cssVariables: true`)
- **Base Color:** stone (`baseColor: "stone"`) 

Note: Set all available color variables (light/dark modes)

# Application Requirements

## Pages & Components
Root page: 
- A todo list that loads with 5 initial todo items across different categories (initial State). 
- User can add new tasks, edit tasks, delete tasks
- User can organise tasks by category and filter by category
- Resets to initial state on new session.

Settings page:
- App description and feature overview  
- Theme toggle (light/dark mode) with persistence
- Demonstrates shadcn/ui component variants adapting to themes:
  * Multiple button variants (default, outline, secondary, destructive)
  * Card components with theme-aware colors
  * Alert variants showing semantic color usage
- Shows responsive typography and spacing patterns

Header:
- Shared across all pages  
- App title and navigation to settings page

## Light/Dark Mode Implementation

Follow `agent-docs/implement-light-dark-mode.md`

# Data Model & Zustand Implementation Guide
(to be completed)

# Apply These Best Practices

Follow `agent-docs/best-practices-technical.md`