import type { NextRequest } from "next/server";

import { describe, expect, it } from "@jest/globals";

import { POST } from "./route";

describe("POST /api/users", () => {
  it("should return added data with status 201", async () => {
    const requestObj = {
      json: async () => ({ 
        email: "123@gmail.com", 
        password: "123456", 
        username: "Prof.Lu",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.username).toBe("Prof.Lu");
    expect(body.data.email).toBe("123@gmail.com");
    expect(body.data.password).toBe("123456");
  });
});

describe("POST /api/users", () => {
  it("should return an error response with status 400 for invalid request", async () => {
    // Provide invalid data to trigger the catch (error) block
    const requestObj = {
      json: async () => ({ 
        email: "123@gmail.com", 
        password: 123456, 
        username: "Prof.Lu",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });
});