"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ThemeContext from "../themeContext";
import Link from "next/link";
import "./global.css";
import { queryClient } from "../queryClient";
import { btnBase } from "../models/constants";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeFromContext = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(themeFromContext);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <html lang="en">
      <body className="min-h-full bg-[--color-bg]">
        <QueryClientProvider client={queryClient}>
          <nav className="mx-8 my-2 flex items-end justify-start gap-2 border-b-2 border-b-[--color-bg-button] p-2 text-[--color-bg-button]">
            <Link href="/" className="font-bold hover:text-blue-300">
              Home
            </Link>
            ●
            <Link href="/about" className="font-bold hover:text-blue-300">
              About me
            </Link>
            <button
              className={`ml-auto ${btnBase}`}
              onClick={toggleTheme}
              data-testid="theme"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </nav>
          <main id="root">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
