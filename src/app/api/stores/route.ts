import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../utils";
import { z } from "zod";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";

const insertStoreSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  userId: z.number(),
});
const updateStoreSchema = insertStoreSchema.extend({ id: z.number() });
const deleteStoreSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertStoreSchema,
      request,
    })) as z.infer<typeof insertStoreSchema>;
  
    const [store] = await db
      .insert(stores)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...store } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateStoreSchema,
      request,
    })) as z.infer<typeof updateStoreSchema>;

    const [store] = await db
      .update(stores)
      .set({ ...data })
      .where(eq(stores.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...store } }, { status: 200 });
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
    const [store] = await db
      .delete(stores)
      .where(eq(stores.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...store } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}