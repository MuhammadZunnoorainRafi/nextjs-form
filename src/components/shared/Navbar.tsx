import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-sm shadow-white">
      <Link href="/" className="font-bold text-2xl">
        📃 Forms
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link className="hover:underline" href="/basic">
          Basic
        </Link>
        <Link className="hover:underline" href="/dynamic-form">
          Dynamic-Form
        </Link>
        <Link className="hover:underline" href="/dnd">
          Dnd
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
