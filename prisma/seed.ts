import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding iPhande Public Beta Datasets...');

  // 1. Create a Primary Steward User
  const steward = await prisma.user.create({
    data: {
      displayName: 'Gift Chisali',
      email: 'steward@iphande.org',
      isPlatformAdmin: true,
    }
  });

  const domains = [

    {
      name: "Carolina Family Heritage",
      domain: "FAMILY",
      description: "Digital family heritage preservation for the local community.",
      entities: [
        { name: "Mahlangu Family", type: "Family" },
        { name: "Historical Homestead", type: "Location" }
      ],
      claims: [
        "The Mahlangu family settled in the Carolina district in the 1930s.",
        "Family homestead was officially registered as a heritage site."
      ]
    },
    {
      name: "Carolina Business Directory",
      domain: "RETAIL",
      description: "Local business directory and visibility for Carolina SMMEs.",
      entities: [
        { name: "Carolina Hardware & Supply", type: "Business" },
        { name: "Sipho's Auto Repair", type: "Business" }
      ],
      claims: [
        "Carolina Hardware expanded to include agricultural supplies in 2024.",
        "Sipho's Auto Repair certified as an official municipal service provider."
      ]
    },
    {
      name: "Carolina Agricultural Knowledge",
      domain: "AGRICULTURE",
      description: "Agricultural knowledge preservation and crop history.",
      entities: [
        { name: "Carolina Co-op Farm", type: "Farm" },
        { name: "2025 Maize Harvest", type: "Batch" }
      ],
      claims: [
        "Soil test confirms optimal pH levels for planting.",
        "Harvest batch #2025-A certified organic and distributed locally."
      ]
    },
    {
      name: "Municipal Project Continuity",
      domain: "CONSTRUCTION",
      description: "Infrastructure and construction project history.",
      entities: [
        { name: "Carolina Water Treatment Plant", type: "Infrastructure" },
        { name: "Phase 1 Upgrade", type: "Project Phase" }
      ],
      claims: [
        "Site inspection completed and passed by municipal engineer.",
        "Phase 1 upgrade completed ahead of schedule and under budget."
      ]
    },
    {
      name: "Carolina Educational Initiatives",
      domain: "EDUCATION",
      description: "Schools, educational initiatives, and youth innovation participation.",
      entities: [
        { name: "Carolina Secondary School", type: "Institution" },
        { name: "Youth Coding Bootcamp", type: "Program" }
      ],
      claims: [
        "First cohort of 50 students graduated from the digital literacy program.",
        "Student team won the provincial robotics competition."
      ]
    },
    {
      name: "Carolina Community Organisations",
      domain: "COMMUNITY",
      description: "Community project history and organizational records.",
      entities: [
        { name: "Carolina Youth Council", type: "Organisation" },
        { name: "Annual Heritage Festival", type: "Event" }
      ],
      claims: [
        "Youth Council officially recognized by the municipal mayor.",
        "Annual Heritage Festival attracted over 2000 attendees."
      ]
    }
  ];

  for (const d of domains) {
    console.log(`Seeding domain: ${d.domain} - ${d.name}`);

    const collection = await prisma.collection.create({
      data: {
        name: d.name,
        description: d.description,
        domain: d.domain
      }
    });

    // Add Steward to Collection
    await prisma.collectionMembership.create({
      data: {
        collectionId: collection.id,
        userId: steward.id,
        role: "OWNER",
        status: "ACTIVE"
      }
    });

    const createdEntities = [];
    for (const ent of d.entities) {
      const entity = await prisma.entity.create({
        data: {
          collectionId: collection.id,
          name: ent.name,
          type: ent.type
        }
      });
      createdEntities.push(entity);
    }

    // Create Journal Entries (Claims)
    for (const claimText of d.claims) {
      const entry = await prisma.journalEntry.create({
        data: {
          collectionId: collection.id,
        }
      });

      const revision = await prisma.journalEntryRevision.create({
        data: {
          journalEntryId: entry.id,
          revisionNumber: 1,
          stewardId: steward.id,
          claim: claimText,
          evidenceStrength: "strong"
        }
      });

      await prisma.journalEntry.update({
        where: { id: entry.id },
        data: { currentRevisionId: revision.id }
      });

      // Link first entity to entry just to have relationships
      if (createdEntities.length > 0) {
        await prisma.entityEntryLink.create({
          data: {
            entityId: createdEntities[0].id,
            journalEntryId: entry.id,
            relation: "subject"
          }
        });
      }
    }
  }

  console.log('✅ iPhande Public Beta Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
