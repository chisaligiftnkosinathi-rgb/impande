import { ConfidenceResult } from "./ConfidenceCalculator";

export interface DerivedTheme {
  theme: string;
  confidence: ConfidenceResult;
  evidenceCount: number;
  sources: string[];
}

export interface ResearchOpportunity {
  entityId: string;
  entityName: string;
  unknowns: string[];
  possibleSources: string[];
}

export interface ThemeEvolution {
  year: number;
  description: string;
}

export interface DerivedNarrative {
  title: string;
  points: string[];
  synthesis: string;
}

export interface DerivedNameMeaning {
  name: string;
  language: string;
  themes: DerivedTheme[];
  evolution: ThemeEvolution[];
}
