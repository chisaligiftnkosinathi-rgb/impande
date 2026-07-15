"use server"

import { registryRepo } from "@/lib/registry/repository"
import { KnowledgeObject, RegistryEdge } from "@/lib/registry/types"
import { revalidatePath } from "next/cache"

// Hardcoded actor for now until Auth is implemented
const CURRENT_ACTOR = "admin"

export async function getObjectAction(id: string) {
  return registryRepo.getObjectById(id)
}

export async function getObjectEdgesAction(id: string) {
  return registryRepo.getEdgesByNode(id)
}

export async function createObjectAction(data: KnowledgeObject) {
  try {
    await registryRepo.createObject(data, CURRENT_ACTOR)
    revalidatePath("/admin/objects")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateObjectAction(id: string, data: Partial<KnowledgeObject>) {
  try {
    await registryRepo.updateObject(id, data, CURRENT_ACTOR)
    revalidatePath(`/admin/objects/${id}`)
    revalidatePath("/admin/objects")
    revalidatePath(`/objects/${id}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function archiveObjectAction(id: string) {
  try {
    await registryRepo.archiveObject(id, CURRENT_ACTOR)
    revalidatePath(`/admin/objects/${id}`)
    revalidatePath("/admin/objects")
    revalidatePath(`/objects/${id}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function addEdgeAction(edge: RegistryEdge) {
  try {
    await registryRepo.addEdge(edge, CURRENT_ACTOR)
    revalidatePath(`/admin/objects/${edge.from}`)
    revalidatePath(`/admin/objects/${edge.to}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function removeEdgeAction(edge: RegistryEdge) {
  try {
    await registryRepo.removeEdge(edge, CURRENT_ACTOR)
    revalidatePath(`/admin/objects/${edge.from}`)
    revalidatePath(`/admin/objects/${edge.to}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
