// import type { NextRequest } from "next/server";

// import { describe, expect, it } from "@jest/globals";

// import { POST } from "./route";

// describe("POST /api/carts", () => {
//   it("should return added data with status 201 and include user_id", async () => {
//     const requestObj = {
//       json: async () => ({ 
//           dish_id: 3,
//           store_id: 4,
//           quantity: 5,
//       }),
//       url: "http://example.com/api/carts?userid=789" // Simulating a request with user_id parameter
//     } as NextRequest;

//     const response = await POST(requestObj);
//     const body = await response.json();

//     expect(response.status).toBe(201);
//     expect(body.data.dish_id).toBe(3);
//     expect(body.data.store_id).toBe(4);
//     expect(body.data.quantity).toBe(5);
//     expect(body.data.user_id).toBe(789); // Check if user_id is correctly included
//   });

//   it("should return an error response with status 400 for invalid request", async () => {
//     const requestObj = {
//       json: async () => ({ 
//           dish_id: "invalid", // Invalid data for dish_id
//           store_id: 4,
//           quantity: 5,
//       }),
//       url: "http://example.com/api/carts?userid=789" // Simulating a request with user_id parameter
//     } as NextRequest;

//     const response = await POST(requestObj);
//     const body = await response.json();

//     expect(response.status).toBe(400);
//     expect(body.error).toBe("Invalid request");
//   });

//   it("should return an error response with status 500 for internal server error", async () => {
//     // Simulate internal server error by passing invalid request object
//     const requestObj = {} as NextRequest;

//     const response = await POST(requestObj);
//     const body = await response.json();

//     expect(response.status).toBe(500);
//     expect(body.error).toBe("Something went wrong");
//   });
// });
