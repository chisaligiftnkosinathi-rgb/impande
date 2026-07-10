import { NextRequest, NextResponse } from 'next/server';
import { ImpandeExporter } from '@/lib/preservation/exporter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get('spaceId');

  if (!spaceId) {
    return NextResponse.json({ error: 'Missing spaceId parameter' }, { status: 400 });
  }

  try {
    const buffer = await ImpandeExporter.exportSpace({ spaceId });
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="ContinuitySpace-${spaceId}.impande"`
      }
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
