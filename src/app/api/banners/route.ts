import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { bannerTable } from "@/db/schema";

const createBannerRequestSchema = z.object({
  userId: z.number(),
  url: z.string(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    createBannerRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, url } = data as z.infer<typeof createBannerRequestSchema>;

  try {
    await db.insert(bannerTable).values({ userId, url }).execute();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Sever Error" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
