import { NextResponse } from "next/server";
import { prisma, hashPassword, generateToken } from "../../../../lib/helpers";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });
    

    const token = generateToken(user.id);

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Signup failed", details: String(err) }, { status: 500 });
  }
}
