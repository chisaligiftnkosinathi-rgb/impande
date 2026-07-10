export const SyntheticComplexDataset = {
  version: "1.0",
  space: {
    name: "Synthetic Complex Family",
    description: "A fictional dataset engineered to stress-test complex human realities: adoption, twins, unknown parents, multiple marriages, and conflicting testimonies.",
    primaryLanguage: "English"
  },
  stewards: [
    { id: "steward-researcher-1", displayName: "Dr. Analyst", role: "OWNER" },
    { id: "steward-relative-1", displayName: "Aunt June", role: "STEWARD" }
  ],
  entities: [
    {
      id: "entity-john-doe",
      type: "Person",
      names: [
        { nameValue: "John", type: "First Name", isPrimary: true },
        { nameValue: "Doe", type: "Surname", isPrimary: true },
        { nameValue: "Smith", type: "Adopted Surname", isPrimary: false }
      ],
      lifespans: [{ description: "Born circa 1950. Deceased 2020." }],
      claims: [
        {
          id: "claim-john-paternity",
          statement: "John's biological father is unknown.",
          evidence: [
            {
              confidenceLevel: "VERIFIED_RECORD",
              provenance: "Birth Certificate (Father left blank)",
              sourceDetail: "State Archives",
              recordedBy: "steward-researcher-1"
            }
          ],
          attestations: []
        },
        {
          id: "claim-john-adoption",
          statement: "John was adopted by the Smith family at age 5.",
          evidence: [
            {
              confidenceLevel: "ORAL_HISTORY",
              provenance: "Aunt June's testimony",
              sourceDetail: "Family Reunion 2018",
              recordedBy: "steward-relative-1"
            }
          ],
          attestations: []
        }
      ],
      openQuestions: [
        {
          question: "Who was John's biological father?",
          askedById: "steward-researcher-1",
          status: "OPEN"
        }
      ]
    },
    {
      id: "entity-mary-jane",
      type: "Person",
      names: [{ nameValue: "Mary Jane", type: "Primary Name", isPrimary: true }],
      lifespans: [],
      claims: [
        {
          id: "claim-mary-marriage-conflict",
          statement: "Mary Jane was married to John Doe in 1975.",
          evidence: [
            {
              confidenceLevel: "VERIFIED_RECORD",
              provenance: "Marriage Certificate",
              sourceDetail: "County Records",
              recordedBy: "steward-researcher-1"
            }
          ],
          attestations: [
            {
              userId: "steward-relative-1",
              confidenceLevel: "PERSONAL_TESTIMONY",
              provenance: "I was at the wedding, but it was 1976."
            }
          ]
        }
      ],
      openQuestions: []
    },
    {
      id: "entity-twin-1",
      type: "Person",
      names: [{ nameValue: "Alice", type: "First Name", isPrimary: true }],
      lifespans: [],
      claims: [],
      openQuestions: []
    },
    {
      id: "entity-twin-2",
      type: "Person",
      names: [{ nameValue: "Bob", type: "First Name", isPrimary: true }],
      lifespans: [],
      claims: [],
      openQuestions: []
    }
  ],
  relationships: [
    {
      sourceId: "entity-john-doe",
      targetId: "entity-mary-jane",
      type: "Spouse"
    },
    {
      sourceId: "entity-twin-1",
      targetId: "entity-twin-2",
      type: "Twin Sibling"
    },
    {
      sourceId: "entity-mary-jane",
      targetId: "entity-twin-1",
      type: "Parent"
    },
    {
      sourceId: "entity-mary-jane",
      targetId: "entity-twin-2",
      type: "Parent"
    }
  ]
};
