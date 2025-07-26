import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-700/90 px-2 py-1 text-xl">
      <div
        className="h-8 w-8 animate-spin place-self-center rounded-full border-4 border-white border-t-transparent"
        data-testid="spinner"
      ></div>
    </div>
  );
};

export default Spinner;
