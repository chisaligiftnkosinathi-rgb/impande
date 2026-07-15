import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AXIONYX Research Observatory';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0b1f3a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 24, letterSpacing: '-0.02em' }}>
          AXIONYX Research Observatory
        </div>
        <div style={{ fontSize: 32, color: '#e5e7eb', maxWidth: '800px', textAlign: 'center' }}>
          Evidence-Based Innovation & Transparent Computational Science
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
