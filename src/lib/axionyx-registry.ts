import fs from 'fs';
import path from 'path';

// Abstracted registry loader. In production, this would fetch from an S3 bucket or GitHub release.
export async function getRegistry() {
    // For local development, read the generated JSONs
    try {
        const registryPath = 'C:/Users/IMBALLY/.gemini/antigravity/scratch/axionyx-standards/axionyx-registry.json';
        const data = fs.readFileSync(registryPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return { software: [], applications: [], foundations: [] };
    }
}

export async function getGraph() {
    try {
        const graphPath = 'C:/Users/IMBALLY/.gemini/antigravity/scratch/axionyx-standards/axionyx-graph.json';
        const data = fs.readFileSync(graphPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return { nodes: [], edges: [] };
    }
}
