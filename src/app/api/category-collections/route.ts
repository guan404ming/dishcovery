import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { categoryCollectionTable } from "@/db/schema";

const updateCategoryRequestSchema = z.object({
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
  const data = await request.json();
  try {
    updateCategoryRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  const { category } = data as z.infer<typeof updateCategoryRequestSchema>;

  try {
    const searchParams = new URL(data.nextUrl).searchParams;
    const userId = Number(searchParams.get("userId"));
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    const [updateCategory] = await db
      .update(categoryCollectionTable)
      .set({ category })
      .where(eq(categoryCollectionTable.userId, userId))
      .returning()
      .execute();
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
