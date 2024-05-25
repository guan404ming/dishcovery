import { handleUnitTest } from "../../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "post-carts",
  requestObj: {
    userId: 1,
    postDishId: 1,
    quantity: 1,
  },
  updatedObj: {
    quantity: 2,
  },
});
