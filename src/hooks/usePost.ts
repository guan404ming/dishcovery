import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type {
  InsertPost,
  InsertPostDish,
  InsertPostReservation,
} from "@/lib/type";

import handleFetch from "./utils";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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
    router.refresh();
  };

  const createPost = async ({
    title,
    description,
    location,
    name,
    quantity,
  }: InsertPost & InsertPostDish) => {
    setLoading(true);

    const body = await handleFetch({
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

    await handleFetch({
      data: {
        postId: body.data.id,
        name,
        quantity,
        description,
      },
      method: "POST",
      url: "/api/posts/post-dishes",
    });

    router.refresh();
    setLoading(false);
  };

  return {
    createPost,
    createPostReservation,
    loading,
  };
}
