import { handleUnitTest } from "../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "carts",
  requestObj: {
    userId: 1,
    storeDishId: 1,
    quantity: 1,
  },
  updatedObj: {
    quantity: 2,
  },
});
