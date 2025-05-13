## Add light/dark theme toggle functionality
Install and configure a theme toggle below buttons on Root page.

1. **Step 1:** Install needed package, run: `npm install next-themes`

2. **Step 2:** Create file `components/theme-provider.tsx`

```typescript
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

3. **Step 3:** Wrap root layout (`app/layout.tsx`) with `ThemeProvider` and add `suppressHydrationWarning` prop

```typescript
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

4. Create `components/light-dark-toggle.tsx` component and then place on root page below buttons:

```typescript
"use client"
import * as React from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function LightDarkToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-0 scale-0 transition-all dark:scale-100" />
    </Button>
  )
}
```