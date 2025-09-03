// import { NextResponse } from "next/server";
// import { prisma, verifyToken } from "@/lib/helpers";

// async function getUserFromToken(req: Request) {
//   const authHeader = req.headers.get("authorization");
//   if (!authHeader) return null;
//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = verifyToken(token);
//     return prisma.user.findUnique({ where: { id: payload.userId } });
//   } catch {
//     return null;
//   }
// }

// // 🔹 GET: Get all reviews
// export async function GET() {
//   const reviews = await prisma.review.findMany({
//     include: { book: true, user: true },
//   });
//   return NextResponse.json(reviews);
// }

// // 🔹 POST: Create review
// export async function POST(req: Request) {
//   const user = await getUserFromToken(req);
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { bookId, rating, reviewText } = await req.json();

//   if (!bookId || !rating || !reviewText) {
//     return NextResponse.json(
//       { error: "bookId, rating, and reviewText are required" },
//       { status: 400 }
//     );
//   }

//   const review = await prisma.review.create({
//     data: {
//       rating,
//       reviewText, // ✅ only this field exists in schema
//       book: { connect: { id: bookId } },
//       user: { connect: { id: user.id } },
//     },
//   });
//   return NextResponse.json(review, { status: 201 });
// }

// // 🔹 PUT: Update review
// export async function PUT(req: Request) {
//   const user = await getUserFromToken(req);
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, rating, reviewText } = await req.json();
//   const review = await prisma.review.findUnique({ where: { id } });
//   if (!review || review.userId !== user.id) {
//     return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//   }

//   const updated = await prisma.review.update({
//     where: { id },
//     data: { rating, reviewText }, // ✅ correct field
//   });
//   return NextResponse.json(updated);
// }

// // 🔹 DELETE: Delete review
// export async function DELETE(req: Request) {
//   const user = await getUserFromToken(req);
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id } = await req.json();
//   const review = await prisma.review.findUnique({ where: { id } });
//   if (!review || review.userId !== user.id) {
//     return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//   }

//   await prisma.review.delete({ where: { id } });
//   return NextResponse.json({ message: "Review deleted" });
// }





import { NextResponse } from "next/server";
import { prisma, verifyToken } from "@/lib/helpers";

// 🔹 Helper: Get logged-in user
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

// 🔹 GET: Get all reviews with user and book info
export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { user: true, book: true },
  });
  return NextResponse.json(reviews);
}

// 🔹 POST: Create review
export async function POST(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId, rating, reviewText } = await req.json();

  if (!bookId || !rating || !reviewText) {
    return NextResponse.json({ error: "bookId, rating, and reviewText are required" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      rating,
      reviewText,
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
    data: { rating, reviewText },
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

// 🔹 PATCH: Insert mock reviews safely
export async function PATCH() {
  try {
    const books = await prisma.book.findMany();
    const bookMap: Record<string, number> = {};
    books.forEach(b => (bookMap[b.title] = b.id));

    const mockReviews = [
      { bookTitle: "The Great Gatsby", username: "Alice", rating: 5, reviewText: "A timeless classic! The Jazz Age comes alive beautifully." },
      { bookTitle: "The Great Gatsby", username: "David", rating: 4, reviewText: "Loved the atmosphere, but Gatsby’s obsession was a bit much." },
      { bookTitle: "To Kill a Mockingbird", username: "Sophie", rating: 5, reviewText: "Deeply moving story about justice and morality." },
      { bookTitle: "To Kill a Mockingbird", username: "Michael", rating: 4, reviewText: "Powerful themes, though pacing is slow at times." },
      { bookTitle: "Dune", username: "Ethan", rating: 5, reviewText: "An epic masterpiece of science fiction. World-building is unmatched." },
      { bookTitle: "Dune", username: "Lara", rating: 4, reviewText: "Fascinating story, but some parts are dense to get through." },
      { bookTitle: "Pride and Prejudice", username: "Clara", rating: 5, reviewText: "An all-time favorite. The romance and wit are unmatched." },
      { bookTitle: "Pride and Prejudice", username: "James", rating: 4, reviewText: "Charming and clever, though the language is a bit old-fashioned." },
    ];

    for (const mock of mockReviews) {
      const bookId = bookMap[mock.bookTitle];
      if (!bookId) {
        console.warn(`Book "${mock.bookTitle}" not found. Skipping review for ${mock.username}.`);
        continue;
      }

      // Connect existing user or create safely
      const user = await prisma.user.findUnique({ where: { username: mock.username } });
      let userId: number;
      if (user) {
        userId = user.id;
      } else {
        // Create user with a random unique email to avoid P2002
        const uniqueEmail = `${mock.username.toLowerCase()}_${Date.now()}@example.com`;
        const newUser = await prisma.user.create({
          data: {
            username: mock.username,
            email: uniqueEmail,
            passwordHash: "mockhash",
          },
        });
        userId = newUser.id;
      }

      // Upsert review
      await prisma.review.upsert({
        where: { userId_bookId: { userId, bookId } },
        update: {},
        create: {
          userId,
          bookId,
          rating: mock.rating,
          reviewText: mock.reviewText,
        },
      });
    }

    return NextResponse.json({ message: "Mock reviews added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("PATCH error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ error: "Failed to insert mock reviews" }, { status: 500 });
  }
}

