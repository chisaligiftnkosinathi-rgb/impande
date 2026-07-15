import { NextResponse, NextRequest } from "next/server";
import { registryRepo } from "@/lib/registry/repository";
import { logRequest, logResponse, logError } from "@/lib/logger/request";
import { successResponse, errorResponse } from "@/lib/errors/api-response";
import { IntelligenceError, NotFoundError } from "@/lib/errors";
import { computeScores } from "@/lib/intelligence";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = request.headers.get("x-request-id") || "unknown";
  const start = Date.now();
  logRequest(request, requestId);

  try {
    const { id } = await params;
    const obj = await registryRepo.getObjectById(id);
    
    if (!obj) {
      return errorResponse(new NotFoundError("KnowledgeObject", id), requestId);
    }

    const allObjects = await registryRepo.getAllObjects();
    const allEdges = await registryRepo.getAllEdges();

    const scores = computeScores(obj, allObjects, allEdges);

    logResponse(requestId, 200, Date.now() - start);
    return successResponse(scores);
  } catch (error: any) {
    logError(requestId, error);
    return errorResponse(new IntelligenceError("Score computation failed", { original: error.message }), requestId);
  }
}
