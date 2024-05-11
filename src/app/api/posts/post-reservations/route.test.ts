// import { type NextRequest } from "next/server";
// import { describe, expect, it, jest } from "@jest/globals";
// import { db } from "@/db";
import { handleUnitTest } from "../../utils";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "post-reservations",
  requestObj: {
    userId: 1,
    postDishId: 2,
    quantity: 2,
  },
  updatedObj: {
    quantity: 3,
    status: "confirmed",
  },
});
