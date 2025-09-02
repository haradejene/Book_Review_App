import { NextResponse } from "next/server";
import { prisma, verifyToken } from "@/lib/helpers";

async function getUserFromToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    return prisma.user.findUnique({ where: { id: payload.userId } });
  } catch {
    return null;
  }
}

// 🔹 GET: Get all reviews
export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { book: true, user: true },
  });
  return NextResponse.json(reviews);
}

// 🔹 POST: Create review
export async function POST(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId, rating, reviewText } = await req.json();

  if (!bookId || !rating || !reviewText) {
    return NextResponse.json(
      { error: "bookId, rating, and reviewText are required" },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      rating,
      reviewText, // ✅ only this field exists in schema
      book: { connect: { id: bookId } },
      user: { connect: { id: user.id } },
    },
  });
  return NextResponse.json(review, { status: 201 });
}

// 🔹 PUT: Update review
export async function PUT(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, rating, reviewText } = await req.json();
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review || review.userId !== user.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const updated = await prisma.review.update({
    where: { id },
    data: { rating, reviewText }, // ✅ correct field
  });
  return NextResponse.json(updated);
}

// 🔹 DELETE: Delete review
export async function DELETE(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review || review.userId !== user.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ message: "Review deleted" });
}
