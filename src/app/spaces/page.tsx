"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StoryWall from "@/components/StoryWall";
import ArchivalCard from "@/components/ArchivalCard";
import JourneyRibbon from "@/components/JourneyRibbon";
import { useToast } from "@/components/PoeticToast";
import CeremonyEngine from "@/ceremonies/CeremonyEngine";
import { CeremonyDefinition } from "@/ceremonies/ceremony-types";
import { getRememberNameCeremony } from "@/ceremonies/definitions/remember-name";
import { getRecordStoryCeremony } from "@/ceremonies/definitions/record-story";
import { getPreserveQuestionCeremony } from "@/ceremonies/definitions/preserve-question";
import { getRecordServiceCeremony } from "@/ceremonies/definitions/record-service";
import { getPreserveVoiceCeremony } from "@/ceremonies/definitions/preserve-voice";
import { getRememberPassedCeremony } from "@/ceremonies/definitions/remember-passed";

import StewardJournal from "@/components/StewardJournal";

const REFLECTIONS = [
  "A people who remember their roots can plant new forests.",
  "Every elder is a library whose shelves deserve to be preserved.",
  "Some inherit land. Others inherit stories. The wisest preserve both.",
  "The child receives a name. The elder leaves a memory. The steward keeps the path between them."
];

export default function SpacesDashboard() {
  const { toast } = useToast();
  const [greeting, setGreeting] = useState("Welcome.");
  const [reflection, setReflection] = useState(REFLECTIONS[0]);
  const [activeCeremony, setActiveCeremony] = useState<CeremonyDefinition | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 18) {
      setGreeting("Good morning. May today's remembrance strengthen tomorrow's generations.");
    } else {
      setGreeting("Good evening. The day's stories now become tomorrow's memory.");
    }
    
    // Pick a random reflection for the session
    setReflection(REFLECTIONS[Math.floor(Math.random() * REFLECTIONS.length)]);
  }, []);

  const storyEvents = [
    {
      id: "1",
      timeLabel: "Fifty years ago today",
      description: "George Amos Chisali began work at the New Consort Gold Mine."
    },
    {
      id: "2",
      timeLabel: "Today",
      description: "Grandmother Nomsa's voice was preserved."
    },
    {
      id: "3",
      timeLabel: "Yesterday",
      description: "George Amos Chisali's migration evidence was strengthened."
    },
    {
      id: "4",
      timeLabel: "Three days ago",
      description: "An Open Question about Great-Grandmother Thwala was recorded."
    }
  ];

  const journeyNodes = [
    { name: "Africa", href: "/" },
    { name: "South Africa", href: "/" },
    { name: "Mpumalanga", href: "/" },
    { name: "Chisali Family", href: "/spaces" },
  ];

  return (
    <>
      <JourneyRibbon nodes={journeyNodes} />
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className="voice-elder">Continuity Spaces</h1>
          <p className={`${styles.reflection} voice-steward`}>{greeting}</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.mainColumn}>
            <StoryWall events={storyEvents} />
          </div>
          
          <div className={styles.sideColumn}>
            <ArchivalCard className={styles.eldersBench}>
              <h3 className="voice-elder">The Elder's Bench</h3>
              <blockquote className={`${styles.proverb} voice-steward`}>
                "{reflection}"
              </blockquote>
            </ArchivalCard>

            <ArchivalCard className={styles.actionCard}>
              <h3 className="voice-elder">The Circle of Remembrance</h3>
              <div className={styles.circleOfRemembrance}>
                <h4 className="voice-steward" style={{ color: 'var(--ochre)', marginBottom: '1rem' }}>Living Continuity</h4>
                <p className="voice-steward">🌱 <strong>142</strong> Names Remembered</p>
                <p className="voice-steward">📖 <strong>523</strong> Stories Preserved</p>
                <p className="voice-steward">🎙️ <strong>91</strong> Voices Entrusted</p>
                <p className="voice-steward">❤️ <strong>122</strong> Acts of Service Remembered</p>
                <p className="voice-steward">❓ <strong>18</strong> Questions Still Seeking</p>
              </div>

              <div className={styles.ceremonyActions}>
                <button 
                  className={styles.actionButton} 
                  onClick={() => setActiveCeremony(getRememberNameCeremony("space-id", toast))}
                >
                  🌱 Remember a Name
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => setActiveCeremony(getRecordStoryCeremony("entity-id", toast))}
                >
                  📖 Record a Story
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => setActiveCeremony(getRecordServiceCeremony("space-id", toast))}
                >
                  ❤️ Record an Act of Service
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => setActiveCeremony(getPreserveVoiceCeremony("entity-id", toast))}
                >
                  🎙️ Preserve a Voice
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => setActiveCeremony(getPreserveQuestionCeremony("space-id", toast))}
                >
                  ❓ Preserve an Open Question
                </button>
                <button 
                  className={styles.actionButton} 
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--muted)' }}
                  onClick={() => setActiveCeremony(getRememberPassedCeremony("space-id", toast))}
                >
                  🕯️ Honor the Passed
                </button>
                <button 
                  className={styles.actionButton} 
                  style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)', marginTop: '1rem', fontWeight: 'bold' }}
                  onClick={() => window.location.href = '/passport-demo'}
                >
                  🏛️ Generate Evidence Passport
                </button>
              </div>

              <StewardJournal spaceId="space-id" />
            </ArchivalCard>
          </div>
        </div>
      </main>

      {activeCeremony && (
        <CeremonyEngine 
          ceremony={activeCeremony} 
          onClose={() => setActiveCeremony(null)} 
        />
      )}
    </>
  );
}
