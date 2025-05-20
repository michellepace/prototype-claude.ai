# Claude.ai Prototype Documentation

This directory (`agent-docs/`) contains all specifications and guidance for implementing the Claude.ai prototype. Use this README as your starting point to navigate to the appropriate documentation.

## Core Documents (root)

| Document | Purpose | When to Use |
|----------|---------|------------|
| [prd.md](./prd.md) | Defines project goals, target functionality, and prioritized feature list | For understanding overall project scope and priorities |
| [data-model-zustand.md](./data-model-zustand.md) | Details data structures, entity relationships, and state management | When implementing data interfaces or state updates |
| [best-practices-technical.md](./best-practices-technical.md) | Technical guidelines for development | For understanding coding standards and patterns |

## Directory: `./features`

Feature documents contain the complete implementation specifications, acceptance criteria, and tracked tasks for incremental delivery.

Each feature:
- Represents a self-contained unit of functionality, with its own UI components, data interfaces, state management, and acceptance criteria.
- Is divided into distinct, deliverable Tasks that provide testable value (with status tracked within the feature document)
- Follows Lean principles where each Task represents a small, valuable increment toward the complete feature

| Document| Description | Reference UI | URL Pattern |
|---------|-------------|-----------|-----------|
| [foundational.md](./features/foundational.md) | Base Next.js project with theming and light/dark mode | n/a | `/` |
| [navigation.md](./features/navigation.md) | Modal Drawer Component shared for all pages | [navigation.jpg](./reference-ui/navigation.jpg) | n/a |
| [new.md](./features/new.md) | Starting page for conversations | [new.jpg](./reference-ui/new.jpg),  [new-detailed.jpg](./reference-ui/new-detailed.jpg)| `/new` |
| [chat.md](./features/chat.md) | Conversation with chat messages | [chat.jpg](./reference-ui/chat.jpg) | `/chat/{uuid}` |
| [recents.md](./features/recents.md) | Lists all chat conversations | [recents.jpg](./reference-ui/recents.jpg) | `/recents` |
| [project.md](./features/project.md) | A project contains many chats | [project.jpg](./reference-ui/project.jpg) | `/project/{uuid}` |
| [projects.md](./features/projects.md) | Lists all projects | [projects.jpg](./reference-ui/projects.jpg) | `/projects` |
| [settings.md](./features/settings.md) | Parent route with shared tab navigation component | (tbc) | `/settings` (redirects to profile) |
| ↳ [profile.md](./features/settings.md) | User identity and preferences configuration | [settings.jpg](./reference-ui/settings.jpg) | `/settings/profile` |
| ↳ [appearance.md](./features/settings.md) | Theme and visual preferences | [settings.jpg](./reference-ui/settings.jpg) | `/settings/appearance` |
| ↳ [account.md](./features/settings.md) | Account management and logout | [settings.jpg](./reference-ui/settings.jpg) | `/settings/account` |
| ↳ [data-privacy.md](./features/settings.md) | Privacy controls and settings | [settings.jpg](./reference-ui/settings.jpg) | `/settings/data-privacy` |

## Directory: `./reference-ui`

Contains screenshots of the Claude.ai interface which this application replicates. Use for reference during feature implementation:

* [chat.jpg](./reference-ui/chat.jpg)
* [navigation.jpg](./reference-ui/navigation.jpg)
* [new.jpg](./reference-ui/new.jpg)
* [new-detailed.jpg](./reference-ui/new-detailed.jpg)
* [project.jpg](./reference-ui/project.jpg)
* [projects.jpg](./reference-ui/projects.jpg)
* [recents.jpg](./reference-ui/recents.jpg)
* [settings.jpg](./reference-ui/settings.jpg)

## Directory: `./user-flows`

Contains Mermaid diagrams visualizing key user interactions:

| Flow | Description | Reference |
|------|-------------|-----------|
| [high-level-user-journey.mermaid](./user-flows/high-level-user-journey.mermaid) | End-to-end user experience | For understanding the overall application flow |
| [new-chatting-star-delete.mermaid](./user-flows/new-chatting-star-delete.mermaid) | How users create and start new conversations | When implementing conversation creation |
| [create-project.mermaid](./user-flows/create-project.mermaid) | How projects are created and structured | When implementing project functionality |