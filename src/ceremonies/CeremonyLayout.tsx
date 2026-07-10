"use client";

import React from "react";
import styles from "./CeremonyLayout.module.css";

interface CeremonyLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function CeremonyLayout({ children, onClose }: CeremonyLayoutProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.chamber}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕ Return
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
