import { NextResponse, NextRequest } from "next/server";
import { registryRepo } from "@/lib/registry/repository";
import { logRequest, logResponse, logError } from "@/lib/logger/request";
import { successResponse, errorResponse } from "@/lib/errors/api-response";
import { IntelligenceError } from "@/lib/errors";
import {
  getRepositoryHealth,
  getGraphHealth,
  getEvidenceHealth,
  getMetadataHealth,
  getValidationHealth
} from "@/lib/intelligence";

export async function GET(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || "unknown";
  const start = Date.now();
  logRequest(request, requestId);

  try {
    const objects = await registryRepo.getAllObjects();
    const edges = await registryRepo.getAllEdges();

    const health = {
      repository: getRepositoryHealth(objects),
      graph: getGraphHealth(objects, edges),
      evidence: getEvidenceHealth(objects, edges),
      metadata: getMetadataHealth(objects),
      validation: getValidationHealth(objects, edges)
    };

    logResponse(requestId, 200, Date.now() - start);
    return successResponse(health);
  } catch (error: any) {
    logError(requestId, error);
    return errorResponse(new IntelligenceError("Failed to calculate health metrics", { original: error.message }), requestId);
  }
}
