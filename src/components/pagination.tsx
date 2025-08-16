"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { btnBase } from "../models/constants";
import { Info } from "../models/types";

const Pagination: FC<Info> = ({ pages, prev, next }: Info) => {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("name") || "";

  const setSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    window.history.pushState({}, "", `?${newParams.toString()}`);
  };

  return (
    <div className="item-center my-4 flex items-center justify-center gap-4">
      <button
        disabled={!prev}
        onClick={() =>
          setSearchParams({
            name: query,
            page: String(currentPage - 1),
          })
        }
        className={btnBase}
      >
        Prev
      </button>
      <button
        disabled={!next}
        onClick={() =>
          setSearchParams({
            name: query,
            page: String(currentPage + 1),
          })
        }
        className={btnBase}
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
