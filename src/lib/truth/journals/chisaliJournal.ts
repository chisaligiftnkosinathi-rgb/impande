import { JournalEntry } from "./types";

export const chisaliJournal: JournalEntry[] = [
  {
    id: "chisali-001",
    claim: "Babe George Amos Chisali migrated from Malawi to South Africa and worked as a boilermaker at New Consort Gold Mine in Barberton.",
    linkedEntities: [
      { id: "babe-george", name: "Babe George Amos Chisali", relation: "paternal grandfather" },
      { id: "loc-barberton", name: "New Consort Gold Mine, Barberton", relation: "location" }
    ],
    source: {
      id: "oral-001",
      description: "Family oral account via father Sipho Chisali",
      type: "oral_history",
      origin: "family conversation",
      evidenceLineageId: "chisali-oral-tradition-1"
    },
    evidenceStrength: "moderate",
    confidenceSeed: 0.8,
    conflictStatus: "none",
    tags: ["migration", "labor", "malawi", "mining"],
    immutable: true
  },
  {
    id: "chisali-002",
    claim: "Make Elsie Ncinekile Phiri met George in Barberton and they built their home at Mooiplaas.",
    linkedEntities: [
      { id: "babe-george", name: "Babe George Amos Chisali", relation: "paternal grandfather" },
      { id: "make-elsie", name: "Make Elsie Ncinekile Phiri", relation: "paternal grandmother" },
      { id: "loc-mooiplaas", name: "Mooiplaas", relation: "location" }
    ],
    source: {
      id: "oral-002",
      description: "Family oral history",
      type: "oral_history",
      origin: "family memory",
      evidenceLineageId: "chisali-oral-tradition-1"
    },
    evidenceStrength: "moderate",
    confidenceSeed: 0.9,
    conflictStatus: "none",
    tags: ["marriage", "settlement"],
    immutable: true
  },
  {
    id: "chisali-003",
    claim: "George Amos Chisali's brother migrated with him to Johannesburg.",
    linkedEntities: [
      { id: "babe-george", name: "Babe George Amos Chisali", relation: "paternal grandfather" },
      { id: "george-brother", name: "George's Brother", relation: "great-uncle" }
    ],
    source: {
      id: "oral-003",
      description: "Family oral history",
      type: "oral_history",
      origin: "family memory",
      evidenceLineageId: "chisali-oral-tradition-1"
    },
    evidenceStrength: "moderate",
    confidenceSeed: 0.7,
    conflictStatus: "uncertain",
    notes: "The name of his brother remains unknown.",
    tags: ["migration"],
    immutable: true
  },
  {
    id: "chisali-004",
    claim: "Make Elsie took care of Gift as a newborn so his mother could complete her matric.",
    linkedEntities: [
      { id: "make-elsie", name: "Make Elsie Ncinekile Phiri", relation: "paternal grandmother" },
      { id: "gift", name: "Gift Nkosinathi Chisali", relation: "grandson" },
      { id: "ntombifuthi", name: "Ntombifuthi Florance Nkambule", relation: "mother" }
    ],
    source: {
      id: "oral-004",
      description: "Personal memory / Mother's account",
      type: "oral_history",
      origin: "family conversation",
      evidenceLineageId: "nkambule-oral-tradition-1"
    },
    evidenceStrength: "strong",
    confidenceSeed: 1.0,
    conflictStatus: "none",
    tags: ["family support", "education", "childcare"],
    immutable: true
  },
  {
    id: "chisali-005",
    claim: "The parents of Babe George Amos Chisali are unknown.",
    linkedEntities: [
      { id: "babe-george", name: "Babe George Amos Chisali", relation: "paternal grandfather" }
    ],
    source: {
      id: "inference-001",
      description: "Lack of family records or oral history regarding Malawi ancestry",
      type: "inference",
      evidenceLineageId: "chisali-inference-1"
    },
    evidenceStrength: "unverified",
    confidenceSeed: 0.5,
    conflictStatus: "uncertain",
    tags: ["ancestry", "malawi", "missing record"],
    immutable: true
  }
];
