import { NextResponse, type NextRequest } from "next/server";

import { handleParseRequest, handleError } from "../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { postDishes, posts } from "@/db/schema";

const insertPostSchema = createInsertSchema(posts).extend({
  name: z.string(),
  quantity: z.number(),
});

const updatePostSchema = insertPostSchema.extend({ nextUrl: z.string() });

const deletePostSchema = z.object({
  id: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const { title, description, location, quantity, name, userId } =
      (await handleParseRequest({
        schema: insertPostSchema,
        request,
      })) as z.infer<typeof insertPostSchema>;

    const [post] = await db
      .insert(posts)
      .values({ title, description, location, userId })
      .returning()
      .execute();

    const [postDish] = await db
      .insert(postDishes)
      .values({
        postId: post.id,
        quantity,
        name,
        description,
        price: 0,
      })
      .returning()
      .execute();
    return NextResponse.json({ data: { post, postDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { title, description, location, nextUrl } = (await handleParseRequest(
      {
        schema: updatePostSchema,
        request,
      },
    )) as z.infer<typeof updatePostSchema>;
    const searchParams = new URL(nextUrl).searchParams;
    const postId = Number(searchParams.get("postId"));

    if (!postId) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
    const [post] = await db
      .update(posts)
      .set({ title, description, location })
      .where(eq(posts.id, postId))
      .returning()
      .execute();

    return NextResponse.json({ data: post }, { status: 200 });
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
    await db.delete(posts).where(eq(posts.id, id)).execute();
  } catch (error) {
    return handleError({ error });
  }

  return new NextResponse("OK", { status: 200 });
}
