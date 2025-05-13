```
DO NOT CODE - I NEED ADVICE

I want to create a functional prototype of the AI platform Claude.ai. 

## Planned Tech Stack:
Next.js, typescript, shadcn/ui, tailwind

## Context:
From a user perspective it must "feel real" but will have no true functionality like AI API integration. For any messages sent in a chat the application will always return "this is a prototype that feels like real, but isn't". The user must be able to navigate different pages, as well as the shared modal drawer navigation. They will assume a logged in state (via the UI display), but there will be no authentication. Etc. 

To assist with this goal, I have chosen to use Zustand with middleware and sessionStore. I am hoping this will also make it easy to migrate to a Supabase database later (if desired). I have representative interfaces defined for typescript. 

Equally I want the application to follow good Tailwind practices (utility-first approach, mobile-first approach, and for shadcn CSS variables mapped to tailwond utility classes). I want the shadcn "New York" style applied and the Stone base colour palette. 

For the UI I will provide screenshots of 5 pages (the main chat page, and chats, and project, user settings, projects). The modal navigation drawer shared. 

## Questions
I want to build iteratively but do not know how much context to provide in the initial prompt that creates the application.

I am overwhelmed on where I should start, and what best to provide in the initial instruction. For example:

- Should I choose to define the details of only the root page first (chat) without state management and ensure the project is setup correctly? 
- Should I build the whole UI in the initial prompt, include the data interfaces, and request for state management. 

Perhaps I could implemt the app in "features with user stories", and include these on a dedicated "docs/" folder with each feature a separate file. As well as perhaps "docs/good-practices.md", and "project-overview.md"

Can you please deeply consider my confusion and provide advice on what is best to include in the initial prompt, and how best to strucute the work so the agent has enpugh context but I can still deliver iteratively ?
```