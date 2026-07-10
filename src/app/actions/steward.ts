"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function rememberPerson(
  spaceId: string, 
  name: string, 
  language?: string, 
  givenBy?: string
) {
  const entity = await prisma.entity.create({
    data: {
      spaceId,
      type: "Person",
      names: {
        create: {
          nameValue: name,
          type: "Birth Name",
          language: language || null,
          isPrimary: true
        }
      }
    }
  });

  // If there's context on who gave the name, we can record it as a Claim about the Name
  if (givenBy) {
    await prisma.claim.create({
      data: {
        entityId: entity.id,
        statement: `Name "${name}" was given by or has context: ${givenBy}`,
      }
    });
  }

  revalidatePath("/spaces");
  return entity;
}

export async function recordStory(
  entityId: string,
  statement: string,
  provenance: string,
  witnesses: string,
  confidence: string
) {
  const claim = await prisma.claim.create({
    data: {
      entityId,
      statement,
      evidence: {
        create: {
          confidenceLevel: confidence,
          provenance: provenance,
          sourceDetail: witnesses,
          recordedBy: "Steward", // Hardcoded for now
        }
      }
    }
  });

  revalidatePath("/spaces");
  return claim;
}

export async function preserveQuestion(
  spaceId: string,
  question: string,
  reasonUnknown: string,
  previousSearches: string,
  futureClues: string
) {
  // We'll combine the context into the question field or a related claim for now
  const fullContext = `${question}\n\nWhy unknown: ${reasonUnknown}\nSearched: ${previousSearches}\nClues: ${futureClues}`;

  const openQ = await prisma.openQuestion.create({
    data: {
      spaceId,
      question: fullContext,
      askedById: "placeholder-user-id", // Needs auth later
      status: "OPEN"
    }
  });

  revalidatePath("/spaces");
  return openQ;
}

export async function recordJournalEntry(
  spaceId: string,
  content: string,
  type: "PERSONAL" | "RESEARCH",
  reason?: string
) {
  const entry = await prisma.stewardJournalEntry.create({
    data: {
      spaceId,
      stewardId: "placeholder-user-id", // Needs auth later
      type,
      content,
      reason
    }
  });

  revalidatePath("/spaces");
  return entry;
}

// Ensure the placeholder user exists or handle auth gracefully
async function ensureUserExists() {
  const existing = await prisma.impandeUser.findFirst();
  if (!existing) {
    await prisma.impandeUser.create({
      data: {
        id: "placeholder-user-id",
        displayName: "Anonymous Steward"
      }
    });
  }
}

// Call this immediately so Server Actions don't crash
ensureUserExists().catch(console.error);
