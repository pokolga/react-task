import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Character: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // fetchData(id); ← если есть функция загрузки
    }
  }, [id]);
  return (
    <div>
      <button className="hover:bg-blue mb-4" onClick={() => navigate(-1)}>
        ❌
      </button>
      <p>{id}</p>
    </div>
  );
};

export default Character;
