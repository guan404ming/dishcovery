import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { dishTable } from "@/db/schema";

const createDishRequestSchema = z.object({
  quantity: z.number(),
  category: z.enum(["taiwanese",
    "japanese",
    "american",
    "healthy meal",
    "pastry",
    "fruit",
  ]),
  storeId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createDishRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { quantity, category, storeId, name, price, description } = data as z.infer<typeof createDishRequestSchema>;

  try {
    const [dish] = await db
      .insert(dishTable)
      .values({ quantity, category, storeId, name, price, description })
      .returning()
      .execute();
    return NextResponse.json(dish, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}