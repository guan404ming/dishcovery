import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

const createCommentRequestSchema = z.object({
  store_id: z.number(),
  dishName: z.string(),
  category: z.string(),
  quantity: z.number(),
  price: z.number(),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createCommentRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { store_id, dishName, category, quantity, price, description } = data as z.infer<
    typeof createCommentRequestSchema
  >;

  try {
    console.log("Creating comment", store_id, dishName, category, quantity, price, description);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse(JSON.stringify({ data }), { status: 201 });
  // return new NextResponse(JSON.stringify({ data, message: "OK" }), { status: 201 });
}
