import type { NextRequest } from "next/server";

import { describe, expect, it } from "@jest/globals";

import { POST } from "./route";

describe("POST /api/store-reservations", () => {
  it("should return added data with status 201", async () => {
    const requestObj = {
      json: async () => ({ 
          store_id: 2,
          dish_id: 3,
          quantity: 5,
          status: "waiting"
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.store_id).toBe(2);
    expect(body.data.dish_id).toBe(3);
    expect(body.data.quantity).toBe(5);
    expect(body.data.status).toBe("waiting");
  });
});

describe("POST /api/store-reservations", () => {
  it("should return an error response with status 400 for invalid request", async () => {
    // Provide invalid data to trigger the catch (error) block
    const requestObj = {
      json: async () => ({ 
          store_id: "invalid", // Invalid data for store_id
          dish_id: 3,
          quantity: 5,
          status: "waiting"
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });
});