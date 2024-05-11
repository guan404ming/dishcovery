import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { postReservations } from "@/db/schema";

const insertPostReservationSchema = z.object({
  quantity: z.number(),
  postDishId: z.number(),
  userId: z.number(),
});
const updatePostReservationSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  status: z.enum(["waiting", "confirmed", "finished", "cancelled"]),
});
const deletePostSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertPostReservationSchema,
      request,
    })) as z.infer<typeof insertPostReservationSchema>;

    const [postReservation] = await db
      .insert(postReservations)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postReservation } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updatePostReservationSchema,
      request,
    })) as z.infer<typeof updatePostReservationSchema>;

    const [postReservation] = await db
      .update(postReservations)
      .set({ ...data })
      .where(eq(postReservations.id, data.id as number))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postReservation } }, { status: 200 });
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

    const [postReservation] = await db
      .delete(postReservations)
      .where(eq(postReservations.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...postReservation } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
