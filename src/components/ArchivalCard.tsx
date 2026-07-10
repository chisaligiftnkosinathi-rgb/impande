import React from "react";
import styles from "./ArchivalCard.module.css";

interface ArchivalCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArchivalCard({ children, className = "" }: ArchivalCardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
}
