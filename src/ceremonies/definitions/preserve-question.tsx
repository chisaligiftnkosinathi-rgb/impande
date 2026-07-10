import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { preserveQuestion } from "@/app/actions/steward";
import { useToast } from "@/components/PoeticToast";

export function getPreserveQuestionCeremony(spaceId: string, toast: any): CeremonyDefinition {
  return {
    id: "preserve-question",
    name: "Preserve an Open Question",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "We do not fear what we do not know. An open question is not a failure of memory; it is an invitation for the future.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "Where memory fades, we leave an open door for those who come after us."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">What are we still searching for?</label>
            <textarea 
              className={styles.input} 
              value={formData.question || ''} 
              onChange={(e) => onChange('question', e.target.value)} 
              placeholder="State the open question clearly."
              rows={2}
            />
            
            <label className="voice-steward">Why is it unknown?</label>
            <textarea 
              className={styles.input} 
              value={formData.reasonUnknown || ''} 
              onChange={(e) => onChange('reasonUnknown', e.target.value)} 
              placeholder="e.g., Records were lost in a fire, the elder passed before we could ask."
              rows={2}
            />

            <label className="voice-steward">Who has already searched?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.previousSearches || ''} 
              onChange={(e) => onChange('previousSearches', e.target.value)} 
              placeholder="Prevent future generations from repeating dead ends."
            />

            <label className="voice-steward">What might help future generations?</label>
            <textarea 
              className={styles.input} 
              value={formData.futureClues || ''} 
              onChange={(e) => onChange('futureClues', e.target.value)} 
              placeholder="List any clues, suspected locations, or people they could ask."
              rows={2}
            />
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "The uncertainty has been entrusted to the archive.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "The search continues. Are there other mysteries to document?",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      if (!data.question) return;
      await preserveQuestion(
        spaceId,
        data.question,
        data.reasonUnknown || "Unspecified",
        data.previousSearches || "None recorded",
        data.futureClues || "None"
      );
      toast("An open door has been left for the future.");
    }
  };
}
