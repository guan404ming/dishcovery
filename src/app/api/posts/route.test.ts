import { handleUnitTest } from "../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "posts",
  requestObj: {
    title: "Free desserts",
    description: "Free desserts from Information Management Dept.",
    location: "Management Building 1",
    userId: 1,
  },
  updatedObj: {
    title: "Free desserts",
    description: "Free desserts from Information Management Dept.",
    location: "Management Building 1",
    userId: 1,
  },
});
