import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { PUT } from "./route";

describe("PUT /api/category-collections/${userId}", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });

  it("should return 400 if userId isn't given", async () => {
    const requestObj = {
      json: async () => ({
        id: 1,
        category: "taiwanese",
        nextUrl: "http://localhost:3000/api/categoty-collections",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("User ID is required");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        id: 2,
        category: "taiwanese",
        nextUrl: "http://localhost:3000/api/category-collections?userId=2",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe("taiwanese");
    expect(body.category).toBe(1);
  });

  it("should return 500 if there is an internal server error", async () => {
    const requestObj = {
      json: async () => ({
        id: 1,
        category: "taiwanese",
        nextUrl: "http://localhost:3000/api/category-collections?userId=2",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "insert").mockImplementation(() => {
      throw new Error("Internal server error");
    });

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");

    // Restore the original implementation of db.insert
    jest.restoreAllMocks();
  });
});