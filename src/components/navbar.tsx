"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "../context/theme-context";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
        About
      </Link>
      <button className="ml-auto" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
