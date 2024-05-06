import { NextResponse } from "next/server";

import { uploadFile } from "../utils";

import { db } from "@/db";
import { bannerTable } from "@/db/schema";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename == null)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const blob = await uploadFile(`banner/${filename}`, await request.blob());

  try {
    const [banner] = await db
      .insert(bannerTable)
      .values({
        userId: 1,
        url: blob.url,
      })
      .returning()
      .execute();
    return NextResponse.json(banner);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
