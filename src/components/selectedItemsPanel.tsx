import React, { useRef } from 'react';
import { useCardStore } from '../services/cardStore';
import { btnBase } from '../models/constants';
import { getMultipleCharacters } from '../services/fetch';

type Props = {
  SelectedIds: string[];
};

export const SelectedItemsPanel: React.FC<Props> = ({ SelectedIds }: Props) => {
  const { selectedIds, toggleCard } = useCardStore();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = () => {
    selectedIds.map((id) => toggleCard(id));
  };

  const handleDownload = async () => {
    const data = await getMultipleCharacters(SelectedIds.join());
    if (!Array.isArray(data) || data.length === 0) return;

    const csvData = data.map((item) => ({
      ID: item.id,
      name: item.name,
      status: item.status,
      species: item.species,
      image: item.image,
    }));

    const headers = Object.keys(csvData[0]).join(',') + '\n';
    const rows = csvData.map((row) => Object.values(row).join(',')).join('\n');
    const csvContent = headers + rows;
    const filename = `${data.length}_items.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = filename;
      downloadRef.current.click();
    }

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex w-[350px] items-center justify-between rounded-sm bg-(--color-bg-card) p-4 text-(--color-text)">
      <span> Selected: {selectedIds.length}</span>
      <button className={btnBase} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={btnBase} onClick={handleDownload}>
        Download
      </button>
      <a ref={downloadRef} className="hidden">
        virtual link
      </a>
    </div>
  );
};
