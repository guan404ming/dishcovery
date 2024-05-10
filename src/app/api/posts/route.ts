import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { posts } from "@/db/schema";

const createPostRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  userId: z.number(),
  dishName: z.string(),
  quantity: z.number(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createPostRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const { title, description, location, userId } = data as z.infer<
    typeof createPostRequestSchema
  >;

  try {
    const [post] = await db
      .insert(posts)
      .values({ title, description, location, userId })
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
