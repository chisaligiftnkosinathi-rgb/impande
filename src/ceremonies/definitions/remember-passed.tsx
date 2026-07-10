import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { useToast } from "@/components/PoeticToast";

export function getRememberPassedCeremony(spaceId: string, toast: any): CeremonyDefinition {
  return {
    id: "remember-passed",
    name: "Remember Someone Who Has Passed",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "We stand with you in this moment of remembering. A life lived is a seed planted for those who follow.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "Many families only begin recording history after losing an elder. We preserve their story with dignity, so they may never truly leave us."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">Whose memory are we honoring?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.name || ''} 
              onChange={(e) => onChange('name', e.target.value)} 
              placeholder="Name of the passed elder"
            />
            
            <label className="voice-steward">What values did they leave behind?</label>
            <textarea 
              className={styles.input} 
              value={formData.values || ''} 
              onChange={(e) => onChange('values', e.target.value)} 
              placeholder="e.g., They taught us patience, they always kept their door open."
              rows={3}
            />

            <label className="voice-steward">What acts of service should be remembered?</label>
            <textarea 
              className={styles.input} 
              value={formData.service || ''} 
              onChange={(e) => onChange('service', e.target.value)} 
              placeholder="How did they care for the family or community?"
              rows={3}
            />
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "Their legacy now rests safely within the archive, a guiding light for future generations.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "When you are ready, you may return to preserve their photographs or voice.",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      // Backend hook to create Entity, Claims, etc.
      toast("A life has returned to remembrance.");
    }
  };
}
