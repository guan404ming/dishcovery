import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { categoryCollectionTable, storeCollectionTable } from "@/db/schema";

// const createDishRequestSchema = z.object({
//   quantity: z.number(),
//   category: z.enum([
//     "taiwanese",
//     "japanese",
//     "american",
//     "healthy meal",
//     "pastry",
//     "fruit",
//   ]),
//   storeId: z.number(),
//   name: z.string(),
//   price: z.number(),
//   description: z.string(),
// });

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
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const data = await request.json();

  try {
    updateCategoryRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { id, category } = data as z.infer<typeof updateCategoryRequestSchema>;

  try {
    const [updateCategory] = await db
      .update(categoryCollectionTable)
      .set({ category })
      .where(eq(categoryCollectionTable.userId, parseInt(userId)))
      .returning()
      .execute();
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}
