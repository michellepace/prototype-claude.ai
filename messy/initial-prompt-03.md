# Create a Claude.ai Visual Prototype

Build a Next.js application that creates a visually accurate prototype of Claude.ai with the following specifications:

## Core Requirements
- Use Next.js App Router with TypeScript
- Implement shadcn/ui with the New York theme and Stone color palette
- Set up Zustand with sessionStorage middleware for state management
- Create a responsive design following Tailwind best practices

## Initial Implementation
1. Create the main application layout with a shared navigation drawer that:
   - Has a fixed top section with "New Chat", "Chats", and "Projects" navigation
   - Contains a scrollable middle section showing "Starred" and "Recent" chats
   - Includes a fixed bottom section with user settings and theme toggle

2. Implement the main chat interface that:
   - Displays a conversation thread with user and AI messages
   - Includes a message input area with a send button
   - Shows a welcome message on first load
   - Responds to all user inputs with: "This is a prototype that feels real, but isn't functional"

3. Set up the core data structure with TypeScript interfaces for:
   - Chat (id, title, messages, createdAt, updatedAt, projectId?)
   - Message (id, content, role: 'user'|'assistant', timestamp)
   - Project (id, name, description, chats[], createdAt, updatedAt)
   - User (id, name, settings{})

4. Create minimal placeholder pages for:
   - Chats listing page
   - Projects page
   - Settings page

## Design Notes
- The UI should closely match the Claude.ai screenshots provided
- Use a clean, minimal design with appropriate spacing and typography
- Implement both light and dark mode support

## Technical Implementation
- Use Server Components where appropriate
- Client Components only where interactivity is needed
- Implement proper TypeScript typing throughout
- Structure the Zustand store with separate slices for chats, projects, and settings