import React, { useState } from 'react';

interface CaseInputFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

const CaseInputForm: React.FC<CaseInputFormProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="case-description" className="block text-sm font-medium text-slate-300">
        Enter Case Description
      </label>
      <textarea
        id="case-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g., 'A person was found guilty of causing grievous hurt during a sudden fight without any premeditation...'"
        rows={8}
        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-slate-200 placeholder-slate-500 resize-y"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !description}
        className="w-full flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Analyzing...' : 'Classify Case'}
        {isLoading && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </button>
    </form>
  );
};

export default CaseInputForm;