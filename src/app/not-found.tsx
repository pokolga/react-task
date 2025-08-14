"use client";

import Link from "next/link";
import { btnBase } from "../models/constants";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-center text-4xl font-bold text-[--color-bg-button]">
        ERROR 404
      </h1>
      <div className="my-4 flex justify-center gap-4 text-[--color-text]">
        The page you wanted to visit doesn&apos;t exist or has been moved. You
        can always start over:
      </div>
      <Link href="/" className={`mx-auto block w-fit ${btnBase}`}>
        Go Home!
      </Link>
    </div>
  );
}
