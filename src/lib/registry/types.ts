export type ObjectType = 
  | "Programme"
  | "Publication"
  | "Software"
  | "Dataset"
  | "EvidencePackage"
  | "Standard"
  | "Product"
  | "Researcher";

export type ObjectStatus = "Verified" | "Pending" | "Deprecated" | "Operational" | "Archived";

export interface BaseKnowledgeObject {
  id: string;
  type: ObjectType;
  title: string;
  summary: string;
  status: ObjectStatus;
  lifecycle: string;
  repository: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Programme extends BaseKnowledgeObject {
  type: "Programme";
  leadOrganization: string;
}

export interface Publication extends BaseKnowledgeObject {
  type: "Publication";
  doi?: string;
  authors: string[];
}

export interface Software extends BaseKnowledgeObject {
  type: "Software";
  version: string;
  license: string;
}

export interface Dataset extends BaseKnowledgeObject {
  type: "Dataset";
  format: string;
  sizeBytes: number;
}

export interface EvidencePackage extends BaseKnowledgeObject {
  type: "EvidencePackage";
  hash: string;
}

export interface Standard extends BaseKnowledgeObject {
  type: "Standard";
  issuer: string;
}

export interface Product extends BaseKnowledgeObject {
  type: "Product";
  manufacturer: string;
}

export interface Researcher extends BaseKnowledgeObject {
  type: "Researcher";
  affiliation: string;
}

export type KnowledgeObject =
  | Programme
  | Publication
  | Software
  | Dataset
  | EvidencePackage
  | Standard
  | Product
  | Researcher;

export type EdgeRelation = 
  | "implements"
  | "supports"
  | "validates"
  | "publishes"
  | "derived-from"
  | "uses"
  | "authored-by";

export interface RegistryEdge {
  from: string;
  to: string;
  relation: EdgeRelation;
}

export interface RegistryData {
  objects: KnowledgeObject[];
  edges: RegistryEdge[];
}
