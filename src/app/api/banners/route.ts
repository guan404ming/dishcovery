import { NextResponse, type NextRequest } from "next/server";

import { handleError, handleParseRequest } from "../utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { banners } from "@/db/schema";

const insertBannerSchema = z.object({
  userId: z.number(),
  url: z.string(),
});
const updateBannerSchema = insertBannerSchema
  .omit({ userId: true })
  .extend({ id: z.number() });
const deleteBannerSchema = z.object({ id: z.number() });

export async function POST(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: insertBannerSchema,
      request,
    })) as z.infer<typeof insertBannerSchema>;

    const [banner] = await db
      .insert(banners)
      .values({ ...data })
      .returning()
      .execute();

    return NextResponse.json({ data: { ...banner } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await handleParseRequest({
      schema: updateBannerSchema,
      request,
    })) as z.infer<typeof updateBannerSchema>;

    const [banner] = await db
      .update(banners)
      .set({ ...data })
      .where(eq(banners.id, data.id as number))
      .returning();

    return NextResponse.json({ data: { ...banner } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await handleParseRequest({
      schema: deleteBannerSchema,
      request,
    })) as z.infer<typeof deleteBannerSchema>;
    const [user] = await db
      .delete(banners)
      .where(eq(banners.id, id))
      .returning()
      .execute();
    return NextResponse.json({ data: { ...user } }, { status: 200 });
  } catch (error) {
    return handleError({ error });
  }
}
