import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { storeTable } from "@/db/schema";

const createStoreRequestSchema = z.object({
  userId: z.number(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createStoreRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, name, address, phone } = data as z.infer<
    typeof createStoreRequestSchema
  >;

  try {
    const [store] = await db
      .insert(storeTable)
      .values({ userId, name, address, phone })
      .returning()
      .execute();
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }
}
