import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { storeDishes } from "@/db/schema";

const createStoreDishSchema = z.object({
  storeId: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number(),
  description: z.string(),
});

const updateStoreDishSchema = z.object({
  id: z.number(),
  storeId: z.number().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
  quantity: z.number().optional(),
  description: z.string().optional(),
});

const deleteStoreSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: createStoreDishSchema,
      request,
    })) as z.infer<typeof createStoreDishSchema>;

    const [storeDish] = await db
      .insert(storeDishes)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...storeDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateStoreDishSchema,
      request,
    })) as z.infer<typeof updateStoreDishSchema>;

    const [storeDish] = await db
      .update(storeDishes)
      .set({ ...data })
      .where(eq(storeDishes.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...storeDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deleteStoreSchema,
      request,
    })) as z.infer<typeof deleteStoreSchema>;
    const [storeDish] = await db
      .delete(storeDishes)
      .where(eq(storeDishes.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...storeDish } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
