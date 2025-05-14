# AI Chat Platform Data Model

## Introduction

This document defines the core data structures for a modern AI Chat platform prototype. The data model is designed with two key goals:

1. **Initial Implementation**: To work seamlessly with Zustand state management and sessionStorage persistence for a "feels real" prototype without a backend database.

2. **Future Migration**: To facilitate a smooth transition to a database like Supabase in the future by using proper relationships and standardized timestamp handling.

All timestamp fields use the `ISODateString` type for consistent serialization and chronological sorting.

## Data Model Specification

The application needs to implement the following data model. This model will initially use a Zustand store with the persist middleware using sessionStorage but is designed to streamline the transition to a database like Supabase in the future:

#### Project Structure

├── store/
│   ├── index.ts
│   ├── types.ts                 # Shared types like ISODateString
│   ├── utils/
│   │   └── dateUtils.ts         # Utilities for timestamp handling
│   ├── slices/
│   │   ├── userSlice.ts
│   │   ├── chatSlice.ts
│   │   ├── projectSlice.ts
│   │   └── uiSlice.ts
│   └── initialData/
│       ├── users.ts
│       ├── chats.ts
│       ├── messages.ts
│       ├── projects.ts
│       ├── models.ts
│       └── quickPrompts.ts

#### Interfaces

```typescript
// Shared types
/** ISO 8601 date string (e.g., "2023-05-12T15:30:45.123Z") */
type ISODateString = string;

// Base entity with common timestamp fields
interface BaseEntity {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// Core entities
interface User extends BaseEntity {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  plan: string;
}

interface Project extends BaseEntity {
  id: string;
  userId: string;
  name: string;
  description: string;
  emoji?: string;
  isPrivate: boolean;
  isStarred: boolean;
  knowledgeFiles: KnowledgeFile[];
}

interface QuickPrompt extends BaseEntity {
  id: string;
  category: "write" | "learn" | "code" | "lifestuff"; // The type of menu
  title: string;
  icon?: string;
  order: number; // For controlling the display order in the list
}

interface Chat extends BaseEntity {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  modelId: string;
  isStarred: boolean;
  isLocked: boolean;
  lastMessageAt: ISODateString;
}

interface Message extends BaseEntity {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
  modelId: string;
}

// Supporting entities
interface Model extends BaseEntity {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

interface Integration extends BaseEntity {
  id: string;
  userId: string;
  type: "google_drive" | "gmail" | "calendar" | "github";
  name: string;
  isConnected: boolean;
  icon: string;
}

interface Settings extends BaseEntity {
  id: string;
  userId: string;
  theme: "light" | "dark" | "system";
  language: string;
  defaultModel: string;
}

interface KnowledgeFile extends BaseEntity {
  id: string;
  projectId: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Attachment extends BaseEntity {
  id: string;
  messageId: string;
  type: string;
  name: string;
  url: string;
}
```

**Key relationships:**
- A User has many Projects and Chats
- A Project contains many Chats
- A Chat contains many Messages
- A collection of QuickPrompts exists for each category (write, learn, code, lifestuff)
- A User can connect multiple Integrations
- Various Models can be selected for Chat interactions