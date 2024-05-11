/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";
import type { z } from "zod";

import { db } from "@/db";

export async function handleParseRequest({
  schema,
  request,
}: {
  schema: z.ZodObject<any, any>;
  request: NextRequest;
}) {
  const data = await request.json();

  try {
    schema.parse(data);
  } catch (error) {
    throw new Error("Invalid Request");
  }

  return data;
}

export async function handleError({ error }: { error: any }) {
  console.log(error);
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

export async function handleUnitTest({
  POST,
  PUT,
  DELETE,
  name,
  requestObj,
  updatedObj,
}: {
  POST: (request: NextRequest) => Promise<any>;
  PUT: (request: NextRequest) => Promise<any>;
  DELETE: (request: NextRequest) => Promise<any>;
  name: string;
  requestObj: object;
  updatedObj: object;
}) {
  let id = 0;
  const request = {
    json: async () => requestObj,
  } as NextRequest;

  describe(`POST /api/${name}`, () => {
    it("should return 400 if request is invalid", async () => {
      const response = await POST({
        json: async () => ({ invalidField: "Invalid value" }),
      } as NextRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("Invalid Request");
    });

    it("should return 500 if there is an Internal Server Error", async () => {
      jest.spyOn(db, "insert").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.error).toBe("Internal Server Error");

      // Restore the original implementation of db.insert
      jest.restoreAllMocks();
    });

    it("should return 200 with added data if request is valid", async () => {
      const response = await POST(request);
      const body = await response.json();
      id = parseInt(body.data.id);

      expect(response.status).toBe(200);
      expect(body.data).toMatchObject({ ...requestObj });
    });
  });

  describe(`PUT /api/${name}`, () => {
    const putRequest = {
      json: async () => ({
        ...updatedObj,
        id,
      }),
    } as NextRequest;

    it("should return 400 if request is invalid", async () => {
      const response = await PUT({
        json: async () => ({ invalidField: "Invalid value" }),
      } as NextRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("Invalid Request");
    });

    it("should return 500 if there is an Internal Server Error", async () => {
      jest.spyOn(db, "update").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await PUT(putRequest);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.error).toBe("Internal Server Error");
      jest.restoreAllMocks();
    });

    it("should return 200 with added data if request is valid", async () => {
      const response = await PUT(putRequest);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toMatchObject({ ...updatedObj });
    });
  });

  describe(`DELETE /api/${name}`, () => {
    it("should return 400 if request is invalid", async () => {
      const response = await DELETE({
        json: async () => ({ invalidField: "Invalid value" }),
      } as NextRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("Invalid Request");
    });

    it("should return 200 if request is valid", async () => {
      const response = await DELETE({
        json: async () => ({ id }),
      } as NextRequest);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toMatchObject({ ...updatedObj });
    });

    it("should return 500 if there is an Internal Server Error", async () => {
      jest.spyOn(db, "delete").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await DELETE({
        json: async () => ({ id }),
      } as NextRequest);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.error).toBe("Internal Server Error");
      jest.restoreAllMocks();
    });
  });
}
