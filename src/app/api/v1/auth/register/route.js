import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  return Response.json({ message: "User register success!", data: newUser }, { status: 201 });
}
