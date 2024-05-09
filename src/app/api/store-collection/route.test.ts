import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { PUT } from "./route";

describe("PUT /api/store-collections/${userId}", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 400 if userId isn't given", async () => {
    const requestObj = {
      json: async () => ({
        storeId: 2,
        nextUrl: "http://localhost:3000/api/store-collections",
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
        storeId: 2,
        nextUrl: "http://localhost:3000/api/store-collections?userId=1",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.storeId).toBe(2);
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({
        storeId: 2,
        nextUrl: "http://localhost:3000/api/store-collections?userId=1",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "update").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");

    // Restore the original implementation of db.insert
    jest.restoreAllMocks();
  });
});
