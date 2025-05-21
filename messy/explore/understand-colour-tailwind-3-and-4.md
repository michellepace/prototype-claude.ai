# Tailwind CSS 3.x and shadcn/ui Theming Question

I am creating a next.js application that uses Tailwind CSS 3.x (latest stable version, not v4) with shadcn/ui components. I have configured shadcn/ui to use CSS variables for theming as recommended in their documentation. 

**IMPORTANT**: Please only respond with information you are highly confident about. If you are uncertain about any part of your answer, explicitly state this uncertainty. If needed, use web search to verify current best practices rather than relying solely on your training data. Cite specific documentation when possible.

I notice that in shadcn/ui's documentation, CSS variables are defined in a specific format that differs between Tailwind 3.x and 4.x:

1) In Tailwind 3.x, they store HSL values as space-separated parameters, not as complete hsl() functions:

```css
:root {
/* HSL values stored as numbers: hue saturation% lightness% */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  --radius: 0.625rem; /* not a colour */
}
```

2) In Tailwind 4.x, they've moved to OKLCH format:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --sidebar-border: oklch(1 0 0 / 13%);

  --radius: 0.625rem; /* not a colour */
}
```

**My questions:**
1. Please explain how these CSS variables are integrated with Tailwind's utility classes.
2. Explain the mechanism by which shadcn/ui components automatically use my theme colors. When I define colors in `globals.css` and map them in `tailwind.config.ts`, how do shadcn/ui components know to use these colors without me explicitly adding color classes to them?
3. Expand on Q1: particularly how opacity modifiers like bg-primary/80 work with this system.
4. Since I'm using Tailwind 3.x (not 4.x), confirm that I should be using the space-separated HSL values format in my `globals.css`
5. Explain what needs to be configured in my `tailwind.config.ts` to properly map these variables to utility classes. Do I have to manually do this?
6. What is the best practice for centralized theming with non-shadcn/ui elements (like headings, paragraphs, page backgrounds)? Should I style everything with Tailwind utility classes, and if so, will those classes automatically use my custom theme colors defined in `globals.css`?
7. Finally, lets bring it all together: This shadcn/ui documentation page https://ui.shadcn.com/docs/theming#stone defines all the CSS variables available for customisation as well as the Stone baseColour palette. As it is in OKLCH I think I need to convert the colours, what other steps do I need to effectively apply the Stone theme following good centralised theming practices?

If you need to check the current documentation to provide an accurate answer, please do so before responding. For each answer, please provide a brief code example to illustrate the concept.

**Output format:** Please provide your response as a well-structured artifact. Ensure code examples are properly formatted with syntax highlighting.

For each question make a section, for example:

```
## Q1. [short description]
***[Quote the question here in bold italics]***
```