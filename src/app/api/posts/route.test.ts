import type { NextRequest } from "next/server";

import { describe, expect, it } from "@jest/globals";

import { POST } from "./route";

describe("POST /api/posts", () => {
  it("should return added data with status 201", async () => {
    const requestObj = {
      json: async () => ({ 
        user_id: 1,
        title: "Free Bento Box from Prof.Lu",
        description: "I have 10 bento boxes to give away. Please come to my office to pick them up.",
        location: "Management Building 1",
        dishName: "Bento Box",
        quantity: 5,
        category: "Taiwanese",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.user_id).toBe(1);
    expect(body.data.title).toBe("Free Bento Box from Prof.Lu");
    expect(body.data.description).toBe("I have 10 bento boxes to give away. Please come to my office to pick them up.");
    expect(body.data.location).toBe("Management Building 1");
    expect(body.data.dishName).toBe("Bento Box");
    expect(body.data.quantity).toBe(5);
    expect(body.data.category).toBe("Taiwanese");
  });
});

describe("POST /api/posts", () => {
  it("should return an error response with status 400 for invalid request", async () => {
    // Provide invalid data to trigger the catch (error) block
    const requestObj = {
      json: async () => ({ 
        user_id: 1,
        title: "Free Bento Box from Prof.Lu",
        description: "I have 10 bento boxes to give away. Please come to my office to pick them up.",
        location: "Management Building 1",
        dishName: "Bento Box",
        quantity: "invalid",
        category: "Taiwanese",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });
});