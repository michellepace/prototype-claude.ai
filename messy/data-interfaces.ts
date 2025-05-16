// Core Type Definitions
// ===================================

/** ISO 8601 date string (e.g., "2023-05-12T15:30:45.123Z") */
export type ISODateString = string;

/**
 * Base entity with common timestamp fields for all entities
 * Used for standardized creation/update tracking and sorting
 */
export interface BaseEntity {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// Core Data Interfaces
// ===================================

/**
 * User entity representing the application user
 */
export interface User extends BaseEntity {
  id: string;
  email: string;
  fullName: string; // "Full name" from Profile settings
  displayName: string; // "What should we call you?" from Profile settings
  workDescription?: string; // "What best describes your work?" from Profile settings
  customInstructions?: string; // "What personal preferences should Claude consider" from Profile settings
}

/**
 * Project entity representing a collection of related chats
 */
export interface Project extends BaseEntity {
  id: string;
  userId: string;
  name: string; // Can contain Unicode symbols, Max 90 chars
  description: string;
  isStarred: boolean;
  isArchived: boolean;
}

/**
 * Chat entity representing a conversation thread
 */
export interface Chat extends BaseEntity {
  id: string;
  userId: string;
  projectId?: string; // Optional: Chats can exist without belonging to a project
  name: string; // Auto-generated from first message (max 90 chars) or from quick prompt
  modelId: string; // Reference to the AI model used for this chat
  isStarred: boolean;
  isArchived: boolean;
  lastMessageAt: ISODateString; // For sorting by recent activity
}

/**
 * Message entity representing a single exchange in a chat
 */
export interface Message extends BaseEntity {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
}

/**
 * AI Model entity representing available Claude models
 */
export interface Model extends BaseEntity {
  id: string;
  name: string; // e.g., "Claude 3.7 Sonnet"
  description?: string; // e.g., "Our most intelligent model yet"
  isDefault?: boolean; // Flag for the default selected model
}

/**
 * QuickPrompt entity representing predefined prompt templates
 */
export interface QuickPrompt extends BaseEntity {
  id: string;
  category: "write" | "learn" | "code" | "lifestuff"; // The type of prompt category
  name: string; // Display name shown in the UI
  chatName: string; // What the chat will be named when using this prompt
  promptContent: string; // The actual prompt text to be sent
  order: number; // For controlling the display order in the list
}

/**
 * UserSettings entity for persisting user preferences
 */
export interface UserSettings extends BaseEntity {
  id: string;
  userId: string;
  colorMode: "light" | "dark" | "system";
  chatFont: "default" | "system" | "dyslexic";
  useLocationMetadata: boolean;
}

// Helper Types
// ===================================

/**
 * Chat with additional information for display in lists
 */
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

/**
 * Project with additional information for display in lists
 */
export interface ProjectWithDetails extends Project {
  chatCount: number;
  lastActivity?: ISODateString;
}

// Zustand Store Types
// ===================================

/**
 * Store interface for the Zustand state
 */
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
