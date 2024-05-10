import { useState } from "react";

import type {
  InsertPost,
  InsertPostDish,
  InsertPostReservation,
} from "@/lib/type";

import handleFetch from "./utils";

export default function usePost() {
  const [loading, setLoading] = useState(false);

  const createPostReservation = async ({
    postDishId,
    quantity,
  }: InsertPostReservation) => {
    setLoading(true);

    handleFetch({
      data: { postDishId, quantity },
      method: "POST",
      url: "/api/post-reservations",
    });
    setLoading(false);
  };

  const createPost = async ({
    title,
    description,
    location,
    name,
    quantity,
  }: InsertPost & InsertPostDish) => {
    setLoading(true);

    handleFetch({
      data: { title, description, location, name, quantity },
      method: "POST",
      url: "/api/posts",
    });
    setLoading(false);
  };

  return {
    createPost,
    createPostReservation,
    loading,
  };
}
