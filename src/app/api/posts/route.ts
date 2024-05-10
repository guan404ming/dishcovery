import { getServerSession } from "next-auth/next";
import { NextResponse, type NextRequest } from "next/server";

import validateRequest from "../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { postDishes, posts } from "@/db/schema";
import { authOptions } from "@/lib/authOptions";

const createPostRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  name: z.string(),
  quantity: z.number(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const { title, description, location, quantity, name } =
      (await validateRequest({
        schema: createPostRequestSchema,
        request,
      })) as z.infer<typeof createPostRequestSchema>;

    const [post] = await db
      .insert(posts)
      .values({ title, description, location, userId: session?.user.id })
      .returning()
      .execute();

    const [postDish] = await db
      .insert(postDishes)
      .values({
        postId: post.id,
        quantity,
        name,
        description,
        price: 0,
      })
      .returning()
      .execute();

    return NextResponse.json({ post, postDish }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    createPostRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const { title, description, location } = data as z.infer<
    typeof createPostRequestSchema
  >;

  try {
    const searchParams = new URL(data.nextUrl).searchParams;
    const postId = Number(searchParams.get("postId"));

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }
    const [post] = await db
      .update(posts)
      .set({ title, description, location })
      .where(eq(posts.id, postId))
      .returning()
      .execute();

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
