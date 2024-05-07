import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { userTable } from "@/db/schema";

const createUserRequestSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.enum(["Admin", "User"]),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createUserRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, name, role } = data as z.infer<typeof createUserRequestSchema>;

  try {
    const [user] = await db
      .insert(userTable)
      .values({ email, name, role })
      .returning()
      .execute();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}