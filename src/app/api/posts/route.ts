import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { postTable, postDishTable } from "@/db/schema";

const createPostRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  userId: z.number(),
	dishName: z.string(),
	quantity: z.number(),
	category: z.enum(["taiwanese",
    "japanese",
    "american",
    "healthy meal",
    "pastry",
    "fruit",
  ]),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createPostRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { title, description, location, userId, dishName, quantity, category } = data as z.infer<typeof createPostRequestSchema>;

  try {
    const [post] = await db
      .insert(postTable)
      .values({ title, description, location, userId })
      .returning()
      .execute();

    const [postDish] = await db
      .insert(postDishTable)
      .values({ dishName, quantity, category })
      .returning()
      .execute();

    return NextResponse.json({ post, postDish }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}