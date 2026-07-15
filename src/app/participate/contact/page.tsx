import React from 'react';

export default function ContactPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[var(--ax-primary)] mb-8">Contact AXIONYX</h1>

      <section className="mb-10 p-6 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded-[var(--ax-radius)]">
        <h2 className="text-2xl font-bold text-[var(--ax-primary)] mb-2">General Enquiries</h2>
        <p className="text-[var(--ax-text)] mb-4">Questions about AXIONYX and the Observatory.</p>
        <p className="font-bold">Email:</p>
        <a href="mailto:Global_IT_Business@proton.me" className="text-[var(--ax-secondary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]">Global_IT_Business@proton.me</a>
      </section>

      <section className="mb-10 p-6 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded-[var(--ax-radius)]">
        <h2 className="text-2xl font-bold text-[var(--ax-primary)] mb-2">Research Collaboration</h2>
        <p className="text-[var(--ax-text)] mb-4">For researchers, institutions, and knowledge partners.</p>
        <p className="font-bold">Email:</p>
        <a href="mailto:Global_IT_Business@proton.me" className="text-[var(--ax-secondary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]">Global_IT_Business@proton.me</a>
      </section>

      <section className="p-6 bg-[var(--ax-surface)] border border-[var(--ax-border)] rounded-[var(--ax-radius)]">
        <h2 className="text-2xl font-bold text-[var(--ax-primary)] mb-2">Partnerships</h2>
        <p className="text-[var(--ax-text)] mb-4">For organisations interested in validated solutions.</p>
        <p className="font-bold">Email:</p>
        <a href="mailto:Global_IT_Business@proton.me" className="text-[var(--ax-secondary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--ax-secondary)]">Global_IT_Business@proton.me</a>
      </section>
    </main>
  );
}
