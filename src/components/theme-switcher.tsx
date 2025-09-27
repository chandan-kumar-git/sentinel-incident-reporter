"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="theme-switcher" className="font-bold">Appearance</Label>
      <div className="flex items-center gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light</span>
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark</span>
        </Button>
      </div>
    </div>
  )
}
