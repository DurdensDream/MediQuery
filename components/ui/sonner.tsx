"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/components/theme-provider";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      position="top-right"
      richColors
      theme={theme}
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-canopy-500 border-emerald-200",
          title: "text-emerald-900 dark:text-emerald-100",
          description: "text-emerald-700 dark:text-emerald-200"
        }
      }}
    />
  );
}
