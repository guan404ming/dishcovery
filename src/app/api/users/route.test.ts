import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST } from "./route";

describe("POST /api/users", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });

  it("should return 200 with added data if request is valid", async () => {
    const email = `${Math.random().toString(36).substring(7)}@gmail.com`
    const requestObj = {
      json: async () => ({
        // random email
        email, 
        name: "Prof.Lu",
        role: "Admin",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.email).toBe(email);
    expect(body.name).toBe("Prof.Lu");
    expect(body.role).toBe("Admin");
  });

  it("should return 500 if there is an internal server error", async () => {
    const requestObj = {
      json: async () => ({ 
        email: "123@gmail.com", 
        name: "Prof.Lu",
        role: "Admin",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "insert").mockImplementation(() => {
      throw new Error("Internal server error");
    });

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Sever Error");

    // Restore the original implementation of db.insert
    jest.restoreAllMocks();
  });
});