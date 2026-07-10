"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ArchivalCard from "@/components/ArchivalCard";

export default function RootCeremony() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [spaceName, setSpaceName] = useState("");

  const handleNext = () => setStep(prev => prev + 1);
  
  const handlePlantRoot = () => {
    // In a real app, this would save to the DB
    router.push("/spaces");
  };

  return (
    <main className={styles.ceremonyChamber}>
      <ArchivalCard className={styles.ceremonyCard}>
        
        {step === 1 && (
          <div className={`${styles.step} animate-fade-in`}>
            <h1 className="voice-elder">The Constitution</h1>
            <p className="voice-steward">
              Before a root is planted, a steward must understand the soil.
              Impande is governed by a simple covenant: we preserve truth with humility,
              memory with care, and service with love, so that no generation stands alone.
            </p>
            <p className="voice-steward">
              Every generation inherits three responsibilities:
              <br/>To remember faithfully.
              <br/>To seek truth humbly.
              <br/>To preserve both for those who come after.
            </p>
            <button className={styles.ceremonyButton} onClick={handleNext}>
              I have read and understood
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={`${styles.step} animate-fade-in`}>
            <h1 className="voice-elder">The Covenant</h1>
            <p className="voice-steward">
              We acknowledge that no generation possesses the whole truth, remembers every story, or preserves every voice.
              Therefore, we commit ourselves to the work of stewardship rather than ownership.
            </p>
            <p className={`${styles.pledge} voice-elder`}>
              "I receive the roots entrusted to me with gratitude, preserve them with integrity, and pass them forward with hope."
            </p>
            <button className={styles.ceremonyButton} onClick={handleNext}>
              I Affirm the Covenant
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={`${styles.step} animate-fade-in`}>
            <h1 className="voice-elder">Name the Space</h1>
            <p className="voice-steward">
              Every root begins with a name. By what name shall this Continuity Space be known?
            </p>
            <input 
              type="text" 
              className={`${styles.nameInput} voice-elder`}
              placeholder="e.g., Chisali-Nkambule"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
            />
            <button 
              className={styles.ceremonyButton} 
              onClick={handleNext}
              disabled={!spaceName.trim()}
            >
              Set the Name
            </button>
          </div>
        )}

        {step === 4 && (
          <div className={`${styles.step} animate-fade-in`}>
            <h1 className="voice-elder">Plant the Root</h1>
            <p className="voice-steward">
              The soil is prepared. The covenant is affirmed. The name is spoken.
            </p>
            <p className={`${styles.blessing} voice-elder`}>
              The first root has taken hold. May those who come after find strength beneath its branches.
            </p>
            <button className={styles.ceremonyButton} onClick={handlePlantRoot}>
              Enter the Space
            </button>
          </div>
        )}

      </ArchivalCard>
    </main>
  );
}
