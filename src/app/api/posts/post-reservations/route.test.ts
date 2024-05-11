import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST, PUT } from "./route";

describe("POST /api/post-reservations", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        userId: 1,
        postId: 1,
        dishId: 92,
        quantity: 2,
        status: "waiting",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.userId).toBe(1);
    expect(body.postId).toBe(1);
    expect(body.dishId).toBe(92);
    expect(body.quantity).toBe(2);
    expect(body.status).toBe("waiting");
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({
        userId: 1,
        postId: 1,
        dishId: 92,
        quantity: 2,
        status: "waiting",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "insert").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");

    // Restore the original implementation of db.insert
    jest.restoreAllMocks();
  });
});

describe("PUT /api/post-reservations/${reservationId}", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 400 if reservation id isn't given", async () => {
    const requestObj = {
      json: async () => ({
        userId: 1,
        postId: 1,
        dishId: 92,
        quantity: 2,
        status: "waiting",
        nextUrl: "http://localhost:3000/api/post-reservations",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Reservation ID is required");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        userId: 1,
        postId: 1,
        dishId: 92,
        quantity: 2,
        status: "waiting",
        nextUrl: "http://localhost:3000/api/post-reservations?reservationId=94",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.userId).toBe(1);
    expect(body.postId).toBe(1);
    expect(body.dishId).toBe(92);
    expect(body.quantity).toBe(2);
    expect(body.status).toBe("waiting");
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({
        userId: 1,
        postId: 1,
        dishId: 1,
        quantity: 2,
        status: "waiting",
        nextUrl: "http://localhost:3000/api/post-reservations?reservationId=90",
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