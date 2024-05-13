import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { storeCollections } from "@/db/schema";

const createStoreCollectionSchema = createInsertSchema(storeCollections);

const updateStoreDishSchema = createStoreCollectionSchema;
const deleteStoreSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: createStoreCollectionSchema,
      request,
    })) as z.infer<typeof createStoreCollectionSchema>;

    const [storeCollection] = await db
      .insert(storeCollections)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...storeCollection } }, { status: 200 });
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

    const [storeCollection] = await db
      .update(storeCollections)
      .set({ ...data })
      .where(eq(storeCollections.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...storeCollection } }, { status: 200 });
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
    const [storeCollection] = await db
      .delete(storeCollections)
      .where(eq(storeCollections.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...storeCollection } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
