import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { storeCollectionTable } from "@/db/schema";

const updateStoreRequestSchema = z.object({
  id: z.number(),
  storeId: z.number(),
});

export async function PUT(request: NextRequest) {
  // extract dish id from url parameter
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const data = await request.json();

  try {
    updateStoreRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { storeId } = data as z.infer<typeof updateStoreRequestSchema>;

  try {
    const [updateStore] = await db
      .update(storeCollectionTable)
      .set({ storeId })
      .where(eq(storeCollectionTable.userId, parseInt(userId)))
      .returning()
      .execute();
    return NextResponse.json(updateStore, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}
