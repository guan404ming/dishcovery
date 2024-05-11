import { useState } from "react";

import { useSession } from "next-auth/react";

import type {
  InsertPost,
  InsertPostDish,
  InsertPostReservation,
} from "@/lib/type";

import handleFetch from "./utils";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const createPostReservation = async ({
    postDishId,
    quantity,
  }: InsertPostReservation) => {
    setLoading(true);

    handleFetch({
      data: { postDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/posts/post-reservations",
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
      data: {
        title,
        description,
        location,
        name,
        quantity,
        userId: session?.user?.id,
      },
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
