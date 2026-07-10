"use client";

import Link from "next/link";
import styles from "./JourneyRibbon.module.css";

interface RibbonNode {
  name: string;
  href: string;
}

interface JourneyRibbonProps {
  nodes: RibbonNode[];
}

export default function JourneyRibbon({ nodes }: JourneyRibbonProps) {
  return (
    <div className={`${styles.ribbon} voice-steward`}>
      {nodes.map((node, index) => (
        <span key={node.name} className={styles.nodeWrapper}>
          {index > 0 && <span className={styles.arrow}>→</span>}
          {index === nodes.length - 1 ? (
            <span className={styles.currentNode}>{node.name}</span>
          ) : (
            <Link href={node.href} className={styles.linkNode}>
              {node.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
