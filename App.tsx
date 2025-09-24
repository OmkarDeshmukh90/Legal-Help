
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CaseInputForm from './components/CaseInputForm';
import ClassificationResult from './components/ClassificationResult';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import { classifyCase } from './services/geminiService';
import { type ClassificationResultData } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<ClassificationResultData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClassify = useCallback(async (description: string) => {
    if (!description.trim()) {
      setError("Please enter a case description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const classification = await classifyCase(description);
      setResult(classification);
    } catch (err) {
      console.error("Classification Error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to classify the case. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8">
          <CaseInputForm onSubmit={handleClassify} isLoading={isLoading} />
          <div className="mt-8 min-h-[200px]">
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {result && !isLoading && <ClassificationResult result={result} />}
            {!isLoading && !error && !result && <Welcome />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
