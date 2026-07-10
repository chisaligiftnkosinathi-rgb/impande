import React from 'react';

interface StateBoundaryProps {
  isLoading: boolean;
  error?: Error | null;
  isEmpty: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  children: React.ReactNode;
}

export function StateBoundary({
  isLoading,
  error,
  isEmpty,
  emptyMessage = 'No data available.',
  loadingMessage = 'Loading...',
  children
}: StateBoundaryProps) {
  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#6C5434' }}>
        <p>⏳ {loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#FFEBEE', color: '#C62828', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>⚠ Something went wrong</h3>
        <p style={{ margin: 0 }}>{error.message || 'An unexpected error occurred.'}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#8D6E63', backgroundColor: '#F9F6F0', borderRadius: '8px' }}>
        <p style={{ margin: 0 }}>{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
