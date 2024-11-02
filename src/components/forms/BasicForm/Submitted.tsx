'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

function Submitted() {
  const { formValues, setCurrentStep, setFormValues } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-2xl mb-3">Form details</h1>
      <div className="w-full">
        <pre style={{ maxWidth: '100%', overflowX: 'auto' }}>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
      <button
        onClick={() => {
          setFormValues({});
          localStorage.removeItem('form-values');
          setCurrentStep(1);
        }}
        className="mx-auto px-3 py-1 bg-green-500 text-white hover:bg-green-600 duration-200 rounded-xl"
      >
        DONE
      </button>
    </div>
  );
}

export default Submitted;
