"use client";

import { useEffect, useState } from "react";
import styles from "./SeedLoader.module.css";

export default function SeedLoader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasSeenLoader = sessionStorage.getItem("impande_loader_seen");
    if (hasSeenLoader) {
      setLoading(false);
      setHide(true);
      onComplete();
      return;
    }

    // The sequence takes about 6 seconds total
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("impande_loader_seen", "true");
      onComplete();
      
      // Delay unmounting until fade out completes
      setTimeout(() => setHide(true), 2000);
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (hide) return null;

  return (
    <div className={`${styles.loaderContainer} ${!loading ? styles.hidden : ""}`}>
      <svg viewBox="0 0 200 300" className={styles.seed} aria-label="Seed growing into a tree">
        {/* Roots */}
        <path className={`${styles.path} ${styles.animateRoot}`} d="M100 200 Q90 220 80 250 Q110 230 120 260 M100 200 Q110 240 130 280 M100 200 Q80 230 60 270" />
        
        {/* Trunk (Baobab style - thick and solid) */}
        <path className={`${styles.path} ${styles.animateTrunk}`} d="M90 200 C80 150 70 100 60 60 C80 80 120 80 140 60 C130 100 120 150 110 200 Z" />
        
        {/* Branches */}
        <path className={`${styles.path} ${styles.animateBranch}`} d="M65 70 Q40 40 20 20 M80 80 Q70 30 60 10 M120 80 Q130 30 140 10 M135 70 Q160 40 180 20" />
        
        {/* Leaves */}
        <circle cx="20" cy="20" r="8" className={styles.animateLeaf} />
        <circle cx="60" cy="10" r="10" className={styles.animateLeaf} />
        <circle cx="140" cy="10" r="10" className={styles.animateLeaf} />
        <circle cx="180" cy="20" r="8" className={styles.animateLeaf} />
        <circle cx="40" cy="30" r="6" className={styles.animateLeaf} />
        <circle cx="160" cy="30" r="6" className={styles.animateLeaf} />
      </svg>
    </div>
  );
}
