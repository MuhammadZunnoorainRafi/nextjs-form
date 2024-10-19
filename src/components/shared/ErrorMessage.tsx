import React from 'react';

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return;
  return <div className="text-red-500 text-sm">{message}</div>;
}

export default ErrorMessage;
