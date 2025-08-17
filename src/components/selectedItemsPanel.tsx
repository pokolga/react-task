"use client";

import { useRef, useState } from "react";
import { useCardStore } from "../store/cardStore";
import { btnBase, spinnerDelay } from "../models/constants";
import Spinner from "./spinner";
import { delay } from "../services/spinnerDelay";

type Props = {
  SelectedIds: string[];
};

export default function SelectedItemsPanel({ SelectedIds }: Props) {
  const { selectedIds, toggleCard } = useCardStore();
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUnselectAll = () => {
    selectedIds.forEach((id) => toggleCard(id));
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: SelectedIds }),
      });

      if (!response.ok) throw new Error("Failed to fetch CSV");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const filename = `${SelectedIds.length}_items.csv`;

      if (downloadRef.current) {
        downloadRef.current.href = url;
        downloadRef.current.download = filename;
        downloadRef.current.click();
      }

      URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error("Download failed:" + error);
    } finally {
      await delay(spinnerDelay);
      setIsDownloading(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex w-[350px] items-center justify-between rounded-sm bg-[var(--color-bg-card)] p-4 text-[var(--color-text)]"
      data-testid="selected-panel"
    >
      <span>Selected: {selectedIds.length}</span>
      <button className={btnBase} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={btnBase} onClick={handleDownload}>
        Download
      </button>
      <a ref={downloadRef} className="hidden">
        virtual link
      </a>
      {isDownloading && <Spinner />}
    </div>
  );
}
