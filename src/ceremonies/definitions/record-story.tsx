import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { recordStory } from "@/app/actions/steward";
import { useToast } from "@/components/PoeticToast";

export function getRecordStoryCeremony(entityId: string, toast: any): CeremonyDefinition {
  return {
    id: "record-story",
    name: "Record a Story",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "We sit beneath the tree of memory to preserve a piece of the past.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "A story preserved is a bridge across time. It tells future generations how they came to be."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">What happened?</label>
            <textarea 
              className={styles.input} 
              value={formData.statement || ''} 
              onChange={(e) => onChange('statement', e.target.value)} 
              placeholder="Tell the story faithfully."
              rows={4}
            />
            
            <label className="voice-steward">How do we know?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.provenance || ''} 
              onChange={(e) => onChange('provenance', e.target.value)} 
              placeholder="e.g., Grandmother told me, Found in a diary"
            />

            <label className="voice-steward">Who remembers this?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.witnesses || ''} 
              onChange={(e) => onChange('witnesses', e.target.value)} 
              placeholder="List the witnesses"
            />

            <label className="voice-steward">How certain are we?</label>
            <select 
              className={styles.input} 
              value={formData.confidence || 'ORAL_HISTORY'} 
              onChange={(e) => onChange('confidence', e.target.value)}
            >
              <option value="PERSONAL_TESTIMONY">I saw this happen</option>
              <option value="ORAL_HISTORY">This was told to me</option>
              <option value="VERIFIED_RECORD">I have written evidence</option>
            </select>
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "This story now walks with future generations.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "Perhaps there is another story waiting to be heard.",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      if (!data.statement) return;
      await recordStory(
        entityId, 
        data.statement, 
        data.provenance || "Unknown", 
        data.witnesses || "Unknown", 
        data.confidence || "ORAL_HISTORY"
      );
      toast("A truth has been preserved.");
    }
  };
}
