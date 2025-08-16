"use client";

import { FC, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { btnBase } from "../models/constants";
import { Info } from "../models/types";
import { texts } from "../models/texts";
import { LanguageContext } from "../context/language-context";

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
  const { language } = useContext(LanguageContext);

  return (
    <div className="item-center my-4 flex items-center justify-center gap-4">
      <button
        disabled={!prev}
        onClick={() => setPage(currentPage - 1)}
        className={[...btnBase, " disabled:bg-gray-300"].join("")}
      >
        {texts[language].pagination.prev}
      </button>
      <button
        disabled={!next}
        onClick={() => setPage(currentPage + 1)}
        className={[...btnBase, " disabled:bg-gray-300"].join("")}
      >
        {texts[language].pagination.next}
      </button>
      <span className="text-sm text-gray-700">
        {texts[language].pagination.page} {currentPage}{" "}
        {texts[language].pagination.of} {pages}
      </span>
    </div>
  );
};

export default Pagination;
