import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--ax-surface)] border-t border-[var(--ax-border)] p-8 mt-16">
      <div className="max-w-[var(--ax-container)] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        <div className="md:col-span-1">
          <h2 className="font-bold text-[var(--ax-primary)] text-lg mb-4">AXIONYX Research Observatory</h2>
        </div>

        <div>
          <h3 className="font-bold text-[var(--ax-primary)] mb-4">Discover</h3>
          <ul className="space-y-2 text-sm text-[var(--ax-muted)]">
            <li><Link href="/discover/programmes" className="hover:text-[var(--ax-secondary)]">Programmes</Link></li>
            <li><Link href="/discover/publications" className="hover:text-[var(--ax-secondary)]">Publications</Link></li>
            <li><Link href="/discover/software" className="hover:text-[var(--ax-secondary)]">Software</Link></li>
            <li><Link href="/discover/data-evidence" className="hover:text-[var(--ax-secondary)]">Evidence</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[var(--ax-primary)] mb-4">Trust</h3>
          <ul className="space-y-2 text-sm text-[var(--ax-muted)]">
            <li><Link href="/trust/standards" className="hover:text-[var(--ax-secondary)]">Standards</Link></li>
            <li><Link href="/trust/provenance" className="hover:text-[var(--ax-secondary)]">Provenance</Link></li>
            <li><Link href="/trust/certification" className="hover:text-[var(--ax-secondary)]">Certification</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[var(--ax-primary)] mb-4">Solutions</h3>
          <ul className="space-y-2 text-sm text-[var(--ax-muted)]">
            <li><Link href="/solutions/certified-products" className="hover:text-[var(--ax-secondary)]">Products</Link></li>
            <li><Link href="/solutions/licensed-technology" className="hover:text-[var(--ax-secondary)]">Licensing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[var(--ax-primary)] mb-4">Participate</h3>
          <ul className="space-y-2 text-sm text-[var(--ax-muted)]">
            <li><Link href="/participate/open-science" className="hover:text-[var(--ax-secondary)]">Open Science</Link></li>
            <li><Link href="/participate/communities" className="hover:text-[var(--ax-secondary)]">Communities</Link></li>
            <li><Link href="/participate/contact" className="hover:text-[var(--ax-secondary)]">Contact</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[var(--ax-container)] mx-auto mt-12 pt-8 border-t border-[var(--ax-border)] text-sm text-[var(--ax-muted)] flex flex-col md:flex-row justify-between">
        <div>
          <p className="font-bold">Operated by:</p>
          <p>Global IT and Business Solutions (Pty) Ltd</p>
          <p>South Africa</p>
        </div>
        <div className="mt-4 md:mt-0 text-left md:text-right">
          <p className="font-bold">Contact:</p>
          <p><a href="mailto:Global_IT_Business@proton.me" className="hover:text-[var(--ax-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]">Global_IT_Business@proton.me</a></p>
        </div>
      </div>
    </footer>
  );
}
