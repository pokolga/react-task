"use client";

import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/language-context";
import { texts } from "../models/texts";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);
  const { language } = useContext(LanguageContext);

  return (
    <div className="rounded bg-red-100 p-4 text-red-800">
      <h2>{texts[language].error.something_wrong}</h2>
      <button
        onClick={reset}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        {texts[language].error.try}
      </button>
    </div>
  );
}
