import { JournalService } from '@/lib/services/JournalService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const requestId = `req_${Date.now()}`;
  const timestamp = new Date().toISOString();

  try {
    // 1. Validation (Thin Adapter)
    if (!id) {
      return NextResponse.json({
        error: { code: "BAD_REQUEST", message: "Journal Entry ID is required.", details: [] },
        meta: { requestId, timestamp, apiVersion: "v1" }
      }, { status: 400 });
    }

    // 2. Invoke the Service
    const explanation = await JournalService.explain({ id });

    // 3. Return the standard Response Envelope
    return NextResponse.json({
      data: explanation,
      meta: {
        requestId,
        timestamp,
        apiVersion: "v1"
      },
      links: {
        self: `/api/v1/journal-entries/${id}/explain`,
        journalEntry: `/api/v1/journal-entries/${id}`
      }
    });

  } catch (error: any) {
    // Handle Domain Errors
    if (error.message === "ENTRY_NOT_FOUND" || error.message === "NO_ACCEPTED_REVISION") {
      return NextResponse.json({
        error: { code: "NOT_FOUND", message: "The requested journal entry was not found or has no accepted revisions.", details: [] },
        meta: { requestId, timestamp, apiVersion: "v1" }
      }, { status: 404 });
    }

    console.error(`[API Error] ${requestId}:`, error);

    return NextResponse.json({
      error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred.", details: [] },
      meta: { requestId, timestamp, apiVersion: "v1" }
    }, { status: 500 });
  }
}
