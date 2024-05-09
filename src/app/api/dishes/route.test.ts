import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST, PUT } from "./route";

describe("POST /api/dishes", () => {
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
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
      }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.quantity).toBe(100);
    expect(body.category).toBe("taiwanese");
    expect(body.storeId).toBe(1);
    expect(body.name).toBe("Bento");
    expect(body.price).toBe(60);
    expect(body.description).toBe("Yummy");
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
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

describe("PUT /api/dishes/${userid}", () => {
  it("should return 400 if request is invalid!", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 400 if user id isn't given", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
        nextUrl: "http://localhost:300/api/dishes",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Dish ID is required");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
        nextUrl: "http://localhost:300/api/dishes?dishId=90",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.quantity).toBe(100);
    expect(body.category).toBe("taiwanese");
    expect(body.storeId).toBe(1);
    expect(body.name).toBe("Bento");
    expect(body.price).toBe(60);
    expect(body.description).toBe("Yummy");
  });

  it("should return 500 if there is an Internal Server Error!", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "insert").mockImplementation(() => {
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

describe("PUT /api/dishes/${userid}", () => {
  it("should return 400 if request is invalid!", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 400 if user id isn't given", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
        nextUrl: "http://localhost:300/api/dishes",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Dish ID is required");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
        nextUrl: "http://localhost:300/api/dishes?dishId=90",
      }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.quantity).toBe(100);
    expect(body.category).toBe("taiwanese");
    expect(body.storeId).toBe(1);
    expect(body.name).toBe("Bento");
    expect(body.price).toBe(60);
    expect(body.description).toBe("Yummy");
  });

  it("should return 500 if there is an Internal Server Error!", async () => {
    const requestObj = {
      json: async () => ({
        quantity: 100,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
      }),
    } as NextRequest;

    // Mock the db.insert function to throw an error
    jest.spyOn(db, "insert").mockImplementation(() => {
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
