import React from 'react';

export default function ObjectExplorer({ params }: { params: { id: string } }) {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">Research Object Explorer</h1>
            <div className="border p-6 rounded shadow">
                <h2 className="text-xl font-bold">{params.id}</h2>
                <p className="mt-4">Type: Unknown (Metadata fetch pending)</p>
                <p>Status: PUBLIC RELEASE</p>
            </div>
        </main>
    );
}
