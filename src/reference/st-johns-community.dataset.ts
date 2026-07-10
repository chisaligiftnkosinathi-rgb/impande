export const StJohnsCommunityDataset = {
  version: "1.0",
  space: {
    name: "St. John's Community Archive",
    description: "A community archive representing a church and its surrounding village, testing multi-family continuity and institutional entities.",
    primaryLanguage: "English"
  },
  stewards: [
    { id: "steward-church-admin", displayName: "Archivist Sarah", role: "OWNER" },
    { id: "steward-village-elder", displayName: "Elder Thomas", role: "STEWARD" }
  ],
  entities: [
    {
      id: "inst-st-johns",
      type: "Church",
      names: [{ nameValue: "St. John's Parish", type: "Official Name", isPrimary: true }],
      lifespans: [{ description: "Founded in 1912." }],
      claims: [
        {
          id: "claim-church-founding",
          statement: "St. John's was founded following the great migration of 1910.",
          evidence: [
            {
              confidenceLevel: "VERIFIED_RECORD",
              provenance: "Parish Foundation Charter",
              sourceDetail: "Archive Box 1",
              recordedBy: "steward-church-admin"
            }
          ],
          attestations: []
        }
      ],
      openQuestions: []
    },
    {
      id: "person-pastor-mark",
      type: "Person",
      names: [{ nameValue: "Pastor Mark", type: "Primary Name", isPrimary: true }],
      lifespans: [],
      claims: [],
      openQuestions: []
    },
    {
      id: "family-smith",
      type: "Family",
      names: [{ nameValue: "The Smith Family", type: "Family Name", isPrimary: true }],
      lifespans: [],
      claims: [],
      openQuestions: []
    }
  ],
  relationships: [
    {
      sourceId: "person-pastor-mark",
      targetId: "inst-st-johns",
      type: "Employed By"
    },
    {
      sourceId: "family-smith",
      targetId: "inst-st-johns",
      type: "Congregant"
    }
  ]
};
