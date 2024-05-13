import { handleUnitTest } from "@/lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "store-collections",
  requestObj: {
    storeId: 1,
    userId: 1,
  },
  updatedObj: {
    storeId: 1,
    userId: 1,
  },
});
