import { registryRepo } from "./repository";

export interface ObservatoryMetrics {
  repositories: number;
  publications: number;
  software: number;
  evidencePackages: number;
  researchers: number;
  standards: number;
  products: number;
  totalObjects: number;
}

export async function getObservatoryMetrics(): Promise<ObservatoryMetrics> {
  const objects = await registryRepo.getAllObjects();
  
  // Extract unique repositories
  const uniqueRepos = new Set(objects.map(o => o.repository)).size;

  return {
    repositories: uniqueRepos,
    publications: objects.filter(o => o.type === "Publication").length,
    software: objects.filter(o => o.type === "Software").length,
    evidencePackages: objects.filter(o => o.type === "EvidencePackage").length,
    researchers: objects.filter(o => o.type === "Researcher").length,
    standards: objects.filter(o => o.type === "Standard").length,
    products: objects.filter(o => o.type === "Product").length,
    totalObjects: objects.length,
  };
}
