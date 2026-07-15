import { KnowledgeObject, RegistryEdge } from "../registry/types";

export interface HealthMetric {
  name: string;
  status: "Healthy" | "Warning" | "Critical";
  score: number;
  message: string;
}

export function getRepositoryHealth(objects: KnowledgeObject[]): HealthMetric {
  const total = objects.length;
  if (total === 0) return { name: "Repository Health", status: "Warning", score: 0, message: "Repository is empty" };
  
  // Example metric: are they recently updated or generally well-formed?
  return {
    name: "Repository Health",
    status: "Healthy",
    score: 100,
    message: `${total} total objects registered`
  };
}

export function getGraphHealth(objects: KnowledgeObject[], edges: RegistryEdge[]): HealthMetric {
  if (objects.length === 0) return { name: "Graph Health", status: "Warning", score: 0, message: "No objects" };

  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.sourceId);
    connectedIds.add(e.targetId);
  });
  
  const orphanedCount = objects.length - connectedIds.size;
  const score = Math.round(((objects.length - orphanedCount) / objects.length) * 100);
  
  let status: "Healthy" | "Warning" | "Critical" = "Healthy";
  if (score < 80) status = "Warning";
  if (score < 50) status = "Critical";

  return {
    name: "Graph Health",
    status,
    score,
    message: `${orphanedCount} isolated objects detected`
  };
}

export function getEvidenceHealth(objects: KnowledgeObject[], edges: RegistryEdge[]): HealthMetric {
  const publicationsAndSoftware = objects.filter(o => o.type === "Publication" || o.type === "Software");
  if (publicationsAndSoftware.length === 0) {
    return { name: "Evidence Health", status: "Healthy", score: 100, message: "No targets requiring evidence" };
  }

  const supportedIds = new Set(edges.filter(e => e.type === "Supports").map(e => e.targetId));
  const supportedCount = publicationsAndSoftware.filter(o => supportedIds.has(o.id)).length;
  
  const score = Math.round((supportedCount / publicationsAndSoftware.length) * 100);
  let status: "Healthy" | "Warning" | "Critical" = "Healthy";
  if (score < 90) status = "Warning";
  if (score < 70) status = "Critical";

  return {
    name: "Evidence Health",
    status,
    score,
    message: `${score}% of primary objects have supporting evidence`
  };
}

export function getMetadataHealth(objects: KnowledgeObject[]): HealthMetric {
  if (objects.length === 0) return { name: "Metadata Health", status: "Healthy", score: 100, message: "N/A" };

  const fullyTagged = objects.filter(o => o.metadata && o.metadata.tags && o.metadata.tags.length > 0);
  const score = Math.round((fullyTagged.length / objects.length) * 100);

  let status: "Healthy" | "Warning" | "Critical" = "Healthy";
  if (score < 95) status = "Warning";
  if (score < 80) status = "Critical";

  return {
    name: "Metadata Health",
    status,
    score,
    message: `${fullyTagged.length}/${objects.length} objects contain metadata tags`
  };
}

export function getValidationHealth(objects: KnowledgeObject[], edges: RegistryEdge[]): HealthMetric {
  const software = objects.filter(o => o.type === "Software");
  if (software.length === 0) return { name: "Validation Health", status: "Healthy", score: 100, message: "No software to validate" };

  const validatedIds = new Set(edges.filter(e => e.type === "Validates").map(e => e.targetId));
  const validatedCount = software.filter(s => validatedIds.has(s.id)).length;

  const score = Math.round((validatedCount / software.length) * 100);
  let status: "Healthy" | "Warning" | "Critical" = "Healthy";
  if (score < 100) status = "Warning";
  if (score < 80) status = "Critical";

  return {
    name: "Validation Health",
    status,
    score,
    message: `${software.length - validatedCount} software objects unvalidated`
  };
}
