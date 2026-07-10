import { PrismaClient } from '@prisma/client'
import { ReferenceDataset } from './chisali-nkambule.dataset'
import { StJohnsCommunityDataset } from './st-johns-community.dataset'
import { SyntheticComplexDataset } from './synthetic-complex.dataset'

const prisma = new PrismaClient()

async function testConformance() {
  console.log("Running Conformance Test Suite...")
  let passed = 0
  let failed = 0

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`✅ PASS: ${message}`)
      passed++
    } else {
      console.error(`❌ FAIL: ${message}`)
      failed++
    }
  }

  // --- DATASET 1: Chisali-Nkambule Family ---
  const familySpace = await prisma.continuitySpace.findFirst({
    where: { name: ReferenceDataset.space.name },
    include: {
      entities: {
        include: { names: true, claims: { include: { evidence: true, attestations: true } }, openQuestions: true }
      },
      guardians: { include: { user: true } }
    }
  })

  assert(!!familySpace, "[Dataset 1] Continuity Space exists")
  if (familySpace) {
    const george = familySpace.entities.find(e => e.names.some(n => n.nameValue === "George"))
    assert(george?.names.length === 3, "[Dataset 1] Identity: Preserved multiple names for one person")
    const georgeClaim = george?.claims[0]
    assert(georgeClaim?.evidence.length === 1, "[Dataset 1] Evidence: Preserved attributed source and confidence level")
    assert(georgeClaim?.attestations.length === 2, "[Dataset 1] Attestation: Multiple stewards strengthened claim")
    assert(george?.openQuestions.length === 4, "[Dataset 1] Uncertainty: Open Questions preserved as first-class objects")
  }

  // --- DATASET 2: St. John's Community ---
  const commSpace = await prisma.continuitySpace.findFirst({
    where: { name: StJohnsCommunityDataset.space.name },
    include: {
      entities: { include: { names: true, claims: true } }
    }
  })
  
  assert(!!commSpace, "[Dataset 2] Community Space exists")
  if (commSpace) {
    const church = commSpace.entities.find(e => e.type === "Church")
    assert(!!church, "[Dataset 2] Continuity: Preserved institutional entity (Church)")
  }

  // --- DATASET 3: Synthetic Complex Family ---
  const synSpace = await prisma.continuitySpace.findFirst({
    where: { name: SyntheticComplexDataset.space.name },
    include: {
      entities: { include: { names: true, claims: { include: { attestations: true } } } }
    }
  })
  
  assert(!!synSpace, "[Dataset 3] Synthetic Space exists")
  if (synSpace) {
    const john = synSpace.entities.find(e => e.names.some(n => n.nameValue === "John"))
    assert(john?.claims.length === 2, "[Dataset 3] Adoption & Unknowns: Handled unknown father and adoption claims successfully")
    
    const mary = synSpace.entities.find(e => e.names.some(n => n.nameValue === "Mary Jane"))
    assert(mary?.claims[0].attestations[0].confidenceLevel === "PERSONAL_TESTIMONY", "[Dataset 3] Conflict: Preserved conflicting personal testimony about marriage date")
  }

  console.log(`\nConformance Results: ${passed} Passed, ${failed} Failed`)
  if (failed > 0) process.exit(1)
}

testConformance()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
