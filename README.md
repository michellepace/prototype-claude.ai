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

## Core User Interface and Routes

Type | Name | Description | Reference Screenshot | URL Pattern |
|---------|---------|-------------|-----------|-----------|
| UI Component | Navigation | Shared modal drawer (all pages) | [navigation.jpg](agent-docs/screenshots/navigation.jpg) | n/a |
| Route | New | Starting page for conversations | [new.jpg](agent-docs/screenshots/new.jpg),  [new-detailed.jpg](agent-docs/screenshots/new-detailed.jpg)| `https://claude.ai/new` |
| Route | Chat | Conversation with chat messages | [chat.jpg](agent-docs/screenshots/chat.jpg) | `https://claude.ai/chat/{uuid}` |
| Route | Recents | Lists all chat conversations | [recents.jpg](agent-docs/screenshots/recents.jpg) | `https://claude.ai/recents` |
| Route | Project | A project contains many chats | [project.jpg](agent-docs/screenshots/project.jpg) | `https://claude.ai/project/{uuid}` |
| Route | Projects | Lists all projects | [projects.jpg](agent-docs/screenshots/projects.jpg) | `https://claude.ai/projects` |
| Route | Settings | Parent route with shared tab navigation component | N/A | `https://claude.ai/settings` (redirects to profile) |
| Route | ↳ Profile | User identity and preferences configuration | [settings.jpg](agent-docs/screenshots/settings.jpg) | `https://claude.ai/settings/profile` |
| Route | ↳ Appearance | Theme and visual preferences | [settings.jpg](agent-docs/screenshots/settings.jpg) | `https://claude.ai/settings/appearance` |
| Route | ↳ Account | Account management and logout | [settings.jpg](agent-docs/screenshots/settings.jpg) | `https://claude.ai/settings/account` |
| Route | ↳ Data Privacy | Privacy controls and settings | [settings.jpg](agent-docs/screenshots/settings.jpg) | `https://claude.ai/settings/data-privacy-controls` |

Notes:
1. Individual Chat and Project routes use unique UUIDs, enabling direct access via shareable links.
2. All settings routes share the same screenshot as they maintain the same navigation UI with different content areas.

## Out of Scope
- Authentication
- Real-time chat functionality (no AI API integration)
- Backend database (using Zustand instead)

## Development Approach

This app will be generated with [v0.dev](https://v0.dev) using the Claude.ai [interface](https://claude.ai) as a visual reference. See [agent-docs/screenshots](agent-docs/screenshots).

### Data Management

- **Data Interfaces**: Defined early for proper Zustand implementation
- **Client-side State Management**: Uses Zustand and browser storage instead of a database
- **Session Persistence**: Data persists until browser tab closes (no cross-tab persistence)
- **Mock Data**: Initialises with realistic sample data to demonstrate UI functionality
- **Realistic UI**: Simulates complete app behaviour without 3rd party API integrations
- **URL-based Navigation**: Enables direct linking to specific chats and projects via unique URLs (e.g., /chat/[id], /project/[id])

## Success Criteria

### Prototype Quality
- [ ] Convincing Claude.ai interface clone with light/dark mode
- [ ] Realistic interface interactions and user experience

### Workflow Effectiveness
- [ ] Efficient technique for initial app generation
- [ ] Effective agent documentation in `/agent-docs`
- [ ] Reusable documentation templates for future projects
- [ ] Repeatable workflow proven by cloning another web app

### Code Quality
- [ ] Centralised theming with Tailwind and shadcn/ui
- [ ] Modular, well-organised UI components
- [ ] Clean data interfaces ready for backend integration
- [ ] Consistent Zustand state management patterns

### Next Steps: Cursor
- [ ] Import project into Cursor IDE for enhancements and deployment
- [ ] Recreate project in Cursor from scratch as a learning exercise