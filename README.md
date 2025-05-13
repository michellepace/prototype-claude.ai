# Prototype Claude

A functional prototype clone of the [Claude.ai](https://claude.ai/) interface and user experience. Created using [v0.dev](https://v0.dev/) as a learning experiment to improve AI prototyping skills.

![Claude.ai interface prototype screenshot](agent-docs/screenshots/navigation.jpg)


## Project Goals

- Create a visually accurate clone of the Claude.ai interface
- Implement realistic functionality using Zustand for mock data and state
- Define clean data interfaces that could easily connect to a real backend
- Follow good coding practices with centralised styling and type safety

## Technology Stack

- **Next.js**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: UI components ("New York" style, "Stone" palette)
- **Heroicons**: Icon library
- **Next Themes**: Light/dark mode switching
- **Zustand**: State management with persistence

## Core Features

| UI | Description | Reference |
|---------|-------------|-----------|
| Chat Interface | Primary conversation screen | [Screenshot](agent-docs/screenshots/chat.jpg) |
| Chat History | List of all past conversations | [Screenshot](agent-docs/screenshots/chats.jpg) |
| Project View | Single project with related chats | [Screenshot](agent-docs/screenshots/project.jpg) |
| Projects List | All historical projects | [Screenshot](agent-docs/screenshots/projects.jpg) |
| Settings | User profile and preferences | [Screenshot](agent-docs/screenshots/settings.jpg) |
| Navigation | Modal drawer for app navigation | [Screenshot](agent-docs/screenshots/navigation.jpg) |

## Out of Scope
- Authentication
- Real-time chat functionality (no AI API integration)
- Backend database (using Zustand instead)

## Development Approach

This app will be generated with [v0.dev](https://v0.dev) using Claude.ai [/agent-docs/screenshots](agent-docs/screenshots).

### Data Management

- **Data Interfaces**: Defined early for proper Zustand implementation
- **Session Persistence**: Uses Zustand with `persist` middleware and sessionStorage
- **Mock Data**: Simulates a database with initial mock data for the UI
- **Session-Based**: Data persists until browser tab closes (no cross-tab persistence)
- **Realistic UX**: Provides app-like experience without a backend

## Experiment Success Criteria


## Success Criteria

- [ ] Convincing Claude.ai interface clone with light/dark mode
- [ ] Realistic interface interactions and user experience

### Prototype Quality
- [ ] Convincing Claude.ai interface clone with light/dark mode
- [ ] Realistic interface interactions and user experience

### Workflow Effectiveness
- [ ] Eficient technique for initial app generation
- [ ] Effective agent documentation in `/agent-docs`
- [ ] Reusable documentation templates for future projects
- [ ] Repeatable workflow proven by cloning another web app

### Code Quality
- [ ] Centralised theming with Tailwind and shadcn/ui
- [ ] Modular, well-organized UI components
- [ ] Clean data interfaces ready for backend integration
- [ ] Consistent Zustand state management patterns

### Next Steps: Courage for Cursor
- [ ] Import project into Cursor IDE for enhancements and deployment
- [ ] Recreate project in Cursor from scratch as a learning exercise