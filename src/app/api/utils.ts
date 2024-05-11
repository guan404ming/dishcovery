/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";

import type { z } from "zod";

export async function handleValidateRequest({
  schema,
  request,
}: {
  schema: z.ZodObject<any, any>;
  request: NextRequest;
}) {
  const data = await request.json();

  try {
    console.log("data", data);
    schema.parse(data);
  } catch (error) {
    throw new Error("Invalid Request");
  }

  return data;
}

export async function handleError({ error }: { error: any }) {
  const error_ = error as Error;
  const errorMap: { [key: string]: any } = {
    "Internal Server Error": NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    ),
    "Invalid Request": NextResponse.json(
      { error: "Invalid Request" },
      { status: 400 },
    ),
  };

  return (
    errorMap[error_.message] ||
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  );
}
