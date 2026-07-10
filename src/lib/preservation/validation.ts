export class PreservationValidator {
  static validateSpace(space: any): string[] {
    const issues: string[] = [];
    
    // Check for missing evidence on claims
    space.entities?.forEach((e: any) => {
      e.claims?.forEach((c: any) => {
        if (!c.evidence || c.evidence.length === 0) {
          issues.push(`Claim ${c.id} has no supporting evidence.`);
        }
      });
    });

    // Check for cyclic relationships (basic stub)
    // In a real implementation, traverse relationships graph to find cycles.

    return issues;
  }
}
