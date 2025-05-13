### Data Model

The application needs to implement the following data model. This model will initially use a Zustand store with the persist middleware using sessionStorage. But is designed to streamline the transition to a database like Supabase in the future:

#### Project Structure

├── store/
│   ├── index.ts
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
// Core entities
interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  emoji?: string;
  isPrivate: boolean;
  isStarred: boolean;
  knowledgeFiles: KnowledgeFile[];
  createdAt: Date;
  updatedAt: Date;
}

interface QuickPrompt {
  id: string;
  category: "write" | "learn" | "code" | "lifestuff"; // The type of menu
  title: string;
  icon?: string;
  order: number; // For controlling the display order in the list
  createdAt: Date;
  updatedAt: Date;
}

interface Chat {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  modelId: string;
  isStarred: boolean;
  isLocked: boolean;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  modelId: string;
  createdAt: Date;
}

// Supporting entities
interface Model {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Integration {
  id: string;
  userId: string;
  type: "google_drive" | "gmail" | "calendar" | "github";
  name: string;
  isConnected: boolean;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Settings {
  id: string;
  userId: string;
  theme: "light" | "dark" | "system";
  language: string;
  defaultModel: string;
  createdAt: Date;
  updatedAt: Date;
}

// You'll also want to add timestamps to these referenced interfaces
interface KnowledgeFile {
  id: string;
  projectId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Attachment {
  id: string;
  messageId: string;
  type: string;
  name: string;
  url: string;
  createdAt: Date;
}
```

**Key relationships:**
- A User has many Projects and Chats
- A Project contains many Chats
- A Chat contains many Messages
- A collection of QuickPrompts exists for each category (write, learn, code, lifestuff)
- A User can connect multiple Integrations
- Various Models can be selected for Chat interactions