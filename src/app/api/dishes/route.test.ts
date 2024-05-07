import type { NextRequest } from "next/server";

import { describe, expect, it } from "@jest/globals";

import { POST } from "./route";

describe("POST /api/dishes", () => {
  it("should return added data with status 201", async () => {
    const requestObj = {
      json: async () => ({ 
        store_id: 1,
        dishName: "Bento Box",
        category: "Taiwanese",
        quantity: 2,
        price: 60,
        description: "Yummy",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.store_id).toBe(1);
    expect(body.data.dishName).toBe("Bento Box");
    expect(body.data.quantity).toBe(2);
    expect(body.data.price).toBe(60);
    expect(body.data.description).toBe("Yummy");
  });
});

describe("POST /api/dishes", () => {
  it("should return an error response with status 400 for invalid request", async () => {
    // Provide invalid data to trigger the catch (error) block
    const requestObj = {
      json: async () => ({ 
        store_id: "invalid",
        dishName: "Bento Box",
        category: "Taiwanese",
        quantity: 2,
        price: 60,
        description: "Yummy",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });
});