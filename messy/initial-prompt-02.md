# Create a Claude.ai Clone Prototype

Build a Next.js application that replicates the Claude.ai experience, focusing on core functionality first. I want a prototype that persists data between refreshes and "feels real" to users.

## Tech Stack
---

Build the application using the following technologies:

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: 
  - Tailwind CSS 3.x
  - shadcn/ui components
  - CSS Variables for theming
  - heroicons for icon library
- **State Management & Persistence**:
  - Zustand with persist middleware to manage application state and automatically sync with local storage
- **Code Quality**:
  - ESLint with recommended TypeScript rules
  - Proper component organisation
- **Folder Structure**:
  - `/app` - Next.js App Router routes
  - `/components` - Reusable UI components
  - `/hooks` - Custom React hooks including Zustand stores
  - `/lib` - Utility functions
  - `/types` - TypeScript interfaces and types


## Project Installation and Config

## Next.js with Tailwind 3
Ensure to install Next.js with these options:

```bash
--typescript
--eslint
--tailwind
--app
--no-turbo
--import-alias="@/*"
```

## Shadcn/ui

1. Ensure to install Shadcn/ui with these options:

```bash
- --typescript
- --style=new-york
- --color=stone
- --css-variables=yes
- --tailwind-css=app/globals.css
- --tailwind-config=tailwind.config.ts
- --components-dir=components
- --utils-dir=lib/utils
- --rsc
```

2. Once Shadcn/ui is installed, ensure `components.json` matches:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "stone",
    "cssVariables": true,
    "rsc": true,
    "tsx": true
  },
  "aliases": {
    "utils": "@/lib/utils",
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "heroicons"
}
```

## Out of Scope (For Future Implementation)
---

To ensure focus on the core functionality, the following features are intentionally excluded from the initial implementation:

- **External API Integration**: No actual Anthropic API integration yet. Use hardcoded response instead.
- **Database Integration**: No Supabase or other database implementation. Use only local storage for persistence.
- **Authentication**: No Clerk or other auth provider integration. Simulate logged-in state with hardcoded user data.
- **Headers & Footers**: Do not implement traditional page headers or footers. The Claude.ai interface uses only the modal navigation drawer and content area.
- **Advanced Responsive Design**: No complex responsive layouts or breakpoint-specific styling. Focus on mobile-first design only.
- **Rich Text Formatting**: No markdown parsing or code syntax highlighting in messages.
- **Analytics**: No usage tracking or analytics integration.
- **File Attachments**: No file upload or attachment functionality.

When the agent encounters a need for any of these features, it should implement the simplest possible placeholder or mock rather than attempting to build the real functionality.

## Domain Model (Core Entities)
---

These domain entities will be implemented as Zustand stores that automatically persist to local storage between page refreshes and browser sessions using the persist middleware.

```typescript
// Core domain entities
interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  plan: 'free' | 'pro';
  preferences: {
    theme: 'light' | 'dark' | 'system';
    font: 'default' | 'system' | 'dyslexic-friendly';
    callName?: string; // What should we call you
    workType?: string; // What best describes your work
    responsePreferences?: string; // Personal preferences for Claude to consider
  }
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string; // ISO string format
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  projectId?: string;
  starred: boolean; // Whether this chat is starred/pinned
}

interface Project {
  id: string;
  name: string;
  description?: string;
  chats: string[]; // Array of chat IDs
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  starred: boolean; // Whether this project is starred/pinned
}
```

## UI References
---
Screenshots are provided for reference only. Focus on:
- General layout structure and component organization
- Navigation patterns and information hierarchy
- NOT pixel-perfect replication

Reference files:
- chat.jpg - Main chat interface
- chats.jpg - List of all chats
- projects.jpg - Projects list page
- project.jpg - Single project page
- settings.jpg - User settings page with 4 tabs
- navigation.jpg - Modal navigation drawer with trigger behaviour

## Technical Approach
---

### State Management
Implement Zustand stores with local storage persistence for all data:

```typescript
// Example store structure - implement all of these
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updatePreferences: (preferences) => set(state => ({ 
        user: { ...state.user, preferences: { ...state.user.preferences, ...preferences } } 
      })),
    }),
    { name: 'user-store' }
  )
);

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: {}, // Record<string, Chat>
      currentChatId: null,
      // Add appropriate actions here
    }),
    { name: 'chat-store' }
  )
);

export const useProjectStore = create(
  persist(
    (set) => ({
      projects: {}, // Record<string, Project>
      // Add appropriate actions here
    }),
    { name: 'project-store' }
  )
);
```

### Styling Approach
- Use shadcn/ui components with the Stone theme as default
- Configure CSS variables in globals.css for theming
- Set up proper Tailwind configuration in tailwind.config.ts
- Style components with Tailwind utility classes ONLY
- Mobile-first approach - do NOT use responsive prefixes (sm:, md:, etc.)

## Implementation Priorities
---

1. **First Priority: Set up project structure and theming**
   - Next.js app router structure following **modern Next.js practices** (e.g., Server Components by default, proper layouts, file conventions like page.tsx/layout.tsx/etc.)
   - Global CSS with theme variables
   - Basic layout components
   - Implement the modal navigation drawer as a shared component across all pages

2. **Second Priority: Main Chat Interface**
   - Chat page with message display and input
   - Zustand store for chat state management
   - Local storage persistence for chats

3. **Third Priority: Navigation and Chat List**
   - Modal navigation drawer
   - Chats list page
   - New chat functionality

4. **Fourth Priority: Projects Functionality**
   - Project page
   - Projects list page
   - Project creation and management

5. **Fifth Priority: User Settings**
   - Profile settings with name, work type dropdown
   - Appearance settings with theme switching
   - Account management to logout, delete account
   - Privacy information and data export

## UI Components and Pages
---

### Modal Navigation Drawer
Modal navigation drawers are elevated above the app's content the content (page) they overlay when expanded. Navigation drawers can be vertically scrolled, independent of the rest of the screen’s content and UI. If the list of navigation destinations is longer than the height of the drawer, the drawer’s contents can be scrolled within the drawer.
- Shared component across all pages
- Modal drawer accessible via book icon in top left corner
- Fixed navigation elements (top):
   1. "New chat": icon is a round circle with "+" inside
   2. "Chats": icon is of two overlapping speech bubbles
   3. "Projects": icon is of a folder with documents inside
- Scrollable section contains:
   1. "Starred" items: chats or projects that have been starred in decending order of last edit date. Projects have the same "Projects" icon above (folder with documents inside). Chats display only their title (some have emoji's)
   2. "Recents" items: the 10 most recent chats in descending order of last edit date displaying only their title.
- Fixed navigation elements (bottom): user profile icon, name, and plan type with drop down chevron

- Contains "New chat" button with distinctive styling
- Sections for "Projects" and "Chats" with icons
- Lists starred items and recent conversations
- Shows user profile information at bottom with name and plan
- Overlays main content when expanded on mobile
- Reference: navigation.jpg for all possible states

### Chat Page
- Message thread display
- Input field for new messages
- For now, return hardcoded response: "Hardcoded - we will integrate with Anthropic API later... even though we don't know if you can use Python in Next.js!"
- Reference: chat.jpg for layout structure

### Chats Page
- List of all chats in descending order by last edit date
- New chat button
- Chat preview with title and snippet
- Reference: chats.jpg for list structure

### Project Page
- Project details and chats within project
- Add chat to project functionality
- Reference: project.jpg for layout structure

### Projects Page
- List of all projects in descending order by last edit date
- New project button
- Reference: projects.jpg for list structure

### Settings Page
- Page with four tabs: Profile, Appearance, Account, Privacy
- Profile tab with name, call name, work type, and preferences fields
- Appearance tab with theme and font options
- Account tab with logout and delete account options
- Privacy tab with data controls and export functionality
- Reference: settings.jpg for tab structure

## Implementation Rules
---

### Data Architecture
- Implement Zustand stores with persist middleware to handle both state management and local storage persistence
- Ensure all data persists in local storage between page refreshes

### UI Structure
- Mobile-first design approach is critical - do not use responsive prefixes
- No headers or footers - maintain layout with navigation drawer and content area only
- Navigation drawer should implement both collapsed and expanded states as shown in navigation.jpg

### Code Quality
- Keep UI component structure clean and modular
- Follow shadcn/ui theming best practices: style with utility classes, define CSS variables when needed
