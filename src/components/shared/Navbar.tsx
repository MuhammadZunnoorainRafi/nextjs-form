import Link from 'next/link';
import React from 'react';

function Navbar() {
  const navLinks = [
    { lable: 'Basic', href: '/basic' },
    { lable: 'Dynamic-Form', href: '/dynamic-form' },
    { lable: 'Dnd', href: '/dnd' },
    { lable: 'Tanstack-Table', href: '/tanstack-table' },
  ];

  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-sm shadow-white">
      <Link href="/" className="font-bold text-2xl">
        📃 Forms
      </Link>
      <div className="flex items-center justify-center gap-4">
        {navLinks.map((val, ind) => (
          <Link key={ind} className="hover:underline" href={val.href}>
            {val.lable}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
