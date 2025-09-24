import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-cyan-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 16h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3" />
          <path d="M8 8H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
          <path d="M12 22V2" />
          <path d="m20 7-8 8-8-8" />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
          Legal Case Classifier
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">
        AI-powered analysis for the Bharatiya Nyaya Sanhitas.
      </p>
    </header>
  );
};

export default Header;