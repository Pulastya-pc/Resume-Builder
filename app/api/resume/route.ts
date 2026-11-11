import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.id;
}

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "Sign in to access cloud saves." }, { status: 401 });
    const saved = await prisma.resume.findUnique({ where: { userId }, select: { data: true } });
    return Response.json({ resume: saved?.data ?? null });
  } catch {
    return Response.json({ error: "Resume storage is not available. Check the database setup." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "Sign in to save to the cloud." }, { status: 401 });
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "The resume data is invalid." }, { status: 400 });
    }
    const serialized = JSON.stringify(body);
    if (serialized.length > 200_000) {
      return Response.json({ error: "This resume is too large to save." }, { status: 413 });
    }
    await prisma.resume.upsert({
      where: { userId },
      create: { userId, data: body },
      update: { data: body },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Resume could not be saved. Check the database setup." }, { status: 503 });
  }
}

export async function DELETE() {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "Sign in to manage cloud saves." }, { status: 401 });
    await prisma.resume.deleteMany({ where: { userId } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Cloud resume could not be removed." }, { status: 503 });
  }
}
