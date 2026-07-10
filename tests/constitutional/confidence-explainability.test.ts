import { describe, it, expect } from 'vitest';
import { MeaningService } from '../../src/lib/services/MeaningService';

describe('Constitutional Principle: Explainability', () => {
  it('should mandate that every derived explanation includes an evidence chain', async () => {
    const service = new MeaningService();
    
    // We are mocking a successful explanation result. 
    // The type system / return shape MUST contain a confidence trace.
    const explanation = await service.explain('subject-123');
    
    expect(explanation).toHaveProperty('narrative');
    expect(explanation).toHaveProperty('confidenceScore');
    expect(explanation).toHaveProperty('evidenceChain');
    
    // An explanation is constitutionally invalid if the chain is empty
    // unless the confidence score explicitly reflects 0.0 (no evidence).
    if (explanation.confidenceScore > 0) {
      expect(explanation.evidenceChain.length).toBeGreaterThan(0);
    }
  });
});
