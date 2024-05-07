// import { NextResponse, type NextRequest } from "next/server";

// import { z } from "zod";

// const createCommentRequestSchema = z.object({
//   dish_id: z.number(),
//   store_id: z.number(),
//   quantity: z.number(),
// });

// export async function POST(request: NextRequest) {
//   console.log(request);
//   const data = await request.json;
//   const url = new URL(request.url);
//   const user_id = url.searchParams.get("userid");
  

//   try {
//     createCommentRequestSchema.parse(data);
//     data.user_id = user_id;
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }

//   const { store_id, dish_id, quantity } = data as z.infer<
//     typeof createCommentRequestSchema
//   >;

//   try {
//     console.log("Creating comment", user_id, store_id, dish_id, quantity);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 },
//     );
//   }

//   // return new NextResponse("OK", { status: 200 });
//   return new NextResponse(JSON.stringify({ data }), { status: 201 });
// }
