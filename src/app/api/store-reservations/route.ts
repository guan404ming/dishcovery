import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

const createCommentRequestSchema = z.object({
  storeId: z.number(),
  dishId: z.number(),
  quantity: z.number(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  try {
    createCommentRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { storeId, dishId, quantity } = data as z.infer<
    typeof createCommentRequestSchema
  >;

  try {
    console.log("Creating comment", storeId, dishId, quantity);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
