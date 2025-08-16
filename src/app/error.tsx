"use client";

import { useEffect } from "react";

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

  return (
    <div className="p-4 text-red-500">
      <h2>Something went wrong...</h2>
      <button
        onClick={reset}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
