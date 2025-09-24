import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="text-center p-8 bg-slate-800/30 border border-dashed border-slate-700 rounded-lg">
      <h2 className="text-xl font-semibold text-slate-300">Welcome to the Legal Case Classifier</h2>
      <p className="mt-2 text-slate-400">
        To get started, please enter a description of a legal case in the text box above.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        The AI will analyze the text and provide a classification based on the Bharatiya Nyaya Sanhita (BNS), along with a justification and relevant legal concepts.
      </p>
    </div>
  );
};

export default Welcome;