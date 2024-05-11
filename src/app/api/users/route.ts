import { NextResponse, type NextRequest } from "next/server";

import { handleParseRequest, handleError } from "../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";

const insertUserSchema = createInsertSchema(users);
const updateUserSchema = createInsertSchema(users, { id: z.number() });
const deleteUserSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertUserSchema,
      request,
    })) as z.infer<typeof insertUserSchema>;

    const [user] = await db
      .insert(users)
      .values({ ...data })
      .returning()
      .execute();

    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateUserSchema,
      request,
    })) as z.infer<typeof updateUserSchema>;

    const [user] = await db
      .update(users)
      .set({ ...data })
      .where(eq(users.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deleteUserSchema,
      request,
    })) as z.infer<typeof deleteUserSchema>;
    const [user] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
