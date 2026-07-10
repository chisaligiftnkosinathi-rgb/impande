import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { useToast } from "@/components/PoeticToast";

export function getRecordServiceCeremony(spaceId: string, toast: any): CeremonyDefinition {
  return {
    id: "record-service",
    name: "Record an Act of Service",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "Families are remembered just as much by love as by lineage.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "Quiet acts of service often become defining memories across generations."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">What was the act of service?</label>
            <textarea 
              className={styles.input} 
              value={formData.service || ''} 
              onChange={(e) => onChange('service', e.target.value)} 
              placeholder="e.g., Built a school, Cooked for funerals, Raised orphaned children"
              rows={3}
            />
            
            <label className="voice-steward">Who performed this service?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.performer || ''} 
              onChange={(e) => onChange('performer', e.target.value)} 
              placeholder="Name of the elder or family member"
            />
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "This legacy of service now walks with future generations.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "Are there other quiet acts of love waiting to be remembered?",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      // Backend hook for Service logging
      toast("An act of service has returned to remembrance.");
    }
  };
}
