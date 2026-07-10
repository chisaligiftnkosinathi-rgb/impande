'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createContinuitySpace(formData: FormData) {
  // 1. Extract Space (Soil)
  const spaceName = formData.get('spaceName') as string;
  const description = formData.get('description') as string;
  const language = formData.get('language') as string;
  
  // 2. Extract Steward
  const stewardName = formData.get('stewardName') as string;
  
  // 3. Extract Root (Entity)
  const rootName = formData.get('rootName') as string;
  const rootType = formData.get('rootType') as string || 'Person';
  const isApproximate = formData.get('isApproximate') === 'true';
  const lifespanDesc = formData.get('lifespanDesc') as string;
  
  // 4. Extract Truth (Claim + Evidence)
  const truthStatement = formData.get('truthStatement') as string;
  const provenance = formData.get('provenance') as string;
  const confidenceLevel = formData.get('confidenceLevel') as string || 'PERSONAL_TESTIMONY';
  
  // Create Space, Guardian, Entity, Claim, Evidence in a single transaction
  const space = await prisma.$transaction(async (tx) => {
    // Identity: Create the Steward
    const user = await tx.impandeUser.create({
      data: {
        displayName: stewardName,
        preferredLang: language,
      }
    });

    // Soil
    const newSpace = await tx.continuitySpace.create({
      data: {
        name: spaceName,
        description: description,
      }
    });

    // Guardian
    await tx.guardian.create({
      data: {
        spaceId: newSpace.id,
        userId: user.id,
        role: 'OWNER'
      }
    });

    // Affirmation
    await tx.affirmation.create({
      data: {
        userId: user.id,
        agreedToCovenant: true
      }
    });

    // Root (Entity)
    const entity = await tx.entity.create({
      data: {
        spaceId: newSpace.id,
        type: rootType,
        names: {
          create: {
            nameValue: rootName,
            type: 'Primary Name',
            isPrimary: true,
            language: language
          }
        },
        lifespans: lifespanDesc ? {
          create: {
            description: lifespanDesc
          }
        } : undefined
      }
    });

    // Truth Engine
    if (truthStatement) {
      await tx.claim.create({
        data: {
          entityId: entity.id,
          statement: truthStatement,
          evidence: {
            create: {
              confidenceLevel: confidenceLevel,
              provenance: provenance,
              sourceDetail: 'Inaugural Onboarding Truth',
              recordedBy: stewardName
            }
          }
        }
      });
    }

    return newSpace;
  });

  redirect(`/spaces/${space.id}`);
}
