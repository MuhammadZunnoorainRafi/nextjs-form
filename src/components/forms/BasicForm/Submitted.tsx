'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

function Submitted() {
  const { formValues } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-2xl mb-3">Form details</h1>
      <div className="w-full">
        <pre style={{ maxWidth: '100%', overflowX: 'auto' }}>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Submitted;
