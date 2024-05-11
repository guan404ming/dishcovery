import { handleUnitTest } from "@/lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "stores",
  requestObj: {
    quantity: 100,
    storeId: 1,
    name: "Bento",
    price: 60,
    description: "Yummy",
  },
  updatedObj: {
    quantity: 100,
    storeId: 1,
    name: "Bento",
    price: 60,
    description: "Yummy",
  },
});
