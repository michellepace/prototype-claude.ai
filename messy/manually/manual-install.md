# Install Project Manual

## Next.js Project with Tailwind 3 and Shadcn/ui

### 1. Next.js installation

Install Next.js 15.3.1 with with these options:

```bash
npx create-next-app@15.3.1 my-app \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --no-turbo \
  --import-alias="@/*"
```

IMPORTANT: Ensure `tsconfig.json` and `tailwind.config.ts` are correctly configured for aliases.

### Shadcn/ui installation and config

1. Install shadcn/ui with these options:

```bash
npx shadcn@2.3.0 init \
  --typescript \
  --style=new-york \
  --color=stone \
  --css-variables=yes \
  --tailwind-css=app/globals.css \
  --tailwind-config=tailwind.config.ts \
  --components-dir=components \
  --utils-dir=lib/utils \
  --rsc \
  --yes
```

2. Install the Hericons library, run: `npm install @heroicons/react` and update `components.json` with: `"iconLibrary": "heroicons"`.

3. Ensure Shadcn/ui configuration in `components.json` exactly matches the below (i.e., ensure all 15 fields are defined):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "stone",
    "cssVariables": true,
    "rsc": true,
    "tsx": true
  },
  "aliases": {
    "utils": "@/lib/utils",
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "heroicons"
}
```