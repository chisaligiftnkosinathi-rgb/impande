import { NextResponse } from 'next/server';
import { LocalAdapter } from '@/lib/storage/LocalAdapter';

const storage = new LocalAdapter();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const url = await storage.upload(file);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error('Media upload failed:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}
