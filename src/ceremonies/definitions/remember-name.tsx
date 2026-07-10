import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { rememberPerson } from "@/app/actions/steward";
import { useToast } from "@/components/PoeticToast";

export function getRememberNameCeremony(spaceId: string, toast: any): CeremonyDefinition {
  return {
    id: "remember-name",
    name: "Remember a Name",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "Today we remember together. Every journey begins with a name.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "Every name carries a story, and every story begins with someone willing to remember."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">What is the name?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.name || ''} 
              onChange={(e) => onChange('name', e.target.value)} 
              placeholder="Enter the name"
            />
            
            <label className="voice-steward">In what language was this name spoken?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.language || ''} 
              onChange={(e) => onChange('language', e.target.value)} 
              placeholder="e.g., isiZulu, English, Swati (Optional)"
            />

            <label className="voice-steward">Who gave this name? (Optional)</label>
            <textarea 
              className={styles.input} 
              value={formData.givenBy || ''} 
              onChange={(e) => onChange('givenBy', e.target.value)} 
              placeholder="Explain the origin or meaning if known"
              rows={3}
            />
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "This memory now walks with future generations.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "Perhaps another elder is waiting to be heard.",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      if (!data.name) return; // Basic validation
      await rememberPerson(spaceId, data.name, data.language, data.givenBy);
      toast("A name has returned to remembrance.");
    }
  };
}
