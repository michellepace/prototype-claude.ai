# Use Zustand for State Management
When asked to implement Zustand, the goal is to:
- Make the prototype application "feel very real" from a user perspective without implementing a database
- Make a possible future migration to a database easier (if or when required)

## Implementing Zustand
- Implement a single store with persist middleware using sessionStorage that resets on browser/tab close
- Structure with logical slices for separation of concerns
- Maintain entity relationships through IDs (e.g., a document references its userId)
- Store initial state (aka "Mock Data") separately to ensure consistent reset behavior
- Structure actions to mirror future API endpoints (e.g., createUser, fetchDocuments) to simplify database migration

## Best practices
- Use TypeScript interfaces for type safety (define in types.ts or alongside slices)
- Define actions within each slice (e.g., addDocument, updateUser)
- Handle date serialization (store as ISO strings to avoid JSON issues)
- Use immer middleware for more intuitive state updates when needed

Access pattern example:
- Create custom hooks for components to access only needed state (e.g., useDocuments)

Exemplary Project Structure:

```
store/
├── index.ts                Main store creation with persist middleware
├── slices/                 Logical state divisions
│   ├── userSlice.ts        User preferences
│   ├── documentsSlice.ts   Markdown documents
│   └── uiSlice.ts          UI state (active doc, sidebar open)
└── initialData/            Default state values
    ├── users.ts            Default user
    └── documents.ts        Sample documents