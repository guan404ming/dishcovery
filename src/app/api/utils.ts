/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth/next";
import { NextResponse, type NextRequest } from "next/server";

import type { z } from "zod";

import { authOptions } from "@/lib/authOptions";

export default async function validateRequest({
  schema,
  request,
}: {
  schema: z.ZodObject<any, any>;
  request: NextRequest;
}) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    throw new Error("Unauthorized");
  }

  try {
    schema.parse(data);
  } catch (error) {
    throw new Error("Invalid Request");
  }

  return { ...data, userId: session?.user.id };
}

export const errorMap: { [key: string]: any } = {
  "Internal Server Error": NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 },
  ),
  "Invalid Request": NextResponse.json(
    { error: "Invalid Request" },
    { status: 400 },
  ),
  Unauthorized: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
};
