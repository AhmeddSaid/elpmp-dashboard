"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-context";
import { CookiesProvider } from "react-cookie";
export default function MainLayout({ children }: any) {
  return (
    <CookiesProvider>
      <Toaster />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </CookiesProvider>
  );
}
