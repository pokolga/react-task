import React, { useEffect, useState } from 'react';
import { useCardStore } from '../services/cardStore';
import { btnBase } from '../models/constants';
import { getMultipleCharacters } from '../services/fetch';

type Props = {
  SelectedIds: string[];
};

export const SelectedItemsPanel: React.FC<Props> = ({ SelectedIds }: Props) => {
  const { selectedIds, toggleCard } = useCardStore();
  const [csvDownload, setCsvDownload] = useState<{ content: string; filename: string } | null>(
    null
  );

  const handleUnselectAll = () => {
    selectedIds.map((id) => toggleCard(id));
  };

  const handleDownload = async () => {
    const data = await getMultipleCharacters(SelectedIds.join());

    if (!Array.isArray(data) || data.length === 0) return null;

    const csvData = data.map((item) => ({
      ID: item.id,
      name: item.name,
      status: item.status,
      species: item.species,
      image: item.image,
    }));

    const headers = Object.keys(csvData[0]).join(',') + '\n';
    const rows = csvData.map((row) => Object.values(row).join(',')).join('\n');
    const content = headers + rows;
    const filename = `${data.length}_items.csv`;

    setCsvDownload({ content, filename });
  };

  useEffect(() => {
    if (!csvDownload) return;

    const blob = new Blob([csvDownload.content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const virtualLink = document.createElement('a');
    virtualLink.href = url;
    virtualLink.download = csvDownload.filename;
    virtualLink.click();

    URL.revokeObjectURL(url);
    setCsvDownload(null);
  }, [csvDownload]);

  return (
    <div className="flex w-[350px] items-center justify-between rounded-sm bg-(--color-bg-card) p-4 text-(--color-text)">
      <span> Selected: {selectedIds.length}</span>
      <button className={btnBase} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={btnBase} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};
