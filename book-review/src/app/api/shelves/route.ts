import { NextRequest, NextResponse } from "next/server";
import { prisma, verifyToken } from "@/lib/helpers";

//  Helper: Get user ID from JWT
async function getUserIdFromRequest(req: NextRequest): Promise<number | null> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

//  GET: Get all shelves with books
export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shelves = await prisma.shelf.findMany({
    where: { userId },
    include: { shelfBooks: { include: { book: true } } },
  });

  return NextResponse.json(shelves);
}

//  POST: Create shelf or add book to shelf
export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Case 1: Add book to shelf
  if (body.action === "addBook") {
    const { shelfId, bookId } = body;
    if (!shelfId || !bookId)
      return NextResponse.json({ error: "shelfId and bookId required" }, { status: 400 });

    const shelf = await prisma.shelf.findUnique({ where: { id: shelfId } });
    if (!shelf || shelf.userId !== userId)
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });

    const shelfBook = await prisma.shelfBook.create({
      data: { shelfId, bookId },
    });

    return NextResponse.json(shelfBook, { status: 201 });
  }

  // Case 2: Create new shelf
  const { name, description } = body;
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const shelf = await prisma.shelf.create({
    data: { name, description, userId },
  });

  return NextResponse.json(shelf, { status: 201 });
}

// PUT: Update shelf
export async function PUT(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { shelfId, name, description } = await req.json();
  if (!shelfId) return NextResponse.json({ error: "shelfId required" }, { status: 400 });

  const shelf = await prisma.shelf.findUnique({ where: { id: shelfId } });
  if (!shelf || shelf.userId !== userId)
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });

  const updatedShelf = await prisma.shelf.update({
    where: { id: shelfId },
    data: { name, description },
  });

  return NextResponse.json(updatedShelf);
}

//  DELETE: Delete shelf or remove book
export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Case 1: Remove book from shelf
  if (body.action === "removeBook") {
    const { shelfId, bookId } = body;
    if (!shelfId || !bookId)
      return NextResponse.json({ error: "shelfId and bookId required" }, { status: 400 });

    const shelf = await prisma.shelf.findUnique({ where: { id: shelfId } });
    if (!shelf || shelf.userId !== userId)
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });

    await prisma.shelfBook.delete({
      where: { shelfId_bookId: { shelfId, bookId } },
    });

    return NextResponse.json({ message: "Book removed" });
  }

  // Case 2: Delete shelf
  const { shelfId } = body;
  if (!shelfId) return NextResponse.json({ error: "shelfId required" }, { status: 400 });

  const shelf = await prisma.shelf.findUnique({ where: { id: shelfId } });
  if (!shelf || shelf.userId !== userId)
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 403 });

  await prisma.shelf.delete({ where: { id: shelfId } });
  return NextResponse.json({ message: "Shelf deleted" });
}
