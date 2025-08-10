import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { type FC } from 'react';
import { defaultCasheTime, unknownCharacter } from '../models/constants';
import Spinner from '../components/spinner';
import type { CharacterType } from '../models/types';
import { useQuery } from '@tanstack/react-query';
import { getCharacter } from '../services/fetch';

const Character: FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const query = searchParams.get('name') ?? '';

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery<CharacterType, Error>({
    queryKey: ['character', id],
    queryFn: () => {
      if (!id) throw new Error('Missing character ID');
      return getCharacter(id);
    },
    enabled: !!id,
    retry: false,
    staleTime: defaultCasheTime,
  });

  if (isLoading) return <Spinner />;
  if (isError || character === null)
    return (
      <div>
        <p>{error.message ? error.message : 'Error loading character'}</p>
      </div>
    );

  return (
    <div
      className="mt-4 mr-2 w-[300px] flex-shrink-0 text-(--color-text)"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rounded-sm border border-solid border-gray-200 bg-(--color-bg-card) p-4 shadow hover:shadow-xl">
        <button
          className="mb-4 cursor-pointer rounded-sm border-2 border-solid border-transparent hover:border-red-300 active:bg-red-300"
          onClick={() => navigate(`/?page=${page}&name=${query}`)}
        >
          ❌
        </button>
        <p className="text-sm font-bold">ID: {id}</p>
        <img
          src={character?.image ?? unknownCharacter}
          alt={character?.name ?? 'unknown'}
          className="mb-2 h-64 rounded object-contain"
        />
        <h3 className="my-4 text-lg font-bold">{character?.name ?? ''}</h3>
        <p className="my-1 text-sm">
          <strong>Status: </strong>
          {character?.status ?? 'Unknown'}
        </p>
        <p className="my-1 text-sm">
          <strong>Species: </strong>
          {character?.species ?? 'Unknown'}
        </p>
        <p className="my-1 text-sm">
          <strong>Gender: </strong>
          {character?.gender ?? 'Unknown'}
        </p>
        <p className="my-1 text-sm">
          <strong>Origin: </strong>
          {character?.origin?.name ?? 'Unknown'}
        </p>
        <p className="my-1 text-sm">
          <strong>Location: </strong>
          {character?.location?.name ?? 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default Character;
