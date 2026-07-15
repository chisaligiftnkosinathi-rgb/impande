import { BaseKnowledgeObject, ObjectType, ObjectStatus } from "../registry/types"

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

export function getStatusColor(status: ObjectStatus): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" {
  switch (status) {
    case "Operational":
    case "Verified":
      return "success"
    case "Pending":
      return "warning"
    case "Deprecated":
    case "Archived":
      return "error"
    default:
      return "default"
  }
}

export function getObjectIcon(type: ObjectType): string {
  // We can return a lucide icon component name or simple string mapping
  // We will map these in the UI component to actual Lucide icons.
  switch (type) {
    case "Programme": return "Briefcase"
    case "Publication": return "FileText"
    case "Software": return "Terminal"
    case "Dataset": return "Database"
    case "EvidencePackage": return "ShieldCheck"
    case "Standard": return "BookOpen"
    case "Product": return "Package"
    case "Researcher": return "User"
    default: return "Box"
  }
}
