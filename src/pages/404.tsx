import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-center text-4xl font-bold text-blue-600">404</h1>
      <div className="my-4 flex justify-center gap-4">
        The page you wanted to visit doesn&apos;t exist or has been moved to a new address. But you
        can always start over, just click the next button
      </div>
      <Link
        to="/"
        className="mx-auto block w-fit rounded border-none bg-blue-800 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600"
      >
        Go Home!
      </Link>
    </div>
  );
};

export default NotFound;
