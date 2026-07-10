"use client";

import styles from "./page.module.css";
import ArchivalCard from "@/components/ArchivalCard";

export default function TreeOfService() {
  const serviceLeaves = [
    { id: 1, text: "Taught the children of Emalahleni to read.", steward: "Make Elsie Ncinekile Phiri", date: "1982" },
    { id: 2, text: "Drove the elders to the clinic every Tuesday.", steward: "George Amos Chisali", date: "1995" },
    { id: 3, text: "Hosted the community gatherings during the harvest.", steward: "Grandmother Nomsa", date: "1970" },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className="voice-elder">The Tree of Service</h1>
        <p className={`${styles.reflection} voice-steward`}>This is how our family loved others.</p>
      </header>

      <div className={styles.tree}>
        {serviceLeaves.map(leaf => (
          <ArchivalCard key={leaf.id} className={styles.leaf}>
            <p className={`${styles.action} voice-elder`}>"{leaf.text}"</p>
            <div className={styles.meta}>
              <span className="voice-steward">{leaf.steward}</span>
              <span className="voice-archive">{leaf.date}</span>
            </div>
          </ArchivalCard>
        ))}
      </div>
    </main>
  );
}
