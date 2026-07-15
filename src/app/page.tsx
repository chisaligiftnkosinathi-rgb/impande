import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 max-w-[var(--ax-container)] mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--ax-primary)] mb-6">AXIONYX Research Observatory</h1>
        <p className="text-xl md:text-2xl text-[var(--ax-muted)] max-w-3xl leading-relaxed">
          AXIONYX helps people and organisations trust information by connecting research, software, evidence, and real-world solutions in a transparent way.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--ax-primary)] mb-8 border-b border-[var(--ax-border)] pb-4">Research Infrastructure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-[var(--ax-surface)] p-6 rounded-[var(--ax-radius)] border border-[var(--ax-border)]">
            <h3 className="text-2xl font-bold text-[var(--ax-secondary)] mb-2">15+ Knowledge Repositories</h3>
            <p className="text-[var(--ax-text)]">Organised collections of standards, publications, software, data, and evidence.</p>
          </div>

          <div className="bg-[var(--ax-surface)] p-6 rounded-[var(--ax-radius)] border border-[var(--ax-border)]">
            <h3 className="text-2xl font-bold text-[var(--ax-secondary)] mb-2">5 Research Layers</h3>
            <p className="text-[var(--ax-text)]">A structured pathway from research foundations to real-world applications.</p>
          </div>

          <div className="bg-[var(--ax-surface)] p-6 rounded-[var(--ax-radius)] border border-[var(--ax-border)]">
            <h3 className="text-2xl font-bold text-[var(--ax-secondary)] mb-2">Validated Software Systems</h3>
            <p className="text-[var(--ax-text)]">Computational tools designed around documented methods and evidence.</p>
          </div>

          <div className="bg-[var(--ax-surface)] p-6 rounded-[var(--ax-radius)] border border-[var(--ax-border)]">
            <h3 className="text-2xl font-bold text-[var(--ax-secondary)] mb-2">Evidence Packages</h3>
            <p className="text-[var(--ax-text)]">Records that explain how results were produced and verified.</p>
          </div>

          <div className="bg-[var(--ax-surface)] p-6 rounded-[var(--ax-radius)] border border-[var(--ax-border)]">
            <h3 className="text-2xl font-bold text-[var(--ax-secondary)] mb-2">Certified Solutions</h3>
            <p className="text-[var(--ax-text)]">Products evaluated through the AXIONYX validation framework.</p>
          </div>

        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-[var(--ax-border)] p-8 rounded-[var(--ax-radius)]">
          <h2 className="text-2xl font-bold text-[var(--ax-primary)] mb-4">Discover</h2>
          <p className="text-[var(--ax-muted)] mb-6">Explore our scientific output and methodologies.</p>
          <Link href="/discover/what-is-axionyx" className="inline-block bg-[var(--ax-secondary)] text-white px-6 py-3 rounded-[var(--ax-radius)] font-bold hover:bg-opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ax-primary)]">
            Learn more &rarr;
          </Link>
        </div>
        <div className="border border-[var(--ax-border)] p-8 rounded-[var(--ax-radius)]">
          <h2 className="text-2xl font-bold text-[var(--ax-primary)] mb-4">Trust</h2>
          <p className="text-[var(--ax-muted)] mb-6">Verify the provenance of our research objects.</p>
          <Link href="/trust/provenance" className="inline-block bg-white text-[var(--ax-primary)] border border-[var(--ax-primary)] px-6 py-3 rounded-[var(--ax-radius)] font-bold hover:bg-[var(--ax-surface)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]">
            Verify data &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
