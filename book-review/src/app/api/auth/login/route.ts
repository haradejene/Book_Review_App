import { NextResponse } from "next/server";
// Update the path below to the correct location of your helpers file
import { prisma, comparePassword, generateToken } from  "../../../../lib/helpers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user.id);

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Login failed", details: String(err) }, { status: 500 });
  }
}
