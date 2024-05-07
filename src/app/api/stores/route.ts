import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

const createCommentRequestSchema = z.object({
  telephone: z.string(),
  user_id: z.number(),
  address: z.string(),
  name: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createCommentRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { telephone, user_id, address, name } = data as z.infer<
    typeof createCommentRequestSchema
  >;

  try {
    console.log("Creating comment", telephone, user_id, address, name);
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
