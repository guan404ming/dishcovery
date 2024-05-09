import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST, DELETE } from "./route";

let id = 0;

describe("POST /api/banners", () => {
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
      json: async () => ({ userId: 1, url: "https://example.com/banner" }),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.userId).toBe(1);
    expect(body.url).toBe("https://example.com/banner");
    id = body.id;
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({ userId: 1, url: "https://example.com/banner" }),
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

describe("DELETE /api/banners", () => {
  it("should return 200 if request is valid", async () => {
    const requestObj = {
      json: async () => ({ id }),
    } as NextRequest;

    const response = await DELETE(requestObj);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toBe("OK");
  });

  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await DELETE(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({ id: 1 }),
    } as NextRequest;

    // Mock the db.delete function to throw an error
    jest.spyOn(db, "delete").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const response = await DELETE(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");

    // Restore the original implementation of db.delete
    jest.restoreAllMocks();
  });
});
