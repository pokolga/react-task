import { type FC, useRef } from 'react';
import { useCardStore } from '../store/cardStore';
import { btnBase } from '../models/constants';
import { getMultipleCharacters } from '../services/fetch';
import { useQuery } from '@tanstack/react-query';
import type { CharacterType } from '../models/types';

type Props = {
  SelectedIds: string[];
};

type QueryResult = CharacterType[];

export const SelectedItemsPanel: FC<Props> = ({ SelectedIds }: Props) => {
  const { selectedIds, toggleCard } = useCardStore();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = () => {
    selectedIds.map((id) => toggleCard(id));
  };

  const { refetch } = useQuery<QueryResult>({
    queryKey: ['characters', SelectedIds],
    queryFn: () => getMultipleCharacters(SelectedIds.join()),
    enabled: false,
  });

  const handleDownload = async (): Promise<void> => {
    const result = await refetch();
    const data = result.data;
    if (!Array.isArray(data) || data.length === 0) return;

    const csvData = data.map((item: CharacterType) => ({
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
    <div
      className="flex w-[350px] items-center justify-between rounded-sm bg-(--color-bg-card) p-4 text-(--color-text)"
      data-testid="selected-panel"
    >
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
