"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "../context/theme-context";
import { LanguageContext } from "../context/language-context";
import { btnBase } from "../models/constants";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { setLanguage } = useContext(LanguageContext);
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
        About
      </Link>
      <div className="ml-auto  flex gap-2">
        <button onClick={() => setLanguage("ru")}>RU</button>
        <button className="" onClick={() => setLanguage("en")}>
          EN
        </button>
        <button className={btnBase} onClick={toggleTheme}>
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
