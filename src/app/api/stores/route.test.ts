import { handleUnitTest } from "../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "stores",
  requestObj: {
    name: `${Math.random()}`,
    address: `台北市${Math.random()}路`,
    phone: `09${Math.random()}`,
    userId: 1,
  },
  updatedObj: {
    name: `${Math.random()}`,
    phone: `09${Math.random()}`,
    address: `台南市${Math.random()}路`,
    userId: 1,
  },
});
