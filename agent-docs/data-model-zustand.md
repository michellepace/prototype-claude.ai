# Data Model & Zustand Implementation Guide

## Introduction

This document outlines the core data structures and Zustand state management implementation (Zustand being a lightweight state management library for React) for a Claude.ai interface prototype in our Next.js application. The architecture is designed with two complementary goals:

1. **Initial Implementation**: To provide a realistic user experience using Zustand stores with sessionStorage persistence for mock data, creating a functional prototype without requiring a backend database.

2. **Future Migration**: To facilitate smooth transition to a database solution like Supabase through carefully designed entity relationships and standardised timestamp handling.

This approach delivers immediate business value by accelerating development cycles while ensuring the codebase remains adaptable without costly refactoring.

The following sections detail the TypeScript interfaces, entity relationships, Zustand store structure, and business rules that support this dual-purpose architecture.

## Data Model

### Data Interfaces (TypeScript)

All timestamp fields use the `ISODateString` type for consistent serialization and chronological sorting.

#### Core Types

```typescript
/** Shared types **/

/** ISO 8601 date string (e.g., "2023-05-12T15:30:45.123Z") */
export type ISODateString = string;

// Base entity with common timestamp fields
export interface BaseEntity {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** Core entities **/

export interface User extends BaseEntity {
  id: string;
  email: string;
}

export interface Project extends BaseEntity {
  id: string;
  userId: string;
  name: string; // Can contain Unicode symbols, Max 90 chars
  description: string;
  isStarred: boolean;
  isArchived: boolean;
}

export interface Chat extends BaseEntity {
  id: string;
  userId: string;
  projectId?: string;
  name: string; // Auto-generated from first message (max 90 chars) or from quick prompt
  modelId: string;
  isStarred: boolean;
  isArchived: boolean;
  lastMessageAt: ISODateString;
}

export interface Message extends BaseEntity {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
}

export interface Model extends BaseEntity {
  id: string;
  name: string; // e.g., "Claude 3.7 Sonnet"
  description?: string; // e.g., "Our most intelligent model yet"
  isDefault?: boolean; // Flag for the default selected model
}

export interface QuickPrompt extends BaseEntity {
  id: string;
  category: "write" | "learn" | "code" | "lifestuff";
  name: string; // Display name shown in the UI
  chatName: string; // What the chat will be named when using this prompt
  promptContent: string; // The actual prompt text to be sent
  order: number; // For controlling the display order in the list
}

// All UserSettings a user can configure in the app
export interface UserSettings extends BaseEntity {
  id: string;
  userId: string;
  fullName: string;
  displayName: string;
  workDescription?: string;
  customInstructions?: string;
  artefacts: boolean;
  analysisTool: boolean;
  colorMode: "light" | "dark" | "system";
  chatFont: "default" | "system" | "dyslexic";
  useLocationMetadata: boolean;
}

export interface UserSettingsIntegration extends BaseEntity {
  id: string;
  userId: string;
  type: "google_drive" | "gmail" | "calendar" | "github";
  name: string;
  isConnected: boolean;
  icon: string;
}
```

#### Helper Types

These specialized types support UI requirements for displaying items in lists with additional context:

```typescript
// Chat with additional information for display in lists
export interface ChatWithDetails extends Chat {
  lastMessage?: {
    content: string;
    createdAt: ISODateString;
  };
  project?: {
    id: string;
    name: string;
  };
}

// Project with additional information for display in lists
export interface ProjectWithDetails extends Project {
  chatCount: number;
  lastActivity?: ISODateString;
}
```

### Data Relationships

- **User and Projects**: A User has many Projects (one-to-many)
- **User and Chats**: A User has many Chats (one-to-many)
- **Project and Chats**: A Project contains many Chats, but a Chat belongs to either one Project or no Project (one-to-many with optional relationship)
- **Chat and Messages**: A Chat contains many Messages (one-to-many)
- **Chat and Model**: A Chat uses one Model, selected at creation time (immutable after creation)
- **User and Settings**: A User has one set of UserSettings (one-to-one)
- **User and Integrations**: A User can connect multiple UserSettingsIntegrations (one-to-many)

## State Management (Zustand)

The application will use a single Zustand store with persist middleware using sessionStorage that resets on browser/tab close. 

**Note:** The following implementation details establish the core foundation and patterns to build upon, not a complete solution. The state management will evolve as the application grows.

### Project Structure

This starting structure represents the foundational implementation detailed in subsequent sections:

```
store/
├── index.ts                 # Main store with persist middleware
├── types.ts                 # Shared types including ISODateString
├── utils/
│   ├── dateUtils.ts         # Includes createISODate, sortByTimestamp, formatRelativeTime
│   └── (...)                # Additional utilities as needed
├── slices/
│   ├── userSlice.ts         # System-managed user data (id, email)
│   ├── userSettingsSlice.ts # User-editable settings and preferences
│   ├── chatSlice.ts         # Chat conversations and messages
│   ├── projectSlice.ts      # Projects contain many chats
│   ├── modelSlice.ts        # AI model configurations
│   ├── quickPromptSlice.ts  # Quick prompt templates
│   ├── uiSlice.ts           # UI state (sidebar, active entities)
│   └── (...)                # Additional slices as needed
├── hooks/
│   ├── useStarredProjects.ts # Custom hook for starred projects
│   ├── useRecentChats.ts     # Custom hook for chat lists
│   ├── useUserSettings.ts    # Custom hook for user settings
│   ├── useProjects.ts        # Custom hook for project management
│   └── (...)                 # Additional hooks as needed
└── initialData/
    ├── users.ts             # Mock user (no authentication)
    ├── userSettings.ts      # Initial user settings
    ├── chats.ts             # Initial chat data
    ├── messages.ts          # Initial message data
    ├── projects.ts          # Initial project data
    ├── models.ts            # Initial model data
    ├── quickPrompts.ts      # Initial quick prompt data
    └── (...)                # Additional initial data as needed
```

### Store Interface

```typescript
// Store interface for the Zustand state
export interface AppStore {
  // Entities collections
  users: Record<string, User>;
  projects: Record<string, Project>;
  chats: Record<string, Chat>;
  messages: Record<string, Message>;
  models: Record<string, Model>;
  quickPrompts: Record<string, QuickPrompt>;
  userSettings: Record<string, UserSettings>;
  
  // Current user reference
  currentUserId: string | null;
  
  // UI state
  activeChat: string | null;
  activeProject: string | null;
  isSidebarOpen: boolean;
  
  // User actions
  setCurrentUser: (userId: string) => void;
  setActiveChat: (chatId: string | null) => void;
  setActiveProject: (projectId: string | null) => void;
  toggleSidebar: () => void;
  
  // Project actions
  createProject: (name: string, description: string) => string;
  updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'userId' | 'createdAt'>>) => void;
  toggleProjectStar: (id: string) => void;
  toggleProjectArchive: (id: string) => void;
  deleteProject: (id: string) => void;
  
  // Chat actions
  createChat: (modelId: string, initialMessage?: string, projectId?: string, quickPromptId?: string) => string;
  updateChat: (id: string, updates: Partial<Omit<Chat, 'id' | 'userId' | 'createdAt'>>) => void;
  toggleChatStar: (id: string) => void;
  toggleChatArchive: (id: string) => void;
  deleteChat: (id: string) => void;
  moveChat: (chatId: string, projectId: string | null) => void;
  
  // Message actions
  addMessage: (chatId: string, role: "user" | "assistant", content: string) => string;
  
  // Settings actions
  updateUserSettings: (settings: Partial<Omit<UserSettings, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => void;
}
```

### Core Utilities

The application requires several utility functions to support timestamp operations. Implement these three essential utilities in `store/utils/dateUtils.ts`:

```typescript
// Creates a new ISODateString for the current time
export const createISODate = (): ISODateString => new Date().toISOString();

// Sorts entities by timestamp in reverse chronological order (newest first)
export const sortByTimestamp = <T extends BaseEntity & { lastMessageAt?: ISODateString }>(
  items: T[], 
  property: 'createdAt' | 'updatedAt' | 'lastMessageAt' = 'updatedAt'
): T[] => {
  return [...items].sort((a, b) => {
    const timeA = property === 'lastMessageAt' && a.lastMessageAt 
      ? a.lastMessageAt : a[property === 'lastMessageAt' ? 'updatedAt' : property];
    const timeB = property === 'lastMessageAt' && b.lastMessageAt 
      ? b.lastMessageAt : b[property === 'lastMessageAt' ? 'updatedAt' : property];
    return new Date(timeB).getTime() - new Date(timeA).getTime();
  });
};

// Formats timestamps as relative time strings (e.g., "2 hours ago", "1 day ago")
export const formatRelativeTime = (isoString: ISODateString): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  if (diffMinutes < 1) return 'just now';
  if (diffHours < 1) return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  if (diffDays < 1) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays < 30) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  if (diffYears < 1) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
};
```

**Note:** These three utilities form the essential core for timestamp management. Additional utility functions may be added as the application grows.

### Implementation Pattern Example

The following example demonstrates the 'Starred Projects' functionality, showing how slice, hook, and component layers work together using Immer middleware. Use this implementation pattern as a template for each entity type in your application.

#### 1. Slice Implementation (with Immer)

This slice defines the core state and actions for managing projects, using Immer to simplify state updates.

```typescript
// File: store/slices/projectSlice.ts
import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { AppStore } from '../types';
import { Project } from '../types';
import { createISODate } from '../utils/dateUtils';

export const createProjectSlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  Pick<AppStore, 'projects' | 'createProject' | 'toggleProjectStar'>
> = immer((set, get) => ({
  // State
  projects: {},
  
  // Actions
  createProject: (name, description) => {
    const id = nanoid();
    const now = createISODate();
    const userId = get().currentUserId!;
    
    // With Immer, we can directly modify "draft state"
    set((state) => {
      state.projects[id] = {
        id,
        userId,
        name,
        description,
        isStarred: false,
        isArchived: false,
        createdAt: now,
        updatedAt: now
      };
    });
    
    return id;
  },
  
  toggleProjectStar: (id) => {
    // Simple toggle with Immer
    set((state) => {
      if (state.projects[id]) {
        // Toggle the star status
        state.projects[id].isStarred = !state.projects[id].isStarred;
        
        // Update the timestamp (for sorting)
        state.projects[id].updatedAt = createISODate();
      }
    });
  }
}));
```

#### 2. Custom Hook Implementation

This custom hook selects, filters and sorts projects from the store, returning only what components need.

```typescript
// File: hooks/useStarredProjects.ts
import { useStore } from '../store';
import { sortByTimestamp } from '../store/utils/dateUtils';

// Custom hook for accessing starred projects
export function useStarredProjects() {
  return useStore((state) => {
    // 1. Get all projects for the current user
    const userProjects = Object.values(state.projects)
      .filter(project => 
        project.userId === state.currentUserId && 
        project.isStarred && 
        !project.isArchived
      );
    
    // 2. Sort by lastUpdated (newest first)
    const sortedProjects = sortByTimestamp(userProjects, 'updatedAt');
    
    // 3. Return both data and actions
    return {
      starredProjects: sortedProjects,
      toggleStar: state.toggleProjectStar
    };
  });
}
```

#### 3. Component Usage Pattern

Components consume the custom hook to access both data and actions without direct store dependencies.

```typescript
// File: Usage Pattern for Component

/*
 * How to use the useStarredProjects hook in your components
 * This pattern can be integrated with any UI library or component structure
 */

// Example 1: Basic usage in a navigation drawer section
function StarredProjectsSection() {
  // The hook provides both data and actions
  const { starredProjects, toggleStar } = useStarredProjects();
  
  // Optional: Skip rendering if empty
  if (starredProjects.length === 0) return null;
  
  // Integrate with your own component structure and styling
  return (
    <YourSectionComponent title="Starred Projects">
      {starredProjects.map(project => (
        <YourProjectItemComponent 
          key={project.id}
          project={project}
          onStarClick={() => toggleStar(project.id)}
        />
      ))}
    </YourSectionComponent>
  );
}
```

#### Implementation Notes

1. **Slice Pattern**:
   - Use Immer middleware to simplify state updates
   - Always update timestamps when entities change
   - Check entity existence before updates
   - Keep actions focused on single responsibilities

2. **Hook Pattern**:
   - Create separate hooks for different data access patterns
   - Filter and sort data in the hooks, not in components
   - Return only what components actually need
   - Combine related data and actions in the return object

3. **Component Pattern**:
   - Use hooks to access data and actions
   - Keep components focused on presentation
   - Avoid direct store access in components
   - Extract reusable patterns into custom hooks

## Best Practices

### State Management

- **Use Immer middleware** to simplify state mutations while preserving immutability, especially for entity collections
- Always use the three core timestamp utility functions for consistent date handling
- Structure actions to mirror future API endpoints to simplify database migration

### Development Approach

- Use TypeScript interfaces from types.ts for type safety and consistent entity handling
- Define actions within each slice (e.g., addChat, updateUser) with clear responsibilities
- **Follow the Slice + Hook + Component pattern** from the Starred Projects example for clean separation of concern
- Create custom selector hooks for components to access only needed state
- Extend the utility function collection as new needs emerge during development

## Appendix: Business Rules

### Naming Conventions

- **Chat Names**: Automatically generated from the first 90 characters of the first user message or from the chatName property of a QuickPrompt
- **Project Names**: Explicitly defined by the user during creation
- **Unicode Support**: Both Chat and Project names support Unicode character symbols (e.g., emojis)

### Status Tracking

- **Starred Items**: Both Projects and Chats can be starred for quick access
- **Archived Items**: Both Projects and Chats can be archived to reduce clutter
- **Activity Timestamps**: The lastMessageAt field on Chat entities enables sorting by recent activity

### Other

- The lastMessageAt timestamp in Chat is used for sorting by recent activity
- Models have an isDefault flag to indicate the default selection for new chats
- QuickPrompts are organized by category and ordered within each category
