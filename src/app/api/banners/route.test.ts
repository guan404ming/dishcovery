import { handleUnitTest } from "../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "users",
  requestObj: {
    userId: 1,
    url: "https://www.google.com",
  },
  updatedObj: {
    url: "https://www.google.com/1",
  },
});
