import { JournalEntry } from "./types";

export const nkambuleJournal: JournalEntry[] = [
  {
    id: "nkambule-001",
    claim: "Samuel Mehlwana Nkambule was a powerful traditional healer who underwent water initiation.",
    linkedEntities: [
      { id: "samuel-nkambule", name: "Samuel Mehlwana Nkambule", relation: "maternal grandfather" }
    ],
    source: {
      id: "oral-n-001",
      description: "Oral history from daughter Ntombifuthi Florance",
      type: "oral_history",
      origin: "family conversation",
      evidenceLineageId: "nkambule-oral-tradition-1"
    },
    evidenceStrength: "strong",
    confidenceSeed: 0.9,
    conflictStatus: "none",
    tags: ["traditional healing", "water initiation", "spirituality"],
    immutable: true
  },
  {
    id: "nkambule-002",
    claim: "Samuel Nkambule lived at Dorsbult and was also a farmer.",
    linkedEntities: [
      { id: "samuel-nkambule", name: "Samuel Mehlwana Nkambule", relation: "maternal grandfather" },
      { id: "loc-dorsbult", name: "Dorsbult", relation: "location" }
    ],
    source: {
      id: "oral-n-002",
      description: "Personal memory of grandson Gift",
      type: "oral_history",
      origin: "personal memory",
      evidenceLineageId: "nkambule-oral-tradition-2"
    },
    evidenceStrength: "strong",
    confidenceSeed: 0.95,
    conflictStatus: "none",
    tags: ["farming", "settlement"],
    immutable: true
  },
  {
    id: "nkambule-003",
    claim: "Dorah and Leta Shongwe are the same person.",
    linkedEntities: [
      { id: "dorah-shongwe", name: "Dorah Leta Shongwe", relation: "maternal grandmother" }
    ],
    source: {
      id: "inference-n-001",
      description: "Family consensus regarding names",
      type: "oral_history",
      origin: "family consensus",
      evidenceLineageId: "nkambule-oral-tradition-1"
    },
    evidenceStrength: "moderate",
    confidenceSeed: 0.85,
    conflictStatus: "resolved",
    notes: "Clarified that she used both names interchangeably.",
    tags: ["naming"],
    immutable: true
  },
  {
    id: "nkambule-004",
    claim: "The first name of Great-Grandmother Thwala is unknown.",
    linkedEntities: [
      { id: "ggm-thwala", name: "Great-Grandmother Thwala", relation: "great-grandmother" }
    ],
    source: {
      id: "inference-n-002",
      description: "Lack of family records",
      type: "inference",
      evidenceLineageId: "nkambule-inference-1"
    },
    evidenceStrength: "unverified",
    confidenceSeed: 0.4,
    conflictStatus: "uncertain",
    tags: ["ancestry", "missing record"],
    immutable: true
  },
  {
    id: "nkambule-005",
    claim: "Ntombifuthi Florance means 'A girl again', possibly reflecting the birth of another daughter in the family.",
    linkedEntities: [
      { id: "ntombifuthi", name: "Ntombifuthi Florance Nkambule", relation: "mother" }
    ],
    source: {
      id: "inference-n-003",
      description: "Literal translation of the isiZulu name and cultural naming patterns",
      type: "inference",
      origin: "cultural pattern",
      evidenceLineageId: "nkambule-inference-2"
    },
    evidenceStrength: "moderate",
    confidenceSeed: 0.7,
    conflictStatus: "none",
    tags: ["naming", "meaning", "birth circumstance"],
    immutable: true
  }
];
