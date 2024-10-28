'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

function Stepper() {
  const steps = ['Personal Details', 'Job Details', 'Address Details'];

  const { currentStep } = useAppContext();

  return (
    <div className="flex items-center justify-between w-full pb-5 max-w-xl mx-auto text-white relative">
      <div className="absolute border max-w-lg w-full left-8 top-7 border-slate-300" />
      {steps.map((val, ind) => (
        <div
          key={val}
          className="flex flex-col items-center justify-center gap-y-2 relative z-10"
        >
          <h1
            className={`rounded-full h-14 w-14 flex items-center justify-center ${
              currentStep === ind + 1
                ? 'bg-blue-500'
                : currentStep > ind + 1
                ? 'bg-green-500'
                : 'bg-gray-800'
            } `}
          >
            {ind + 1}
          </h1>
          <p className="text-sm">{val}</p>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
