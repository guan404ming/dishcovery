// import type { NextRequest } from "next/server";

// import { describe, expect, it } from "@jest/globals";

// import { POST } from "./route";

// describe("POST /api/dishes", () => {
//   it("should return added data with status 201", async () => {
//     const requestObj = {
//       json: async () => ({ 
//         store_id: 1,
//         dishName: "Bento Box",
//         category: "Taiwanese",
//         quantity: 2,
//         price: 60,
//         description: "Yummy",
//       }),
//     } as NextRequest;

//     const response = await POST(requestObj);
//     const body = await response.json();

//     expect(response.status).toBe(201);
//     expect(body.data.store_id).toBe(1);
//     expect(body.data.dishName).toBe("Bento Box");
//     expect(body.data.quantity).toBe(2);
//     expect(body.data.price).toBe(60);
//     expect(body.data.description).toBe("Yummy");
//   });
// });

// describe("POST /api/dishes", () => {
//   it("should return an error response with status 400 for invalid request", async () => {
//     // Provide invalid data to trigger the catch (error) block
//     const requestObj = {
//       json: async () => ({ 
//         store_id: "invalid",
//         dishName: "Bento Box",
//         category: "Taiwanese",
//         quantity: 2,
//         price: 60,
//         description: "Yummy",
//       }),
//     } as NextRequest;

//     const response = await POST(requestObj);
//     const body = await response.json();

//     expect(response.status).toBe(400);
//     expect(body.error).toBe("Invalid request");
//   });
// });

import { type NextRequest } from "next/server";

import { describe, expect, it, jest } from "@jest/globals";

import { db } from "@/db";

import { POST } from "./route";

let id = 0;

describe("POST /api/dishes", () => {
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
        quantity: 2,
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
    expect(body.quantity).toBe(2);
    expect(body.category).toBe("taiwanese");
    expect(body.storeId).toBe(1);
    expect(body.name).toBe("Bento");
    expect(body.price).toBe(60);
    expect(body.description).toBe("Yummy");
    id = body.id;
  });

  it("should return 500 if there is an internal server error", async () => {
    const requestObj = {
      json: async () => ({ 
        quantity: 2,
        category: "taiwanese",
        storeId: 1,
        name: "Bento",
        price: 60,
        description: "Yummy",
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