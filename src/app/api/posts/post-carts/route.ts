import { NextResponse, type NextRequest } from "next/server";

import { handleParseRequest, handleError } from "../../utils";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { postCarts } from "@/db/schema";

const insertCartSchema = z.object({
  quantity: z.number(),
  userId: z.number(),
  postDishId: z.number(),
});

const updateCartSchema = z.object({
  id: z.number(),
  quantity: z.number(),
});
const deleteCartSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertCartSchema,
      request,
    })) as z.infer<typeof insertCartSchema>;

    const [cartItem_] = await db
      .select()
      .from(postCarts)
      .where(
        and(
          eq(postCarts.userId, data.userId),
          eq(postCarts.postDishId, data.postDishId),
        ),
      );

    const [cartItem] = await db
      .insert(postCarts)
      .values({ ...data })
      .onConflictDoUpdate({
        target: [postCarts.userId, postCarts.postDishId],
        set: {
          quantity: data.quantity + cartItem_?.quantity || 0,
        },
      })
      .returning()
      .execute();

    return NextResponse.json({ data: { ...cartItem } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateCartSchema,
      request,
    })) as z.infer<typeof updateCartSchema>;

    const [user] = await db
      .update(postCarts)
      .set({ ...data })
      .where(eq(postCarts.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deleteCartSchema,
      request,
    })) as z.infer<typeof deleteCartSchema>;
    const [user] = await db
      .delete(postCarts)
      .where(eq(postCarts.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
