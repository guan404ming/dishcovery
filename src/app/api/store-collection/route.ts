import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { categoryCollectionTable, storeCollectionTable } from "@/db/schema";

const updateStoreRequestSchema = z.object({
  id: z.number(),
  storeId: z.number(),
});

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateStoreRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const searchParams = new URL(data.nextUrl).searchParams;
  const userId = Number(searchParams.get("userId"));
  
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  
  
  const { id, storeId } = data as z.infer<typeof updateStoreRequestSchema>;
  
  try {
    const [updateStore] = await db
      .update(storeCollectionTable)
      .set({ storeId })
      .where(eq(storeCollectionTable.userId, userId))
      .returning()
      .execute();
    return NextResponse.json(updateStore, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
