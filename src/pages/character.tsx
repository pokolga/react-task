import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APICharacter, unknownCharacter } from '../models/constants';
import Spinner from '../components/spinner';
import type { CharacterType } from '../models/types';

const Character: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterType | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${APICharacter}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('404');
        }
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
      })
      .catch(() => {
        setError('Nothing was found for your request');
        setCharacter(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (character === undefined) return null;

  if (character === null)
    return (
      <div>
        <p>{error ?? ''}</p>
      </div>
    );

  return (
    <div
      className="mt-4 h-min w-[300px] flex-shrink-0 rounded-sm border border-solid border-gray-200 bg-white p-4 shadow hover:shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <button
          className="mb-4 cursor-pointer rounded-sm border-2 border-solid border-transparent hover:border-red-300 active:bg-red-300"
          onClick={() => navigate('/')}
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
