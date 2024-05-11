import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { storeDishes } from "@/db/schema";

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
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  try {
    const [dish] = await db
      .insert(storeDishes)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json(dish, { status: 200 });
    console.log(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  try {
    const searchParams = new URL(data.nextUrl).searchParams;
    const dishId = Number(searchParams.get("dishId"));
    if (!dishId) {
      return NextResponse.json(
        { error: "Dish ID is required" },
        { status: 400 },
      );
    }

    // const [updateDish] = await db
    //   .update(storeDishes)
    //   .set({ quantity, category, storeId, name, price, description })
    //   .where(eq(storeDishes.id, dishId)) // I am not sure about this line. I do my best to prevent any errors.
    //   .returning()
    //   .execute();

    console.log(data);
    // return NextResponse.json(updateDish, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
