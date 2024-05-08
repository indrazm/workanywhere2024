import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return Response.json({ message: "User not found" }, { status: 204 });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return Response.json({ message: "Invalid Password" }, { status: 204 });

  return Response.json({ message: "Logic Success" }, { status: 204 });
}
