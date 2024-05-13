import { handleUnitTest } from "../../../../lib/unit-test";

import { POST, PUT, DELETE } from "./route";

handleUnitTest({
  POST,
  PUT,
  DELETE,
  name: "post-dishes",
  requestObj: {
    postId: 1,
    name: "Pizza",
    quantity: 1,
    description: "Delicious",
    image: "pizza.jpg",
  },
  updatedObj: {
    name: "Pizza + Soda",
    quantity: 2,
    description: "Delicious!!",
    image: "pizza+soda.jpg",
  },
});
