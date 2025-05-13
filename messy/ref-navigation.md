# Claude Navigation Drawer Implementation Guide

## Visual Reference

![Modal Navigation Drawer with States and Interactions](/agent-docs/screenshots/navigation.jpg)

*Reference implementation showing key states:*
1. Nav Collapsed on Chat page (root)
2. Nav Expanded with Scrollable Area (Starred, Recents) at TOP position
3. Nav Expanded with Scrollable Area (Starred, Recents) at BOTTOM position
4. Nav Toggle States and Interactions showing:
   - 4a) Collapsed Nav /Default
   - 4b) Collapsed Nav /Active
   - 4c) Expanded Nav /Default
   - 4d) Expanded Nav /Active

## File Structure

IMPORTANT: Implement the navigation drawer using EXACTLY this modular component approach:

```
components/
├── navigation/
│   ├── navigation-drawer.tsx     # Main container with Sheet from shadcn/ui
│   ├── navigation-header.tsx     # Fixed header section (back button, primary nav)
│   ├── navigation-content.tsx    # Scrollable middle section with ScrollArea
│   ├── navigation-footer.tsx     # Fixed user profile section at bottom
│   └── index.ts                  # Export all components for easy imports
```

Each file has a specific responsibility. DO NOT combine these into a single file.

## Component Structure (ASCII Diagram)

The diagram below shows EXACTLY how files relate to UI components:

```
┌──────────────────────────────────────────────────────┐
│  navigation-drawer.tsx (Sheet from shadcn/ui)        │
│  ┌────────────────────────────────────────────────┐  │
│  │  navigation-header.tsx (FIXED)                 │  │
│  │  ┌─────────┐ ┌──────────┐                      │  │
│  │  │ ← Back  │ │  Claude  │                      │  │
│  │  └─────────┘ └──────────┘                      │  │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐         │  │
│  │  │ + New   │ │ 💬 Chats │ │ 📁 Projects         │  │
│  │  │  chat   │ │          │ │          │         │  │
│  │  └─────────┘ └──────────┘ └──────────┘         │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │  navigation-content.tsx (ScrollArea)           │  │
│  │                                                │  │
│  │  Starred                                       │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ 🟣 Prototype Claude.ai                   │  │  │
│  │  │ 🟢 Styling Tailwind Shad                 │  │  │
│  │  │ 📁 AI Prototyping Colin                  │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  Recents                                       │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ Review prompt.complete.md                │  │  │
│  │  │ v0 Prompting Tips                        │  │  │
│  │  │ ...                                      │  │  │
│  │  │ ...                                      │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ ⚪ All chats  (EllipsisHorizontalIcon)    │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │  navigation-footer.tsx (FIXED)                 │  │
│  │  ┌────┐  ┌────────────────┐  ┌────────┐        │  │
│  │  │ M  │  │ Michelle       │  │   ▼    │        │  │
│  │  └────┘  │ Pro plan       │  └────────┘        │  │
│  │          └────────────────┘  ChevronDownIcon   │  │
│  └────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

## Implementation Instructions

### 1. navigation-drawer.tsx

Create the main container component using EXACTLY shadcn/ui's Sheet component:

```tsx
// REQUIRED STRUCTURE - Use exactly as shown
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavigationHeader } from "./navigation-header";
import { NavigationContent } from "./navigation-content";
import { NavigationFooter } from "./navigation-footer";

export function NavigationDrawer() {
  return (
    <Sheet>
      <SheetContent 
        side="left" 
        className="p-0 w-[85%] flex flex-col h-full border-r shadow-lg"
      >
        <NavigationHeader />
        <NavigationContent />
        <NavigationFooter />
      </SheetContent>
    </Sheet>
  );
}
```

Implementation requirements:
- Must use shadcn/ui's Sheet component as the foundation
- Sheet must slide in from the left side
- Set width to exactly 85% of viewport with Tailwind
- Use flex column layout to stack the three main sections
- Remove default padding (p-0) and add your own where needed
- Apply appropriate shadow and border for visual separation
- Ensure the drawer takes full height of the viewport

### 2. navigation-header.tsx

Implement the fixed header component with these EXACT elements:

- Back button: Use Heroicons `ArrowLeftIcon` for navigation back/close
- App title: "Claude" text header (medium/semibold weight)
- Primary navigation items:
  - "New chat" button with Heroicons `PlusCircleIcon` (colored orange/red)
  - "Chats" item with Heroicons `ChatBubbleOvalLeftIcon`
  - "Projects" item with Heroicons `FolderIcon`
- Style requirements:
  - Must stay fixed at top during scroll (use `sticky top-0` or equivalent)
  - Apply white background with subtle bottom shadow
  - Use proper spacing between elements with Tailwind gap classes

### 3. navigation-content.tsx

Implement the scrollable content section using shadcn/ui's ScrollArea component:

- Use `<ScrollArea>` as the container for all scrollable content
- Include these EXACT sections in this order:
  1. "Starred" section header with list of starred items below
     - Projects use `FolderIcon` (same as Projects nav item)
     - Chats can have custom emoji prefixes in their names
  2. "Recents" section header with chronological list of recent items
     - Text-only items without icons (except emojis in names if present)
  3. "All chats" item at the very bottom of the scrollable area
     - Use Heroicons `EllipsisHorizontalIcon` inside a circle
- Implementation requirements:
  - Must handle overflow text with truncation (use `truncate` class)
  - Apply subtle hover effect to all clickable items
  - Use consistent spacing between items and sections
  - Ensure this is the ONLY scrollable part of the drawer

### 4. navigation-footer.tsx

Implement the fixed user profile component that ALWAYS remains at the bottom:

- Layout elements in a single row with these EXACT components:
  1. User avatar: Circle with user initial ("M") using shadcn/ui Avatar component
  2. User information: Two lines of text
     - Username: "Michelle" (medium weight)
     - Subscription: "Pro plan" (lighter weight/gray color)
  3. Dropdown indicator: Heroicons `ChevronDownIcon`
- Implementation requirements:
  - Must remain fixed at the bottom of drawer (use `sticky bottom-0`)
  - Apply white background to ensure it's visually separated from scrollable content
  - Include subtle top border or shadow to separate from scrollable area
  - Ensure proper vertical alignment of all elements

### 5. index.ts

Export all components for easy imports:

```tsx
export { NavigationDrawer } from './navigation-drawer';
export { NavigationHeader } from './navigation-header';
export { NavigationContent } from './navigation-content';
export { NavigationFooter } from './navigation-footer';
```

## CRITICAL REQUIREMENTS

### Styling Requirements
- **ONLY use Tailwind 3 utility classes** - DO NOT write ANY custom CSS
- **DO NOT** use arbitrary values like `w-[123px]` except for the drawer width
- Use these EXACT Tailwind patterns:
  - Main layout: `flex flex-col`
  - Fixed elements: `sticky top-0` and `sticky bottom-0`
  - Spacing: `p-4 px-6 gap-3 space-y-2` etc.
  - Typography: `text-sm font-medium text-gray-700 truncate`
  - Hover states: `hover:bg-gray-100`
  - Width control: `w-full`
  - Responsive sizes: `h-10 md:h-12`

### Component Requirements
- Use shadcn/ui components for these elements:
  - Sheet for the drawer container
  - ScrollArea for the scrollable content
  - Avatar for the user profile icon
- Reference Heroicons with EXACT names:
  - ArrowLeftIcon
  - PlusCircleIcon
  - ChatBubbleOvalLeftIcon
  - FolderIcon
  - EllipsisHorizontalIcon
  - ChevronDownIcon

### Accessibility Requirements
- Add these EXACT ARIA attributes:
  - `role="navigation"` on the main drawer
  - `aria-label="Main navigation"` on the drawer
  - `aria-current="page"` for active navigation items

### Implementation Notes
- Follow the file structure EXACTLY as specified
- Each file should handle ONLY its designated section
- The drawer must slide in smoothly from the left
- All text items should truncate with ellipsis when too long
- Navigation items need adequate tap targets (min 40px height)
- Use Tailwind's dark mode utilities for dark mode support