import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { postDishes } from "@/db/schema";

const insertPostDishSchema = z.object({
  postId: z.number(),
  name: z.string(),
  quantity: z.number(),
  description: z.string(),
  image: z.string(),
});

const updatePostDishSchema = insertPostDishSchema
  .extend({ id: z.number() })
  .omit({ postId: true });
const deletePostDishSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertPostDishSchema,
      request,
    })) as z.infer<typeof insertPostDishSchema>;

    const [postDish] = await db
      .insert(postDishes)
      .values({ ...data, price: 0 })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updatePostDishSchema,
      request,
    })) as z.infer<typeof updatePostDishSchema>;

    const [postDish] = await db
      .update(postDishes)
      .set({ ...data })
      .where(eq(postDishes.id, data.id as number))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deletePostDishSchema,
      request,
    })) as z.infer<typeof deletePostDishSchema>;

    const [postDish] = await db
      .delete(postDishes)
      .where(eq(postDishes.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
