import { handleUnitTest } from "../../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "post-reservations",
  requestObj: {
    userId: 1,
    postDishId: 1,
    quantity: 2,
  },
  updatedObj: {
    quantity: 3,
    status: "confirmed",
  },
});
