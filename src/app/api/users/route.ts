import { NextResponse, type NextRequest } from "next/server";

import { handleParseRequest, handleError } from "../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";

const insertPostSchema = createInsertSchema(users);
const updatePostSchema = createInsertSchema(users, { id: z.number() });
const deletePostSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertPostSchema,
      request,
    })) as z.infer<typeof insertPostSchema>;

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
      schema: updatePostSchema,
      request,
    })) as z.infer<typeof updatePostSchema>;

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
      schema: deletePostSchema,
      request,
    })) as z.infer<typeof deletePostSchema>;
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
