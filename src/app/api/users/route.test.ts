import { handleUnitTest } from "../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "users",
  requestObj: {
    name: `${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    role: "user",
  },
  updatedObj: {
    name: `${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    role: "user",
  },
});
