import React from "react";
import { CeremonyDefinition } from "../ceremony-types";
import styles from "./forms.module.css";
import { useToast } from "@/components/PoeticToast";

export function getPreserveVoiceCeremony(entityId: string, toast: any): CeremonyDefinition {
  return {
    id: "preserve-voice",
    name: "Preserve a Voice",
    steps: [
      {
        id: "invitation",
        type: "INVITATION",
        title: "Welcome.",
        content: "We invite you to preserve the living voice of an elder. Let their tone, their laugh, and their pauses be heard by those who come next.",
        actionLabel: "Begin"
      },
      {
        id: "reflection",
        type: "REFLECTION",
        content: "Continuity is not just in the words spoken, but in the breath that carries them."
      },
      {
        id: "recording",
        type: "RECORDING",
        content: (formData: any, onChange: (key: string, value: any) => void) => (
          <div className={styles.formGroup}>
            <label className="voice-steward">Whose voice are we preserving?</label>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.speaker || ''} 
              onChange={(e) => onChange('speaker', e.target.value)} 
              placeholder="Name of the elder"
            />
            
            <label className="voice-steward">What are they speaking about?</label>
            <textarea 
              className={styles.input} 
              value={formData.topic || ''} 
              onChange={(e) => onChange('topic', e.target.value)} 
              placeholder="e.g., A memory of their childhood, a song, a prayer"
              rows={2}
            />

            <div style={{ marginTop: '1rem', padding: '2rem', border: '1px dashed var(--copper)', textAlign: 'center', borderRadius: '4px' }}>
              <p className="voice-steward" style={{ color: 'var(--copper)' }}>
                [ Microphone Interface ]<br/>
                Click to begin recording, or upload an audio file.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "confirmation",
        type: "CONFIRMATION",
        title: "Preserved.",
        content: "This voice now speaks to future generations.",
        actionLabel: "Complete"
      },
      {
        id: "continuation",
        type: "CONTINUATION",
        content: "Perhaps another elder is ready to speak.",
        actionLabel: "Close"
      }
    ],
    onComplete: async (data: any) => {
      toast("A voice has returned to remembrance.");
    }
  };
}
