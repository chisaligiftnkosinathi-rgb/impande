"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = {
    Discover: [
      { name: "What is AXIONYX?", href: "/discover/what-is-axionyx" },
      { name: "Programmes", href: "/discover/programmes" },
      { name: "Publications", href: "/discover/publications" },
      { name: "Software", href: "/discover/software" },
      { name: "Data & Evidence", href: "/discover/data-evidence" },
    ],
    Trust: [
      { name: "Standards", href: "/trust/standards" },
      { name: "Certification", href: "/trust/certification" },
      { name: "Provenance", href: "/trust/provenance" },
      { name: "Verification", href: "/trust/verification" },
    ],
    Solutions: [
      { name: "Certified Products", href: "/solutions/certified-products" },
      { name: "Licensed Technology", href: "/solutions/licensed-technology" },
      { name: "Partnerships", href: "/solutions/partnerships" },
    ],
    Participate: [
      { name: "Open Science", href: "/participate/open-science" },
      { name: "Communities", href: "/participate/communities" },
      { name: "Contact", href: "/participate/contact" },
    ]
  };

  return (
    <nav className="w-full bg-[var(--ax-surface)] border-b border-[var(--ax-border)] p-4" aria-label="Main Navigation">
      <div className="flex justify-between items-center md:hidden">
        <h2 className="font-bold text-[var(--ax-primary)]">AXIONYX Menu</h2>
        <button 
          onClick={toggleMenu} 
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="p-2 border border-[var(--ax-border)] rounded-[var(--ax-radius)] text-[var(--ax-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]"
        >
          {isOpen ? 'Close' : '☰ Menu'}
        </button>
      </div>

      <div id="mobile-menu" className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-8 mt-4 md:mt-0`} role="region" aria-hidden={!isOpen}>
        {Object.entries(links).map(([category, items]) => (
          <div key={category} className="mb-6 md:mb-0">
            <h3 className="font-bold text-[var(--ax-primary)] mb-2 uppercase text-sm tracking-wider">{category}</h3>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-[var(--ax-muted)] hover:text-[var(--ax-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
