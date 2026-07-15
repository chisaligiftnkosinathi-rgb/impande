import { NextResponse, NextRequest } from "next/server";
import { registryRepo } from "@/lib/registry/repository";
import { logRequest, logResponse, logError } from "@/lib/logger/request";
import { successResponse, errorResponse } from "@/lib/errors/api-response";
import { IntelligenceError } from "@/lib/errors";
import { searchIntelligence } from "@/lib/intelligence";

export async function GET(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || "unknown";
  const start = Date.now();
  logRequest(request, requestId);

  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "20");
    const exact = searchParams.get("exact") === "true";

    const objects = await registryRepo.getAllObjects();
    const results = searchIntelligence(objects, q, { limit, fuzzy: !exact });

    logResponse(requestId, 200, Date.now() - start);
    return successResponse(results);
  } catch (error: any) {
    logError(requestId, error);
    return errorResponse(new IntelligenceError("Search failed", { original: error.message }), requestId);
  }
}
