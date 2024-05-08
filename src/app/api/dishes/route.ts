import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { dishTable } from "@/db/schema";

const createDishRequestSchema = z.object({
  quantity: z.number(),
  category: z.enum([
    "taiwanese",
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

const updateDishRequestSchema = createDishRequestSchema.omit({ storeId: true });

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    updateDishRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { quantity, category, storeId, name, price, description } =
    data as z.infer<typeof createDishRequestSchema>;

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

export async function PUT(request: NextRequest) {
  // extract dish id from url parameter

  const data = await request.json();

  try {
    createDishRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { quantity, category, storeId, name, price, description } =
    data as z.infer<typeof createDishRequestSchema>;

  try {
    const searchParams = new URL(data.nextUrl).searchParams;
    const dishId = Number(searchParams.get("dishId"));
    if (!dishId) {
      return NextResponse.json(
        { error: "Dish ID is required" },
        { status: 400 },
      );
    }

    const [updateDish] = await db
      .update(dishTable)
      .set({ quantity, category, storeId, name, price, description })
      .where(eq(dishTable.id, dishId)) // I am not sure about this line. I do my best to prevent any errors.
      .returning()
      .execute();
    return NextResponse.json(updateDish, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}
