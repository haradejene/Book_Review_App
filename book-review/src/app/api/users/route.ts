import { NextResponse } from "next/server";
import { prisma, verifyToken, hashPassword } from "@/lib/helpers";

// ✅ Middleware-like helper to get logged-in user
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

// 🔹 GET: Get current user profile
export async function GET(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(user);
}

// 🔹 PUT: Update profile (username, email, password)
export async function PUT(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { username, email, password } = await req.json();
  let passwordHash;
  if (password) passwordHash = await hashPassword(password);

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      username: username || user.username,
      email: email || user.email,
      passwordHash: passwordHash || user.passwordHash,
    },
  });
  return NextResponse.json(updated);
}

// 🔹 DELETE: Delete profile
export async function DELETE(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.user.delete({ where: { id: user.id } });
  return NextResponse.json({ message: "User deleted" });
}
