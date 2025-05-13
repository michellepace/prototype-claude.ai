## Try 1

### Template

Initial Prompt Structure

Your initial prompt should include:

1. **Project Overview**: Brief description of the Claude.ai prototype
   
2. **Tech Stack**: Next.js, TypeScript, shadcn/ui, Tailwind, Zustand
3. **Core Requirements**:
   - Project structure following App Router conventions
   - Theme setup with shadcn/ui (New York style, Stone palette)
   - Basic responsive layout matching Claude.ai
   - Initial state management setup
4. **First Feature Slice**: The chat interface (most central feature)

5. **Screenshots**: Include the main chat interface screenshot only

### Example

```txt
I want to create a functional prototype of Claude.ai using Next.js, TypeScript, shadcn/ui, and Tailwind CSS. The prototype should look and feel like the real Claude.ai but will return a fixed response: "This is a prototype that feels like real, but isn't."

Please set up the initial project with:

1. Next.js App Router structure
2. shadcn/ui with New York style and Stone color palette
3. Basic Zustand store setup with sessionStorage middleware
4. Core TypeScript interfaces for chats, users, and projects
5. Main chat interface matching the provided screenshot

[Attach main chat screenshot]

For the first iteration, focus on the main chat interface with proper layout and styling. No need to implement all features yet - we'll build iteratively.
```

## Try 2

Recommended Initial Prompt Structure:

1. **Project Setup & Architecture**
   - Next.js App Router setup with the correct folder structure
   - ailwind and shadcn/ui configuration with the New York style and Stone palette
   - Basic layout components that will be shared across pages
   - ore TypeScript interfaces for your data models

2. **Navigation Framework**
   - Implement the shared modal drawer navigation
   - Set up the basic routing structure for all pages
   - Create placeholder pages with minimal content

3. **State Management Foundation**
   - Basic Zustand store setup with sessionStorage middleware
   - Core state slices for user, chats, and projects

This approach gives you a solid foundation that's functional but not overwhelming, allowing you to iterate on specific features later.

## Try 3

Initial Prompt Context

For your initial prompt to v0.dev, I recommend including:

1.  **Project overview** - Brief description of the Claude.ai prototype project
2.  **Core design requirements** - Shadcn New York theme, Stone palette, Tailwind approach
3.  **Initial feature focus** - Start with the main chat interface
4.  **Visual reference** - Include the screenshot you shared for visual guidance
5.  **TypeScript interfaces** - Include basic data models for messages, conversations, etc.

Keep the initial prompt focused on establishing the foundation - the main chat interface and core styling. This gives v0 a clear, manageable scope.