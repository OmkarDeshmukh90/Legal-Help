import React from 'react';
import { type ClassificationResultData } from '../types';

interface ClassificationResultProps {
  result: ClassificationResultData;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-fade-in space-y-6 shadow-lg">
      <div>
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          Case Classification
        </h2>
        <p className="text-2xl font-bold text-slate-100 mt-1">
          {result.classification}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          Justification
        </h3>
        <p className="text-slate-300 mt-1 text-base leading-relaxed">
          {result.justification}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          Key Concepts
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {result.key_concepts.map((concept, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-slate-700 text-slate-200 rounded-full"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>
       {result.relevant_acts_sections && result.relevant_acts_sections.length > 0 && (
         <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                Relevant Acts & Sections
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
            {result.relevant_acts_sections.map((act, index) => (
                <span
                key={index}
                className="px-3 py-1 text-sm font-mono font-medium bg-slate-700 text-slate-200 rounded-full"
                >
                {act}
                </span>
            ))}
            </div>
         </div>
       )}
    </div>
  );
};

// Add a simple fade-in animation using Tailwind config in a style tag for demonstration
// In a real app, this would be in a global CSS file or part of the tailwind.config.js
const StyleInjector: React.FC = () => (
    <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `}</style>
);


const ClassificationResultWithStyle: React.FC<ClassificationResultProps> = (props) => (
    <>
        <StyleInjector />
        <ClassificationResult {...props} />
    </>
);

export default ClassificationResultWithStyle;
