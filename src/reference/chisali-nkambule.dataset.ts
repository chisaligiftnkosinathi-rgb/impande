export const ReferenceDataset = {
  version: "1.0",
  space: {
    name: "Chisali–Nkambule Reference Space",
    description: "The inaugural reference dataset to verify conformance with the Impande Standard.",
    primaryLanguage: "Multiple (isiZulu, Chewa, English)"
  },
  stewards: [
    {
      id: "steward-1",
      displayName: "Gift Chisali",
      role: "OWNER"
    },
    {
      id: "steward-2",
      displayName: "Gift's Father",
      role: "STEWARD"
    },
    {
      id: "steward-3",
      displayName: "Gift's Mother",
      role: "STEWARD"
    }
  ],
  entities: [
    {
      id: "entity-george",
      type: "Person",
      names: [
        { nameValue: "George", type: "First Name", isPrimary: true },
        { nameValue: "Chissano", type: "Birth Surname", isPrimary: false },
        { nameValue: "Chisali", type: "Adopted Surname", isPrimary: false }
      ],
      lifespans: [
        { description: "Approximate lifespan. Migrated from Malawi to Mozambique." }
      ],
      claims: [
        {
          id: "claim-george-migration",
          statement: "George migrated from Malawi with his brother, leaving him in Mozambique.",
          evidence: [
            {
              confidenceLevel: "ORAL_HISTORY",
              provenance: "Oral testimony from Father",
              sourceDetail: "Gift's Father",
              recordedBy: "steward-1"
            }
          ],
          attestations: [
            {
              userId: "steward-2",
              confidenceLevel: "PERSONAL_TESTIMONY",
              provenance: "Personal memory passed down"
            },
            {
              userId: "steward-3",
              confidenceLevel: "ORAL_HISTORY",
              provenance: "Heard from husband"
            }
          ]
        }
      ],
      openQuestions: [
        {
          question: "What village in Malawi did George leave?",
          askedById: "steward-1",
          status: "OPEN"
        },
        {
          question: "Why did the surname change from Chissano to Chisali?",
          askedById: "steward-1",
          status: "OPEN"
        },
        {
          question: "What was the name of the brother left in Mozambique? Are there descendants?",
          askedById: "steward-1",
          status: "OPEN"
        },
        {
          question: "Who was George's wife?",
          askedById: "steward-1",
          status: "OPEN"
        }
      ]
    },
    {
      id: "entity-samuel",
      type: "Person",
      names: [
        { nameValue: "Samuel", type: "First Name", isPrimary: true },
        { nameValue: "Mehlwana", type: "Traditional Name", isPrimary: false },
        { nameValue: "Nkambule", type: "Surname", isPrimary: false }
      ],
      lifespans: [
        { description: "Lifespan unknown. Husband to Dorah Leta Shongwe." }
      ],
      claims: [],
      openQuestions: [
        {
          question: "Where is Samuel Mehlwana Nkambule buried?",
          askedById: "steward-1",
          status: "OPEN"
        }
      ]
    },
    {
      id: "entity-dorah",
      type: "Person",
      names: [
        { nameValue: "Dorah", type: "First Name", isPrimary: true },
        { nameValue: "Leta", type: "Middle Name", isPrimary: false },
        { nameValue: "Shongwe", type: "Surname", isPrimary: true }
      ],
      lifespans: [],
      claims: [],
      openQuestions: []
    }
  ],
  relationships: [
    {
      sourceId: "entity-samuel",
      targetId: "entity-dorah",
      type: "Spouse"
    }
  ]
};
