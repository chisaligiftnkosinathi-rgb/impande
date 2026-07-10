"use client";

import React, { useState } from "react";
import { CeremonyDefinition, CeremonyStep } from "./ceremony-types";
import CeremonyLayout from "./CeremonyLayout";
import styles from "./CeremonyEngine.module.css";

interface CeremonyEngineProps {
  ceremony: CeremonyDefinition;
  onClose: () => void;
}

export default function CeremonyEngine({ ceremony, onClose }: CeremonyEngineProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step = ceremony.steps[currentStepIndex];
  const isLastStep = currentStepIndex === ceremony.steps.length - 1;

  const handleNext = async () => {
    if (step.type === 'RECORDING' && ceremony.onComplete) {
      setIsSubmitting(true);
      await ceremony.onComplete(formData);
      setIsSubmitting(false);
    }
    
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleDataChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <CeremonyLayout onClose={onClose}>
      <div className={`${styles.stepContainer} animate-fade-in`} key={step.id}>
        
        {step.type === 'INVITATION' && (
          <div className={styles.invitation}>
            <h2 className="voice-elder">{step.title}</h2>
            <div className="voice-steward">{step.content}</div>
          </div>
        )}

        {step.type === 'REFLECTION' && (
          <div className={styles.reflection}>
            <blockquote className="voice-elder">
              {step.content}
            </blockquote>
          </div>
        )}

        {step.type === 'RECORDING' && (
          <div className={styles.recording}>
            {typeof step.content === 'function' 
              ? (step.content as Function)(formData, handleDataChange) 
              : step.content}
          </div>
        )}

        {step.type === 'CONFIRMATION' && (
          <div className={styles.confirmation}>
            <h2 className="voice-elder">{step.title}</h2>
            <p className="voice-steward">{step.content}</p>
          </div>
        )}

        {step.type === 'CONTINUATION' && (
          <div className={styles.continuation}>
            <p className="voice-elder">{step.content}</p>
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={styles.primaryAction} 
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Preserving..." : (step.actionLabel || "Continue")}
          </button>
        </div>

      </div>
    </CeremonyLayout>
  );
}
