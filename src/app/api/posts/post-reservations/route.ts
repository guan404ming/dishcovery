import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleValidateRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { postReservations } from "@/db/schema";

const createPostReservationRequestSchema = z.object({
  postDishId: z.number(),
  quantity: z.number(),
  userId: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const { postDishId, quantity, userId } = (await handleValidateRequest({
      schema: createPostReservationRequestSchema,
      request,
    })) as z.infer<typeof createPostReservationRequestSchema>;

    const [postReservation] = await db
      .insert(postReservations)
      .values({ userId, postDishId, quantity })
      .returning()
      .execute();
    return NextResponse.json(postReservation, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    createPostReservationRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const k = createPostReservationRequestSchema.extend({
    status: z.enum(["waiting", "confirmed", "finished", "cancelled"]),
  });
  const { quantity, status } = data as z.infer<typeof k>;

  try {
    const searchParams = new URL(data.nextUrl).searchParams;
    const reservationId = Number(searchParams.get("reservationId"));
    if (!reservationId) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 },
      );
    }
    const [postReservation] = await db
      .update(postReservations)
      .set({ status, quantity })
      .where(eq(postReservations.id, reservationId))
      .returning()
      .execute();
    return NextResponse.json(postReservation, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
