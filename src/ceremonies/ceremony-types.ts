export type CeremonyStepType = 
  | 'INVITATION'
  | 'REFLECTION'
  | 'RECORDING'
  | 'CONFIRMATION'
  | 'CONTINUATION';

export interface CeremonyStep {
  id: string;
  type: CeremonyStepType;
  title?: string;
  content: string | React.ReactNode;
  actionLabel?: string;
  isForm?: boolean;
}

export interface CeremonyDefinition {
  id: string;
  name: string;
  steps: CeremonyStep[];
  onComplete?: (data: any) => Promise<void>;
}
