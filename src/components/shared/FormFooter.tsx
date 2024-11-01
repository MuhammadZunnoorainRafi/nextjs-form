'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

function FormFooter() {
  const { currentStep, setCurrentStep } = useAppContext();
  return (
    <div className="max-w-[200px] w-full mx-auto flex items-center justify-between">
      <button
        type="button"
        onClick={() => setCurrentStep((prev) => prev - 1)}
        disabled={currentStep === 1}
        className={`${
          currentStep === 1
            ? 'bg-slate-600 text-white'
            : 'bg-slate-800 text-white hover:bg-slate-700 hover:text-slate-200'
        } px-3 py-1 rounded-lg  duration-200`}
      >
        Back
      </button>
      <button
        type="submit"
        className={`${
          currentStep === 3
            ? 'bg-blue-500 text-white'
            : 'bg-slate-900 text-slate-50 hover:bg-slate-800'
        } px-3 py-1 rounded-lg  duration-200`}
      >
        {currentStep === 3 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}

export default FormFooter;
