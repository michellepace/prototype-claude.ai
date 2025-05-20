## Relationships
- A chat can belong to no projects (zero) OR strictly one project (1).
- A project has many chats (0 or more)

## Names for Chats and Projects
(aka "titles" - correct terminology to use is "name" )

### Chats are automatically named
- The application will name the chat using the first 90 available characters from the first user message
- Chat names do not need to be unique
- Length: [1, 90] characters

### Projects are NOT automatically named
- The user MUST define a name when creating a project (see project.jpg)
- Length: [1, 90] characters

### Editing Names: Renaming of Chats and Projects
A user may rename both a chat and a project

### Names can include unicode character symbols
For example:
- "This is a 🌞 project name"
- "🟣 This is my project 2"
- "My chat name 🟢 can be wonderful 🟣 too."

## Out of scope

### Projects
- "Private"
- Attachments or uploads associated with projects

### Chat
- Versioning
- Message reactions or feedback
- Attachments or uploads associated with messages

## Delete and Archive
- Projects can be archived
- Chats can be deleted (check data model)

