"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AfricaMap.module.css";

export default function AfricaMap() {
  const router = useRouter();
  const [zoomed, setZoomed] = useState(false);

  const handleClick = () => {
    setZoomed(true);
    // Simulate drill-down: Africa -> Country -> Village -> Space
    setTimeout(() => {
      router.push("/spaces");
    }, 1500);
  };

  return (
    <div className={`${styles.mapContainer} animate-rise`} onClick={handleClick}>
      <Image 
        src="/artwork/africa/impande-africa-map-v1.png" 
        alt="Map of Africa represented as Roots" 
        width={600} 
        height={600} 
        className={styles.mapImage}
        style={zoomed ? { transform: 'scale(3) translate(-10%, -20%)', opacity: 0 } : {}}
      />
      
      {!zoomed && <div className={styles.pulseNode} title="Chisali-Nkambule Root" />}
      
      <p className={styles.mapLabel}>
        {zoomed ? "Tracing Roots..." : "Enter the Archive"}
      </p>
    </div>
  );
}
