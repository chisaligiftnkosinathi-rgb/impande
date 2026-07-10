"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../page.module.css';

export default function PassportDemo() {
  const [step, setStep] = useState(1);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/spaces">← Back to Spaces</Link>
          <div className={styles.brand}>iPhande Continuity</div>
        </div>
        <h1>Evidence Passport Generation</h1>
        <p>Bridging the Community Layer (iPhande) and the Institutional Layer (AXIS).</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} style={{ gridColumn: '1 / -1', background: 'var(--card-bg)' }}>
          <h2 style={{ color: 'var(--ochre)' }}>The Continuity Handshake</h2>
          <p>
            When a community organisation like CEBT needs to prove an outcome (e.g., an entrepreneur completing a programme),
            the append-only history is extracted from the <strong>iPhande PostgreSQL Database</strong> and wrapped in a cryptographically signed <strong>Evidence Passport</strong>.
          </p>
          <p style={{ marginTop: '1rem' }}>
            This passport is then sent to the <strong>AXIS Evidence Registry</strong> for constitutional validation.
            iPhande never shares its internal community database with AXIS. They remain architecturally independent.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={() => setStep(2)}
              disabled={step > 1}
              style={{
                padding: '1rem 2rem',
                background: step === 1 ? 'var(--ochre)' : '#333',
                color: step === 1 ? '#000' : '#888',
                border: 'none',
                borderRadius: '4px',
                cursor: step === 1 ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              1. Compile Community Evidence
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={step !== 2}
              style={{
                padding: '1rem 2rem',
                background: step === 2 ? 'var(--ochre)' : '#333',
                color: step === 2 ? '#000' : '#888',
                border: 'none',
                borderRadius: '4px',
                cursor: step === 2 ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              2. Generate Cryptographic Passport
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={step !== 3}
              style={{
                padding: '1rem 2rem',
                background: step === 3 ? 'var(--ochre)' : '#333',
                color: step === 3 ? '#000' : '#888',
                border: 'none',
                borderRadius: '4px',
                cursor: step === 3 ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              3. Submit to AXIS for Governance
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '2rem', background: '#111', borderRadius: '8px', minHeight: '200px', border: '1px solid #333' }}>
            {step === 1 && (
              <div className="animate-fade-in">
                <p style={{ color: '#888' }}>Waiting for action...</p>
              </div>
            )}
            {step === 2 && (
              <div className="animate-fade-in">
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Extracting Append-Only Log</h3>
                <pre style={{ color: '#0f0', fontSize: '0.8rem', overflowX: 'auto' }}>
                  {`> Querying iPhande Local Ledger...
> Extracting [Sipho's Auto Repair] milestones...
> Found 4 sequential continuity records...
> Preparing bundle...`}
                </pre>
              </div>
            )}
            {step === 3 && (
              <div className="animate-fade-in">
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Evidence Passport Generated</h3>
                <pre style={{ color: '#0aa', fontSize: '0.8rem', overflowX: 'auto' }}>
                  {`{
  "passport_id": "AXP-IPHANDE-2026-9A7B",
  "issuer": "iPhande Community Continuity Node",
  "domain": "Entrepreneurship (CEBT)",
  "subject": "Sipho's Auto Repair",
  "evidence_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "timestamp": "${new Date().toISOString()}"
}`}
                </pre>
              </div>
            )}
            {step === 4 && (
              <div className="animate-fade-in">
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>AXIS Validation Complete</h3>
                <div style={{ padding: '1rem', borderLeft: '4px solid #0f0', background: 'rgba(0, 255, 0, 0.1)' }}>
                  <p style={{ color: '#0f0', fontWeight: 'bold' }}>✓ Passport Verified by AXIS Trust Registry</p>
                  <p style={{ color: '#ccc', marginTop: '0.5rem', fontSize: '0.9rem' }}>The institutional layer has verified the community evidence without needing direct database access. The compliance workflow is now complete.</p>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <a
                    href={process.env.NEXT_PUBLIC_AXIS_API ? `${process.env.NEXT_PUBLIC_AXIS_API}/docs` : "#"}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--ochre)', textDecoration: 'underline' }}
                  >
                    View AXIS Registry
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
