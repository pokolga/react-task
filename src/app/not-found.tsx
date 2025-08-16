"use client";

import Link from "next/link";
import { btnBase } from "../models/constants";
import React, { useContext } from "react";
import { texts } from "../models/texts";
import { LanguageContext } from "../context/language-context";

export default function NotFound() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-center text-4xl font-bold text-[--color-bg-button]">
        {texts[language].p404.error} 404
      </h1>
      <div className="my-4 flex justify-center gap-4 text-[--color-text]">
        {texts[language].p404.page}
      </div>
      <Link href="/" className={`mx-auto block w-fit ${btnBase}`}>
        {texts[language].p404.try}
      </Link>
    </div>
  );
}
