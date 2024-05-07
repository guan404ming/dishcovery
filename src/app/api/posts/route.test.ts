import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST } from "./route";

describe("POST /api/posts", () => {
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
    const requestObj = {
      json: async () => ({
        title: "Free desserts",
        description: "Free desserts from Information Management Dept.",
        location: "Management Building 1",
        userId: 1,
        dishName: "Cake",
        quantity: 5,
        category: "pastry",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.post.title).toBe("Free desserts");
    expect(body.post.description).toBe(
      "Free desserts from Information Management Dept.",
    );
    expect(body.post.location).toBe("Management Building 1");
    expect(body.post.userId).toBe(1);
    expect(body.postDish.dishName).toBe("Cake");
    expect(body.postDish.quantity).toBe(5);
    expect(body.postDish.category).toBe("pastry");
  });

  it("should return 500 if there is an internal server error", async () => {
    const requestObj = {
      json: async () => ({
        title: "Free desserts",
        description: "Free desserts from Information Management Dept.",
        location: "Management Building 1",
        userId: 1,
        dishName: "Cake",
        quantity: 5,
        category: "pastry",
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
