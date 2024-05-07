import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { storeReservationTable } from "@/db/schema";

const createStoreReservationRequestSchema = z.object({
	userId: z.number(),
	storeId: z.number(),
	dishId: z.number(),
	quantity: z.number(),
	status: z.enum([
    "waiting",
    "confirmed",
    "finished",
    "cancelled",
  ]),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createStoreReservationRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, storeId, dishId, quantity, status } = data as z.infer<typeof createStoreReservationRequestSchema>;

  try {
    const [storeReservation] = await db
      .insert(storeReservationTable)
      .values({ userId, storeId, dishId, quantity, status })
      .returning()
      .execute();

    return NextResponse.json(storeReservation, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}