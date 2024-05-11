import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/db";
import { postReservations } from "@/db/schema";

const insertPostReservationSchema = createInsertSchema(postReservations);

const updatePostReservationSchema = insertPostReservationSchema.extend({
  status: z.enum(["waiting", "confirmed", "finished", "cancelled"]),
  nextUrl: z.string(),
});

const deletePostSchema = z.object({
  id: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const { postDishId, quantity, userId } = (await handleParseRequest({
      schema: insertPostReservationSchema,
      request,
    })) as z.infer<typeof insertPostReservationSchema>;

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
  const { quantity, status, nextUrl } = (await handleParseRequest({
    schema: updatePostReservationSchema,
    request,
  })) as z.infer<typeof updatePostReservationSchema>;

  try {
    const searchParams = new URL(nextUrl).searchParams;
    const reservationId = Number(searchParams.get("reservationId"));
    if (!reservationId) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
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
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deletePostSchema,
      request,
    })) as z.infer<typeof deletePostSchema>;
    await db
      .delete(postReservations)
      .where(eq(postReservations.id, id))
      .execute();
  } catch (error) {
    return handleError({ error });
  }

  return new NextResponse("OK", { status: 200 });
}
