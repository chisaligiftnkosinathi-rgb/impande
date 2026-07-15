import { RegistryEdge } from "../types"

export function validateEdge(edge: RegistryEdge): void {
  if (!edge.from || edge.from.trim() === "") throw new Error("Validation Error: Edge 'from' is required")
  if (!edge.to || edge.to.trim() === "") throw new Error("Validation Error: Edge 'to' is required")
  if (!edge.relation) throw new Error("Validation Error: Edge relation is required")
  if (edge.from === edge.to) throw new Error("Validation Error: Circular reference on self not allowed")
}
