import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { storeDishes } from "@/db/schema";

const createStoreDishSchema = createInsertSchema(storeDishes).omit({
  id: true,
});

const updateStoreDishSchema = createStoreDishSchema
  .omit({ storeId: true })
  .extend({ id: z.number() });
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
