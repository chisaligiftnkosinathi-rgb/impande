import { KnowledgeObject } from "../types"

export function validateKnowledgeObject(obj: KnowledgeObject): void {
  if (!obj.id || obj.id.trim() === "") throw new Error("Validation Error: Object ID is required")
  if (!obj.type) throw new Error("Validation Error: Object type is required")
  if (!obj.title || obj.title.trim() === "") throw new Error("Validation Error: Object title is required")
  if (!obj.summary || obj.summary.trim() === "") throw new Error("Validation Error: Object summary is required")
  if (!obj.repository) throw new Error("Validation Error: Object repository is required")
}
