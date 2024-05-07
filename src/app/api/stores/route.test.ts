import type { NextRequest } from "next/server";

import { describe, expect, it } from "@jest/globals";

import { POST } from "./route";

describe("POST /api/stores", () => {
  it("should return added data with status 201", async () => {
    const requestObj = {
      json: async () => ({ 
        telephone: "0912345678",
        user_id: 1,
        address: "123 Main St",
        name: "Happy",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.user_id).toBe(1);
    expect(body.data.telephone).toBe("0912345678");
    expect(body.data.name).toBe("Happy");
    expect(body.data.address).toBe("123 Main St");
  });
});

describe("POST /api/stores", () => {
  it("should return an error response with status 400 for invalid request", async () => {
    // Provide invalid data to trigger the catch (error) block
    const requestObj = {
      json: async () => ({ 
        telephone: "0912345678",
        user_id: "invalid",
        address: "123 Main St",
        name: "Happy",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });
});