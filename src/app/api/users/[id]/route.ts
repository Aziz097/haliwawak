import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.email) updateData.email = body.email;
  if (body.role) updateData.role = body.role;
  if (body.password) updateData.passwordHash = await bcrypt.hash(body.password, 10);
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const result = await db.update(accounts).set(updateData).where(eq(accounts.id, Number(id))).returning();
  return NextResponse.json(result[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(accounts).where(eq(accounts.id, Number(id)));
  return NextResponse.json({ success: true });
}
