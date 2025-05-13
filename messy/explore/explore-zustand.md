Used in [https://deepwiki.com/pmndrs/zustand](https://deepwiki.com/pmndrs/zustand) and [https://claude.ai](https://claude.ai/) think mode.

```
# Zustand for Beginners: State Management for a Next.js Prototype

## Project Goal
 To build a Next.js prototype of claude.ai that simulates persistent state without a database. The goal of the prototype is to "feel very real" from a user experience perspective. The prototype should be able to handle multiple browser tabs in a single session.

## Tech Stack
- Next.js 15 (React)
- TypeScript
- Tailwind CSS 3
- shadcn/ui components

## State Management Requirements
1. **Initial State**
   - Consistent predefined data (chats, user info) on every session start
   - Same initial state across all browser tabs
2. **User Interactions**
   - Changes (new chats, renamed items) must persist across tabs within same session
   - Changes reset to initial state when browser is closed/reopened

## Request
Assess if Zustand is the right tool for my project goal and requirements. 

If so, explain to a beginner the concepts and outline of what would be needed to implement this in my project. For example, do I need the "Middleware System", "Session Storage", "Local Storage", etc.? Use correct Zustand terminology (and explain). 

**Note:**
Limit coding examples for now, I want to understand what I need conceptually (and why), and correct terminology.
```

## 📕 Michelle Notes

### DeepWiki Zustand: What to use?

Reference: [https://deepwiki.com/search/-zustand-for-beginners-state-m_e65ff367-348e-448d-8eef-9d5fe31e58d8](https://deepwiki.com/search/-zustand-for-beginners-state-m_e65ff367-348e-448d-8eef-9d5fe31e58d8)

#### 1. sessionStorage Approach (Simplest)
- Simplest approach because:
   - It naturally resets when the browser is closed, matching your requirement for resetting to initial state
   - It requires minimal configuration with Zustand's persist middleware
   - You don't need to implement any custom reset logic
- However, sessionStorage doesn't naturally share data across tabs. Each tab gets its own isolated sessionStorage.

Coding Agent Instruction: 
```markdown
Create a Zustand store with the persist middleware using sessionStorage
```

#### 2. localStorage with Session Detection (Balanced)
- The localStorage with session detection approach offers a good balance:
   - It naturally supports cross-tab communication via the storage event
   - You can implement a simple session detection mechanism to clear localStorage when a new session starts
- This approach requires a bit more code to implement the session detection, but it gives you both cross-tab persistence and session-based resetting.

Coding Agent Instruction: 
```markdown
Create a Zustand store with the persist middleware using localStorage and simple session detection mechanism to clear localStorage when a new session starts
```

### DeepWiki Zustand: hydration issue (Next.js)
Reference: [https://deepwiki.com/search/below-is-an-instruction-i-have_0ec70e71-cefa-4d83-971d-32dbb53bb5be](https://deepwiki.com/search/below-is-an-instruction-i-have_0ec70e71-cefa-4d83-971d-32dbb53bb5be)