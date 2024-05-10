import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";

const createUserRequestSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.enum(["admin", "user"]),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createUserRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const { email, name, role } = data as z.infer<typeof createUserRequestSchema>;

  try {
    const [user] = await db
      .insert(users)
      .values({ email, name, role })
      .returning()
      .execute();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
