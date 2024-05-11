import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { storeReservations } from "@/db/schema";

const insertStoreReservationSchema = z.object({
  quantity: z.number(),
  storeDishId: z.number(),
  userId: z.number(),
});
const updateStoreReservationSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  status: z.enum(["waiting", "confirmed", "finished", "cancelled"]),
});
const deleteStoreReservationSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertStoreReservationSchema,
      request,
    })) as z.infer<typeof insertStoreReservationSchema>;

    const [storeReservation] = await db
      .insert(storeReservations)
      .values({ ...data })
      .returning()
      .execute();
    return NextResponse.json(
      { data: { ...storeReservation } },
      { status: 200 },
    );
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateStoreReservationSchema,
      request,
    })) as z.infer<typeof updateStoreReservationSchema>;

    const [storeReservation] = await db
      .update(storeReservations)
      .set({ ...data })
      .where(eq(storeReservations.id, data.id as number))
      .returning()
      .execute();
    return NextResponse.json(
      { data: { ...storeReservation } },
      { status: 200 },
    );
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deleteStoreReservationSchema,
      request,
    })) as z.infer<typeof deleteStoreReservationSchema>;

    const [storeReservation] = await db
      .delete(storeReservations)
      .where(eq(storeReservations.id, id))
      .returning()
      .execute();
    return NextResponse.json(
      { data: { ...storeReservation } },
      { status: 200 },
    );
  } catch (error) {
    return handleError({ error });
  }
}
