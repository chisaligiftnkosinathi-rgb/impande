"use client";

import React, { useState } from "react";
import styles from "./StewardJournal.module.css";
import { recordJournalEntry } from "@/app/actions/steward";

export default function StewardJournal({ spaceId }: { spaceId: string }) {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"PERSONAL" | "RESEARCH">("PERSONAL");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    await recordJournalEntry(spaceId, content, type, type === "RESEARCH" ? reason : undefined);
    setContent("");
    setReason("");
    setIsSubmitting(false);
  };

  return (
    <div className={styles.journalContainer}>
      <h3 className="voice-elder" style={{ marginBottom: '1rem', color: 'var(--ochre)' }}>
        The Steward's Journal
      </h3>
      <p className="voice-steward" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--muted)' }}>
        Document the messy process of remembering. Personal entries remain private. Research entries prove the provenance of your search and are preserved.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.input}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you discover today? (e.g. Interviewed Aunt Sarah, Found a photo...)"
          rows={3}
          disabled={isSubmitting}
        />

        <div className={styles.controls}>
          <select 
            className={styles.select} 
            value={type} 
            onChange={(e) => setType(e.target.value as "PERSONAL" | "RESEARCH")}
            disabled={isSubmitting}
          >
            <option value="PERSONAL">Personal (Private)</option>
            <option value="RESEARCH">Research (Preservable)</option>
          </select>

          {type === "RESEARCH" && (
            <select 
              className={styles.select} 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting}
              required
            >
              <option value="" disabled>Why am I recording this?</option>
              <option value="Interview">Interview</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Archive Search">Archive Search</option>
              <option value="Cemetery Visit">Cemetery Visit</option>
              <option value="Family Meeting">Family Meeting</option>
              <option value="Church Record">Church Record</option>
              <option value="Oral Tradition">Oral Tradition</option>
              <option value="Future Task">Future Task</option>
            </select>
          )}

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Saving..." : "Log Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
