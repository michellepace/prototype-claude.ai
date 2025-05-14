# Zustand State Management Architecture

## Purpose
This architecture uses Zustand to create a "feels very real" application experience without implementing a database, while making future migration to a database like Supabase straightforward.

## Core Timestamp Approach
All timestamp fields use the `ISODateString` type (defined in types.ts) and extend the `BaseEntity` interface as established in the data model. This ensures:
- Proper JSON serialization in sessionStorage
- Chronological sorting capability
- Easy migration to database timestamp fields

## Implementing Zustand

### Store Configuration
- Implement a single store with persist middleware using sessionStorage that resets on browser/tab close
- Structure with logical slices for separation of concerns
- Maintain entity relationships through IDs (e.g., a document references its userId)
- Store initial state (aka "Mock Data") separately to ensure consistent reset behavior
- Use the `BaseEntity` pattern for standardized timestamp handling

### Date Handling
```typescript
// store/utils/dateUtils.ts

/** Creates a new ISODateString */
export const createISODate = (): ISODateString => new Date().toISOString();

/** 
 * Sorts BaseEntity objects by timestamp (newest first)
 * Can sort by createdAt, updatedAt, or lastMessageAt (for Chat entities)
 */
export const sortByTimestamp = <T extends BaseEntity & { lastMessageAt?: ISODateString }>(
  items: T[], 
  property: 'createdAt' | 'updatedAt' | 'lastMessageAt' = 'createdAt'
): T[] => {
  return [...items].sort((a, b) => {
    // Use the specified property, falling back to createdAt if property doesn't exist
    const propA = property === 'lastMessageAt' && a.lastMessageAt ? a.lastMessageAt : a[property === 'lastMessageAt' ? 'createdAt' : property];
    const propB = property === 'lastMessageAt' && b.lastMessageAt ? b.lastMessageAt : b[property === 'lastMessageAt' ? 'createdAt' : property];
    return propB.localeCompare(propA);
  });
};

/** Formats ISODateString for display */
export const formatDate = (isoString: ISODateString): string => {
  const date = new Date(isoString);
  return new Date().toDateString() === date.toDateString()
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString();
};
```

### Store Creation Example
```typescript
// store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createUserSlice } from './slices/userSlice';
import { createChatSlice } from './slices/chatSlice';
// other imports...

// Create combined store with middleware
export const useStore = create(
  persist(
    (...args) => ({
      // Combine all slices
      ...createUserSlice(...args),
      ...createChatSlice(...args),
      // other slices...
    }),
    {
      name: 'app-store',
      storage: typeof window !== 'undefined' ? sessionStorage : undefined,
    }
  )
);
```

### Slice Implementation Pattern
```typescript
// store/slices/chatSlice.ts
import { nanoid } from 'nanoid';
import { createISODate } from '../utils/dateUtils';
import { Chat, BaseEntity, ISODateString } from '../types';

export const createChatSlice = (set, get) => ({
  chats: {},
  
  // Action example showing BaseEntity extension pattern
  createChat: (title: string, modelId: string) => {
    const now = createISODate();
    
    // Create new chat extending BaseEntity
    const newChat: Chat = {
      // Basic entity fields
      id: nanoid(),
      userId: get().currentUser.id,
      projectId: undefined,
      title,
      modelId,
      isStarred: false,
      isLocked: false,
      
      // Chat-specific timestamp
      lastMessageAt: now,
      
      // BaseEntity timestamp fields
      createdAt: now,
      updatedAt: now,
    };
    
    set((state) => ({
      chats: { ...state.chats, [newChat.id]: newChat }
    }));
    
    return newChat.id;
  },
});
```

### Custom Hooks Pattern for Components

Create custom hooks as needed to encapsulate specific data access patterns:

```typescript
// Example 1: Get all chats for a user, sorted by most recent message
export const useChats = (userId: string) => {
  return useStore((state) => {
    const userChats = Object.values(state.chats)
      .filter(chat => chat.userId === userId);
    // Sort chats by lastMessageAt (special field for Chat entities)
    return sortByTimestamp(userChats, 'lastMessageAt');
  });
};

// Example 2: Get starred projects, sorted by last update
export const useStarredProjects = () => {
  return useStore((state) => 
    sortByTimestamp(
      Object.values(state.projects).filter(project => project.isStarred),
      'updatedAt'
    )
  );
};
```

**Create hooks based on component needs:** The examples demonstrate the pattern for working with BaseEntity timestamp fields. Create custom hooks that match your specific UI requirements, following the principle of "select only what you need" for optimal performance.


## Best Practices

- Use TypeScript interfaces from types.ts for type safety
- Define actions within each slice (e.g., addChat, updateUser)
- Always use the utility functions for creating/formatting ISO date strings
- Use immer middleware for more intuitive state updates when needed
- Create custom selector hooks for components to access only needed state
- Structure actions to mirror future API endpoints to simplify database migration

## Exemplary Project Structure

```
store/
├── index.ts                Main store creation with persist middleware
├── types.ts                Shared types including ISODateString
├── utils/
│   └── dateUtils.ts        Date handling utilities
├── slices/                 Logical state divisions
│   ├── userSlice.ts        User data and preferences
│   ├── chatSlice.ts        Chat conversations
│   ├── projectSlice.ts     Projects containing chats
│   └── uiSlice.ts          UI state (active chat, sidebar open)
└── initialData/            Default state values
    ├── users.ts            Default user
    ├── chats.ts            Sample chats
    └── messages.ts         Sample messages
```