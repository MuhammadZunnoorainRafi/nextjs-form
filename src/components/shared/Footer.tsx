import React from 'react';

function Footer() {
  const date = new Date().toDateString();
  return <div className="border-t py-1 text-center">{date}</div>;
}

export default Footer;
