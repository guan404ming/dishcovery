import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { postReservationTable } from "@/db/schema";

const createPostReservationRequestSchema = z.object({
  userId: z.number(),
  postId: z.number(),
  dishId: z.number(),
  quantity: z.number(),
  status: z.enum(["waiting", "confirmed", "finished", "cancelled"]),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createPostReservationRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, postId, dishId, quantity, status } = data as z.infer<
    typeof createPostReservationRequestSchema
  >;

  try {
    const [postReservation] = await db
      .insert(postReservationTable)
      .values({ userId, postId, dishId, quantity, status })
      .returning()
      .execute();

    return NextResponse.json(postReservation, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}