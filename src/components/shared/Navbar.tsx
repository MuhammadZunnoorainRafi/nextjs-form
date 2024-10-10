import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-sm shadow-white">
      <h1 className="font-bold text-2xl">📃 Forms</h1>
      <div className="flex items-center justify-center gap-4">
        <Link className="hover:underline" href="/basic">
          Basic
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
