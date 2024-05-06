import { NextResponse } from 'next/server';
import { uploadFile } from '../utils';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (filename == null) return NextResponse.json({status: 'error', message: 'filename is required'});
  const blob = await uploadFile(filename, await request.blob());

  return NextResponse.json(blob);
}
