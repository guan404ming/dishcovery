import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { banners } from "@/db/schema";

const createBannerRequestSchema = z.object({
  userId: z.number(),
  url: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createBannerRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const { userId, url } = data as z.infer<typeof createBannerRequestSchema>;

  try {
    const [banner] = await db
      .insert(banners)
      .values({ userId, url })
      .returning()
      .execute();
    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

const deleteBannerRequestSchema = z.object({
  id: z.number(),
});

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    deleteBannerRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }

  const { id } = data as z.infer<typeof deleteBannerRequestSchema>;

  try {
    await db.delete(banners).where(eq(banners.id, id)).execute();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
