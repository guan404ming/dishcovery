import { NextResponse, type NextRequest } from "next/server";

import { handleParseRequest, handleError } from "../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { posts } from "@/db/schema";

export const insertPostSchema = createInsertSchema(posts);
export const updatePostSchema = insertPostSchema.extend({ id: z.number() });
const deletePostSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertPostSchema,
      request,
    })) as z.infer<typeof insertPostSchema>;

    const [post] = await db
      .insert(posts)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...post } }, { status: 200 });
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

    const [post] = await db
      .update(posts)
      .set({ ...data })
      .where(eq(posts.id, data.id as number))
      .returning()
      .execute();

    return NextResponse.json({ data: { ...post } }, { status: 200 });
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
    const [post] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...post } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
