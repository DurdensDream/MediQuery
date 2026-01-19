"use client";

import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <Button variant="outline" onClick={toggle} aria-label="Toggle dark mode">
      {theme === "dark" ? "Night Jungle" : "Day Jungle"}
    </Button>
  );
}
