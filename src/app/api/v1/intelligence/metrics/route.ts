import { NextResponse, NextRequest } from "next/server";
import { registryRepo } from "@/lib/registry/repository";
import { logRequest, logResponse, logError } from "@/lib/logger/request";
import { successResponse, errorResponse } from "@/lib/errors/api-response";
import { IntelligenceError } from "@/lib/errors";
import {
  getObjectsMissingEvidence,
  getUnvalidatedSoftware,
  getOrphanedObjects,
  getMostConnectedObjects,
  getGraphHealthScore
} from "@/lib/intelligence";

export async function GET(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || "unknown";
  const start = Date.now();
  logRequest(request, requestId);

  try {
    const objects = await registryRepo.getAllObjects();
    const edges = await registryRepo.getAllEdges();

    const metrics = {
      missingEvidence: getObjectsMissingEvidence(objects, edges),
      unvalidatedSoftware: getUnvalidatedSoftware(objects, edges),
      orphanedObjects: getOrphanedObjects(objects, edges),
      mostConnected: getMostConnectedObjects(objects, edges, 5),
      graphHealthScore: getGraphHealthScore(objects, edges),
      totalObjects: objects.length,
      totalEdges: edges.length
    };

    logResponse(requestId, 200, Date.now() - start);
    return successResponse(metrics);
  } catch (error: any) {
    logError(requestId, error);
    return errorResponse(new IntelligenceError("Failed to calculate intelligence metrics", { original: error.message }), requestId);
  }
}
