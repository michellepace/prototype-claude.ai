## Add light/dark theme toggle functionality

This implementation uses next-themes which automatically handles localStorage persistence, system preference detection, and seamless shadcn/ui integration without any flash of incorrect theme. It applies theming globally to all pages and components.

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

4. **Step 4:** Create `components/light-dark-toggle.tsx` component and place in the Settings page:

```typescript
"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
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
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

5. **Step 5:** Import and use the toggle in the Settings page for app wide application.