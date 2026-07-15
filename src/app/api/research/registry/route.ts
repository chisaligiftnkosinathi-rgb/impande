import { NextResponse } from 'next/server';
import { getRegistry, getGraph } from '@/lib/axionyx-registry';

export async function GET() {
    const registry = await getRegistry();
    const graph = await getGraph();
    
    return NextResponse.json({
        institution: "AXIONYX Research Institute",
        registry,
        graph
    });
}
