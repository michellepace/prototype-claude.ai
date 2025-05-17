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

The application will use a single Zustand store with persist middleware using sessionStorage that resets on browser/tab close:

### Project Structure

Follow this project structure as a guide:

```
store/
├── index.ts                # Main store with persist middleware
├── types.ts                # Shared types including ISODateString
├── utils/
│   └── dateUtils.ts        # Utilities for timestamp handling
├── slices/
│   ├── userSlice.ts        # User data and actions
│   ├── chatSlice.ts        # Chat conversations and messages
│   ├── projectSlice.ts     # Project management
│   └── uiSlice.ts          # UI state (sidebar, active entities)
└── initialData/
    ├── users.ts            # Default user
    ├── chats.ts            # Sample chats
    ├── messages.ts         # Sample messages
    ├── projects.ts         # Sample projects
    ├── models.ts           # Available AI models
    └── quickPrompts.ts     # Predefined quick prompts
```

### Store Inteface

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

## Best Practices

- Use TypeScript interfaces from types.ts for type safety
- Define actions within each slice (e.g., addChat, updateUser)
- Always use the utility functions for creating/formatting ISO date strings
- Use immer middleware for more intuitive state updates when needed
- Create custom selector hooks for components to access only needed state
- Structure actions to mirror future API endpoints to simplify database migration

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