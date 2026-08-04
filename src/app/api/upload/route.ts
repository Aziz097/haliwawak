import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

import { getSession } from '@/lib/auth';

/**
 * Local disk upload endpoint.
 *
 * IMPORTANT - this only works on a host with a writable, persistent disk.
 * Serverless hosts (Vercel, Netlify, Lambda) mount the app read-only apart
 * from /tmp, and /tmp is wiped between invocations, so files written here
 * would either fail outright or vanish. On those hosts this route must be
 * swapped for an object store (Supabase Storage is already provisioned for
 * this project, see NEXT_PUBLIC_SUPABASE_URL) before uploads will work.
 * The check below turns that into an explicit, readable error instead of a
 * confusing 500 at runtime.
 */

/** Image types the media library accepts. */
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

/** Vercel caps a serverless request body at 4.5 MB; stay under it. */
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  // Writing files is an admin action. The middleware only guards /admin pages,
  // so without this check the endpoint accepts uploads from anyone.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          'Uploads are not available on this deployment. The serverless filesystem is read-only - configure an object store (e.g. Supabase Storage) for media uploads.',
      },
      { status: 501 },
    );
  }

  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || 'unknown'}` },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File is larger than ${MAX_BYTES / 1024 / 1024} MB` },
      { status: 413 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // `path.basename` first: without it a name like "../../x.png" would escape
  // the upload directory even after the character filter.
  const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}`, filename, originalName: file.name });
}
