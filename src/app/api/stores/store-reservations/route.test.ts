import { handleUnitTest } from "../../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "stores/store-reservations",
  requestObj: {
    userId: 1,
    storeDishId: 1,
    quantity: 2,
  },
  updatedObj: {
    quantity: 3,
    status: "confirmed",
  },
});
