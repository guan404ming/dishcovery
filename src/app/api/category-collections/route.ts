import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { categoryCollectionTable } from "@/db/schema";

const updateCategoryRequestSchema = z.object({
  id: z.number(),
  category: z.enum([
    "taiwanese",
    "japanese",
    "american",
    "healthy meal",
    "pastry",
    "fruit",
  ]),
});

export async function PUT(request: NextRequest) {
  // extract dish id from url parameter
  const data = await request.json();

  try {
    updateCategoryRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { category, id } = data as z.infer<typeof updateCategoryRequestSchema>;

  try {
    const [updateCategory] = await db
      .update(categoryCollectionTable)
      .set({ category })
      .where(eq(categoryCollectionTable.userId, id))
      .returning()
      .execute();
    console.log(updateCategory);
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}
