"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "../context/theme-context";
import { LanguageContext } from "../context/language-context";
import { btnBase } from "../models/constants";
import { texts } from "../models/texts";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { setLanguage } = useContext(LanguageContext);
  const pathname = usePathname();
  const { language } = useContext(LanguageContext);

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
        {texts[language].navbar.home}
      </Link>
      <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
        {texts[language].navbar.about}
      </Link>
      <div className="ml-auto  flex gap-2">
        <button
          onClick={() => setLanguage("ru")}
          className={language === "ru" ? "font-bold" : "text-gray-500"}
        >
          RU
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={language === "en" ? "font-bold" : "text-gray-500"}
        >
          EN
        </button>
        <button
          className={[...btnBase, " w-[120px]"].join("")}
          onClick={toggleTheme}
        >
          {isDarkMode
            ? `☀️ ${texts[language].navbar.light}`
            : `🌙 ${texts[language].navbar.dark}`}
        </button>
      </div>
    </nav>
  );
}
