import React from "react";
import styles from "./StoryWall.module.css";
import ArchivalCard from "./ArchivalCard";

interface StoryEvent {
  id: string;
  timeLabel: string;
  description: string;
}

interface StoryWallProps {
  events: StoryEvent[];
}

export default function StoryWall({ events }: StoryWallProps) {
  return (
    <div className={styles.storyWall}>
      <h3 className={`${styles.title} voice-elder`}>Stories Being Remembered</h3>
      
      <div className={styles.timeline}>
        {events.map((event, index) => (
          <ArchivalCard key={event.id} className={styles.eventCard}>
            <p className={styles.timeLabel}>{event.timeLabel}</p>
            <p className={`${styles.description} voice-steward`}>{event.description}</p>
          </ArchivalCard>
        ))}
      </div>
    </div>
  );
}
