import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST, PUT, DELETE } from "./route";

let id = 0;
const requestObj = {
  json: async () => ({
    title: "Free desserts",
    description: "Free desserts from Information Management Dept.",
    location: "Management Building 1",
    userId: 1,
    name: "Cake",
    quantity: 5,
  }),
} as NextRequest;

describe("POST /api/posts", () => {
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
    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.post.title).toBe("Free desserts");
    expect(body.post.description).toBe(
      "Free desserts from Information Management Dept.",
    );
    expect(body.post.location).toBe("Management Building 1");
    expect(body.post.userId).toBe(1);
    expect(body.postDish.name).toBe("Cake");
    expect(body.postDish.quantity).toBe(5);
    id = parseInt(body.post.id);
  });

  it("should return 500 if there is an Internal Server Error", async () => {
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

describe("PUT /api/posts", () => {
  it("should return 400 if request is invalid", async () => {
    const requestObj = {
      json: async () => ({ invalidField: "Invalid value" }),
    } as NextRequest;

    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 400 if postId isn't given", async () => {
    const requestObj = {
      json: async () => ({
        title: "Free desserts",
        description: "Free desserts from Information Management Dept.",
        location: "Management Building 1",
        userId: 1,
        name: "Cake",
        quantity: 5,
        nextUrl: "http://localhost:3000/api/posts",
      }),
    } as NextRequest;
    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid Request");
  });

  it("should return 200 with added data if request is valid", async () => {
    const requestObj = {
      json: async () => ({
        title: "Free desserts",
        description: "Free desserts from Information Management Dept.",
        location: "Management Building 1",
        userId: 1,
        name: "Cake",
        quantity: 5,
        nextUrl: `http://localhost:3000/api/posts/?postId=${id}`,
      }),
    } as NextRequest;
    const response = await PUT(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.post.title).toBe("Free desserts");
    expect(body.post.description).toBe(
      "Free desserts from Information Management Dept.",
    );
    expect(body.post.location).toBe("Management Building 1");
    expect(body.post.userId).toBe(1);
  });

  it("should return 500 if there is an Internal Server Error", async () => {
    const requestObj = {
      json: async () => ({
        title: "Free desserts",
        description: "Free desserts from Information Management Dept.",
        location: "Management Building 1",
        userId: 1,
        name: "Cake",
        quantity: 5,
        nextUrl: `http://localhost:3000/api/posts/?postId=${id}`,
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

describe("DELETE /api/posts", () => {
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
      json: async () => ({ id }),
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
