import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { PUT } from "./route";

describe("PUT /api/category-collections", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid request");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        id: 1,
        category: "taiwanese",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.userId).toBe(1);
    expect(body.category).toBe("taiwanese");
  });

  it("should return 500 if there is an internal server error", async () => {
    const requestObj = {
      json: async () => ({
        id: 1,
        category: "taiwanese",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "update").mockImplementation(() => {
      throw new Error("Internal server error");
    });

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Sever Error");

    // Restore the original implementation of db.insert
    jest.restoreAllMocks();
  });
});
