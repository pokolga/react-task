"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { btnBase } from "../models/constants";
import { Info } from "../models/types";

const Pagination: FC<Info> = ({ pages, prev, next }: Info) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("name") || "";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set("name", query);
    params.set("page", String(newPage));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="item-center my-4 flex items-center justify-center gap-4">
      <button
        disabled={!prev}
        onClick={() => setPage(currentPage - 1)}
        className={[...btnBase, " disabled:bg-gray-300"].join("")}
      >
        Prev
      </button>
      <button
        disabled={!next}
        onClick={() => setPage(currentPage + 1)}
        className={[...btnBase, " disabled:bg-gray-300"].join("")}
      >
        Next
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {pages}
      </span>
    </div>
  );
};

export default Pagination;
